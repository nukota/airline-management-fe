"use client";

import { customerEndpoint } from "@/services/axios/endpoints/customer.endpoint";
import { Customer } from "@/interfaces/type";
import { apiRequest } from "@/utils/apiRequest";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useState, useEffect, ChangeEvent } from "react";

const ProfileCard = () => {
  const { data: session } = useSession();
  const typeProfile = {
    customerId: "",
    email: "",
    phoneNumber: "",
    fullname: "",
    birthday: "",
    address: "",
    nationality: "",
    emailValidated: true,
    cccd: "",
    cccdPicture: "",
    profilePicture: "",
    createAt: "",
    updateAt: "",
  };
  const [profile, setProfile] = useState<Customer>(typeProfile);
  const [showProfileModal, setShowProfileModal] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const fetchProfile = async () => {
      const url = `${process.env.NEXT_PUBLIC_SERVER}${customerEndpoint["get-me-by-token"]}`;

      const { result, error } = await apiRequest<Customer>(
        url,
        "GET",
        session?.user.token
      );
      if (result) setProfile(result);
    };
    fetchProfile();
  }, [session]);
  const [imageChange, setImageChange] = useState<boolean>(false);
  const handleChangeProfilePicture = async (
    e: ChangeEvent<HTMLInputElement>,
    files: any
  ) => {
    try {
      if (files && files.length > 0) {
        const formData = new FormData();
        formData.append("image", files[0], files[0].name);

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER}/customer/upload-profile-picture`,
          formData
        );

        setUpdateData((prevData) => ({
          ...prevData,
          [e.target.id]: response.data.picture_url,
        }));
        setImageChange(!imageChange);
      }
    } catch (e: any) {
      console.log(e);
    }
  };

  const handleInput = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUpdateData((prevData) => ({
      ...prevData,
      [e.target.id]: e.target.value,
    }));
  };

  const handleOnsubmit = async () => {
    const url = `${process.env.NEXT_PUBLIC_SERVER}${customerEndpoint[
      "put-update"
    ](profile.customerId)}`;
    const { result, error } = await apiRequest<Customer>(
      url,
      "PUT",
      session?.user.token,
      JSON.stringify(updateData)
    );
    if (error) showErrorToast(error);
    else showSuccessToast("Update succesful");
  };

  const handleDeleteAccount = async () => {
    const url = `${process.env.NEXT_PUBLIC_SERVER}${customerEndpoint[
      "delete-by-id"
    ](profile.customerId)}`;
    const { result, error } = await apiRequest<Customer>(
      url,
      "DELETE",
      session?.user.token
    );
    if (error) showErrorToast(error);
    else showSuccessToast("Update succesful");
  };

  return (
    <div className="bg-white rounded-xl px-10 pt-10 shadow-lg flex flex-col justify-between min-w-72">
      <div>
        <div>
          <div className="w-28 h-28 mx-auto  rounded-full overflow-hidden border-4 border-white relative">
            <picture>
              <img
                crossOrigin="anonymous"
                className="object-cover w-full h-full"
                src={profile.cccdPicture}
                alt="Profile Picture"
              />{" "}
            </picture>
          </div>
        </div>

        <h2 className="text-3xl mb-5 font-bold text-gray-800 text-center">
          {profile.fullname}
        </h2>
        <div className="bg-gray-200 p-2 rounded-lg my-3">
          <p className="text-base font-medium">Basic Details</p>
        </div>

        <p className="text-sm text-gray-600 mb-2">
          <span className="text-sm font-semibold">Date of Birth</span> <br />
          <span className="text-sm">{profile.birthday}</span>
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <span className="text-sm font-semibold">Address</span> <br />
          <span className="text-sm">
            {profile.address}, {profile.nationality}
          </span>
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <span className="text-sm font-semibold">Identification</span> <br />
          <span className="text-sm">{profile.cccd}</span>
        </p>

        <div className="bg-gray-200 p-2 rounded-lg my-3">
          <p className="text-base font-medium">Contact Information</p>
        </div>
        <p className="text-sm text-gray-600 mb-2">
          <span className="text-sm font-semibold">Email</span> <br />
          <span className="text-sm">{profile.email}</span>
        </p>
        <p className="text-sm text-gray-600 mb-2">
          <span className="text-sm font-semibold">Phone</span> <br />
          <span className="text-sm">{profile.phoneNumber}</span>
        </p>
      </div>
      <button
        className="btn btn-ghost"
        onClick={() => setShowProfileModal(!showProfileModal)}
      >
        Edit profile
      </button>
      {showProfileModal && (
        <div
          //onClick={() => setShowProfileModal(!showProfileModal)}
          className="fixed bg-black bg-opacity-15 backdrop-blur-sm inset-0 flex items-center justify-center z-50"
        >
          <div className="bg-white px-10 pb-10 pt-5 rounded-xl flex flex-col">
            <div
              onClick={() => setShowProfileModal(!showProfileModal)}
              className="flex justify-end mb-4 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384 512"
                className="w-5 h-5 hover:opacity-60"
              >
                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
              </svg>
            </div>

            <div className="flex">
              <div className="flex flex-col justify-between items-center mr-5">
                <picture>
                  <img
                    crossOrigin="anonymous"
                    src={profile.cccdPicture}
                    alt="Logo"
                    className="w-24 h-24 rounded-full object-cover border border-gray-300"
                  />
                </picture>

                {editMode && (
                  <div className="relative">
                    {!imageChange ? (
                      <button className="relative text-sm px-1 bg-slate-400 text-white rounded-full ">
                        Change Avatar
                      </button>
                    ) : (
                      <button className="relative text-sm px-1 bg-blue-400 text-white rounded-full ">
                        Change Avatar
                      </button>
                    )}

                    <input
                      type="file"
                      id="cccdPicture"
                      onChange={(e) =>
                        handleChangeProfilePicture(e, e.target.files)
                      }
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                )}
              </div>

              <div className="flex-grow min-w-[300px]">
                <div className="flex justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                      {profile.fullname}
                    </h2>
                    <p className="text-gray-500">{profile.email}</p>
                  </div>
                </div>
                {editMode ? (
                  <div className="space-y-2">
                    <p>
                      <span className="font-semibold text-gray-700">Email</span>{" "}
                      <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleInput(e)
                        }
                        className="input input-sm w-full input-bordered"
                        type="text"
                        id="email"
                        value={updateData.email}
                        placeholder="email"
                      />
                    </p>
                    <p>
                      <span className="font-semibold text-gray-700">Name</span>{" "}
                      <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleInput(e)
                        }
                        className="input input-sm w-full input-bordered"
                        type="text"
                        id="fullname"
                        value={updateData.fullname}
                        placeholder="fullname"
                      />
                    </p>
                    <p>
                      <span className="font-semibold text-gray-700">CCCD:</span>{" "}
                      <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleInput(e)
                        }
                        className="input input-sm w-full input-bordered"
                        type="text"
                        id="cccd"
                        value={updateData.cccd}
                        placeholder="cccd"
                      />
                    </p>
                    <p>
                      <span className="font-semibold text-gray-700">
                        Phone:
                      </span>{" "}
                      <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleInput(e)
                        }
                        className="input input-sm w-full input-bordered"
                        type="text"
                        id="phoneNumber"
                        value={updateData.phoneNumber}
                        placeholder="phone"
                      />
                    </p>
                    <p>
                      <span className="font-semibold text-gray-700">
                        Birthday:
                      </span>{" "}
                      <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleInput(e)
                        }
                        className="input input-sm w-full input-bordered"
                        type="date"
                        value={updateData.birthday}
                        id="birthday"
                      />
                    </p>
                    <p>
                      <span className="font-semibold text-gray-700">
                        Address:
                      </span>{" "}
                      <input
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          handleInput(e)
                        }
                        className="input input-sm w-full input-bordered"
                        type="text"
                        id="address"
                        placeholder="address"
                        value={updateData.address}
                      />
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p>
                      <span className="font-semibold text-gray-700">CCCD:</span>{" "}
                      {profile.cccd}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-700">
                        Phone:
                      </span>{" "}
                      {profile.phoneNumber}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-700">
                        Birthday:
                      </span>{" "}
                      {profile.birthday}
                    </p>
                    <p>
                      <span className="font-semibold text-gray-700">
                        Address:
                      </span>{" "}
                      {profile.address}, {profile.nationality}
                    </p>
                  </div>
                )}
              </div>
            </div>
            {editMode ? (
              <div className="mt-5 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setEditMode(!editMode);
                    setImageChange(!imageChange);
                    setUpdateData({});
                  }}
                  className="btn btn-sm btn-ghost text-yellow-600"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleOnsubmit()}
                  className="btn  btn-sm btn-ghost"
                >
                  Save
                </button>
              </div>
            ) : (
              <div
                onClick={() => setEditMode(!editMode)}
                className="mt-5 flex justify-end gap-3"
              >
                <button className="flex items-center text-blue-500 hover:text-blue-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-4 h-4 mr-1"
                  >
                    <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                  </svg>
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAccount()}
                  className="flex items-center text-red-500 hover:text-red-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className="w-4 h-4 mr-1"
                  >
                    <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                  </svg>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
