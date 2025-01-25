"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Dynamically import components
const Header = dynamic(() => import("../(Components)/Header"), { ssr: false });
const Footer = dynamic(() => import("../(Components)/Footer"), { ssr: false });

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const validationErrors: Record<string, string> = {};
    if (!formData.email.trim()) validationErrors.email = "Email is required";
    if (!formData.password.trim())
      validationErrors.password = "Password is required";
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

    const baseUrl = "https://8f5a-60-243-253-114.ngrok-free.app";
    const finalUrl = `${baseUrl}/api/auth/login`;

    try {
      const response = await axios.post(finalUrl, formData);

      setSuccessMessage("Login successful!");
      console.log(response.data);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.message ||
          "An unexpected error occurred. Please try again.";
        setErrors((prev) => ({ ...prev, server: message }));
      } else {
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
          <h1 className="text-2xl font-bold text-center mb-6 text-black">
            Login
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black"
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
                className="block text-sm font-medium text-black"
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

            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Login
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

          <div className="bg-black h-[1px] mt-2 w-full" />

          <div className="text-black flex flex-col justify-center items-center">
            <div className="text-center text-sm">
              or login with other options
            </div>
            <div className="flex justify-center items-center mt-2 gap-2 w-full">
              {[
                {
                  image: "/image.png",
                  name: "Google",
                  url: "api/auth/oauth/google/authorization",
                },
                { image: "/image.png", name: "Github" },
              ].map((item, i) => {
                return (
                  <div
                    key={i}
                    className="flex justify-center items-center bg-gray-400 gap-2 w-1/2 py-2 rounded-lg"
                  >
                    <div className="relative h-[25px] w-[35px] rounded-lg">
                      <Image
                        src={item.image}
                        fill
                        alt={`${item.name} Logo`}
                        className="rounded-lg"
                      />
                    </div>
                    <button className="font-medium">{item.name}</button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-4 text-center text-md text-gray-800 flex items-center justify-center gap-1">
            <p>Don't have an account?</p>
            <button
              onClick={() => router.push("/signup")}
              className="text-green-500 hover:text-green-600 hover:underline"
            >
              Register now
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;
