import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext/AuthContext";
import { useRouter } from "next/navigation";
import { useAlertAndLoader } from "@/app/layout";
import BatchApiServies from "@/Services/BatchApi";
import Pagination from "@/CommonComponents/Pagination/Pagination";
import RecordTable from "../Record/RecordTable";

const BackButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="inline-flex self-start h-10 items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-200 transition-all"
    >
      <ArrowLeft className="w-4 h-4" />
      <span className="text-sm font-medium">Back</span>
    </button>
  );
};


const AddRecord = ({ type, id, batch_name, batch_type, created_at , closeViewAdd}) => {
  const [result, setResult] = useState([])
const [msg, setMsg] = useState(null);
const {handleUserLogout} = useAuth()
const router = useRouter()
const [curType, setCurType] = useState(type)
const { setAlert, setLoading } = useAlertAndLoader();
 const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const getRecords = async()=>{
    setLoading(true)
    try {   
      let res = await BatchApiServies.get_records(currentPage)
      if(res?.status == 200){
        let data = res?.data?.data
        if(data.length > 0){
        setTotalRecords(res?.data?.total)
        setResult(res?.data?.data)
        setMsg(null)
        }else{
          setMsg("NA")
          setResult([])
        }
      }
      console.log("batch records", res)
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

  const addBatch = async(recordIds)=>{
    setLoading(true)
    try {
        const data ={
            recordIds,
            batchId: id
        }
        let res = await BatchApiServies.put_assign_batch(data)
        if(res?.status == 200){
            setAlert('success', 'Record added successfully')
            setCurrentPage(1)
            getRecords()
        }
        console.log(res, "add record api")
    } catch (error) {
    if(error?.response?.data?.message == "Unauthorized"){
        setAlert('error', "Session is expire, please login again")
        router.push("/")
        handleUserLogout()
      }else{
      setAlert('error', 'Failed to add records to batch.')
      }
     console.log(error) 
    }finally{
      setLoading(false)
    }
  }

  const getBatchRecords = async()=>{
    setLoading(true)
    try {   
      let res = await BatchApiServies.get_batch_records(id)
      if(res?.status == 200){
        let data = res?.data
        if(data.length > 0){
        setResult(res?.data)
        setMsg(null)
        }else{
          setMsg("Not found")
          setResult([])
        }
      }
      console.log("batch records new", res)
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

const handlePageChange = async (pageNo) => {
    setCurrentPage(pageNo);
  };

  const tagClass =
    batch_type === "Daily"
      ? "bg-blue-100 text-blue-700"
      : batch_type === "Weekly"
      ? "bg-green-100 text-green-700"
      : "bg-gray-100 text-gray-600";

  const formattedDate = created_at
    ? format(new Date(created_at), "d MMM yyyy, hh:mm a")
    : "NA";

  useEffect(()=>{
    if(curType == 'addbatch'){
    getRecords()
    }else{
        getBatchRecords()
    }
  },[curType])
    
  return (
    <div>
      <div className=" flex flex-col md:flex-row md:justify-between">
        <BackButton onClick={closeViewAdd} />
        <div className="bg-white border my-5 sm:my-0 border-gray-200 rounded-xl shadow-inner p-5 w-full max-w-md transition hover:shadow-md">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-semibold text-gray-800">
              {batch_name || "NA"}
            </h3>
            {batch_type && (
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium ${tagClass}`}
              >
                {batch_type}
              </span>
            )}
          </div>

          {/* Date */}
          <p className="text-sm text-gray-600 mb-5">
            <span className="font-medium text-gray-700">Created At:</span>{" "}
            {formattedDate}
          </p>
        </div>
      </div>
      <div className="flex justify-center">
    <div className="font-semibold mx-1 mt-2  text-lg text-gray-600"> {(type == 'addbatch') ? 'Add' : 'Batch'} Records </div>
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
              <RecordTable addBatch={addBatch} type={curType} data={result} getRecords={getRecords} />
              )
            }
           
           </div>
           <div className="mx-1 sm:mx-10 px-3 mt-10 sm:mt-5">
             {
      (curType != 'addbatch') ? (
<button
  type="button"
  onClick={()=> setCurType('addbatch')}
  className="px-4 py-2 text-sm rounded-md border border-indigo-200 text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition"
>
  Add Records
</button>
      ) : (
         <button
        onClick={()=> setCurType('view')}
          className="px-4 py-2 text-sm rounded-md border border-indigo-200 text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition"
        >
          Show Added Records
        </button>
      )
    }
           </div>
       <Pagination
            currentPage={currentPage}
          totalItems={totalRecords}
          setter={handlePageChange}
          limit={10}
            />
    </div>
  );
};

export default AddRecord;
