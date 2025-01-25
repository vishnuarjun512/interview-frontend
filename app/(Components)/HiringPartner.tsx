"use client";
import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Company {
  name: string;
  style: string;
}

const HiringPartners: React.FC = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Number of visible slides
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3, // Adjust for medium screens
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2, // Adjust for small screens
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1, // Adjust for extra small screens
        },
      },
    ],
  };

  const companies: Company[] = [
    { name: "Google", style: "font-bold text-blue-500" },
    {
      name: "Netflix",
      style: "font-extrabold tracking-wide uppercase text-red-600",
    },
    { name: "Amazon", style: "font-semibold italic text-gray-500" },
    { name: "Facebook", style: "font-bold text-blue-600" },
    { name: "Microsoft", style: "font-bold text-gray-500" },
    { name: "Airbnb", style: "font-bold text-pink-500" },
    { name: "Apple", style: "font-extrabold text-gray-700" },
    { name: "Tesla", style: "font-bold text-red-500" },
  ];

  return (
    <section className="py-[140px] text-center bg-gray-50 w-[100vw]">
      <h3 className="text-2xl font-semibold mb-6 text-gray-500">
        Hiring Partners - 500+ Companies Worldwide
      </h3>
      <div className="max-w-4xl mx-auto">
        <Slider {...settings}>
          {companies.map((company, index) => (
            <div key={index} className="flex justify-center items-center py-4">
              <span className={`text-lg md:text-2xl ${company.style || ""}`}>
                {company.name}
              </span>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default HiringPartners;
