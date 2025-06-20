"use client";
import { useAlertAndLoader } from "@/app/layout";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import SearchBtn from "@/Components/User/SearchBtn";
import RecordApiServies from "@/Services/RecordApi";
import RecordTable from "./RecordTable";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext/AuthContext";
import Pagination from "@/CommonComponents/Pagination/Pagination";

const filterOptions = [
    "All",
    "Pending", 
    "Verified",
    "Flagged"
];

const Dashboard = () => {
  const { setAlert, setLoading } = useAlertAndLoader();
  const filterStatusRef = useRef(null);
  const [filteredOption, setFilteredOption] = useState("All");
  const [filterOpen, setFilterOpen] = useState(false);
  const [tab, setTab] = useState("All");
  const [result, setResult]= useState([])
  const router = useRouter()
  const {handleUserLogout} = useAuth()
  const [msg, setMsg] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const getRecords = async()=>{
    setLoading(true)
    try {
      let status='';
      if(filteredOption !== 'All'){
        status = filteredOption
      }
      let assign='';
      if(tab != 'All'){
        assign = tab
      }
      let res = await RecordApiServies.get_data(status, assign, currentPage)
      if(res?.status == 200){
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
      // console.log("records", res)
    } catch (error) {
       if(error?.response?.data?.message == "Unauthorized"){
        setAlert('error', "Session is expire, please login again")
        router.push("/")
        handleUserLogout()
          
      }else{
      setAlert('error', 'Failed to fetch data.')
      }
     console.log(error) 
    }finally{
      setLoading(false)
    }
  }

   const handleFilterOptionSelect = (option) => {
    setFilteredOption(option);
    setFilterOpen(false);
    setCurrentPage(1)
    setTotalRecords(0)
  };
  const toggleFilterDropdown = () => {
    setFilterOpen(!filterOpen);
  };

  const handleTab = (val) => {
    setTab(val);
    setCurrentPage(1)
    setTotalRecords(0)
  };

  const handlePageChange = async (pageNo) => {
    setCurrentPage(pageNo);
  };

  const handleFIlterMouseDown = (event) => {
    if (
      filterStatusRef.current &&
      !filterStatusRef.current.contains(event.target)
    ) {
      setFilterOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleFIlterMouseDown);

    // Cleanup: remove the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousedown", handleFIlterMouseDown);
    };
  }, []);

  useEffect(()=>{
    getRecords()
  },[filteredOption,tab, currentPage])

  return (
    <div className="mt-20 mx-4 sm:mx-5">
      <div className="my-5 flex flex-col md:flex-row md:justify-between">
            <div className="flex md:w-1/2 gap-4 sm:gap-0 sm:items-center flex-col sm:flex-row justify-start ">
              <div className="my-2  md:m-2 lg:m-5" ref={filterStatusRef}>
                <h3 className="text-md m-2 font-semibold">Filter Status</h3>
                <div className="relative inline-block text-left">
                  <div>
                    <button
                      type="button"
                      className="inline-flex w-44 items-center justify-between rounded-md border-2 border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
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
                        {filterOptions.map((value) => {
                          return (
                            <button
                              key={value}
                              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-[#f1efff]"
                              role="menuitem"
                              onClick={() => handleFilterOptionSelect(value)}
                            >
                              {value}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="my-2  md:m-2 lg:m-5">
                <h3 className="text-md m-2 font-semibold">Records :</h3>
                <div className="flex gap-2">
                  <div
                    onClick={() => handleTab("All")}
                    className={`relative rounded-md inline-block cursor-pointer px-4 py-2 ${
                      tab == "All" ? "border-2 border-primary" : ""
                    } border-2`}
                  >
                    All
                  </div>
                  <div
                    onClick={() => handleTab("unassigned")}
                    className={`relative rounded-md inline-block cursor-pointer px-4 py-2 border-2 ${
                      tab == "unassigned" ? "border-primary" : ""
                    } `}
                  >
                    Unassigned
                  </div>
                  <div
                    onClick={() => handleTab("assigned")}
                    className={`relative rounded-md inline-block cursor-pointer px-4 py-2 border-2 ${
                      tab == "assigned" ? "border-primary" : ""
                    } `}
                  >
                    Assigned
                  </div>
                </div>
              </div>
            </div>
            {/* <button onClick={getRecords}>Add</button> */}
            <div className="flex mr-5 md:w-1/2 flex-col-reverse md:flex-row md:items-center md:ml-1 lg:ml-5 lg:justify-end gap-2 lg:gap-5">
              <SearchBtn type="admin" />
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
              <RecordTable data={result} getRecords={getRecords} />
              )
            }
            
           </div>
            <Pagination
            currentPage={currentPage}
          totalItems={totalRecords}
          setter={handlePageChange}
          limit={5}
            />
    </div>
  );
};

export default Dashboard;
