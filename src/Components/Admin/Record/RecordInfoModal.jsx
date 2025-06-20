'use client'
import { format } from "date-fns";

const Field = ({ label, value }) => (
  <div>
    <label className="block text-sm font-semibold text-gray-600 mb-1">{label}</label>
    <div className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-800 text-sm">
      {value || "NA"}
    </div>
  </div>
);

export default function RecordInfoModal({record, closeFunc}) {

//   const record = {
//     apn: "KLOP",
//     assigned_to: "John-User",
//     batch_id: null,
//     borrower_name: "Michel",
//     created_at: "2025-06-17T08:49:52.252Z",
//     down_payment: "230000",
//     entered_by: "Keya-User",
//     entered_by_date: "2025-06-17T08:49:52.206Z",
//     id: "30a5d259-8dcc-4f28-b229-84ca81ae91d3",
//     loan_amount: "70000",
//     loan_officer_name: "Richard",
//     loan_term: "1",
//     lock_timestamp: null,
//     locked_by: null,
//     nmls_id: "23333",
//     property_address: "123 XYA Street",
//     reviewed_by: null,
//     reviewed_by_date: null,
//     sales_price: "300000",
//     status: "Pending",
//     transaction_date: "2025-06-09",
//     updated_at: "2025-06-18T07:32:39.026Z"
//   };

  const formatDate = (dateStr) => {
    if (!dateStr) return "NA";
    try {
      return format(new Date(dateStr), "d MMM yyyy");
    } catch {
      return "NA";
    }
  };

  const formatTime = (dateStr) => {
    if (!dateStr) return "NA";
    try {
      return format(new Date(dateStr), "hh:mm a");
    } catch {
      return "NA";
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

 

  return (
    <>
          {/* Background Blur */}
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40" onClick={closeFunc} />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="bg-white max-w-2xl w-full rounded-lg shadow-lg p-6 custom-scrollbar overflow-y-auto max-h-[90vh]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Record Details</h2>
                <button onClick={closeFunc} className="text-red-500 text-2xl font-bold">
                    ✕
                </button>
              </div>
                {/* <div>
                  <img width={128} height={128} src={'/home.webp'} alt="" className='h-32 min-h-32 max-w-32 w-32 '/>
                </div> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
  {/* Full-width fields */}
  <Field label="Borrower Name" value={record.borrower_name} />
  <Field label="Property Address" value={record.property_address} />
  <Field label="Loan Officer Name" value={record.loan_officer_name} />
  <Field label="Entered By" value={record.entered_by} />
  <Field label="Reviewed By" value={record.reviewed_by} />
  <Field label="Locked By" value={record.locked_by} />

  {/* Compact group: Loan numbers */}
  <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
    <Field label="Loan Amount" value={record.loan_amount} />
    <Field label="Sales Price" value={record.sales_price} />
    <Field label="Down Payment" value={record.down_payment} />
    <Field label="Loan Term" value={record.loan_term} />
  </div>

  {/* Compact group: Dates */}
  <div className="col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
    <Field label="Transaction Date" value={formatDate(record.transaction_date)} />
    <Field label="Entered Date" value={formatDate(record.entered_by_date)} />
    <Field label="Reviewed Date" value={formatDate(record.reviewed_by_date)} />
  </div>

  <div className="col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
    <Field label="Created At" value={`${formatDateTime(record.created_at)}`} />
    <Field label="Updated At" value={`${formatDateTime(record.updated_at)} `} />
    <Field label="Lock Timestamp" value={`${formatDateTime(record.lock_timestamp)}`} />
  </div>

  {/* Compact group: Status and APN */}
  <div className="col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
    <Field label="Status" value={record.status} />
    <Field label="APN" value={record.apn} />
  </div>
</div>

              </div>
          </div>
        </>
  );
}
