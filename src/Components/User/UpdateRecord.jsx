'use client'
import { ArrowLeft } from "lucide-react";
import { useState, useEffect, useRef } from 'react';
import { format } from "date-fns";
import { useAlertAndLoader } from "@/app/layout";
import { useAuth } from "@/context/AuthContext/AuthContext";
import { useRouter } from "next/navigation";
import RecordApiServies from "@/Services/RecordApi";

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

const UpdateRecord = ({handleBack,record, setMainScr}) => {
  const {setAlert, setLoading} = useAlertAndLoader()
  const {handleUserLogout} = useAuth()
  const timerRef = useRef(null);
  const router = useRouter()
const [form, setForm] = useState({
    property_address: record.property_address || '',
    transaction_date: record.transaction_date || '',
    borrower_name: record.borrower_name || '',
    loan_amount: record.loan_amount || '',
    sales_price: record.sales_price || '',
    down_payment: record.down_payment || '',
    apn: record.apn || ''
  });
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const UpdateRecord = async()=>{
    setLoading(true)
    try {
      let res = await RecordApiServies.put_updateRecord(record.id,form);
      if(res?.status == 200){
        setAlert('success', 'Record Updated')
        handleBack(record.id)
      }
      console.log("updated record",res)
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

   const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submit data:', form);
    if(!form.borrower_name.trim() || 
      !form.loan_amount.trim() || 
      !form.property_address.trim() || 
      !form.sales_price.trim() || 
      !form.transaction_date.trim() ||
      !form.apn.trim()
    ){
       setAlert('warning', 'Please fill all details');
       return
    }else{
      UpdateRecord()
    }
  };

  const formatDateTime = (dateStr)=>{
     if (!dateStr) return "NA";
    try {
      const day= format(new Date(dateStr), "d MMM yyyy");
      const time= format(new Date(dateStr), "hh:mm a");
      return `${day} ${time}`
    } catch {
      return "NA";
    }
  }

  const handleVerify = async(val)=>{
    setLoading(true)
    try {
      const data = {
        status: val
      }
      let res = await RecordApiServies.put_verify_record(record.id, data)
      console.log("very res", res)
      if(res?.status == 200){
        setAlert('success', "Record Verified")
        setMainScr()
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
  
 useEffect(() => {
    if (form.sales_price && form.loan_amount) {
      setForm((prev) => ({
        ...prev,
        down_payment:
          parseFloat(form.sales_price) - parseFloat(form.loan_amount),
      }));
    }
  }, [form.sales_price, form.loan_amount]);

   useEffect(() => {
    const INACTIVITY_LIMIT = 1 * 60 * 1000; // 10 minutes in ms
    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        console.log('User inactive for 10 mins');
        handleBack(record.id); 
      }, INACTIVITY_LIMIT);
    };

    const activityEvents = ['mousemove', 'keydown', 'scroll', 'click'];
    activityEvents.forEach((event) =>
      window.addEventListener(event, resetTimer)
    );
    resetTimer(); 

    // Handle browser close/refresh
    const handleBeforeUnload = () => {
      handleBack(record.id); 
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      activityEvents.forEach((event) =>
        window.removeEventListener(event, resetTimer)
      );
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [handleBack]);

  return (
    <div>
        <div className=" flex flex-col md:flex-row md:justify-between">
        <BackButton onClick={()=> handleBack(record.id)} />            
        </div>
        <div className="mt-5 mb-10">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md max-w-4xl mx-auto space-y-6">
      <h2 className="text-xl font-semibold text-gray-600">Edit / Update Data</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Editable Fields */}
         {[
          { label: 'Property Address', name: 'property_address' },
          { label: 'Transaction Date', name: 'transaction_date', type: 'date' },
          { label: 'Borrower Name', name: 'borrower_name' },
          { label: 'Loan Amount', name: 'loan_amount', type: 'number' },
          { label: 'Sales Price', name: 'sales_price', type: 'number' },
          {
            label: 'Down Payment',
            name: 'down_payment',
            type: 'number',
            readOnly: true,
          },
          { label: 'APN', name: 'apn' },
        ].map(({ label, name, type = 'text', readOnly }) => (
          <div key={name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
            <input
              type={type}
              name={name}
              value={form[name]}
              onChange={handleChange}
              readOnly={readOnly}
              className={`w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 ${
                readOnly
                  ? 'text-gray-500 cursor-not-allowed'
                  : 'focus:ring-primary'
              }`}
            />
          </div>
        ))}

       
      </div>

      {/* Read-only section */}
      <div className="border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-700">
        
        <Field label="Status" value={record.status} />
        <Field label="Assigned To" value={record.assigned_to_name} />
        <Field label="Entered By" value={record.entered_by_name} />
        <Field label="Entered By Date" value={formatDateTime(record.entered_by_date)} />
        <Field label="Locked By" value={record.locked_by_name || 'NA'} />
        <Field label="Locked At" value={formatDateTime(record.lock_timestamp)} />
        <Field label="Reviewed By" value={record.reviewed_by_name || 'NA'} />
        <Field label="Reviewed At" value={formatDateTime(record.reviewed_by_date)} />
        <Field label="Created At" value={formatDateTime(record.created_at)} />
        <Field label="Updated At" value={formatDateTime(record.updated_at)} />
        <Field label="Batch Name" value={record.batch_name || 'NA'} />
      </div>

      {/* Action button */}
      <div>
      <span className="block text-gray-500">Verify Data</span>
        <div className="flex gap-4 pt-4">
  <button
    type="button"
    onClick={() => handleVerify('Verified')}
    className="px-5 py-2 rounded-md bg-green-100 text-green-700 border border-green-300 hover:bg-green-200 transition"
  >
    Good
  </button>
  <button
    type="button"
    onClick={() => handleVerify('Flagged')}
    className="px-5 py-2 rounded-md bg-red-100 text-red-700 border border-red-300 hover:bg-red-200 transition"
  >
    Bad
  </button>
</div>
</div>

      <div className="flex justify-end mt-6">
         
        <button
          type="submit"
          className="bg-primary hover:bg-[#6355ff] text-white font-medium px-6 py-2 rounded-lg transition"
        >
          Save Changes
        </button>
      </div>
    </form>
        </div>
    </div>
  )
}

export default UpdateRecord

function Field({ label, value }) {
  return (
    <div>
      <span className="block text-gray-500">{label}</span>
      <div className="mt-1 font-medium text-gray-800 bg-gray-50 border border-gray-200 px-3 py-2 rounded-md">
        {value || 'NA'}
      </div>
    </div>
  );
}