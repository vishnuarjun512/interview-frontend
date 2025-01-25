"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Footer: React.FC = () => {
  return (
    <footer className=" text-white text-center bg-gray-800 py-10 ">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-5  items-center justify-between py-6 px-3">
          <Subscribe />
          <RefSection />
        </div>
        <div className="bg-white h-[1px] m-2" />
        <p className="text-left px-3">© 2024 KickStart, All rights reserved.</p>
      </div>
    </footer>
  );
};

const Subscribe = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const router = useRouter();

  const handleSubscribe = async (): Promise<void> => {
    if (!email) {
      setMessage("Please enter a valid email address.");
      return;
    }

    try {
      // Simulating an API call to send email
      const response = await new Promise<{ success: boolean }>(
        (resolve, reject) => {
          setTimeout(() => {
            if (email.includes("@")) {
              resolve({ success: true });
            } else {
              reject(new Error("Invalid email format"));
            }
          }, 1000); // Simulate 1-second delay
        }
      );

      if (response.success) {
        setMessage("Thank you! We will connect with you in a while.");
        setEmail(""); // Clear email input
      }
    } catch (error) {
      setMessage("There was an error. Please try again later.");
    }
  };
  return (
    <div className="flex flex-col items-start">
      {/* Logo */}
      <div
        className="flex items-center justify-center cursor-pointer"
        onClick={() => router.push("/")}
      >
        <img src="/logo.jpeg" alt="Logo" className="h-6 bg-green-300" />
        <h1 className="text-2xl font-bold ml-2 text-green-500">KickBegin</h1>
      </div>

      {/* Subscribe Section */}
      <h1 className="font-bold text-white mt-4">Subscribe</h1>
      <p className="mb-4">Subscribe for more interviews, tips, and updates.</p>
      <div className="flex justify-center px-3 py-[6px] bg-white rounded-lg">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-2 rounded-l-lg text-black w-64 outline-none"
        />
        <button
          onClick={handleSubscribe}
          className="m-1 py-2 px-3 bg-green-500 text-gray-700 hover:text-gray-100 font-semibold rounded-lg duration-200 transition-all ease-in-out"
        >
          Subscribe
        </button>
      </div>
    </div>
  );
};

const RefSection = () => {
  return (
    <div className="grid grid-cols-2 justify-start md:gap-10 md:pr-10">
      {[
        {
          heading: "KickStart",
          subheadings: [
            { name: "Teaching" },
            { name: "Teaching tools" },
            { name: "Interview with us" },
            { name: "Contact us" },
          ],
        },
        {
          heading: "Careers",
          subheadings: [
            { name: "SDE1" },
            { name: "Affiliate" },
            { name: "Support" },
          ],
        },
      ].map((item, i) => (
        <div key={i}>
          <h1 className="text-lg font-bold mb-2">{item.heading}</h1>
          {item.subheadings.map((subheading, si) => (
            <div
              key={si}
              className="text-gray-500 hover:text-gray-400 transition-all duration-100 ease-in-out cursor-pointer"
            >
              {subheading.name}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Footer;
