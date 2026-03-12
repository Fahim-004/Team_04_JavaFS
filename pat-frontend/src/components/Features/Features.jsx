const Features = () => {
  return (
    <section className="py-20 bg-white">

      <h2 className="text-3xl font-bold text-center mb-12">
        Platform Features
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-10">

        <div className="p-6 border rounded-lg shadow hover:shadow-lg">
          <h3 className="text-xl font-semibold mb-3">
            Student Profiles
          </h3>
          <p>
            Students can manage personal information and academic details.
          </p>
        </div>

        <div className="p-6 border rounded-lg shadow hover:shadow-lg">
          <h3 className="text-xl font-semibold mb-3">
            Placement Drives
          </h3>
          <p>
            View all upcoming company placement drives in one place.
          </p>
        </div>

        <div className="p-6 border rounded-lg shadow hover:shadow-lg">
          <h3 className="text-xl font-semibold mb-3">
            Resume Upload
          </h3>
          <p>
            Upload and manage resumes for company applications.
          </p>
        </div>

        <div className="p-6 border rounded-lg shadow hover:shadow-lg">
          <h3 className="text-xl font-semibold mb-3">
            Application Tracking
          </h3>
          <p>
            Track application status for all companies applied.
          </p>
        </div>

      </div>

    </section>
  );
};

export default Features;