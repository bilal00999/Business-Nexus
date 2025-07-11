import React from "react";

const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg border border-gray-100 dark:border-gray-700 p-4 mb-4 transition-shadow duration-200 ${className}`}
  >
    {children}
  </div>
);

export default Card;
