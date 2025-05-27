"use client";

import React, { useState, useEffect } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { showErrorToast } from "@/utils/toastUtils";
import { airportEndpoint } from "@/services/axios/endpoints/airport.endpoint";
import { apiRequest } from "@/utils/apiRequest";
import { countryData } from "@/data";
import { useSession } from "next-auth/react";

const schema = z.object({
  country: z.string().nonempty("Country is required"),
  countryArrival: z.string().nonempty("Required"),
  departure: z.string().nonempty("Departure is required"),
  destination: z.string().nonempty("Destination is required"),
  date: z.string().nonempty("Date is required"),
});

type FormFields = z.infer<typeof schema>;

const SearchForm = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    defaultValues: {
      country: "Vietnam",
      countryArrival: "Vietnam",
      // ...other defaults if needed
    },
  });

  const [departure, setDeparture] = useState<string | null>(null);
  const [destination, setDestination] = useState<string | null>(null);
  const [cityOptions, setCityOptions] = useState<
    { name: string; code: string }[]
  >([]);
  const [cityArrivalOptions, setCityArrivalOptions] = useState<
    { name: string; code: string }[]
  >([]);

  const [country, setCountry] = useState<string | null>(null);
  const [countryCode, setCountryCode] = useState<string>("VN");
  const [countryArrival, setCountryArrival] = useState<string | null>(null);
  const [countryArrivalCode, setCountryArrivalCode] = useState<string>("VN");

  const [countryOptions, setCountryOptions] = useState<
    {
      name: string;
      code: string;
    }[]
  >([]);

  // useEffect(() => {
  //   const getAllCountry = async () => {
  //     const url = `${process.env.NEXT_PUBLIC_SERVER}${airportEndpoint["get-all-country"]}`;

  //     const { result, error } = await apiRequest<
  //       { name: string; code: string }[]
  //     >(url, "GET");
  //     if (error) showErrorToast(error);
  //     if (result) setCountryOptions(result);
  //   };
  //   getAllCountry();
  // }, []);

  useEffect(() => {
    setCountryOptions(countryData);
  }, []);

  const { data: session } = useSession();

  useEffect(() => {
    const get_all_city_by_code = async () => {
      const url = `${process.env.NEXT_PUBLIC_SERVER}${airportEndpoint["post-search-airport"]}`;
      const payload = {
        filters: [
          { key: "countryCode", operator: "equal", value: countryCode },
        ],
        sorts: [{ key: "id", type: "DESC" }],
        rpp: 100,
        page: 1,
      };
      const { result, error } = await apiRequest<any>(
        url,
        "POST",
        undefined,
        payload
      );
      if (error) showErrorToast(error);
      if (result && result.data.items) {
        const citiesMap = new Map<string, { name: string; code: string }>();
        result.data.items.forEach((airport: any) => {
          if (
            airport.cityName &&
            airport.code &&
            !citiesMap.has(airport.cityName)
          ) {
            citiesMap.set(airport.cityName, {
              name: airport.cityName,
              code: airport.code,
            });
          }
        });
        setCityOptions(Array.from(citiesMap.values()));
      }
    };

    const get_all_arival_city_by_code = async () => {
      const url = `${process.env.NEXT_PUBLIC_SERVER}${airportEndpoint["post-search-airport"]}`;
      const payload = {
        filters: [
          { key: "countryCode", operator: "equal", value: countryArrivalCode },
        ],
        sorts: [{ key: "id", type: "DESC" }],
        rpp: 100,
        page: 1,
      };
      const { result, error } = await apiRequest<any>(
        url,
        "POST",
        undefined,
        payload
      );
      if (error) showErrorToast(error);
      if (result && result.data.items) {
        const citiesMap = new Map<string, { name: string; code: string }>();
        result.data.items.forEach((airport: any) => {
          if (
            airport.cityName &&
            airport.code &&
            !citiesMap.has(airport.cityName)
          ) {
            citiesMap.set(airport.cityName, {
              name: airport.cityName,
              code: airport.code,
            });
          }
        });
        setCityArrivalOptions(Array.from(citiesMap.values()));
      }
    };

    get_all_arival_city_by_code();
    get_all_city_by_code();
  }, [countryCode, countryArrivalCode]);

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    if (!session) {
      showErrorToast("You must sign in to search!");
      return;
    }
    const queryParams = `?departure=${encodeURIComponent(
      departure || ""
    )}&destination=${encodeURIComponent(
      destination || ""
    )}&date=${encodeURIComponent(data.date)}`;
    window.location.href = `/SearchingPage${queryParams}`;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <div className="flex justify-between items-center gap-5">
        <div className="flex-1 min-w-[200px]">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="country"
          >
            Country
          </label>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <Autocomplete
                className="w-full"
                options={countryOptions.map((option) => option.name)}
                value={field.value || "Vietnam"}
                onChange={(_, value) => {
                  field.onChange(value);
                  setCountry(value);
                  const selectedCountryCode = countryOptions.find(
                    (option) => option.name === value
                  )?.code;
                  if (!!selectedCountryCode)
                    setCountryCode(selectedCountryCode);
                }}
                renderInput={(params) => (
                  <TextField {...params} size="small" placeholder="Vietnam" />
                )}
              />
            )}
          />
          {errors.country && (
            <div className="text-red-500">{errors.country.message}</div>
          )}
        </div>

        <div className="flex-1 min-w-[200px]">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="country"
          >
            Arrival Country
          </label>
          <Controller
            name="countryArrival"
            control={control}
            render={({ field }) => (
              <Autocomplete
                className="w-full"
                options={countryOptions.map((option) => option.name)}
                value={field.value || "Vietnam"}
                onChange={(_, value) => {
                  field.onChange(value);
                  setCountryArrival(value);
                  const selectedCountryArrsetCountryArrivalCode =
                    countryOptions.find(
                      (option) => option.name === value
                    )?.code;
                  if (!!selectedCountryArrsetCountryArrivalCode)
                    setCountryArrivalCode(
                      selectedCountryArrsetCountryArrivalCode
                    );
                }}
                renderInput={(params) => (
                  <TextField {...params} size="small" placeholder="Vietnam" />
                )}
              />
            )}
          />
          {errors.countryArrival && (
            <div className="text-red-500">{errors.countryArrival.message}</div>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center mb-10 gap-5">
        <div className="flex-1 min-w-[200px]">
          <label
            htmlFor="departure"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Departure
          </label>
          <Autocomplete
            className="w-full"
            onChange={(_, value) => setDeparture(value ? value.code : null)}
            disabled={isSubmitting || !countryCode}
            options={cityOptions}
            getOptionLabel={(option) => option.name}
            value={
              cityOptions.find((option) => option.code === departure) || null
            }
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                {...register("departure")}
                placeholder="Departure City"
              />
            )}
          />
          {errors.departure && (
            <div className="text-red-500">{errors.departure.message}</div>
          )}
        </div>

        <div className="flex-1 min-w-[200px]">
          <label
            htmlFor="destination"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Destination
          </label>
          <Autocomplete
            className="w-full"
            onChange={(_, value) => setDestination(value ? value.code : null)}
            disabled={isSubmitting || !countryArrivalCode}
            options={cityArrivalOptions}
            getOptionLabel={(option) => option.name}
            value={
              cityArrivalOptions.find(
                (option) => option.code === destination
              ) || null
            }
            renderInput={(params) => (
              <TextField
                {...params}
                size="small"
                {...register("destination")}
                placeholder="Destination City"
              />
            )}
          />
          {errors.destination && (
            <div className="text-red-500">{errors.destination.message}</div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center w-full">
        <div className="flex-1 min-w-[200px] max-w-[300px]">
          <label
            htmlFor="date"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Date
          </label>
          <input
            {...register("date")}
            id="date"
            type="date"
            className="w-full p-2 rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          />
          {errors.date && (
            <div className="text-red-500">{errors.date.message}</div>
          )}
        </div>
        <button
          disabled={isSubmitting}
          type="submit"
          className="btn btn-ghost w-14 rounded-full mt-6"
        >
          {isSubmitting ? (
            <span className="loading loading-spinner loading-lg"></span>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-5 h-5"
            >
              <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
