const EmployerRejectedPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-md border border-gray-200 p-8 text-center">
        <h1 className="text-2xl font-bold text-red-700 mb-3">
          Access Restricted
        </h1>
        <p className="text-gray-700 text-sm mb-2">
          Your account is no longer active on the platform.
        </p>
        <p className="text-gray-600 text-sm">
          You are no longer allowed to post or manage jobs.
        </p>
        <p className="text-gray-600 text-sm mt-2">
          Please contact the college administration for further assistance.
        </p>
      </div>
    </div>
  );
};

export default EmployerRejectedPage;
