import React, { useContext, useEffect, useState } from "react";
import { IssueContext } from "../context/IssueContext";
import IssueImagePreview from "./IssueImagePreview";
import { Link, useLocation } from "react-router-dom";

const ViewIssues = () => {
  const { issues } = useContext(IssueContext);
  const location = useLocation();

  //Filtered states

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Auto-set category if coming from Dashboard (like /issues?category=Water)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("category");
    if (cat) setSelectedCategory(cat);
  }, [location]);

  // Apply filters and search

  const filteredIssues = issues.filter((issue) => {
    const matchCategory =
      selectedCategory === "All" || issue.category === selectedCategory;

    const matchStatus =
      selectedStatus === "All" || issue.status === selectedStatus;

    const matchSearch =
      issue.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchTerm.toLowerCase());

    return matchCategory && matchStatus && matchSearch;
  });

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-600 text-center">
        Reported Issues
      </h2>

      {/* Filter Controls */}
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-3 py-2 rounded-lg shadow-sm"
        >
          <option value="All">All Categories</option>
          <option value="Road">Road</option>
          <option value="Water">Water</option>
          <option value="Electricity">Electricity</option>
          <option value="Garbage">Garbage</option>
          <option value="Other">Other</option>
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border px-3 py-2 rounded-lg shadow-sm"
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Resolved">Resolved</option>
        </select>

        <input
          type="text"
          placeholder="Search by title or description...."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-3 py-2 rounded-lg shadow-sm w-60"
        />
      </div>

      {/* No issues found */}
      {filteredIssues.length === 0 ? (
        <div className="text-center text-gray-500 mt-10">
          <p className="text-lg">No matching issues found.</p>
        </div>
      ) : (
        // UPDATED: Mapping filteredIssues (not all issues)
        <div className="grid md:grid-cols-2 gap-6">
          {filteredIssues.map((issue) => (
            <div
              key={issue.id}
              className="bg-white shadow-lg rounded-xl p-5 hover:shadow-2xl transition duration-300"
            >
              {/* Clickable Title */}

              <Link to={`/issue/${issue.id}`}>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 hover:text-blue-600">
                  {issue.title}
                </h3>
              </Link>

              {/* Description */}

              <p className="text-gray-700 text-sm mb-3">{issue.description}</p>

              {/* Location */}
              <p className="text-gray-500 text-sm mb-3">
                <span className="text-xs text-gray-500">📍</span>
                <span className="italic">
                  {issue.location || "Not Specified"}
                </span>
              </p>

              {/* Category Badge */}
              <span
                className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-4
                    ${
                      issue.category === "Road"
                        ? "bg-red-100 text-red-600"
                        : issue.category === "Water"
                        ? "bg-blue-100 text-blue-600"
                        : issue.category === "Electricity"
                        ? "bg-yellow-100 text-yellow-600"
                        : issue.category === "Garbage"
                        ? "bg-green-100 text-green-600"
                        : "bg-gray-100 text-gray-600"
                    }
                  `}
              >
                {issue.category || "Other"}
              </span>

              {/* Reported Date */}
              <p className="text-gray-400 text-sm mb-3">
                🕒 Reported on:{" "}
                {issue.createdAt
                  ? new Date(issue.createdAt).toLocaleString()
                  : "Unknown"}
              </p>

              {/* Status Badge */}
              <span
                className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-4 
                    ${
                      issue.status === "Resolved"
                        ? "bg-green-100 text-green-700"
                        : issue.status === "In Progress"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-200 text-gray-700"
                    }
                  `}
              >
                {issue.status || "Pending"}
              </span>

              {/* Image Preview */}
              {(issue.imageFile || issue.imageKey) && (
                <div className="mt-4">
                  <IssueImagePreview
                    file={issue.imageFile}
                    imageKey={issue.imageKey}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewIssues;
