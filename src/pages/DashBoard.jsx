import React, { useContext, useEffect, useState } from "react";
import { IssueContext } from "../context/IssueContext";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { useNavigate } from "react-router-dom";
import {
  MapPinIcon,
  ClockIcon,
  BoltIcon,
  TrashIcon,
  QuestionMarkCircleIcon,
  CloudIcon,
} from "@heroicons/react/24/outline"; // HeroIcons for categories
import localforage from "localforage";
import IssueImagePreview from "./IssueImagePreview";

const DashBoard = () => {
  const { issues } = useContext(IssueContext);
  const navigate = useNavigate();

  const categories = ["Road", "Water", "Electricity", "Garbage", "Other"];
  const ICONS = [
    MapPinIcon,
    ClockIcon,
    BoltIcon,
    TrashIcon,
    QuestionMarkCircleIcon,
  ];

  const categoryData = categories.map((cat) => ({
    name: cat,
    value: issues.filter((issue) => issue.category === cat).length,
  }));

  //Status Summary
  const statusData = [
    {
      name: "Pending",
      value: issues.filter((i) => i.status === "Pending").length,
    },
    {
      name: "In Progress",
      value: issues.filter((i) => i.status === "In Progress").length,
    },
    { name: "Resolved", value: issues.filter((i) => i.status === "Resolved") },
  ];

  const totalIssues = issues.length;
  const COLORS = ["#ef4444", "#3b82f6", "#eab308", "#22c55e", "#6b7280"];

  const [recentIssues, setRecentIssues] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const latest = issues.slice(-5).reverse(); //last five issues

      // Promise.all() → Kyunki hum har issue par async kaam kar rahe hain,
      // Promise.all() ensure karta hai ki sab ke images parallel me load ho jayein
      // aur jab sab complete ho jayein tabhi withImages milta hai.
      
      const withImages = await Promise.all(
        latest.map(async (issue) => {
          if (issue.imageKey) {
            try {
              const file = await localforage.getItem(issue.imageKey);
              return { ...issue, imageFile: file };
            } catch (err) {
              console.error("Error fetching image from IndexedDB:", err);
            }
          }
          return issue;
        })
      );
      setRecentIssues(withImages);
    };
    if (issues.length > 0) fetchImages();
  }, [issues]);

  return (
    <div className="max-w-6xl mx-auto p-6 mt-6">
      <h2 className="text-3xl font-bold text-blue-500 mb-8 text-center">
        DashBoard Overview
      </h2>

      {/*Updated Status Summary Cards */}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-blue-100 text-blue-700 p-4 rounded-xl shadow text-center">
          <h3 className="text-sm font-medium">Total Issues</h3>
          <p className="text-3xl font-bold">{totalIssues}</p>
        </div>

        <div className="bg-gray-100 text-gray-700 p-4 rounded-xl shadow text-center">
          <h3 className="text-sm font-medium">Pending</h3>
          <p className="text-3xl font-bold">
            {issues.filter((i) => i.status === "Pending").length}
          </p>
        </div>

        <div className="bg-yellow-100 text-yellow-700 p-4 rounded-xl shadow text-center">
          <h3 className="text-sm font-medium">In Progress</h3>
          <p className="text-3xl font-bold">
            {issues.filter((i) => i.status === "In Progress").length}
          </p>
        </div>

        <div className="bg-green-100 text-green-700 p-4 rounded-xl shadow text-center">
          <h3 className="text-sm font-medium">Resolved</h3>
          <p className="text-3xl font-bold">
            {issues.filter((i) => i.status === "Resolved").length}
          </p>
        </div>
      </div>

      {/*Category Card*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {/*Category Cards*/}
        {categoryData.map((cat, index) => {
          const Icon = ICONS[index];

          return (
            <div
              key={cat.name}
              className="bg-gradient-to-r from-white to-gray-50 shadow-2xl rounded-2xl p-6 hover:scale-105 transition duration-300 cursor-pointer"
              onClick={() => navigate(`/issues?category=${cat.name}`)}
            >
              <Icon className="h-6 w-6 text-gray-400 mb-2" />
              <h3 className="text-gray-500 text-sm">{cat.name}</h3>
              <p
                className="text-2xl font-bold"
                style={{ color: COLORS[index] }}
              >
                {cat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/*Pie Chart*/}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-6 text-center">
          Issues By Category
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              animationDuration={800}
              animationEasing="ease-out"
              label
              onClick={(data) => {
                //Navigating to view Issues page
                navigate(`/issues?category=${data.name}`);
              }}
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <RechartsTooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* 🔥 NEW: Bar Chart for Issue Status */}

      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-6 text-center">
          Issues By Status
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={statusData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <RechartsTooltip />
            <Legend />
            <Bar
              dataKey="value"
              fill="#60a5fa"
              barSize={60}
              radius={[10, 10, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 🆕 NEW SECTION: Recent Issues Preview */}
      <div className="bg-white shadow-lg rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-6 text-center">
          Recent Issues
        </h3>
        {recentIssues.length === 0 ? (
          <p className="text-center text-gray-500">
            No recent issues reported.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentIssues.map((issue) => (
              <div
                key={issue.id}
                className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
                onClick={() => navigate(`/issue/${issue.id}`)}
              >
                {issue.imageFile ? (
                  <IssueImagePreview file={issue.imageFile} />
                ) : (
                  <div className="h-40 bg-gray-100 flex items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800">{issue.title}</h4>
                  <p className="text-sm text-gray-500 truncate">
                    {issue.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashBoard;
