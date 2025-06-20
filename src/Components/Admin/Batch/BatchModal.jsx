'use client'
import { useAlertAndLoader } from '@/app/layout';
import { useAuth } from '@/context/AuthContext/AuthContext';
import BatchApiServies from '@/Services/BatchApi';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function BatchModal({closeFunc}) {
  const [batchName, setBatchName] = useState('');
  const [batchType, setBatchType] = useState('Daily'); 
  const {handleUserLogout} = useAuth()
  const {setAlert, setLoading} = useAlertAndLoader()
  const router = useRouter()
  const createBatch = async()=>{
    try {
        setLoading(true)
        const data = {
            batch_name: batchName,
            batch_type: batchType
        }
        let res = await BatchApiServies.post_create(data);
        if(res?.status == 201){
            setAlert('success', 'New batch created!')
        }
        console.log(res, "create batch")
    } catch (error) {
      if(error?.response?.data?.message == "Unauthorized"){
        setAlert('error', "Session is expire, please login again")
        router.push("/")
        handleUserLogout()    
      }else 
      if(error?.response?.data?.message){
        setAlert('error', error?.response?.data?.message )
      }else{
      setAlert('error', 'Failed to create a batch.')
      }
     console.log(error) 
    }finally{
      setLoading(false)
      closeFunc()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ batchName, batchType });
    createBatch()
  };

  return (
    <>
     <>
          {/* Background Blur */}
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={closeFunc} />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="bg-white max-w-md w-full rounded-lg shadow-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Create Batch</h2>
                <button onClick={closeFunc} className="text-red-500 text-lg font-bold">
                    ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Batch Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Batch Name</label>
                  <input
                    type="text"
                    value={batchName}
                    onChange={(e) => setBatchName(e.target.value)}
                    className="w-full px-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Enter batch name"
                    required
                  />
                </div>

                {/* Batch Type */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Batch Type</label>
                  <div className="flex gap-6">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="Daily"
                        checked={batchType === 'Daily'}
                        onChange={(e) => setBatchType(e.target.value)}
                        className="text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700">Daily</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        value="Weekly"
                        checked={batchType === 'Weekly'}
                        onChange={(e) => setBatchType(e.target.value)}
                        className="text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-gray-700">Weekly</span>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-[#6355ff]"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
    </>
  );
}
