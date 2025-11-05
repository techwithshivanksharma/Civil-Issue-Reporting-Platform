import React from "react";
import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import IssueImagePreview from "./IssueImagePreview";
import { IssueContext } from "../context/IssueContext";
import toast from "react-hot-toast";

const IssueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getIssueById, updateIssueStatus, deleteIssue } =
    useContext(IssueContext);
  const [issue, setIssue] = useState(null);

  useEffect(() => {
    const found = getIssueById(id);
    if (!found) {
      setIssue(null);
      return;
    }
    setIssue(found);
  }, [id, getIssueById]);

  if (!issue) {
    return (
      <div className="max-w-3xl mx-auto ">
        <p className="text-center text-gray-500">Issue Not found</p>
      </div>
    );
  }

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;
    updateIssueStatus(issue.id, newStatus);
    setIssue((prev) => ({ ...prev, status: newStatus }));
    toast.success("Issue status updated ✅");
  };

  const handleDelete = () => {
    if (confirm("Delete Issue? This action cannot be undone.")) {
      deleteIssue(issue.id);
      toast.success("Issue deleted 🗑️");
      navigate("/issues");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white mt-6 rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{issue.title}</h1>
        <div className="text-sm text-gray-500">
          {new Date(issue.createdAt).toLocaleString()}
        </div>
      </div>

      <div className="mt-4">
        <p className="text-gray-700">{issue.description}</p>
      </div>

      <div className="mt-4 flex  gap-4">
        <div>
          <span className="text-sm text-gray-500">Category</span>
          <div className="fonr-medium">{issue.category || "Other"}</div>
        </div>

        <div>
          <label className="block text-sm  text-gray-500">Status</label>
          <select
            value={issue.status}
            onChange={handleStatusChange}
            className="border rounded px-3 py-1 text-sm mt-1"
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/*Unified image preview (works with both imageFile and imageKey */}
      
      {(issue.imageFile || issue.imageKey) && (
        <div className="mt-6">
          <IssueImagePreview file={issue.imageFile} imageKey={issue.imageKey} />
        </div>
      )}

      <div className="mt-6 flex gap-3">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-200 rounded"
        >
          Back
        </button>
        <button
          onClick={handleDelete}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default IssueDetails;
