import React from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";

const ContactPage = () => {
  return (
    <div className="px-4 py-8 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Contact Us</h1>

      <div className="flex flex-col md:flex-row gap-12">
        <div className="md:w-1/2 space-y-6">
          <p className="text-lg text-gray-700 leading-relaxed">
            We&apos;d love to hear from you! Whether you have a question about
            our products, need assistance with an order, or just want to give
            feedback, our team is ready to help.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin size={24} className="text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Our Address
                </h3>
                <p className="text-gray-700">
                  Jl. Asia Afrika No.8, RT.1/RW.3, Gelora, Kecamatan Tanah
                  Abang, <br />
                  Kota Jakarta Pusat, Daerah Khusus Ibukota Jakarta 10270
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={24} className="text-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Email Us
                </h3>
                <p className="text-gray-700">
                  <div className="cursor-pointer hover:underline">
                    helo.kyra@mail.com
                  </div>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Phone size={24} className="text-primary flex-shrink-0" />
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Call Us</h3>
                <p className="text-gray-700">(021) 5725555</p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Follow Us
            </h3>
            <div className="flex gap-4">
              <div className="text-gray-600 hover:text-primary cursor-pointer">
                <Facebook size={28} />
              </div>
              <div className="text-gray-600 hover:text-primary cursor-pointer">
                <Instagram size={28} />
              </div>
              <div className="text-gray-600 hover:text-primary cursor-pointer">
                <Youtube size={28} />
              </div>
              <div className="text-gray-600 hover:text-primary cursor-pointer">
                <Twitter size={28} />
              </div>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 bg-gray-50 p-6 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Send Us a Message
          </h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
