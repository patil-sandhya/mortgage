'use client'
import { useAlertAndLoader } from '@/app/layout'
import CreateBtn from '@/Components/User/CreateBtn'
import { useAuth } from '@/context/AuthContext/AuthContext'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import BatchModal from './BatchModal'
import BatchApiServies from '@/Services/BatchApi'
import BatchInfoCard from './BatchInfoCard'
import Pagination from '@/CommonComponents/Pagination/Pagination'
import AddRecord from './AddRecord'

const Batch = () => {
  const {handleUserLogout} = useAuth()
  const router = useRouter()
  const [result, setResult]= useState([])
  const [tab, setTab] = useState("All");
  const { setAlert, setLoading } = useAlertAndLoader();
 const [msg, setMsg] = useState(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [showCreate, setShowCreate] = useState(false)
  const [curScr, setScr] = useState('main')
  const [batchId, setBatchId] = useState(null)

  const getBatches = async()=>{
    setLoading(true)
    try {
      let type='';
      if(tab != 'All'){
        type = tab
      }
      let res = await BatchApiServies.get_batches( type, currentPage)
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
      console.log("batch", res)
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

   const handleTab = (val) => {
    setTab(val);
    setCurrentPage(1)
    setTotalRecords(0)
  };

   const handlePageChange = async (pageNo) => {
    setCurrentPage(pageNo);
  };

  const handleBatchBtn = (id, btnType)=>{
    console.log("handle batch btn c", btnType)
    setBatchId(id)
    if(btnType == 'view'){
    setScr("view")
    }else{
      setScr('add')
    }
  }

  const closeViewAdd = ()=>{
    setScr('main')
    setBatchId(null)
  }
  

   useEffect(()=>{
    getBatches()
  },[tab, currentPage])


  return (
    <div className="mt-20 mx-4 sm:mx-5 pb-16 sm:pb-2">
      {
            showCreate && (
              <BatchModal closeFunc={()=> setShowCreate(false)} />
            )
          }
      {
        (curScr == 'main') && (
          <>
           <div className=" flex flex-col md:flex-row md:justify-between">
            <div className="flex md:w-1/2 gap-4 sm:gap-0 items-center   justify-start ">
             
              <div className="my-2  md:m-2 ">
                <h3 className="text-md m-2 font-semibold">Batch Type:</h3>
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
                    onClick={() => handleTab("Daily")}
                    className={`relative rounded-md inline-block cursor-pointer px-4 py-2 border-2 ${
                      tab == "Daily" ? "border-primary" : ""
                    } `}
                  >
                    Daily
                  </div>
                  <div
                    onClick={() => handleTab("Weekly")}
                    className={`relative rounded-md inline-block cursor-pointer px-4 py-2 border-2 ${
                      tab == "Weekly" ? "border-primary" : ""
                    } `}
                  >
                    Weekly
                  </div>
                </div>
              </div>
            </div>
            <button onClick={getBatches}>Add</button>
            
          </div>
           <div className='mx-1 my-5 flex flex-wrap gap-8 justify-center items-center '>
            {
              msg && (
                <div className='md:w-3/5  w-full my-10 p-5 font-semibold shadow-lg rounded-2xl bg-primary text-white text-2xl text-center'>
                {msg}
              </div>
              )
            }
            {
              result?.length > 0 && (
              <>
              {result.map((item) => {
                return  <BatchInfoCard key={item?.id} handleBatchBtn={handleBatchBtn} {...item} />
              })
                
               }
              </>
              )
            }
            
           </div>
            <Pagination
            currentPage={currentPage}
          totalItems={totalRecords}
          setter={handlePageChange}
          limit={5}
            />
   <CreateBtn name="New Batch" handleCreate={()=> setShowCreate(true)} />
          </>
        )
      }
      
      {
        (curScr != 'main') && (
          <AddRecord type={(curScr == 'view') ? 'view' : 'addbatch'} closeViewAdd={closeViewAdd} {...batchId} />
        )
      }
      
     

    </div>
  )
}

export default Batch