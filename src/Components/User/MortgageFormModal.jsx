"use client";
import { useAlertAndLoader } from "@/app/layout";
import { useAuth } from "@/context/AuthContext/AuthContext";
import RecordApiServies from "@/Services/RecordApi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MortgageFormModal({ closeFunc }) {
  const { userData } = useAuth();
  const router = useRouter()
  const [form, setForm] = useState({
    property_address: "",
    transaction_date: "",
    borrower_name: "",
    loan_officer_name: "",
    nmls_id: "",
    loan_amount: "",
    loan_term: "",
    sales_price: "",
    apn: "",
    down_payment: "",
  });
  const {setAlert, setLoading} = useAlertAndLoader()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const createRecord = async()=>{
    setLoading(true)
    try {
      let res = await RecordApiServies.post_create(form)
      console.log(res)
      if(res?.status == 201){
      setAlert('success', 'Record created!')
      }
    } catch (error) {
      if(error?.response?.data?.message == "Unauthorized"){
        setAlert('error', "Session is expire, please login again")
          router.push("/")
        handleUserLogout()
      }else{
      setAlert('error', 'Error while creating new record.')
      }
      console.log(error)
    }finally{
      setLoading(false)
        closeFunc()
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!form.borrower_name.trim() || 
      !form.loan_amount.trim() || 
      !form.loan_officer_name.trim() || 
      !form.loan_term.trim() || 
      !form.nmls_id.trim() || 
      !form.property_address.trim() || 
      !form.sales_price.trim() || 
      !form.transaction_date.trim() 
    ){
       setAlert('warning', 'Please fill all details');
       return
    }else{
      createRecord()
    }
  };

  useEffect(() => {
    if (form.sales_price && form.loan_amount) {
      setForm((prev) => ({
        ...prev,
        down_payment:
          parseFloat(form.sales_price) - parseFloat(form.loan_amount),
      }));
    }
  }, [form.sales_price, form.loan_amount]);

  return (
    <div className={`relative  overflow-hidden`}>
      <>
        {/* Background Blur */}
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={closeFunc}
        />

        {/* Modal */}
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-3xl mx-4 rounded-xl shadow-xl overflow-y-auto custom-scrollbar max-h-[90vh] p-6 space-y-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-semibold">Create New Record</h2>
              <button
                onClick={closeFunc}
                className="text-red-500 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {[
                ["property_address", "Property Address"],
                ["borrower_name", "Borrower Name"],
                ["loan_officer_name", "Loan Officer Name"],
                ["nmls_id", "NMLS ID", "number"],
                ["loan_amount", "Loan Amount", "number"],
                ["loan_term", "Loan Term (In Years)", "number"],
                ["sales_price", "Sales Price", "number"],
                ["apn", "APN"],
              ].map(([name, label, type = "text"]) => (
                <div key={name} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {label}
                  </label>
                  <input
                    name={name}
                    type={type}
                    value={form[name]}
                    onChange={handleChange}
                    
                    className="w-full no-spinner px-3 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder={`Enter ${label.toLowerCase()}`}
                    required
                  />
                  {+form.sales_price < +form.loan_amount &&
                    name === "sales_price" &&
                    form.sales_price != "" && (
                      <div className="text-red-500">
                        Salses price is less than Loan amout
                      </div>
                    )}
                </div>
              ))}

              {/* Read-only Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Transaction Date
                  </label>
                  <input
                    type="date"
                    max={new Date().toISOString().split("T")[0]} 
                    value={form.transaction_date}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        transaction_date: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-3 bg-gray-100 border border-gray-200 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Down Payment
                  </label>
                  <input
                    type="number"
                    value={form.down_payment}
                    readOnly
                    className="w-full px-3 py-3 bg-gray-100 border border-gray-200 rounded-lg"
                    placeholder="Auto-Calculated"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Entered By
                  </label>
                  <input
                    type="text"
                    value={userData.name}
                    readOnly
                    className="w-full px-3 py-3 bg-gray-100 border border-gray-200 rounded-lg"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-between pt-2">
                {/* <button
                    type="button"
                    onClick={handleVerify}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Mark as Verified
                  </button> */}

                <button
                  type="submit"
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-[#6355ff]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    </div>
  );
}
