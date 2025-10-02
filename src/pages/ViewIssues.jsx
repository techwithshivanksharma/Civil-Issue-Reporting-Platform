import React, { useContext } from "react";
import { IssueContext } from "../context/IssueContext";
import IssueImagePreview from "./IssueImagePreview";

const ViewIssues = () => {
  const { issues } = useContext(IssueContext);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-600 text-center">
        Reported Issues
      </h2>

      {issues.length === 0 ? (
        <div className="text-center text-gray-500">
          <p className="text-lg">🚫 No issues reported yet.</p>
          <p className="text-sm">Be the first one to report.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {issues.map((issue) => (
            <div
              key={issue.id}
              className="bg-white shadow-lg rounded-xl p-5 hover:shadow-2xl transition duration-300"
            >
              {/*Title*/}
              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                {issue.title}
              </h3>

              {/*Description*/}
              <p className="text-gray-700 text-sm mb-3">{issue.description}</p>

              {/*Location*/}
              <p className="text-gray-500 text-sm mb-3">
                <span className="italic">
                  {issue.location || "Not Specified"}
                </span>
              </p>

              {/*Category*/}
              <span
                className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-4
                        ${
                          issue.category === "Road"
                            ? "bd-red-100 text-red-600"
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

              {/*Image Preview*/}
              {
                issue.image && (
                  <div className="mt-4">
                      {/*
                        <img
                          src={URL.createObjectURL(issue.image)}
                          alt="Issue"
                          className="w-full h-40 object-cover rounded-lg border" 
                        />
                      */}
                      <IssueImagePreview file={issue.image}/>
                  </div>
                )
              }
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ViewIssues;
