"use client";

import { useSession } from "next-auth/react";
import StaffLoginForm from "@/components/staff-components/StaffLoginForm";
import { useRouter } from "next/navigation";

export default function StaffLogin() {
  const router = useRouter();
  const { data: session } = useSession();
  if (session && session?.user.role !== undefined) {
    router.push("/");
  }

  return (
    <main className="main">
      <div className="flex justify-center items-center ">
        <div className="flex p-10 flex-col justify-between rounded-2xl h-full  bg-white w-[500px]">
          <h2 className="text-2xl font-bold  text-indigo-900">
            Staff Management Login
          </h2>
          <StaffLoginForm />
        </div>
      </div>
    </main>
  );
}
