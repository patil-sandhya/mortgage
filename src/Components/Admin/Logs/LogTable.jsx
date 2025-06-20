import { format } from 'date-fns';

export default function LogTable({ logs }) {
  const getActionStyle = (action) => {
    switch (action) {
      case 'Create':
        return 'bg-indigo-100 text-indigo-700';
      case 'Edit':
        return 'bg-yellow-100 text-yellow-800';
      case 'Verify':
        return 'bg-green-100 text-green-700';
      case 'Flag':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="overflow-auto border border-gray-200 rounded-xl shadow-sm">
      <table className="min-w-full divide-y divide-gray-200 text-sm">
        <thead className="bg-[#8e84ff] text-white">
          <tr>
            <th className="px-4 py-3 text-left font-medium ">User</th>
            <th className="px-4 py-3 text-left font-medium ">Action</th>
            <th className="px-4 py-3 text-left font-medium ">Borrower</th>
            <th className="px-4 py-3 text-left font-medium ">Property Address</th>
            <th className="px-4 py-3 text-left font-medium ">Field</th>
            <th className="px-4 py-3 text-left font-medium ">Old Value</th>
            <th className="px-4 py-3 text-left font-medium ">New Value</th>
            <th className="px-4 py-3 text-left font-medium ">Timestamp</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {logs?.length === 0 && (
            <tr>
              <td colSpan={8} className="text-center text-gray-400 py-4">
                No logs found.
              </td>
            </tr>
          )}
          {logs?.map((log, index) => (
            <tr key={index} className="hover:bg-[#f8f7ff] transition-colors">
              <td className="px-4 py-3 text-gray-700">{log.user_name || 'NA'}</td>
              <td className="px-4 py-3">
                <span
                  className={`text-xs font-medium px-3 py-1 rounded-full ${getActionStyle(
                    log.action
                  )}`}
                >
                  {log.action || 'NA'}
                </span>
              </td>
              <td className="px-4 py-3 text-gray-700">{log.borrower_name || 'NA'}</td>
              <td className="px-4 py-3 text-gray-700">{log.property_address || 'NA'}</td>
              <td className="px-4 py-3 text-gray-700">{log.field_name || 'NA'}</td>
              <td className="px-4 py-3 text-gray-700">{log.old_value || 'NA'}</td>
              <td className="px-4 py-3 text-gray-700">{log.new_value || 'NA'}</td>
              <td className="px-4 py-3 text-gray-700">
                {log.timestamp
                  ? format(new Date(log.timestamp), 'd MMM yyyy, hh:mm a')
                  : 'NA'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
