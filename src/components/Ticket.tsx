"use client";

import { useState } from "react";

interface Seat {
  seat: string;
  class: string;
  price: string;
}

interface Params {
  flightId: string;
  logo: string;
  brand: string;
  date: string;
  time: string;
  duration: string;
  departure: string;
  destination: string;
  chooseSeat: Seat[];
}

const Ticket: React.FC<{ params: Params }> = ({ params }) => {
  const [formData, setFormData] = useState({
    fullName: "NGUYEN VAN A ",
    phoneNumber: "012345678",
    email: "123@gmail.com",
    luggage: "0 kg",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <>
      {params.chooseSeat.map((param, index) => (
        <div key={index} className="flex justify-center items-center mb-6">
          <div className="bg-white rounded-3xl drop-shadow-lg">
            <div className="flex rounded-t-3xl p-2 bg-teal-600 justify-between items-center border-b ">
              <div className="flex items-center">
                <picture>
                  <img
                    src={params.logo}
                    alt={params.brand}
                    className="w-12 object-cover mx-4"
                  />
                </picture>

                <h2 className="text-2xl font-semibold text-white">
                  {params.brand}
                </h2>
              </div>
              <span className="font-semibold text-2xl text-white py-1 px-3 rounded-full ">
                {param.class.toUpperCase()} CLASS
              </span>
            </div>
            <form onSubmit={handleSubmit} className="pl-10 pr-10 pb-10 pt-5">
              <div className="my-4 grid grid-cols-6 gap-6 max-w-[800px]">
                <div>
                  <h3 className="font-bold text-gray-600">FLIGHT</h3>
                  <p className="text-xl font-bold">{params.flightId}</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-600">FROM:</h3>
                  <p className="text-xl font-bold">{params.departure}</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-600">TO:</h3>
                  <p className="text-xl font-bold">{params.destination}</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-600">DEPARTURE TIME</h3>
                  <p className="text-lg">
                    {params.time}- {params.duration}
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-600">NGÀY/DATE</h3>
                  <p className="text-lg">{params.date}</p>
                </div>
                <div>
                  <h3 className="font-bold text-gray-600">GHẾ/SEAT</h3>
                  <p className="text-4xl font-bold">{param.seat}</p>
                </div>
              </div>

              <div className="my-4">
                <h3 className="font-bold text-gray-600">HỌ TÊN/FULL NAME</h3>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className=" grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-bold text-gray-600">SỐ ĐIỆN THOẠI</h3>
                  <input
                    type="text"
                    name="phoneNumber"
                    required
                    placeholder={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-gray-600">EMAIL</h3>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="my-4">
                  <h3 className="font-bold text-gray-600">HÀNH LÝ KÍ GỬI</h3>
                  <select
                    name="luggage"
                    required
                    value={formData.luggage}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
                  >
                    <option>0 kg</option>
                    <option>20 kg</option>
                    <option>15 kg</option>
                    <option>10 kg</option>
                    <option>7 kg</option>
                  </select>
                </div>

                <div className="flex justify-end">
                  <div className="text-right">
                    <h3 className="text-xl font-bold text-orange-500">
                      TỔNG THANH TOÁN
                    </h3>
                    <p className="text-3xl font-bold text-orange-500">
                      {param.price} VND
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      ))}
    </>
  );
};
export default Ticket;
