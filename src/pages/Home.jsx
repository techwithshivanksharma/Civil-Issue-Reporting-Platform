import React from "react";
import { FaMapMarkerAlt, FaEdit, FaBell, FaChartPie } from "react-icons/fa";

const Home = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-blue-50 to-white text-gray-800">

      {/* HERO SECTION */}
      <section className="w-full py-20 px-6 flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto">
        
        {/* Left Text */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight text-gray-900">
            Civic Issue Reporting <span className="text-blue-600">Platform</span>
          </h1>

          <p className="text-lg text-gray-600">
            A smart and responsive platform enabling citizens to seamlessly report civic issues,
            track complaint status, and stay informed with real-time updates—promoting cleaner,
            safer, and smarter communities.
          </p>

          <div className="flex gap-4 mt-6">
            <a
              href="/report"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition shadow-lg"
            >
              Report an Issue
            </a>

            <a
              href="/login"
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition shadow-lg"
            >
              Login
            </a>
          </div>
        </div>

        {/* Right Side Illustration */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
            alt="Civic Issue Illustration"
            className="w-80 drop-shadow-xl"
          />
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-16 bg-white">
        <h2 className="text-center text-3xl font-bold text-gray-900 mb-10">
          Key Features
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">

          {/* Feature 1 */}
          <div className="p-8 shadow-xl rounded-2xl hover:shadow-2xl transition bg-blue-50">
            <FaEdit className="text-blue-600 text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Issue Reporting</h3>
            <p className="text-gray-600">
              Report issues instantly with location, photos, and category details.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 shadow-xl rounded-2xl hover:shadow-2xl transition bg-green-50">
            <FaMapMarkerAlt className="text-green-600 text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Location-Based Tracking</h3>
            <p className="text-gray-600">
              Automatically capture and track issues based on your GPS location.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 shadow-xl rounded-2xl hover:shadow-2xl transition bg-yellow-50">
            <FaBell className="text-yellow-500 text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Real-Time Alerts</h3>
            <p className="text-gray-600">
              Receive updates when your reported issue is processed or resolved.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="p-8 shadow-xl rounded-2xl hover:shadow-2xl transition bg-purple-50">
            <FaChartPie className="text-purple-600 text-4xl mb-4" />
            <h3 className="text-xl font-semibold mb-2">Smart Dashboard</h3>
            <p className="text-gray-600">
              Visual analytics for both users and admins to monitor issue trends.
            </p>
          </div>

        </div>
      </section>

      {/* CTA SECTION */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-5xl mx-auto text-center space-y-6 px-6">
          <h2 className="text-3xl md:text-4xl font-bold">
            Raise Your Voice. Report Issues. Build a Better Community.
          </h2>
          <p className="text-lg text-blue-100">
            Join thousands of citizens who already use CIRP to bring change in their surroundings.
          </p>

          <a
            href="/signup"
            className="px-8 py-4 bg-white text-blue-700 rounded-xl font-semibold hover:bg-blue-100 transition shadow-xl"
          >
            Get Started
          </a>
        </div>
      </section>

    </div>
  );
};

export default Home;

