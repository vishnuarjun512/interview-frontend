"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Header from "../(Components)/Header";
import Footer from "../(Components)/Footer";

// Define type for form data
interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    // Clear previous messages
    setResponseMessage("");
    setError("");

    try {
      const response = await axios.post(
        "https://your-backend-api.com/contact",
        formData
      );
      setResponseMessage(
        response.data.message ||
          "Thank you for reaching out! We will get back to you soon."
      );
      setFormData({ name: "", email: "", message: "" }); // Reset form fields
    } catch (err: any) {
      setError(
        err.response?.data?.error ||
          "Something went wrong. Please try again later."
      );
    }
  };

  return (
    <>
      <Header />
      <section className="bg-gradient-to-r from-green-200 via-green-50 to-white min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md px-6 py-12 bg-white rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h2 className="text-3xl font-semibold text-left text-gray-800 mb-6">
              Contact Us
            </h2>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
                placeholder="Your Name"
                required
              />
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
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
                placeholder="Your Email"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-green-400 focus:outline-none"
                placeholder="Your Message"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:ring focus:ring-green-400"
            >
              Send Message
            </button>

            {responseMessage && (
              <p className="mt-4 text-green-600 text-center">
                {responseMessage}
              </p>
            )}
            {error && <p className="mt-4 text-red-600 text-center">{error}</p>}
          </form>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ContactPage;
