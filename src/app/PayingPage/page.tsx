"use client";
import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import axios from "axios";

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

interface FillForm {
  fullName: string;
  phoneNumber: string;
  email: string;
  cccd: string;
  money: string;
}

const PayingPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const filteredParams: Params = {
    flightId: params.flightId,
    logo: params.logo,
    brand: params.brand,
    date: params.date,
    time: params.time,
    duration: params.duration,
    departure: params.departure,
    destination: params.destination,
    chooseSeat: params.chooseSeat ? JSON.parse(params.chooseSeat) : [],
  };
  let totalMoney = 0;
  filteredParams.chooseSeat.forEach((param) => {
    totalMoney += parseInt(param.price);
  });
  const [formData, setFormData] = useState<FillForm[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    const newFormData = [...formData];
    newFormData[index] = { ...newFormData[index], [name]: value };
    setFormData(newFormData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const bookingPerson = {
      contactName: formData[0]?.fullName || "",
      contactPhone: formData[0]?.phoneNumber || "",
      contactEmail: formData[0]?.email || "",
    };

    const passengers = formData.map((form, idx) => ({
      passengerName: form.fullName,
      passengerBirthdate: "2004-12-30",
      passengerGender: "MALE",
      passengerIdCard: form.cccd,
      seatNumber: filteredParams.chooseSeat[idx]?.seat,
    }));

    const bookingData = {
      flightId: filteredParams.flightId,
      bookingPerson,
      passengers,
    };

    if (!session?.user?.token) {
      toast.error("You must be signed in to complete the booking.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER}/flight-service/booking/book-seats`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${session.user.token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (
        response.data &&
        response.data.status === "200" &&
        response.data.data?.orderId
      ) {
        router.push(
          `/iPayPage?orderId=${
            response.data.data.orderId
          }&total=${totalMoney.toString()}`
        );
      } else {
        toast.error("Booking failed!");
      }
    } catch (e) {
      toast.error("Booking failed!");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {filteredParams.chooseSeat.map((param, index) => (
          <div key={index} className="flex justify-center items-center mb-6">
            <div className="bg-white rounded-3xl drop-shadow-lg ">
              <div className="flex rounded-t-3xl p-2 bg-teal-600 justify-between items-center border-b ">
                <div className="flex items-center">
                  <picture>
                    <img
                      src={filteredParams.logo}
                      alt={filteredParams.brand}
                      className="w-12 object-cover mx-4"
                    />
                  </picture>

                  <h2 className="text-2xl font-semibold text-white">
                    {filteredParams.brand}
                  </h2>
                </div>
                <span className="font-semibold text-2xl text-white py-1 px-3 rounded-full ">
                  {param.class.toUpperCase()} CLASS
                </span>
              </div>
              <div className="pl-10 pr-10 pb-10 pt-5">
                <div className="my-4 grid grid-cols-6 gap-6 max-w-[800px]">
                  <div>
                    <h3 className="font-bold text-gray-600">FLIGHT ID</h3>
                    <p className="text-xl font-bold">
                      {filteredParams.flightId}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-600">FROM:</h3>
                    <p className="text-xl font-bold">
                      {filteredParams.departure}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-600">TO:</h3>
                    <p className="text-xl font-bold">
                      {filteredParams.destination}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-600">DEPARTURE TIME</h3>
                    <p className="text-lg">{filteredParams.time}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-600">DATE</h3>
                    <p className="text-lg">{filteredParams.date}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-600">SEAT</h3>
                    <p className="text-4xl font-bold">{param.seat}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5 ">
                  <div>
                    <h3 className="font-bold text-gray-600">FULL NAME</h3>
                    <input
                      type="text"
                      name="fullName"
                      required
                      placeholder="NGUYEN VAN A"
                      onChange={(e) => handleChange(e, index)}
                      className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-600">CCCD</h3>
                    <input
                      type="text"
                      name="cccd"
                      placeholder="0123456789"
                      value={formData[index]?.cccd || ""}
                      onChange={(e) => handleChange(e, index)}
                      className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className=" grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <h3 className="font-bold text-gray-600">PHONE NUMBER</h3>
                    <input
                      type="text"
                      name="phoneNumber"
                      required
                      placeholder="012345678"
                      onChange={(e) => handleChange(e, index)}
                      className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-600">EMAIL</h3>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="ac@gmail.com"
                      onChange={(e) => handleChange(e, index)}
                      className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end items-center">
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
            </div>
          </div>
        ))}
        <div className="w-full flex justify-center mb-10">
          <div className="w-full  flex justify-between max-w-[850px] ">
            <button className="btn " onClick={router.back}>
              Back
            </button>

            <button
              type="submit"
              className="btn btn-active bg-orange-400 text-white min-w-[200px] hover:text-black "
            >
              Pay
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PayingPage;
