"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import FormData from "form-data";
import { toast } from "react-toastify";
import { GoogleSignUpButton } from "./GoogleSignUpButton";

import { useRouter } from "next/navigation";
import {
  showErrorToast,
  showErrorToasts,
  showSuccessToast,
} from "@/utils/toastUtils";
import { customerEndpoint } from "@/services/axios/endpoints/customer.endpoint";
import { apiRequest } from "@/utils/apiRequest";
import { useSession } from "next-auth/react";

const schema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      "Password must contain uppercase letter, number, and special character"
    ),
  fullname: z.string().nonempty("Name is required"),
  address: z.string().nonempty("Address Required"),
  nationality: z.string().default("VN"),
  phoneNumber: z.string().nonempty("PhoneNumber Required"),
  birthday: z.string().nonempty("Birthday Required"),
  cccd: z.string().nonempty("CCCD is Required"),
  cccdPicture: z
    .any()
    .refine((files) => files?.length == 1, "Image is required.")
    .transform(async (files) => {
      if (files && files.length > 0) {
        const formData = new FormData();
        formData.append("image", files[0], files[0].name);

        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER}/customer/upload-profile-picture`,
          formData
        );

        return response.data.picture_url;
      }
    })
    .default("https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"),
});

type FormFields = z.infer<typeof schema>;

const SignUpForm = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data, event) => {
    try {
      event?.preventDefault();
      const response = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const mss = await response.json();
      console.log(mss);

      if (mss.message.statusCode === 200) {
        verifiedEmailHandle(data.email);
      } else {
        const messages = mss.message?.message;
        showErrorToasts(messages);
      }
    } catch (e) {
      showErrorToast("Error");
      console.log(e);
    }
  };

  const verifiedEmailHandle = async (verifiedEmail: string) => {
    console.log(JSON.stringify({ email: verifiedEmail }));
    const url = `${process.env.NEXT_PUBLIC_SERVER}${customerEndpoint["post-send-verify-email"]}`;
    const { result, error } = await apiRequest(
      url,
      "POST",
      session?.user.token,
      JSON.stringify({ email: verifiedEmail })
    );
    if (error) showErrorToast(error);
    else {
      showSuccessToast("Update succesful");
      setInterval(() => {
        router.push("/SignIn", { scroll: false });
      }, 3000);
    }
  };

  return (
    <div>
      <form
        className="grid grid-cols-2 gap-6 p-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Your Name
          </label>
          <input
            {...register("fullname")}
            type="text"
            id="name"
            data-testid="name"
            placeholder="John"
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
          />
          {errors.fullname && (
            <div className="text-red-500">{errors.fullname.message}</div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Birthday
          </label>
          <input
            {...register("birthday")}
            type="date"
            data-testid="birthday"
            id="birthday"
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
          />
          {errors.birthday && (
            <div className="text-red-500">{errors.birthday.message}</div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            CCCD
          </label>
          <input
            {...register("cccd")}
            type="text"
            id="cccd"
            data-testid="cccd"
            placeholder="John"
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
          />
          {errors.cccd && (
            <div className="text-red-500">{errors.cccd.message}</div>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            CCCD Picture
          </label>
          <input
            {...register("cccdPicture")}
            type="file"
            id="cccdPicture"
            className="file-input file-input-bordered w-full file-input-sm rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
          />
        </div>
        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <input
            {...register("address")}
            type="text"
            id="address"
            data-testid="address"
            placeholder="123 Street, City"
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
          />
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            {...register("phoneNumber")}
            type="tel"
            id="phoneNumber"
            data-testid="phoneNumber"
            placeholder="123-456-7890"
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
          />
          {errors.phoneNumber && (
            <div className="text-red-500">{errors.phoneNumber.message}</div>
          )}
        </div>
        <div className="col-span-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            {...register("email")}
            type="email"
            id="email"
            data-testid="email"
            placeholder="you@example.com"
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
          />
          {errors.email && (
            <div className="text-red-500">{errors.email.message}</div>
          )}
        </div>
        <div className="col-span-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            {...register("password")}
            type="password"
            id="password"
            data-testid="password"
            autoComplete="on"
            placeholder="Enter your password"
            className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
          />
          {errors.password && (
            <div className="text-red-500">{errors.password.message}</div>
          )}
        </div>
        <button
          disabled={isSubmitting}
          type="submit"
          data-testid="signup-button"
          className="col-span-2 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none"
        >
          {isSubmitting ? "Loading... " : " Create account"}
        </button>
        <div className="col-span-2">
          <GoogleSignUpButton />
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
