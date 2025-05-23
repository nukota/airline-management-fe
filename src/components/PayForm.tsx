"use client";

import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-toastify";
import { airportEndpoint } from "@/services/axios/endpoints/airport.endpoint";
import { apiRequest } from "@/utils/apiRequest";
import { showErrorToast } from "@/utils/toastUtils";

const schema = z.object({
  country: z.string(),
});

type FormFields = z.infer<typeof schema>;

const PayForm = () => {
  const route = useRouter();
  const [selectedCountry, setSelectedCountry] = useState<string>("");

  const [countryOptions, setCountryOptions] = useState<
    { name: string; code: string }[]
  >([]);

  useEffect(() => {
    const getAllCountry = async () => {
      const url = `${process.env.NEXT_PUBLIC_SERVER}${airportEndpoint["get-all-country"]}`;

      const { result, error } = await apiRequest<
        { name: string; code: string }[]
      >(url, "GET");
      if (error) showErrorToast(error);
      if (result) setCountryOptions(result);
    };
    getAllCountry();
  }, []);

  const searchParams = useSearchParams();
  const params = Object.fromEntries(searchParams.entries());
  const total = params.total;

  const {
    register,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const discount = 0;

  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className="flex justify-between md:flex-row max-w-[1100px]">
      <div className="bg-white p-6 rounded-2xl">
        <h1 className="text-3xl font-bold mb-4">Thanh toán</h1>
        <div className="flex items-center mb-2">
          <h1 className="text-xl font-bold">Quốc gia</h1>
          <p className="ml-2">(Bắt buộc)</p>
        </div>
        <Autocomplete
          className="mb-2"
          onChange={(__, value) => setSelectedCountry(value?.name || "")}
          disabled={isSubmitting}
          options={countryOptions}
          getOptionLabel={(option) => option?.name}
          renderInput={(params) => (
            <TextField
              {...params}
              {...register("country")}
              placeholder="Select Country"
              required
            />
          )}
        />

        <p className="mb-5 text-sm font-light">
          CSE is required by law to collect applicable transaction taxes for
          purchases made in certain tax jurisdictions.
        </p>

        <div className="collapse collapse-arrow bg-base-200 mb-2">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium ">Visa</div>

          <div className="collapse-content px-5">
            <label className=" text-sm font-medium" htmlFor="airline">
              Name on card
            </label>
            <input
              id="airline"
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 font-light"
              type="text"
              placeholder="Name on card"
            />
            <label className=" text-sm font-medium" htmlFor="airline">
              Card number
            </label>
            <input
              id="airline"
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 font-light"
              type="text"
              placeholder="Card number"
            />
            <div className="flex justify-between">
              <div>
                <label className=" text-sm font-medium" htmlFor="airline1">
                  Expiry day
                </label>
                <input
                  id="airline1"
                  className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 font-light"
                  type="text"
                  placeholder="Expiry day"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="collapse collapse-arrow bg-base-200 mb-2">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">
            Credit/Debit card
          </div>
          <div className="collapse-content px-5">
            <label className=" text-sm font-medium" htmlFor="airline">
              Name on card
            </label>
            <input
              id="airline"
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 font-light"
              type="text"
              placeholder="Name on card"
            />
            <label className=" text-sm font-medium" htmlFor="airline">
              Card number
            </label>
            <input
              id="airline"
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 font-light"
              type="text"
              placeholder="Card number"
            />
            <div className="flex justify-between">
              <div>
                <label className=" text-sm font-medium" htmlFor="airline1">
                  Expiry day
                </label>
                <input
                  id="airline1"
                  className="shadow appearance-none border w-full rounded py-2 px-3 mb-2 text-gray-700 font-light"
                  type="text"
                  placeholder="Expiry day"
                />
              </div>
              <div>
                <label className=" text-sm font-medium" htmlFor="airline2">
                  CVC/CVV
                </label>
                <input
                  id="airline2"
                  className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 font-light"
                  type="text"
                  placeholder="CVC/CVV"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200">
          <input type="radio" name="my-accordion-2" />
          <div className="collapse-title text-xl font-medium">PayPal</div>
          <div className="collapse-content px-5">
            <label
              className="block text-gray-700 w-auto text-sm font-bold mb-2"
              htmlFor="airline"
            >
              Name on card
            </label>
            <input
              id="airline"
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 font-light"
              type="text"
              placeholder="Name on card"
            />
            <label
              className="block text-gray-700 w-auto text-sm font-bold mb-2"
              htmlFor="airline"
            >
              Card number
            </label>
            <input
              id="airline"
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 font-light"
              type="text"
              placeholder="Card number"
            />
            <div className="flex justify-between">
              <div>
                <label
                  className="block text-gray-700 w-auto text-sm font-bold mb-2"
                  htmlFor="airline1"
                >
                  Expiry day
                </label>
                <input
                  id="airline1"
                  className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 font-light"
                  type="text"
                  placeholder="Expiry day"
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 w-auto text-sm font-bold mb-2"
                  htmlFor="airline2"
                >
                  CVC/CVV
                </label>
                <input
                  id="airline2"
                  className="shadow appearance-none border rounded w-full py-2 px-3 mb-2 text-gray-700 font-light"
                  type="text"
                  placeholder="CVC/CVV"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between max-w-[500px] p-4 mb-3 ">
        <div>
          <h2 className="text-xl font-bold mb-4">Summary</h2>

          <div className="flex justify-between">
            <p>Original Price:</p>
            <p className="text-xl font-semibold my-1">₫{total}</p>
          </div>
          <div className="flex justify-between">
            <p>Discounts:</p>
            <p className="text-xl font-semibold my-1">-₫{discount}</p>
          </div>
          <div className="divider"></div>
          <div className="flex justify-between">
            <p>Total:</p>
            <p className="text-xl font-semibold my-1">
              ₫{parseInt(total) - discount}
            </p>
          </div>
          <p className="text-sm font-light mt-4">
            By completing your purchase you agree to these Terms of Service.
          </p>
        </div>
        <div className="w-full">
          <button
            onClick={() => {
              toast.success("Purchase Succesful. Redirect to Profile", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              setTimeout(() => {
                route.push("/ProfilePage");
              }, 6000);
            }}
            className="w-full bg-purple-500 mx-auto block text-white rounded px-4 py-2 mb-4"
          >
            Complete Checkout
          </button>
          <button
            onClick={route.back}
            className="w-full bg-gray-700 mx-auto block text-white rounded px-4 py-2"
          >
            Cancel
          </button>
        </div>
        {showModal && (
          <div className="fixed bg-black bg-opacity-15 inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-10 rounded-2xl">
              <h3 className="font-bold text-2xl">Success!</h3>
              <p className="py-4">
                The payment has been completed, please check your mail
              </p>
              <div className="modal-action">
                <button className="btn" onClick={() => setShowModal(false)}>
                  Close
                </button>
                <Link href={"/"} className="btn btn-ghost">
                  Go to HomePage
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PayForm;
