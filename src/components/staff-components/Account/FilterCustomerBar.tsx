import {
  useCustomersDispatch,
  useOriginalCustomers,
} from "@/provider/CustomerProvider";
import { Autocomplete, TextField } from "@mui/material";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const FilterCustomerBar = () => {
  const originalCustomers = useOriginalCustomers();

  const dispatch = useCustomersDispatch();
  const { data: session } = useSession();

  const handleDeleteUser = async (e: any) => {
    console.log(e.target.value);
  };

  const [selectCustomer, setSelectCustomer] = useState<{
    username: string;
    email: string;
    phoneNumber: string;
    password: string;
    birthday: string;
    role: string;
  }>({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
    birthday: "",
    role: "Staff_LV2",
  });

  const [countryOptions, setCountryOptions] = useState<
    {
      name: string;
      code: string;
    }[]
  >([]);

  useEffect(() => {
    const get_all_country = async () => {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_SERVER}/airport/country`,
        headers: {},
      };
      try {
        const response = await axios.request(config);
        const responseData = response.data;
        const options = responseData.map((country: any) => ({
          name: country.name,
          code: country.code,
        }));
        setCountryOptions(options);
      } catch (e) {
        console.log(e);
      }
    };
    get_all_country();
  }, []);

  const [searchQuery, setSearchQuery] = useState<{
    username: string;
    countryCode: string;
    emailValidated: boolean | null;
  }>({ username: "", countryCode: "", emailValidated: null });

  useEffect(() => {
    dispatch({
      type: "filter_customers",
      origin: originalCustomers,
      query: searchQuery,
    });
  }, [dispatch, searchQuery, originalCustomers]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSearchQuery((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };
  return (
    <div className="flex justify-between">
      <div className="flex flex-col justify-center">
        <label className="input h-[40px] input-bordered flex items-center gap-2">
          <p className="">Customer</p>
          <input
            type="text"
            id="username"
            className="grow font-medium"
            placeholder="Nguyen Van A"
            onChange={handleSearch}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-4 h-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>

      <div className="flex flex-col justify-center">
        <Autocomplete
          disablePortal
          className="bg-white w-[200px] mx-3"
          id="countryCode"
          options={countryOptions}
          getOptionLabel={(option) => option.name}
          onChange={(event, value) => {
            setSearchQuery((prevState) => ({
              ...prevState,
              countryCode: value ? value.code : "",
            }));
          }}
          renderInput={(params) => (
            <TextField {...params} size="small" placeholder="Vietnam" />
          )}
        />
      </div>

      <div className="flex rounded-md p-2 items-center justify-around h-[40px]  bg-base-300">
        <div
          className={`${
            searchQuery.emailValidated === null
              ? "bg-white flex justify-center rounded-md px-5 py-1  text-sm font-medium"
              : "flex justify-center rounded-md px-5 py-1  text-sm font-medium"
          }`}
          onClick={() => {
            setSearchQuery((prevState) => ({
              ...prevState,
              emailValidated: null,
            }));
          }}
        >
          All
        </div>

        <div
          className={`${
            searchQuery.emailValidated === true
              ? "bg-white flex justify-center rounded-md px-5 py-1  text-sm font-medium"
              : "flex justify-center rounded-md px-5 py-1  text-sm font-medium"
          }`}
          onClick={() => {
            setSearchQuery((prevState) => ({
              ...prevState,
              emailValidated: true,
            }));
          }}
        >
          Validated
        </div>
      </div>
    </div>
  );
};

export default FilterCustomerBar;
