"use client";

import { customerEndpoint } from "@/services/axios/endpoints/customer.endpoint";
import { Customer } from "@/interfaces/type";
import { apiRequest } from "@/utils/apiRequest";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const InformationCard: React.FC<{ passengerId: string }> = ({
  passengerId,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [customer, setCustomer] = useState<Customer | null>(null);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchCustomerData = async () => {
      const url = `${process.env.NEXT_PUBLIC_SERVER}${customerEndpoint[
        "get-one"
      ](passengerId)}`;
      const { result, error } = await apiRequest<Customer>(
        url,
        "GET",
        session?.user.token
      );
      setCustomer(result);
    };
    fetchCustomerData();
  }, [passengerId, session]);

  return (
    <div>
      <div className="tooltip" data-tip="Information">
        <button
          onClick={() => setShowModal(!showModal)}
          className="hover:bg-blue-100 rounded-lg text-blue-500 btn-xs font-medium"
        >
          {customer?.fullname || "Loading..."}
        </button>
        {showModal && (
          <div
            onClick={() => setShowModal(!showModal)}
            className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm"
            >
              <div>
                <div>
                  <div className="w-28 h-28 mx-auto  rounded-full overflow-hidden border-4 border-white relative">
                    <picture>
                      <img
                        className="object-cover w-full h-full"
                        src={
                          customer?.cccdPicture ||
                          "https://i.postimg.cc/fW7tk0PW/plane-01-7-1.png"
                        }
                        alt="Profile Picture"
                      />
                    </picture>
                  </div>
                </div>

                <h2 className="text-3xl mb-5 font-bold text-gray-800 text-center">
                  {customer?.fullname}
                </h2>
                <div className="bg-gray-200 p-2 rounded-lg my-3">
                  <p className="text-base font-medium">Basic Details</p>
                </div>

                <p className="text-sm text-gray-600 mb-2">
                  <span className="text-sm font-semibold">Date of Birth</span>{" "}
                  <br />
                  <span className="text-sm">{customer?.birthday}</span>
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="text-sm font-semibold">Address</span> <br />
                  <span className="text-sm">
                    {customer?.address}, {customer?.nationality}
                  </span>
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="text-sm font-semibold">Identification</span>{" "}
                  <br />
                  <span className="text-sm">{customer?.cccd}</span>
                </p>

                <div className="bg-gray-200 p-2 rounded-lg my-3">
                  <p className="text-base font-medium">Contact Information</p>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="text-sm font-semibold">Email</span> <br />
                  <span className="text-sm">{customer?.email}</span>
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <span className="text-sm font-semibold">Phone</span> <br />
                  <span className="text-sm">{customer?.phoneNumber}</span>
                </p>
              </div>

              <button
                onClick={() => setShowModal(false)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InformationCard;
