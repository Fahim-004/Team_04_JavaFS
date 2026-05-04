const HowItWorks = () => {
  return (
    <section className="py-24 bg-slate-50">

      <h2 className="text-4xl font-bold text-center mb-16 text-slate-800">
        How It Works
      </h2>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 px-8">

        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <div className="text-4xl mb-4">1️⃣</div>
          <h3 className="text-xl font-semibold mb-3">Create Profile</h3>
          <p className="text-gray-600">
            Students register and complete their academic and personal profile.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <div className="text-4xl mb-4">2️⃣</div>
          <h3 className="text-xl font-semibold mb-3">Apply for Jobs</h3>
          <p className="text-gray-600">
            Browse placement drives and apply for companies easily.
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <div className="text-4xl mb-4">3️⃣</div>
          <h3 className="text-xl font-semibold mb-3">Track Progress</h3>
          <p className="text-gray-600">
            Track application status and recruitment rounds in real time.
          </p>
        </div>

      </div>

    </section>
  );
};

export default HowItWorks;