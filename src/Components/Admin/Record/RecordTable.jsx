import React, { useState } from 'react'
import { format } from "date-fns";

import AssignModal from './AssignModal';
import RecordInfoModal from './RecordInfoModal';

const RecordTable = ({data,getRecords,addBatch,type}) => {
    const [showAssignForm, setShowAssign] = useState(false)
    const [showInfo, setShowInfo] = useState(false)
    const [record, setRcord] = useState(null)
    const [recordIds, setRecordIds] = useState([])
    const handleAssign = (val)=>{
        setShowAssign(true)
        setRcord(val)
    }
    const handleShow = (val)=>{
      setShowInfo(true)
      setRcord(val)
    }
    const formatDate = (dateStr) => {
    if (!dateStr) return "NA";
    try {
      return format(new Date(dateStr), "d MMM yyyy");
    } catch {
      return "NA";
    }
  };
  return (
    <div className='md:w-11/12 w-full custom-scrollbar overflow-x-auto'>
        {
            showAssignForm && (
                <AssignModal getRecords={getRecords} borrowerData={record} closeFunc={()=> setShowAssign(false)} />
            )
        }
        {
          showInfo && (
            <RecordInfoModal record={record} closeFunc={()=> setShowInfo(false)} />
          )
        }
    <div className={`${(type == 'addbatch' || type == 'view')? 'mt-1' : 'mt-5'}`}>
      <table className="min-w-full border border-gray-300 text-sm text-left">
        <thead className="bg-gray-100 text-gray-700 uppercase">
          <tr>
            {
              (type == 'addbatch') && (
            <th className="px-4 py-3 border">Select</th>
              )
            }
            <th className="px-4 py-3 border">Transaction Date</th>
            <th className="px-4 py-3 border">Borrower Name</th>
            <th className="px-4 py-3 border">Property Address</th>
            <th className="px-4 py-3 border">Loan Amount</th>
            <th className="px-4 py-3 border">Status</th>
            <th className="px-4 py-3 border">Assigned To</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-t">
              {
              (type == 'addbatch') && (
            <th className="px-4 py-3 border text-center">
               <input
      type="checkbox"
      checked={recordIds.includes(item.id)}
      onChange={(e) => {
        if (e.target.checked) {
          setRecordIds((prev) => [...prev, item.id]);
        } else {
          setRecordIds((prev) => prev.filter((id) => id !== item.id));
        }
      }}
     className="w-4 h-4 accent-indigo-500 rounded cursor-pointer"
    />
            </th>
              )
            }
                <td className="px-4 py-3 border">
                {formatDate(item.transaction_date)}
              </td>
              <td onClick={()=> handleShow(item)} className="px-4 py-3 border cursor-pointer font-medium text-primary underline underline-offset-4">{item.borrower_name}</td>
              <td className="px-4 py-3 border">{item.property_address}</td>
              <td className="px-4 py-3 border">₹ {item.loan_amount}</td>
              
              <td className="px-4 py-3 border">{item.status}</td>
              <td className="px-4 py-3 border flex justify-center">
                {item.assigned_to ? (
                  item.assigned_to
                ) : (
                  <button onClick={()=> handleAssign(item)} className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-dark">
                    Assign
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div>
      
    </div>
    {
      (type == 'addbatch') && (
<button
  type="button"
  disabled={recordIds.length < 1}
  onClick={()=> addBatch(recordIds)}
  className="px-6 py-2 mt-5 mb-4 sm:mb-0 rounded-md bg-primary text-white text-sm font-medium hover:bg-[#6254f3] disabled:bg-secondary transition-colors"
>
  Submit Records
</button>
      )
    }

    </div>
  )
}

export default RecordTable