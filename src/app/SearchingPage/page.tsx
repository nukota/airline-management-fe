"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PlanesData } from "@/planes";
import GridSearchingView from "@/components/GridSearchingView";
import ListSearchingView from "@/components/ListSearchingView";
import "react-toastify/dist/ReactToastify.css";
import { DataFetchType, FlightType } from "@/interfaces/type";
import useFetch from "@/hooks/useFetch";
import SearchModal from "@/components/SearchModal";
import axios from "axios";

export default function SearchingPage() {
  const searchParams = useSearchParams();
  const departure = searchParams.get("departure");
  const destination = searchParams.get("destination");
  const date = searchParams.get("date");

  const [filterFlight, setFilterFlight] = useState<FlightType[]>([]);
  const [availableFlight, setAvailableFlight] = useState<boolean>(false);
  const [filters, setFilters] = useState<string | null>(null);
  const [gridView, setGridView] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<DataFetchType<FlightType> | null>(null);


  useEffect(() => {
    const fetchFlights = async () => {
      setLoading(true);
      try {
        const payload = {
          departureAirportCode: departure,
          arrivalAirportCode: destination,
          departureDate: date,
        };
        const url = `${process.env.NEXT_PUBLIC_SERVER}/flight-service/flight/search`;
        const response = await axios.post(url, payload);
        setData(response.data);
        if (response.data && response.data.data) {
          const allFlightInfo = response.data.data.map((dt: FlightType) => {
            // const planeData = PlanesData.find(
            //   (plane) => plane.brand === dt.airlines
            // );
            // const logo = planeData ? planeData.logo : "";
            return {
              ...dt,
              // logo: logo,
            };
          });
          setFilterFlight(allFlightInfo);
        } else {
          setFilterFlight([]);
        }
      } catch (error) {
        setFilterFlight([]);
      }
      setLoading(false);
    };

    fetchFlights();
  }, [departure, destination, date]);

  const handleFilter = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    const filterValue = event.currentTarget.textContent;

    if (filterValue) {
      setFilters(filterValue);
      let filteredFlights = data?.data;

      if (filterValue.includes("Pricesb")) {
        filteredFlights?.sort(
          (a: any, b: any) => Number(a.price) - Number(b.price)
        );
      } else if (filterValue.includes("Prices")) {
        filteredFlights?.sort(
          (a: any, b: any) => Number(b.price) - Number(a.price)
        );
      }
      if (filteredFlights) setFilterFlight(filteredFlights);
    }
  };

  const offFilter = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    setFilters(null);
    if (data?.data) setFilterFlight(data?.data);
  };

  const handleFilterAvailableFlight = () => {
    setAvailableFlight(!availableFlight);
  };

  const handleChangeViewStyle = () => {
    setGridView(!gridView);
  };

  let content;
  if (gridView) {
    content = <GridSearchingView allFlight={filterFlight} />;
  } else {
    content = <ListSearchingView allFlight={filterFlight} />;
  }

  return (
    <main data-testid className="main  rounded-2xl p-5">
      <div className="flex justify-center items-center mb-10  p-5 ">
        <>
          <p className="text-4xl font-bold  text-slate-800">{departure}</p>

          <div className="flex flex-col justify-center items-center mx-3 ">
            <span className="text-base">{date}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="200"
              height="15"
              viewBox="0 0 252 17"
              fill="none"
              className="mt-1"
            >
              <rect y="6" width="252" height="4" rx="3.5" fill="#C9C9C9" />
              <ellipse cx="243" cy="8.5" rx="9" ry="8.5" fill="black" />
              <ellipse cx="9" cy="8.5" rx="9" ry="8.5" fill="#B3B3B3" />
            </svg>
          </div>
          <p className="text-4xl font-bold text-slate-800">{destination}</p>
        </>
      </div>

      <div className="flex justify-between items-center ">
        <div>
          <div className="flex rounded-md bg-base-300 p-1 justify-around ">
            <div
              className={`${
                availableFlight
                  ? "flex justify-center rounded-md px-5 py-1  text-sm font-medium"
                  : "bg-white flex justify-center rounded-md px-5 py-1  text-sm font-medium"
              }`}
              onClick={() => {
                handleFilterAvailableFlight();
              }}
            >
              All flight
            </div>

            <div
              className={`${
                availableFlight
                  ? "bg-white flex justify-center rounded-md px-5 py-1  text-sm font-medium"
                  : "flex justify-center rounded-md px-5 py-1  text-sm font-medium"
              }`}
              onClick={() => {
                handleFilterAvailableFlight();
              }}
            >
              Available flight
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <div className="flex justify-between items-center mr-4 rounded-lg  h-10 px-2 bg-base-300">
            <p className="font-normal text-slate-600 mr-3 text-sm">Sort by</p>

            {!!filters && (
              <div className="flex items-center justify-between bg-white rounded-lg p-1 px-3  mr-2">
                <span className="text-sm mr-3">{filters}</span>
                <a onClick={offFilter}>
                  <svg
                    className="w-4 h-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                  </svg>
                </a>
              </div>
            )}

            <div className="dropdown dropdown-bottom dropdown-end drop-shadow-lg z-[50] ">
              <div
                tabIndex={0}
                role="button"
                className="flex justify-center items-center rounded-full "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 "
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M11.1924 5.65685C11.5829 5.26633 11.5829 4.63316 11.1924 4.24264L8.36397 1.41421C8.30576 1.356 8.24485 1.30212 8.18165 1.25259C7.50286 0.720577 6.55947 0.689024 5.84929 1.15793C5.73839 1.23115 5.63317 1.31658 5.53554 1.41421L2.70711 4.24264C2.31658 4.63316 2.31658 5.26633 2.70711 5.65685C3.09763 6.04738 3.7308 6.04738 4.12132 5.65685L6.00003 3.77814V18C6.00003 18.5523 6.44775 19 7.00003 19C7.55232 19 8.00003 18.5523 8.00003 18V3.8787L9.77818 5.65685C10.1687 6.04737 10.8019 6.04737 11.1924 5.65685Z"
                    fill="#0F0F0F"
                  />
                  <path
                    d="M12.7071 18.3432C12.3166 18.7337 12.3166 19.3668 12.7071 19.7574L15.5355 22.5858C15.6332 22.6834 15.7384 22.7689 15.8493 22.8421C16.6256 23.3546 17.6805 23.2692 18.364 22.5858L21.1924 19.7574C21.5829 19.3668 21.5829 18.7337 21.1924 18.3432C20.8019 17.9526 20.1687 17.9526 19.7782 18.3432L18 20.1213L18 6C18 5.44771 17.5523 5 17 5C16.4477 5 16 5.44771 16 6L16 20.2218L14.1213 18.3432C13.7308 17.9526 13.0976 17.9526 12.7071 18.3432Z"
                    fill="#0F0F0F"
                  />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52 mt-5"
              >
                <li>
                  <a
                    className="flex w-full justify-between"
                    onClick={handleFilter}
                  >
                    <p>Pricesb</p>
                    <svg
                      className="w-3 h-3"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48.85 166.12"
                    >
                      <path d="M46.35,30.37,18.48,2.51A8.56,8.56,0,0,0,11.58,0c-.28,0-.57,0-.86,0H8.55A8.55,8.55,0,0,0,0,8.55v149a8.55,8.55,0,0,0,8.55,8.55h2.17a8.55,8.55,0,0,0,8.55-8.55V35.25l11.1,11.1a8.56,8.56,0,0,0,12.1,0l3.88-3.88A8.56,8.56,0,0,0,46.35,30.37Z" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a
                    className="flex w-full justify-between"
                    onClick={handleFilter}
                  >
                    <p>Prices</p>
                    <svg
                      className="w-3 h-3"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48.85 166.12"
                    >
                      <path d="M46.35,30.37,18.48,2.51A8.56,8.56,0,0,0,11.58,0c-.28,0-.57,0-.86,0H8.55A8.55,8.55,0,0,0,0,8.55v149a8.55,8.55,0,0,0,8.55,8.55h2.17a8.55,8.55,0,0,0,8.55-8.55V35.25l11.1,11.1a8.56,8.56,0,0,0,12.1,0l3.88-3.88A8.56,8.56,0,0,0,46.35,30.37Z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className="flex rounded-md bg-base-300 p-2 mr-3 justify-around ">
              <div
                className={`${
                  gridView
                    ? "bg-white flex justify-center rounded-md px-5 py-1  text-sm font-medium"
                    : "flex justify-center rounded-md px-5 py-1  text-sm font-medium"
                }`}
                onClick={handleChangeViewStyle}
              >
                <div className="flex justify-between items-center gap-2 ">
                  <p>Grid</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-3 h-3"
                    viewBox="0 0 62 62"
                    fill="none"
                  >
                    <rect width="26" height="26" rx="5" fill="#4A4A4A" />
                    <rect x="36" width="26" height="26" rx="5" fill="#4A4A4A" />
                    <rect y="36" width="26" height="26" rx="5" fill="#4A4A4A" />
                    <rect
                      x="36"
                      y="36"
                      width="26"
                      height="26"
                      rx="5"
                      fill="#4A4A4A"
                    />
                  </svg>
                </div>
              </div>

              <div
                className={`${
                  gridView
                    ? "flex justify-center rounded-md px-5 py-1  text-sm font-medium"
                    : "bg-white flex justify-center rounded-md px-5 py-1  text-sm font-medium"
                }`}
                onClick={handleChangeViewStyle}
              >
                <div className="flex justify-between items-center gap-2 ">
                  <p>List</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 60 40"
                    fill="none"
                  >
                    <rect width="60" height="6" rx="2" fill="#4A4A4A" />
                    <rect y="19" width="60" height="5" rx="2" fill="#4A4A4A" />
                    <rect y="38" width="60" height="4" rx="2" fill="#4A4A4A" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white flex items-center justify-between rounded-3xl">
            <SearchModal />
          </div>
        </div>
      </div>
      {/* {isFetching && (
        <div className="flex justify-center w-full h-[300px] mt-20 ">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )} */}
      {content}
    </main>
  );
}
