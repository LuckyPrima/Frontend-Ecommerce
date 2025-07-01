import React from "react";
import Link from "next/link";

const AboutPage = () => {
  return (
    <div className="px-4 py-8 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        About KYRA Company
      </h1>

      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-2/3 space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            Welcome to KYRA, your premier destination for the latest trends and
            quality products. We are passionate about bringing you a curated
            selection of fashion and accessories that empower your style and
            enhance your everyday life.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Founded with a vision to offer exceptional value and a seamless
            shopping experience, KYRA is committed to excellence in every
            aspect, from product sourcing to customer service. We believe in
            building lasting relationships with our community by consistently
            delivering on our promise of quality, affordability, and style.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Our team is constantly working to discover new arrivals and exciting
            deals, ensuring that you always find something fresh and inspiring.
            Thank you for choosing KYRA as your fashion destination, where style
            meets convenience.
          </p>
        </div>

        <div className="md:w-1/3 space-y-4 bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Company
          </h2>
          <ul className="space-y-2 text-gray-700">
            <li className="hover:underline cursor-pointer">About Us</li>
            <li className="hover:underline cursor-pointer">Careers</li>
            <li className="hover:underline cursor-pointer">Affiliates</li>
            <li className="hover:underline cursor-pointer">Blog</li>
            <li className="hover:underline cursor-pointer">Contact Us</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
