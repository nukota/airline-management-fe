"use client";

import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { toast } from "react-toastify";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormFields = z.infer<typeof schema>;

interface prop {
  isModal?: boolean;
}
const SignInForm: React.FC<prop> = ({ isModal = false }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "ducnguyenkudo@gmail.com",
      password: "@Duc201103",
    },
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      admin: false,
    });

    if (!res?.error) {
      showSuccessToast("Sign in succesfully");

      if (!isModal) router.push("/");
      else {
        router.refresh();
      }
    } else {
      console.log(res);
      showErrorToast(res.error);
    }
  };

  return (
    <form
      className="flex gap-5 flex-col z-50 w-[330px]"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="mt-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
        <input
          {...register("email")}
          type="text"
          id="email"
          autoComplete="on"
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="name@flowbite.com"
        />
        {errors.email && (
          <div className="text-red-500">{errors.email.message}</div>
        )}
      </div>
      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          {...register("password")}
          type="password"
          id="password"
          autoComplete="on"
          placeholder="******"
          className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
        {errors.password && (
          <div className="text-red-500">{errors.password.message}</div>
        )}
      </div>

      <button
        disabled={isSubmitting}
        type="submit"
        id="signin"
        data-testid="signin-button"
        className="w-full py-2 px-4 bg-black text-white rounded hover:bg-gray-900"
      >
        {isSubmitting ? (
          <span className="loading loading-spinner loading-md"></span>
        ) : (
          "Sign In"
        )}
      </button>
      <GoogleSignInButton />
    </form>
  );
};

export default SignInForm;
