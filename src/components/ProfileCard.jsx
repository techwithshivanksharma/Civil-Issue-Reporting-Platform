import React, { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

const ProfileCard = () => {
  const { user, logout } = useContext(AuthContext);
  const cardRef = useRef(null);

  return (
    <div
      ref={cardRef}
      className="
        absolute  right-5 top-16 w-72
        bg-white dark:bg-gray-800 shadow-2xl
        rounded-xl p-5 z-[999] border border-gray-200 dark:border-gray-700
        animate-fadeIn
      "
    >
      <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
        Profile
      </h2>

      <div className="flex flex-col gap-1 mb-4 text-gray-600 dark:text-gray-300">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>

      <button
        className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
        onClick={logout}
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileCard;
