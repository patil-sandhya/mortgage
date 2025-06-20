"use client";
import { useAlertAndLoader } from "@/app/layout";
import { useAuth } from "@/context/AuthContext/AuthContext";
import RecordApiServies from "@/Services/RecordApi";
import { SearchIcon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RecordInfoModal from "../Admin/Record/RecordInfoModal";

const SearchBtn = ({ type, handleEdit }) => {
  const [searchText, setSearchText] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState([]);
  const { handleUserLogout } = useAuth();
  const { setAlert } = useAlertAndLoader();
  const router = useRouter();
  const [cache, setCache] = useState({});
  const [showInfo, setShowInfo] = useState(false);
  const [record, setRcord] = useState(null);

  const fetchRecords = async () => {
    console.log(cache, "fetch called", searchText);
    if (cache[searchText]) {
      setResult(cache[searchText]);
      return;
    }
    try {
      let res;
      if (type == "admin") {
        res = await RecordApiServies.get_search_all(searchText);
      } else {
        res = await RecordApiServies.get_search_data(searchText);
      }
      if (res?.status == 200) {
        setResult(res?.data);
        setCache((prev) => ({ ...prev, [searchText]: res.data }));
      }
      console.log("search res", res);
    } catch (error) {
      if (error?.response?.data?.message == "Unauthorized") {
        setAlert("error", "Session is expire, please login again");
        router.push("/");
        handleUserLogout();
      } else {
        setAlert("error", "Failed to fetch data.");
      }
      console.log(error);
    }
  };
  const handleTextChange = (e) => {
    const input = e.target.value.trim();

    setSearchText(input);
  };

  const clearSearch = () => {
    setSearchText("");
    setShowResults(false);
  };

  const handleShow = (val) => {
    console.log("show record");
    setShowInfo(true);
    setRcord(val);
  };

  const handleSelect = (val) => {
    if (val.status == "Pending") {
      handleEdit(val.id);
    } else {
      handleShow(val);
    }
  };

  useEffect(() => {
    if (!searchText) {
      setResult([]);
      return;
    }
    const timeout = setTimeout(fetchRecords, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [searchText]);

  return (
    <div className="relative w-full md:w-8/12 mr-5">
      {showInfo && (
        <RecordInfoModal record={record} closeFunc={() => setShowInfo(false)} />
      )}
      <h3 className="text-md m-2 font-semibold">Find Records</h3>

      <div className="flex items-center cursor-pointer justify-between rounded-md border-2 pr-2 focus-within:border-primary bg-white">
        <div className="flex w-11/12 gap-2">
          <div className="ml-4 flex items-center justify-center">
            <SearchIcon />
          </div>
          <input
            type="text"
            value={searchText}
            onChange={handleTextChange}
            onBlur={() => setShowResults(false)}
            onFocus={() => setShowResults(true)}
            placeholder="search by borrower's name & address"
            className="block w-full bg-transparent  py-2 focus:border-0 focus:outline-0"
          />
        </div>
        {searchText && (
          <div onClick={clearSearch} className="cursor-pointer">
            <X size={18} />
          </div>
        )}
      </div>

      {/* Results Panel */}
      {showResults && (
        <div className="absolute mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-10 max-h-60 overflow-y-auto">
          {result.length > 0 ? (
            result.map((item, index) => (
              <div
                key={index}
                onMouseDown={() => handleSelect(item)}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                {item.borrower_name}, {item.property_address}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-sm text-gray-500">
              No results found.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBtn;
