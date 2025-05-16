import {
  useAirportsDispatch,
  useOriginalAirports,
} from "@/provider/AirportProvider";
import React, { useEffect, useState } from "react";

const FilterAirportBar = () => {
  const originAirports = useOriginalAirports();
  const dispatch = useAirportsDispatch();

  const [available, setAvailableFlight] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<{
    country: string;
    city: string;
  }>({ country: "", city: "" });

  const handleFilterAvailableFlight = () => {
    setAvailableFlight((prev) => !prev);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setSearchQuery((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  useEffect(() => {
    dispatch({
      type: "filter_airport",
      originAirports: originAirports,
      query: {
        country: searchQuery.country,
        city: searchQuery.city,
        available: available,
      },
    });
  }, [searchQuery, available, originAirports, dispatch]);

  return (
    <div className="flex justify-between">
      <label className="input input-bordered flex items-center gap-2">
        <p className=" ">Country</p>
        <input
          type="text"
          id="country"
          className="grow font-medium"
          placeholder="Vietnam"
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

      <label className="input input-bordered flex items-center gap-2 mx-3">
        <p className=" ">City</p>
        <input
          type="text"
          id="city"
          className="grow font-medium"
          placeholder="Ha Noi"
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
      <div className="flex rounded-md p-1 items-center justify-around h-12 bg-base-300">
        <div
          className={`${
            available
              ? "bg-white flex justify-center rounded-md px-5 py-2  text-sm font-medium"
              : "flex justify-center rounded-md px-5 py-1  text-sm font-medium"
          }`}
          onClick={handleFilterAvailableFlight}
        >
          All
        </div>

        <div
          className={`${
            available
              ? "flex justify-center rounded-md px-5 py-2  text-sm font-medium"
              : "bg-white flex justify-center rounded-md px-5 py-2  text-sm font-medium"
          }`}
          onClick={handleFilterAvailableFlight}
        >
          Available
        </div>
      </div>
    </div>
  );
};

export default FilterAirportBar;
