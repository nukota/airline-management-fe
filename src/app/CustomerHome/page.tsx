"use client";

import Link from "next/link";

function CustomerHome() {
  return (
    <div className="flex justify-center items-center ">
      <div className="flex flex-row h-[500px] mt-10 ">
        <div className="flex p-10 flex-col justify-between rounded-l-lg h-full  bg-white w-[500px]">
          <h2 className="text-2xl font-bold  text-indigo-900">
            Welcome, <br /> find the best flights with us!
          </h2>
          <form>
            <div className=" flex flex-row justify-between items-center mb-10">
              <div className="mr-5  ">
                <label
                  htmlFor=""
                  className=" px-1 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Departure
                </label>
                <div className="flex">
                  <input
                    type="text"
                    className="w-full p-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="HoChiMinh (HCM)"
                  />
                </div>
              </div>
              <div className=" ">
                <label
                  htmlFor=""
                  className=" px-1 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Destination
                </label>
                <div className="flex">
                  <input
                    type="text"
                    className="w-full p-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="HaNoi (HN)"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-row justify-between items-center ">
              <div className=" w-full mb-5">
                <label
                  htmlFor=""
                  className=" px-1 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Date
                </label>
                <div>
                  <input
                    type="date"
                    className="w-full p-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
              <div className="w-1/2 ml-5 mb-5">
                <label
                  htmlFor=""
                  className=" px-1 block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Flights
                </label>
                <select className="select select-bordered w-full p-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500">
                  <option>One way</option>
                  <option>Round trip</option>
                </select>
              </div>
            </div>
          </form>

          <div className="flex justify-end w-full">
            <Link
              href={"/SearchingPage"}
              className=" btn btn-ghost w-14 bg-slate-200 rounded-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                className="w-5 h-5"
              >
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="flex w-96 ">
          <div
            className="h-full w-full bg-cover justify-center rounded-e-xl "
            style={{
              backgroundImage:
                "url('https://images.pexels.com/photos/1928067/pexels-photo-1928067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default CustomerHome;
