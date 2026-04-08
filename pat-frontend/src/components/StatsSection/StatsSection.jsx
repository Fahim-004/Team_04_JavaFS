const StatsSection = () => {
  return (
    <section className="py-20 bg-white">

      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

        <div>
          <h2 className="text-4xl font-bold text-blue-600">1200+</h2>
          <p className="text-gray-600 mt-2">Students</p>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-blue-600">150+</h2>
          <p className="text-gray-600 mt-2">Companies</p>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-blue-600">300+</h2>
          <p className="text-gray-600 mt-2">Placement Drives</p>
        </div>

        <div>
          <h2 className="text-4xl font-bold text-blue-600">95%</h2>
          <p className="text-gray-600 mt-2">Success Rate</p>
        </div>

      </div>

    </section>
  );
};

export default StatsSection;