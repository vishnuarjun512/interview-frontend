import React from "react";
import Image from "next/image";

const Mentorship: React.FC = () => {
  return (
    <section className="py-[100px] bg-gray-50  w-full">
      <div className="flex flex-col md:flex-row items-center justify-center space-x-6 max-w-5xl mx-auto">
        {/* Mentor Section */}
        <div className="flex justify-center items-center  p-10 rounded-lg shadow-xl w-full mx-auto">
          {/* Mentor Illustration */}
          <div className="w-2/5 bg-gray-300 py-[100px] rounded-xl">
            <div className="bg-gray-200 rounded-full w-32 h-32 mx-auto flex justify-center items-center">
              {/* Mentor Illustration */}
              <Image
                src={"/helping-partner.avif"}
                alt="Mentor"
                width={96}
                height={96}
                className="rounded-full"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="w-3/5 flex flex-col px-10">
            <h2 className="text-2xl font-bold text-gray-800">
              One-on-One Interview Mentorship
            </h2>
            <ul className="mt-4 space-y-3 text-gray-600">
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Flexible Learning
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Expert Instructors
              </li>
              <li className="flex items-center">
                <svg
                  className="w-5 h-5 text-green-500 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Interactive Community
              </li>
            </ul>
            <button className="mt-6 px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600">
              Join Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mentorship;
