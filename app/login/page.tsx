"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

// Dynamically import components
const Header = dynamic(() => import("../(Components)/Header"), { ssr: false });
const Footer = dynamic(() => import("../(Components)/Footer"), { ssr: false });

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const validationErrors: Record<string, string> = {};
    if (!formData.email.trim()) validationErrors.email = "Email is required";
    if (!formData.password.trim())
      validationErrors.password = "Password is required";
    if (!isLogin && formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }
    return validationErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const url = isLogin ? "/api/login" : "/api/register";
    try {
      const response = await axios.post(url, formData);
      setSuccessMessage(
        isLogin ? "Login successful!" : "Registration successful!"
      );
      console.log(response.data);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        // Set error from the response if available
        const message =
          error.response?.data?.message ||
          "An unexpected error occurred. Please try again.";
        setErrors((prev) => ({ ...prev, server: message }));
      } else {
        // Handle non-Axios errors
        setErrors((prev) => ({
          ...prev,
          server: "A network error occurred. Please try again.",
        }));
      }
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[75vh] bg-gray-100">
        <div className="w-full max-w-md py-20 px-6 bg-white rounded-lg shadow">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-600">
            {isLogin ? "Login" : "Register"}
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>

            {!isLogin && (
              <div className="mb-4">
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
            >
              {isLogin ? "Login" : "Register"}
            </button>

            {successMessage && (
              <p className="mt-4 text-center text-green-600">
                {successMessage}
              </p>
            )}
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsLogin((prev) => !prev)}
              className="text-green-500 underline"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AuthPage;
