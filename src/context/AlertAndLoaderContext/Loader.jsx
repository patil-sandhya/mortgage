export const LoaderSpinner = () => (
  <div className="h-28 w-28 animate-spin rounded-full border-b-8 border-t-8 border-primary "></div>
);

const Loader = () => {
  return (
    <>
      <div className="fixed inset-0 z-20 flex items-center justify-center border-2 bg-gray-100 pt-14">
        <LoaderSpinner />
      </div>
    </>
  );
};

export default Loader;
