"use client";
import React, { useState } from "react";

const AirPlaneDetail = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div>
      <div
        onClick={() => setShowModal(true)}
        className="lg:tooltip"
        data-tip="Detail Airplane"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 0 98 98"
          fill="none"
        >
          <circle cx="49" cy="49" r="45.5" stroke="black" strokeWidth="7" />
          <path
            d="M37.16 64V58.48H46.1V41.02H37.64V35.5H52.28V58.48H60.74V64H37.16ZM48.86 31.36C47.66 31.36 46.7 31 45.98 30.28C45.3 29.52 44.96 28.54 44.96 27.34C44.96 26.14 45.32 25.18 46.04 24.46C46.76 23.74 47.72 23.38 48.92 23.38C50.16 23.38 51.1 23.74 51.74 24.46C52.42 25.14 52.76 26.1 52.76 27.34C52.76 28.58 52.42 29.56 51.74 30.28C51.06 31 50.1 31.36 48.86 31.36Z"
            fill="black"
          />
        </svg>
      </div>
      {showModal && (
        <div className="fixed bg-black bg-opacity-15 inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-full shadow-lg transform transition-all duration-300">
            <div className="flex justify-between items-center border-b-2 border-gray-200 pb-4 mb-5">
              <h2 className="text-2xl font-semibold">AIR2014</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-x"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AirPlaneDetail;
