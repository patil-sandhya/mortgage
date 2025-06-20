import React, { useState } from 'react'
import RecordInfoModal from '../Admin/Record/RecordInfoModal'
import { format } from "date-fns";

const RecordTable = ({data,handleEditBtn}) => {
      const [showInfo, setShowInfo] = useState(false)
      const [record, setRcord] = useState(null)
      
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
            showInfo && (
              <RecordInfoModal record={record} closeFunc={()=> setShowInfo(false)} />
            )
          }
      <div className={`mt-5}`}>
        <table className="min-w-full border border-gray-300 text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-3 border">Transaction Date</th>
              <th className="px-4 py-3 border">Borrower Name</th>
              <th className="px-4 py-3 border">Property Address</th>
              <th className="px-4 py-3 border">Loan Amount</th>
              <th className="px-4 py-3 border">Status</th>
              <th className="px-4 py-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="border-t">
                
                  <td className="px-4 py-3 border">
                  {formatDate(item.transaction_date)}
                </td>
                <td onClick={()=> handleShow(item)} className="px-4 py-3 border cursor-pointer font-medium text-primary underline underline-offset-4">{item.borrower_name}</td>
                <td className="px-4 py-3 border">{item.property_address}</td>
                <td className="px-4 py-3 border">₹ {item.loan_amount}</td>
                
                <td className="px-4 py-3 border">{item.status}</td>
                <td className="px-4 py-3 border flex justify-center">
                  {
                    (item.status == 'Pending' && !item?.locked_by) ? (
                         <button onClick={()=> handleEditBtn(item.id)} className="bg-primary text-white px-3 py-1 rounded hover:bg-primary-dark">
                    Edit/Verify
                  </button>
                    ):(
                        <div>NA</div>
                    )
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        
      </div>
     
  
      </div>
    )
}

export default RecordTable