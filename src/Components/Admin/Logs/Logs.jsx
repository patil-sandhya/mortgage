'use client'
import { useAlertAndLoader } from '@/app/layout';
import Pagination from '@/CommonComponents/Pagination/Pagination';
import { useAuth } from '@/context/AuthContext/AuthContext';
import ApiServies from '@/Services/CommonApi';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import LogTable from './LogTable';
import DisplayImg from '../Record/DisplayImg';

const Logs = () => {
     const [result, setResult] = useState([])
    const [msg, setMsg] = useState(null);
    const {handleUserLogout} = useAuth()
    const router = useRouter()
    const { setAlert, setLoading } = useAlertAndLoader();
     const [currentPage, setCurrentPage] = useState(1);
      const [totalLogs, setTotalLogs] = useState(0);

    const getLogs = async()=>{
    setLoading(true)
    try {   
      let res = await ApiServies.get_logs(currentPage)
      if(res?.status == 200){
        let data = res?.data?.data
        if(data.length > 0){
        setTotalLogs(res?.data?.total)
        setResult(data)
        setMsg(null)
        }else{
          setMsg("No logs found")
          setResult([])
        }
      }
      console.log("log records", res)
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

  useEffect(()=>{
    getLogs()
  },[currentPage])
    
  return (
    <div className="mt-20 mx-4 sm:mx-5 pb-16 sm:pb-2">
        <div className="flex justify-center">
    <div className="font-semibold mx-1 mt-2  text-lg text-gray-600"> Audit Logs </div>
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
              <LogTable logs={result} />
              )
            }
            
           </div>
      <Pagination
            currentPage={currentPage}
          totalItems={totalLogs}
          setter={handlePageChange}
          limit={5}
            />
            <DisplayImg />
    </div>
  )
}

export default Logs