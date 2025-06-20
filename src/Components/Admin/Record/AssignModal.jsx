'use client'
import { useEffect, useState } from 'react';
import { ChevronDown, ChevronUp } from "lucide-react";
import { useAlertAndLoader } from '@/app/layout';
import { useAuth } from '@/context/AuthContext/AuthContext';
import RecordApiServies from '@/Services/RecordApi';
import ApiServies from '@/Services/CommonApi';
import { useRouter } from 'next/navigation';

export default function AssignModal({closeFunc,getRecords,borrowerData}) {
  const [selectedUser, setSelectedUser] = useState(null);
 const [isOpen, setIsOpen] = useState(false);
    const {setAlert} = useAlertAndLoader()
    const {handleUserLogout} = useAuth()
    const [userList, setUserlist] = useState(null)
    const router = useRouter()
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const handleSelect = (user) => {
    setSelectedUser(user);
    setIsOpen(false);
  };

  const getVAList = async()=>{
     try {
        let res = await ApiServies.get_va_user()
        console.log(res, "va list")
        if(res?.status == 200){
            setUserlist(res?.data)
        }
    } catch (error) {
        if(error?.response?.data?.message == "Unauthorized"){
        setAlert('error', "Session is expire, please login again")
          router.push("/")
        handleUserLogout()
      }else{
      setAlert('error', 'Failed to fetch VA list')
      }
      console.log(error)
    }
  }


  const handleAssign = async(e) => {
    e.preventDefault();
    if(!selectedUser?.id?.trim()){
        console.log(selectedUser)
       setAlert('warning', 'Please select user');
       return 
    }
    try {
        const data ={userId : selectedUser.id}
        let res = await RecordApiServies.put_assign(borrowerData?.id,data)
        if(res.status == 200){
            setAlert('success', `Record assigned to ${selectedUser.username}`)
            getRecords()
        }
        console.log(res)
    } catch (error) {
        if(error?.response?.data?.message == "Unauthorized"){
        setAlert('error', "Session is expire, please login again")
          router.push("/")
        handleUserLogout()
      }else{
      setAlert('error', 'Error to assign record.')
      }
      console.log(error)
    }finally{
        closeFunc()
    }
    // Call API or update logic here
  };

  useEffect(()=>{
    getVAList()
  },[])

  return (
    <div>
     <>
          {/* Blur background */}
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={closeFunc} />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="bg-white w-full max-w-xl mx-4 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Assign Record</h2>
                <button onClick={closeFunc} className="text-red-500 text-xl font-bold">
                    ✕
                </button>
              </div>

              <div className="space-y-3 mb-4">
                <p><span className="font-medium text-gray-600">Borrower:</span> {borrowerData.borrower_name}</p>
                <p><span className="font-medium text-gray-600">Loan Amount:</span> ₹ {borrowerData.loan_amount}</p>
                <p><span className="font-medium text-gray-600">Property Address:</span> {borrowerData.property_address}</p>
                <p><span className="font-medium text-gray-600">Transaction Date:</span> {borrowerData.transaction_date}</p>
                <p><span className="font-medium text-gray-600">Status:</span> {borrowerData.status}</p>
              </div>

              <form onSubmit={handleAssign} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Assign To</label>
                   <div className="relative inline-block text-left w-full">
        <button
          type="button"
          onClick={toggleDropdown}
          className="inline-flex w-full items-center justify-between rounded-md border-2 border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary"
        >
          {selectedUser ? selectedUser.username : "Select a user"}
          {isOpen ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
        </button>

        {isOpen && (
          <div
  className={`absolute z-10 mt-1 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transform transition-all duration-200 ease-out origin-top ${
    isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 -translate-y-1 pointer-events-none"
  }`}
>
  <div
    className="py-1 max-h-44 overflow-auto"
    role="menu"
    aria-orientation="vertical"
    aria-labelledby="options-menu"
  >
    {userList?.map((user) => (
      <button
        key={user.id}
        onClick={() => handleSelect(user)}
        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-[#f1efff] transition-colors"
        role="menuitem"
      >
        {user.username}
      </button>
    ))}
  </div>
</div>

        )}
      </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-[#6355ff]"
                  >
                    Assign
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>

      
    </div>
  );
}
