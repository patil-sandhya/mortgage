const Alert = ({ alertType, message }) => {
  const alertClasses = {
    success: 'bg-[#98FB98] border-[#98FB98] text-[#00693E]',
    warning: 'bg-yellow-200 border-yellow-200 text-yellow-700',
    error: 'bg-red-100 border-red-400 text-red-700'
  };

  return (
    <div
      className={`max-w-11/12 mx-auto my-2 mr-1 w-full rounded-md px-2 py-4 text-sm shadow-md sm:w-[450px] ${alertClasses[alertType]}`}
    >
      {message}
    </div>
  );
};

export default Alert;
