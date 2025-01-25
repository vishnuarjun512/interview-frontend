"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

// Dynamically import components
const Header = dynamic(() => import("../(Components)/Header"), { ssr: false });
const Footer = dynamic(() => import("../(Components)/Footer"), { ssr: false });

const SignupPage: React.FC = () => {
  const [formData, setFormData] = useState({
    mobile: "",
    email: "",
    username: "",
    otp: "",
  });
  const [step, setStep] = useState<"details" | "otp">("details");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateDetails = () => {
    const validationErrors: Record<string, string> = {};
    if (!formData.mobile.trim() || !/^\d{10}$/.test(formData.mobile))
      validationErrors.mobile = "Valid 10-digit mobile number is required.";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      validationErrors.email = "Valid email is required.";
    if (!formData.username.trim())
      validationErrors.username = "Username is required.";
    return validationErrors;
  };

  const handleDetailsSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    const validationErrors = validateDetails();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post("/api/send-otp", {
        mobile: formData.mobile,
      });
      setSuccessMessage(response.data.message || "OTP sent successfully!");
      setStep("otp");
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "An error occurred while sending OTP. Please try again.";
      setErrors((prev) => ({ ...prev, server: message }));
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");

    if (!formData.otp.trim() || formData.otp.length !== 6) {
      setErrors((prev) => ({ ...prev, otp: "Valid 6-digit OTP is required." }));
      return;
    }

    try {
      const response = await axios.post("/api/signup", formData);
      setSuccessMessage("Signup successful! You can now log in.");
      console.log(response.data);
    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        "An error occurred during signup. Please try again.";
      setErrors((prev) => ({ ...prev, server: message }));
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[75vh] bg-gray-100">
        <div className="w-full max-w-md py-20 px-6 bg-white rounded-lg shadow">
          <h1 className="text-2xl font-bold text-center mb-6 text-gray-600">
            Signup
          </h1>

          {step === "details" ? (
            <form onSubmit={handleDetailsSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="mobile"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mobile
                </label>
                <input
                  type="text"
                  name="mobile"
                  id="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.mobile && (
                  <p className="text-red-500 text-sm">{errors.mobile}</p>
                )}
              </div>

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
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.username && (
                  <p className="text-red-500 text-sm">{errors.username}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Send OTP
              </button>

              {successMessage && (
                <p className="mt-4 text-center text-green-600">
                  {successMessage}
                </p>
              )}
              {errors.server && (
                <p className="mt-4 text-center text-red-500">{errors.server}</p>
              )}
            </form>
          ) : (
            <form onSubmit={handleOtpSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="otp"
                  className="block text-sm font-medium text-gray-700"
                >
                  OTP
                </label>
                <input
                  type="text"
                  name="otp"
                  id="otp"
                  value={formData.otp}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-500"
                />
                {errors.otp && (
                  <p className="text-red-500 text-sm">{errors.otp}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Verify & Signup
              </button>

              {successMessage && (
                <p className="mt-4 text-center text-green-600">
                  {successMessage}
                </p>
              )}
              {errors.server && (
                <p className="mt-4 text-center text-red-500">{errors.server}</p>
              )}
            </form>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SignupPage;
