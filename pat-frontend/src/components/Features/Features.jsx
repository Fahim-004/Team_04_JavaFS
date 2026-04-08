import {useNavigate} from "react-router-dom";

const Features = () => {
  const navigate = useNavigate();
  return (
    <section className="py-24 bg-slate-50">

      <h2 className="text-4xl font-bold text-center mb-16 text-slate-800">
        Platform Features
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-10 max-w-7xl mx-auto">

        {/* Card 1 */}
        <div 
        onClick={()=>navigate("/login")}
        className="p-7 bg-white rounded-xl shadow-md hover:scale-105 transition duration-300 border border-gray-100 cursor-pointer">
          <h3 className="text-xl font-semibold mb-3 text-slate-800">
            Student Profiles
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Students can manage personal information and academic details
            in a structured profile to stay placement ready.
          </p>
        </div>

        {/* Card 2 */}
        <div 
        onClick={()=>navigate("/login")}
        className="p-7 bg-white rounded-xl shadow-md hover:scale-105 transition duration-300 border border-gray-100 cursor-pointer">
          <h3 className="text-xl font-semibold mb-3 text-slate-800">
            Placement Drives
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            View and track all upcoming placement drives and company
            opportunities in one centralized platform.
          </p>
        </div>

        {/* Card 3 */}
        <div 
        onClick={()=>navigate("/login")}
        className="p-7 bg-white rounded-xl shadow-md hover:scale-105 transition duration-300 border border-gray-100 cursor-pointer">
          <h3 className="text-xl font-semibold mb-3 text-slate-800">
            Resume Upload
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Upload and manage multiple resumes to apply for different
            companies and job roles easily.
          </p>
        </div>

        {/* Card 4 */}
        <div
        onClick={()=>navigate("/login")}
        className="p-7 bg-white rounded-xl shadow-md hover:scale-105 transition duration-300 border border-gray-100 cursor-pointer">
          <h3 className="text-xl font-semibold mb-3 text-slate-800">
            Application Tracking
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Track your application status and recruitment progress for
            all the companies you have applied to.
          </p>
        </div>

      </div>

    </section>
  );
};

export default Features;