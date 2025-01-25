import React from "react";
import Header from "../(Components)/Header";
import Footer from "../(Components)/Footer";

const About = () => {
  return (
    <main>
      <Header />
      <div className="min-h-screen bg-gradient-to-r from-green-200 via-green-50 to-white py-12 px-6">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-green-500 mb-4">About Us</h1>
          <p className="text-gray-700 text-lg leading-relaxed">
            Welcome to{" "}
            <span className="font-bold text-green-500">KickBegin</span>, your
            trusted partner in personal and professional development. At
            KickBegin, we believe that everyone has the potential to succeed,
            and our mission is to bridge the gap between your aspirations and
            achievements.
          </p>

          <h2 className="text-2xl font-bold text-green-500 mt-6 mb-2">
            Our Vision
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our vision is to create a world where learning and mentorship are
            accessible to everyone, regardless of their background or starting
            point. By leveraging cutting-edge technology and expert guidance, we
            aim to empower individuals to take control of their futures.
          </p>

          <h2 className="text-2xl font-bold text-green-500 mt-6 mb-2">
            Why Choose KickBegin?
          </h2>
          <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed">
            <li>
              <strong>Flexible Learning:</strong> Tailored learning paths
              designed to fit your schedule and goals.
            </li>
            <li>
              <strong>Expert Mentors:</strong> Work with industry professionals
              who provide hands-on guidance and insights.
            </li>
            <li>
              <strong>Interactive Community:</strong> Connect with like-minded
              learners and professionals in a collaborative environment.
            </li>
            <li>
              <strong>Comprehensive Resources:</strong> Access curated learning
              materials, practical exercises, and real-world case studies.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-green-500 mt-6 mb-2">
            What We Offer
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            At KickBegin, we provide a wide range of services to cater to
            learners of all levels:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed mt-2">
            <li>One-on-One Mentorship sessions with industry experts.</li>
            <li>Real-world project-based learning opportunities.</li>
            <li>Mock interviews to prepare for your dream job.</li>
            <li>Personalized career roadmaps based on your goals.</li>
          </ul>

          <h2 className="text-2xl font-bold text-green-500 mt-6 mb-2">
            Our Achievements
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Since our inception, we have helped thousands of learners achieve
            their goals:
          </p>
          <ul className="list-disc list-inside text-gray-700 text-lg leading-relaxed mt-2">
            <li>Over 10,000 successful mentorship sessions conducted.</li>
            <li>More than 2,000 learners placed in top companies worldwide.</li>
            <li>
              Partnerships with leading organizations and industry experts.
            </li>
          </ul>

          <h2 className="text-2xl font-bold text-green-500 mt-6 mb-2">
            Join Us
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Be a part of the{" "}
            <span className="font-bold text-green-500">KickBegin</span>{" "}
            community and unlock your true potential. Whether you're a student
            or professional, we are here to support you every step of the way.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed mt-4">
            <strong>Contact us:</strong>{" "}
            <a href="mailto:info@KickBegin.com" className="text-green-500">
              info@KickBegin.com
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default About;
