"use client";
import { useSession } from "next-auth/react";
import SearchForm from "@/components/SearchForm";

export default function Home() {
  const { data: session } = useSession();
  return (
    <main className="main">
      <div className="flex justify-center items-center ">
        <div className="flex flex-row h-[500px] mt-10 ">
          <div className="flex p-10 flex-col justify-around rounded-2xl lg:rounded-l-2xl lg:rounded-r-none h-full bg-white ">
            <h2 className="text-2xl font-bold mb-5 text-indigo-900">
              Welcome {session?.user.name ?? "Guest"}, <br /> find the best
              flights with us!
            </h2>

            <SearchForm />
          </div>
          <div className="w-full hidden lg:block ">
            <picture>
              <img
                src="https://images.pexels.com/photos/1928067/pexels-photo-1928067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt="Illustration"
                className=" h-full w-full bg-cover justify-center rounded-e-2xl"
              />
            </picture>
          </div>
        </div>
      </div>
    </main>
  );
}
