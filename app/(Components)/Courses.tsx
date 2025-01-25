import React from "react";

const courses = [
  { name: "Web Development", link: "/courses/web" },
  { name: "Data Science", link: "/courses/data-science" },
  { name: "App Development", link: "/courses/app-development" },
];

const Courses = () => {
  return (
    <section className="py-8 min-h-[60vh] bg-gray-50 flex gap-8 justify-center flex-col items-center text-black">
      <h3 className="text-center text-3xl font-semibold mb-6">
        Certified Courses for{" "}
        <span className="text-green-500">Professionals</span>
      </h3>
      <div className="grid md:grid-cols-3 gap-x-8">
        {courses.map((course, index) => (
          <div
            key={index}
            className="text-center size-[300px] flex justify-center p-8 flex-col border rounded shadow-lg bg-gray-100"
          >
            <h4 className="mb-4 text-2xl font-semibold">{course.name}</h4>
            <button className="mt-6 mx-4 p-2 text-lg bg-green-500 text-white font-bold rounded-lg shadow hover:bg-green-600">
              View Course
            </button>
          </div>
        ))}
      </div>
      <button className="mt-6 px-6 py-2 bg-green-500 text-white text-xl font-semibold rounded-lg shadow hover:bg-green-600">
        Explore all the Courses
      </button>
    </section>
  );
};

export default Courses;
