"use client";
import Courses from "../(Components)/Courses";
import Footer from "../(Components)/Footer";
import Header from "../(Components)/Header";
import Hero from "../(Components)/Hero";
import HiringPartners from "../(Components)/HiringPartner";
import Mentorship from "../(Components)/Mentorship";

export default function Home() {
  return (
    <div className="light flex flex-col min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Header />
      <Hero isAuthenticated={true} />

      <HiringPartners />
      <Courses />
      <Mentorship />
      <Footer />
    </div>
  );
}
