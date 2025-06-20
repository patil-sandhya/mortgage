"use client";
import { useAlertAndLoader } from "@/app/layout";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import SearchBtn from "./SearchBtn";
import CreateBtn from "./CreateBtn";
import MortgageFormModal from "./MortgageFormModal";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext/AuthContext";
import RecordApiServies from "@/Services/RecordApi";
import RecordTable from "./RecordTable";
import Pagination from "@/CommonComponents/Pagination/Pagination";
import UpdateRecord from "./UpdateRecord";

const filterOptions = [
  {
    All: "all",
  },
  {
    Pending: "pending",
  },
  {
    Verified: "verified",
  },
  {
    Flagged: 'flagged',
  }
];
const sortOptions = ["Created At", "Updated At"];

const Records = () => {
  const { setAlert, setLoading } = useAlertAndLoader();
  const filterStatusRef = useRef(null);
  const [filteredOption, setFilteredOption] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const sortStatusRef = useRef(null);
  const [sortedOption, setsortedOption] = useState("Sort by");
  const [sortOpen, setsortOpen] = useState(false);
  const [showCreate, setShowCreate] = useState(false);
  const [result, setResult] = useState([]);
  const router = useRouter();
  const { handleUserLogout } = useAuth();
  const [msg, setMsg] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [curScr, setScr] = useState('main')
  const [curRecord, setCurRecord]= useState(null);

  const getRecords = async () => {
    setLoading(true);
    try {
      let status = "";
      if (filteredOption !== "All") {
        status = filteredOption;
      }
      let sortby = 'updated_at';
      if (sortedOption != "Sort by") {
        sortby = sortedOption == "Updated At" ? "updated_at" : "created_at";
      }
      let res = await RecordApiServies.get_records_user(
        currentPage,
        status,
        sortby
      );
      if (res?.status == 200) {
        let data = res?.data?.data
        if(data.length > 0){
          setTotalRecords(res?.data?.total)
        setResult(res?.data?.data)
        setMsg(null)
        }else{
          setMsg("No record found")
          setResult([])
        }
      }
      console.log("user record", res);
    } catch (error) {
      if (error?.response?.data?.message == "Unauthorized") {
        setAlert("error", "Session is expire, please login again");
        router.push("/");
        handleUserLogout();
      } else {
        setAlert("error", "Failed to fetch data.");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFilterDropdown = () => {
    setFilterOpen(!filterOpen);
  };

  const togglesortDropdown = () => {
    setsortOpen(!sortOpen);
  };

  const handleSortMouseDown = (event) => {
    if (
      sortStatusRef.current &&
      !sortStatusRef.current.contains(event.target)
    ) {
      // console.log('inside here');
      setsortOpen(false);
    }
  };

  const handleFIlterMouseDown = (event) => {
    if (
      filterStatusRef.current &&
      !filterStatusRef.current.contains(event.target)
    ) {
      setFilterOpen(false);
    }
  };

  const handleFilterOptionSelect = (option) => {
    setFilteredOption(option);
    setFilterOpen(false);
    setCurrentPage(1);
    setTotalRecords(0);
  };

  const handlesortOptionSelect = (option) => {
    setsortedOption(option);
    setsortOpen(false);
    setCurrentPage(1);
    setTotalRecords(0);
  };
  const handlePageChange = async (pageNo) => {
    setCurrentPage(pageNo);
  };

  const handleRecordLock = async(id) =>{
    console.log("handle records",id)
    setLoading(true)
    try {
      let res = await RecordApiServies.put_lock(id)
      console.log(res)
      if(res.status == 200){
        setCurRecord(res?.data)
        setScr('edit')
        setAlert('success', 'Record locked!')
      }
    } catch (error) {
     if (error?.response?.data?.message == "Unauthorized") {
        setAlert("error", "Session is expire, please login again");
        router.push("/");
        handleUserLogout();
      } if(error?.response?.data?.message){
        setAlert("error", error?.response?.data?.message);
      }
      else {
        setAlert("error", "Failed to lock");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const handleRecordUnlock = async(id) =>{
    setLoading(true)
    try {
      let res = await RecordApiServies.put_unlock(id)
      console.log(res)
      if(res.status == 200){
        setAlert('success', 'Record unlocked')
        setCurRecord(null)
        setScr('main')
        getRecords()
        
      }
    } catch (error) {
     if (error?.response?.data?.message == "Unauthorized") {
        setAlert("error", "Session is expire, please login again");
        router.push("/");
        handleUserLogout();
      } if(error?.response?.data?.message){
        setAlert("error", error?.response?.data?.message);
      }
      else {
        setAlert("error", "Failed to unlock");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  const setMainScr = ()=>{
    setScr('main')
    getRecords()
  }
  

  useEffect(() => {
    document.addEventListener("mousedown", handleFIlterMouseDown);
    document.addEventListener("mousedown", handleSortMouseDown);

    // Cleanup: remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleFIlterMouseDown);
      document.removeEventListener("mousedown", handleSortMouseDown);
    };
  }, []);

  useEffect(() => {
    getRecords();
  }, [filteredOption, sortedOption, currentPage]);

  return (
    <div className="mt-20 mx-4 sm:mx-5">
      {
        (curScr == 'main') && (
      <>
 {showCreate && (
        <MortgageFormModal closeFunc={() => setShowCreate(false)} />
      )}
        <div className="my-5 flex flex-col md:flex-row md:justify-between">
          <div className="flex md:w-1/2 gap-1 sm:gap-0 items-center   justify-start ">
            <div className="my-2  md:m-2 lg:m-5" ref={filterStatusRef}>
              <h3 className="text-md m-2 font-semibold">Filter Status</h3>
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="inline-flex w-44 items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    onClick={toggleFilterDropdown}
                  >
                    {filteredOption}
                    {filterOpen ? <ChevronUp /> : <ChevronDown />}
                  </button>
                </div>
                {filterOpen && (
                  <div className="absolute z-[1] mt-1 w-44 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      {filterOptions.map((option) => {
                        const [label, value] = Object.entries(option)[0];
                        return (
                          <button
                            key={value}
                            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-[#f1efff]"
                            role="menuitem"
                            onClick={() => handleFilterOptionSelect(label)}
                          >
                            {label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* Sort  */}
            <div className="my-2  md:m-2 lg:m-5" ref={sortStatusRef}>
              <h3 className="text-md m-2 font-semibold">Sort By Date</h3>
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="inline-flex w-44 items-center justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
                    onClick={togglesortDropdown}
                  >
                    {sortedOption}
                    {sortOpen ? <ChevronUp /> : <ChevronDown />}
                  </button>
                </div>
                {sortOpen && (
                  <div className="absolute z-[1] mt-1 w-44 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div
                      className="py-1"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="options-menu"
                    >
                      {sortOptions.map((option) => (
                        <button
                          key={option}
                          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-[#f1efff]"
                          role="menuitem"
                          onClick={() => handlesortOptionSelect(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {/* <button onClick={getRecords}>Add</button> */}
          </div>
          <div className="flex md:w-1/2 flex-col-reverse md:flex-row md:items-center md:ml-1 lg:ml-5 lg:justify-end gap-2 lg:gap-5">
            <SearchBtn handleEdit={handleRecordLock} />
          </div>
        
    </div>
    <div className='mx-1 my-5 flex justify-center items-center '>
            {
              msg && (
                <div className='md:w-3/5  w-full my-10 p-5 font-semibold shadow-lg rounded-2xl bg-primary text-white text-2xl text-center'>
                {msg}
              </div>
              )
            }
            {
              result?.length > 0 && (
              <RecordTable data={result} handleEditBtn={handleRecordLock}  />
              )
            }
            
           </div>
           <Pagination
            currentPage={currentPage}
          totalItems={totalRecords}
          setter={handlePageChange}
          limit={5}
            />
      <CreateBtn name="New Record" handleCreate={() => setShowCreate(true)} />
      </>
        )
      }
      {
        (curScr == 'edit') && (
          <UpdateRecord handleBack={handleRecordUnlock} setMainScr={setMainScr} record={{...curRecord}} />
        )
      }
     
    </div>
  );
};

export default Records;
