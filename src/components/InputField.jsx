import React from "react";

const InputField = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  name,
  className = "",
  ...rest
}) => (
  <div className={`mb-4 ${className}`}>
    {label && (
      <label className="block mb-1 font-medium dark:text-gray-200">
        {label}
      </label>
    )}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 text-base bg-white dark:bg-gray-900 dark:text-gray-100"
      {...rest}
    />
  </div>
);

export default InputField;
