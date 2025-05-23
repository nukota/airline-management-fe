"use client";

import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import axios from "axios";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { showErrorToasts, showSuccessToast } from "@/utils/toastUtils";
import { useCreateNewTicket } from "@/hooks/ticket-hooks/useCreateNewTicket";

const schema = z.object({
  flightId: z.string().nonempty("FlightId required"),
  seatId: z.string().nonempty("SeatId required"),
  fullName: z.string().nonempty("Full Name required"),
  email: z.string().nonempty("Email required"),
  phoneNumber: z.string().nonempty("Phone Number required"),
  cccd: z.string().nonempty("Cccd required"),
});

type FormFields = z.infer<typeof schema>;

function CreateTicketForm() {
  const { data: session } = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const [flightIds, setFlightIds] = useState<string[]>([]);
  const [flightID, setFlightID] = useState<string | null>(null);
  const [seatIdChoosen, setSeatIdChoosen] = useState<string | null>(null);
  useEffect(() => {
    const getAllFlight = async () => {
      const url = `${process.env.NEXT_PUBLIC_SERVER}/flight`;
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: url,
        headers: {
          Authorization: session?.user.token,
        },
      };
      try {
        const response = await axios.request(config);
        const allFlightIds = response.data.data.map(
          (flight: any) => flight.flightId
        );
        setFlightIds(allFlightIds);
      } catch (e) {
        console.log(e);
      }
    };
    getAllFlight();
  }, [session?.user.token]);
  const creatTicket = useCreateNewTicket();
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    event?.preventDefault();
    if (session?.user.token) {
      await creatTicket(session?.user.token, data);
    } else {
      console.error("No access token available");
    }
    // const url = `${process.env.NEXT_PUBLIC_SERVER}/ticket`;
    // const config = {
    //   method: "post",
    //   maxBodyLength: Infinity,
    //   url: url,
    //   headers: {
    //     Authorization: session?.user.token,
    //     "Content-Type": "application/json",
    //   },
    //   data: JSON.stringify(data),
    // };

    // try {
    //   const response = await axios.request(config);
    //   showSuccessToast("Create successful");
    // } catch (e: any) {
    //   console.log(e);
    //   const messages = e.response?.data?.message || ["An error occurred"];
    //   showErrorToasts(Array.isArray(messages) ? messages : [messages]);
    // }
  };
  const [createTicketModal, setCreateTicketModal] = useState<boolean>(false);

  const [seatIdOptions, setSeatIdOptions] = useState<string[]>([]);

  useEffect(() => {
    const get_all_seats_by_flight = async () => {
      if (!flightID) return;

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_SERVER}/seat-flight/seat-list?flightId=${flightID}`,
        headers: {},
      };
      try {
        const response = await axios.request(config);

        const responseData = response.data.data
          .filter((seat: any) => seat.isEmpty)
          .map((seat: any) => seat.seatId);

        setSeatIdOptions(responseData);
      } catch (e) {
        console.log(e);
      }
    };
    get_all_seats_by_flight();
  }, [flightID]);

  return (
    <div>
      <div>
        <button
          onClick={() => setCreateTicketModal(!createTicketModal)}
          className="btn btn-ghost transition duration-300"
        >
          Create Ticket
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>
        </button>
      </div>
      {createTicketModal && (
        <div className="fixed bg-black bg-opacity-15 backdrop-blur-sm inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-2xl">
            <div className="flex justify-between">
              <h3 className="font-bold text-2xl">Create Ticket Form</h3>
            </div>
            <form
              className="space-y-4 mt-5 z-50 w-full "
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex justify-between gap-5">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Full Name
                  </label>
                  <input
                    {...register("fullName")}
                    type="text"
                    id="username"
                    placeholder="John"
                    required
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  {errors.fullName && (
                    <div className="text-red-500">
                      {errors.fullName.message}
                    </div>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="cccd"
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                  >
                    CCCD
                  </label>
                  <input
                    {...register("cccd")}
                    type="text"
                    id="cccd"
                    required
                    className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="0123456789"
                  />
                  {errors.cccd && (
                    <div className="text-red-500">{errors.cccd.message}</div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  {...register("email")}
                  type="text"
                  id="email"
                  required
                  placeholder="abc@gmail.com"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
                {errors.email && (
                  <div className="text-red-500">{errors.email.message}</div>
                )}
              </div>
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  {...register("phoneNumber")}
                  type="tel"
                  id="phoneNumber"
                  required
                  placeholder="123-456-7890"
                  className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
              </div>

              <div className="flex justify-between gap-5">
                <div className="w-full">
                  <label
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="flightId"
                  >
                    Flight ID
                  </label>
                  <Autocomplete
                    className="w-full"
                    onChange={(_, value) => {
                      setFlightID(value);
                    }}
                    disabled={isSubmitting}
                    options={flightIds}
                    value={flightID}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        {...register("flightId")}
                        placeholder="BAAC"
                      />
                    )}
                  />
                  {errors.flightId && (
                    <div className="text-red-500">
                      {errors.flightId.message}
                    </div>
                  )}
                </div>
                <div className="w-full">
                  <label
                    className="block text-sm font-medium text-gray-900 dark:text-white"
                    htmlFor="seatId"
                  >
                    Seat ID
                  </label>
                  <Autocomplete
                    className="w-full"
                    onChange={(_, value) => {
                      setSeatIdChoosen(value);
                    }}
                    disabled={isSubmitting}
                    options={seatIdOptions}
                    value={seatIdChoosen}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        {...register("seatId")}
                        placeholder="A1"
                      />
                    )}
                  />
                  {errors.seatId && (
                    <div className="text-red-500">{errors.seatId.message}</div>
                  )}
                </div>
              </div>
              <div className=" flex justify-end gap-3">
                <button
                  className="btn btn-sm btn-ghost"
                  onClick={() => {
                    setCreateTicketModal(!createTicketModal);
                  }}
                >
                  Close
                </button>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="btn btn-sm btn-ghost bg-green-500 text-white"
                >
                  {isSubmitting ? (
                    <span className="loading loading-spinner loading-md"></span>
                  ) : (
                    "Create"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateTicketForm;
