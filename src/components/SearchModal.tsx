"use client";

import React, { useState } from "react";
import SearchForm from "./SearchForm";

const SearchModal: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div>
      <div>
        <button
          onClick={() => setShowModal(true)}
          className="btn btn-ghost btn-circle transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            className="w-5 h-5"
          >
            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
          </svg>
        </button>

        {showModal && (
          <div className="fixed bg-black bg-opacity-15 backdrop-blur-sm inset-0 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-full shadow-lg transform transition-all duration-300">
              <div className="flex justify-between items-center border-b-2 border-gray-200 pb-4 mb-5">
                <h2 className="text-2xl font-semibold">Find your flight</h2>
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

              <SearchForm />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchModal;
