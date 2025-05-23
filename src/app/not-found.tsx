import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex w-full justify-center">
      <div className="w-full max-w-[1000px] items-center p-10 rounded-2xl bg-white h-screen">
        <div className="flex flex-col lg:flex-row  mt-10 justify-between items-center w-full">
          <picture className="flex justify-center">
            <img
              src="https://i.postimg.cc/3JNzpRR6/realistic-cube-box-mockup.png"
              alt="Illustration"
              className="max-w-96 bg-cover justify-center rounded-e-2xl"
            />
          </picture>

          <div className="flex flex-col items-center gap-4">
            <span className="text-8xl font-bold">404 !</span>
            <p className="text-3xl font-semibold">Page Not Found</p>
            <p className="text-sm text-gray-500 text-center">
              We're sorry the page you requested could not be found. Please go
              back to the homepage
            </p>
            <Link className="btn bg-slate-800 rounded-2xl text-white" href="/">
              Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
