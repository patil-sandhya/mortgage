import { format } from 'date-fns';

export default function BatchInfoCard({ handleBatchBtn,id, batch_name, batch_type, created_at }) {
//   const { batch_name, batch_type, created_at } = batch;

  const formattedDate = created_at
    ? format(new Date(created_at), 'd MMM yyyy, hh:mm a')
    : 'NA';

    const tagClass =
    batch_type === 'Daily'
      ? 'bg-blue-100 text-blue-700'
      : batch_type === 'Weekly'
      ? 'bg-green-100 text-green-700'
      : 'bg-gray-100 text-gray-600';

      const handleButton = (type)=>{
        let data ={
            id, batch_name, batch_type, created_at 
        }
        handleBatchBtn(data, type)
      }

  return (
     <div className="bg-white border border-gray-200 rounded-xl shadow-inner p-5 w-full max-w-md transition hover:shadow-md">
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-800">{batch_name || 'NA'}</h3>
        {batch_type && (
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${tagClass}`}>
            {batch_type}
          </span>
        )}
      </div>

      {/* Date */}
      <p className="text-sm text-gray-600 mb-5">
        <span className="font-medium text-gray-700">Created:</span> {formattedDate}
      </p>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4">
        <button
          onClick={()=> handleButton('view')}
          className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
        >
          View Details
        </button>
        <button
          onClick={()=> handleButton('add')}
          className="px-4 py-2 text-sm rounded-md border border-indigo-200 text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition"
        >
          Add Records
        </button>
      </div>
    </div>
  );
}
