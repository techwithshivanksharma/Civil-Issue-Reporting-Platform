import React, { useContext } from "react";
import { IssueContext } from "../context/IssueContext";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { Tooltip as RechartsTooltip } from "recharts";
import { useNavigate } from "react-router-dom";
import {
  MapPinIcon,
  ClockIcon,
  BoltIcon,
  TrashIcon,
  QuestionMarkCircleIcon,
  CloudIcon,
} from "@heroicons/react/24/outline"; // HeroIcons for categories

const DashBoard = () => {
  const { issues } = useContext(IssueContext);
  const navigate = useNavigate();

  const categories = ["Road", "Water", "Electricity", "Garbage", "Other"];
   const ICONS = [MapPinIcon, ClockIcon, BoltIcon, TrashIcon, QuestionMarkCircleIcon];

  const categoryData = categories.map((cat) => ({
    name: cat,
    value: issues.filter((issue) => issue.category === cat).length,
  }));

  const totalIssues = issues.length;
  const COLORS = ["#ef4444", "#3b82f6", "#eab308", "#22c55e", "#6b7280"];

  return (
    <div className="max-w-6xl mx-auto p-6 mt-6">
      <h2 className="text-3xl font-bold text-blue-500 mb-8 text-center">
        DashBoard Overview
      </h2>

      {/*Stats Card*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="bg-white shadow-lg rounded-2xl p-6 hover:scale-105 transition">
          <h3 className="text-gray-500 text-sm">Total Issues</h3>
          <p className="text-3xl font-bold text-blue-600">{totalIssues}</p>
        </div>

        {/*Category Cards*/}
        {categoryData.map((cat, index) => {
          const Icon = ICONS[index];

          return (
            <div
              key={cat.name}
              className="bg-gradient-to-r from-white to-gray-50 shadow-2xl rounded-2xl p-6 hover:scale-105 transition duration-300 cursor-pointer"
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
    </div>
  );
};

export default DashBoard;
