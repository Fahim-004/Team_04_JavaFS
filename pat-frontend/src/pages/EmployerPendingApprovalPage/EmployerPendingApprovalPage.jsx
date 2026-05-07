const EmployerPendingApprovalPage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-md border border-gray-200 p-8 text-center">
        <h1 className="text-2xl font-bold text-amber-700 mb-3">
          Approval Pending
        </h1>
        <p className="text-gray-700 text-sm mb-2">
          Your employer account is awaiting approval from the college administration.
        </p>
        <p className="text-gray-600 text-sm">
          You will gain access to employer features once your account is approved.
        </p>
      </div>
    </div>
  );
};

export default EmployerPendingApprovalPage;
