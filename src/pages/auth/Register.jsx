import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import InputField from "../../components/InputField";
import { useAuth } from "../../context/useAuth";
import axios from "axios";

const Register = () => {
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmit = async (data) => {
    if (data.role === "entrepreneur") {
      // POST to /entrepreneurs
      try {
        const res = await axios.post("http://localhost:4001/entrepreneurs", {
          name: data.name,
          startup: "", // or ask in form
          pitch: "",
          bio: "",
          fundingNeed: "",
          description: "",
          avatar: "",
        });
        const entrepreneur = res.data;
        const userData = {
          id: entrepreneur.id,
          name: entrepreneur.name,
          email: data.email,
          role: data.role,
        };
        login(userData);
        navigate("/dashboard/entrepreneur");
      } catch {
        alert("Failed to register entrepreneur");
      }
    } else {
      // For investors, just log in (or you can POST to /investors similarly)
      const userData = {
        name: data.name,
        email: data.email,
        role: data.role,
      };
      login(userData);
      navigate("/dashboard/investor");
    }
  };

  return (
    <div
      className="max-w-md mx-auto mt-20 p-8 shadow-lg rounded-2xl dark:bg-gray-900 transition-all"
      style={{
        background: "linear-gradient(to right, #ec4899, #8b5cf6)",
      }}
    >
      <h2 className="text-3xl font-bold text-center text-pink-200 mb-6">
        Create Your Account
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Name
          </label>
          <InputField
            type="text"
            placeholder="Enter your name"
            {...formRegister("name", { required: "Name is required" })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Email
          </label>
          <InputField
            type="email"
            placeholder="Enter your email"
            {...formRegister("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Password
          </label>
          <InputField
            type="password"
            placeholder="Enter your password"
            {...formRegister("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
            Role
          </label>
          <select
            {...formRegister("role", { required: true })}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-pink-500 focus:outline-none dark:bg-gray-800 dark:text-white"
          >
            <option value="investor">Investor</option>
            <option value="entrepreneur">Entrepreneur</option>
          </select>
        </div>

        <Button
          type="submit"
          className="w-full py-2 px-4 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-all font-semibold"
        >
          Register
        </Button>
      </form>
    </div>
  );
};

export default Register;
