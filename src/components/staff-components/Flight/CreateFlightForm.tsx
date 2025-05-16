"use client";
import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import axios from "axios";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { PlanesData } from "@/planes";
import { IntermediateAirport } from "@/interfaces/type";
import { useRouter } from "next/navigation";
import { CreateFlightFormInterfaces } from "@/interfaces/form";
import { useRefreshFlights } from "@/provider/FlightProvider";
import { useCreateNewFlight } from "@/hooks/flight-hooks/useCreateNewFlight";

const CreateFlightForm: React.FC<{ numberFlight: number }> = ({
  numberFlight,
}) => {
  const { data: session } = useSession();
  const router = useRouter();

  const currentNumberFlight = numberFlight;

  const [formData, setFormData] = useState<CreateFlightFormInterfaces>({
    flightId: "",
    airlines: "",
    flightDuration: 0,
    price: "",
    departureAirportId: "",
    arrivalAirportId: "",
    departureTime: "",
  });
  const [flightId, setFlightId] = useState<string>("");

  const [airlines, setAirlines] = useState<string | null>(null);

  const [departure, setDeparture] = useState<string | null>(null);
  const [destination, setDestination] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [intermediateAirports, setIntermediateAirports] = useState<
    IntermediateAirport[]
  >([]);
  const [airportOptions, setAirportOptions] = useState<
    { airportId: string; airportName: string }[]
  >([]);
  useEffect(() => {
    const getAllAirports = async () => {
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${process.env.NEXT_PUBLIC_SERVER}/airport`,
        headers: {},
      };
      try {
        const response = await axios.request(config);
        const responseData = response.data.data;
        const options = responseData.map((airport: any) => ({
          airportId: airport.airportId,
          airportName: airport.airportName,
        }));
        setAirportOptions(options);
      } catch (e) {
        console.error(e);
      }
    };
    getAllAirports();
  }, []);

  const addIntermediateAirport = async (
    intermediateAirport: IntermediateAirport
  ) => {
    const apiData = {
      flightId: intermediateAirport.flightId,
      airportId: Number(intermediateAirport.airportId),
      duration: Number(intermediateAirport.duration),
      notes: intermediateAirport.notes,
    };

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_SERVER}/flight/add-intermediate-airport`,
      headers: {
        Authorization: session?.user.token,
        "Content-Type": "application/json",
      },
      data: JSON.stringify(apiData),
    };
    try {
      const response = await axios.request(config);
      console.log(response);
    } catch (e: any) {
      console.log(e);
    }
  };
  const refreshFLights = useRefreshFlights();
  const createNewFlight = useCreateNewFlight();
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = { ...formData };
    console.log(data);

    try {
      if (session?.user.token) {
        await createNewFlight(session?.user.token, JSON.stringify(data));
        intermediateAirports.forEach((inter) => addIntermediateAirport(inter));
      }
    } catch (e: any) {
      console.log(e);
    }
    // try {
    //   const response = await fetch(`/api/auth/CreateFlight`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    //   });
    //   const mss = await response.json();
    //   console.log(mss);
    //   if (!(mss.message === "success")) {
    //     mss.message.message.map((m: any) => {
    //       toast.error(m || "An error occurred", {
    //         position: "top-right",
    //         autoClose: 5000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",
    //       });
    //     });
    //   } else {
    //     intermediateAirports.forEach((inter) => addIntermediateAirport(inter));

    //     toast.success("Create new Flight succesful", {
    //       position: "top-right",
    //       autoClose: 3000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "light",
    //     });
    //     refreshFLights();
    //     // setInterval(() => {
    //     //   window.location.reload();
    //     // }, 3000);
    //   }
    // } catch (e: any) {
    //   toast.error("Wrong api's client method", {
    //     position: "top-right",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    // }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddIntermediateAirport = () => {
    if (intermediateAirports.length < 2 && flightId) {
      setIntermediateAirports([
        ...intermediateAirports,
        {
          flightId: flightId,
          airportId: "",
          duration: "",
          notes: "",
        },
      ]);
    }
  };

  const handleIntermediateAirportChange = (
    index: number,
    field: keyof IntermediateAirport,
    value: string
  ) => {
    const updatedIntermediateAirports = [...intermediateAirports];
    updatedIntermediateAirports[index][field] = value;

    setIntermediateAirports(updatedIntermediateAirports);
  };

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="btn btn-ghost transition duration-300"
      >
        New
        <svg
          className="w-4 h-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
        </svg>
      </button>
      {showModal && currentNumberFlight === numberFlight && (
        <div className="fixed bg-black bg-opacity-15 inset-0 flex items-center justify-center z-50">
          <form
            onSubmit={onSubmit}
            className="min-w-[900px] p-8 px-8 mx-auto bg-white shadow-md rounded-2xl max-w-4xl"
          >
            <h1 className="text-2xl font-bold">Tạo chuyến bay</h1>
            <div className="divider h-1"></div>
            <div className="mb-3">
              <h2 className="text-xl font-semibold mb-6">
                Thông tin chuyến bay
              </h2>
              <div className="mb-5">
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="flightId"
                  >
                    Mã máy bay
                  </label>
                  <input
                    required
                    id="flightId"
                    name="flightId"
                    className="border rounded w-full py-2 px-3 text-gray-700"
                    type="text"
                    placeholder="BBA00"
                    value={formData.flightId}
                    onChange={(e) => {
                      handleInputChange(e);
                      setFlightId(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="airlines"
                  >
                    Hãng máy bay
                  </label>
                  <Autocomplete
                    onChange={(_, value) => {
                      if (value) {
                        setAirlines(value);

                        setFormData({
                          ...formData,
                          airlines: value,
                        });
                      }
                    }}
                    options={PlanesData.map((op) => op.brand)}
                    value={airlines}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        id="airlines"
                        name="airlines"
                        size="small"
                        placeholder="VietNam Airlines"
                      />
                    )}
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="flightDuration"
                  >
                    Thời gian bay
                  </label>
                  <input
                    required
                    id="flightDuration"
                    name="flightDuration"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                    type="text"
                    placeholder="02/12/2024 4:20"
                    value={formData.flightDuration}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="price"
                  >
                    Giá vé
                  </label>
                  <input
                    required
                    id="price"
                    name="price"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                    type="text"
                    placeholder="1500000 VND"
                    value={formData.price}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="date"
                  >
                    Ngày giờ
                  </label>
                  <input
                    required
                    id="departureTime"
                    name="departureTime"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                    type="datetime-local"
                    placeholder="Ngày giờ"
                    value={formData.departureTime}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="mb-3">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="departure"
                  >
                    Sân bay đi
                  </label>
                  <Autocomplete
                    onChange={(_, value) => {
                      setDeparture(value);
                      const id = airportOptions.find(
                        (op) => op.airportName === value
                      )?.airportId;
                      setFormData({
                        ...formData,
                        departureAirportId: id || "",
                      });
                    }}
                    options={airportOptions.map((op) => op.airportName)}
                    value={departure}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        id="departure"
                        name="departure"
                        size="small"
                        placeholder="Tân Sơn Nhất"
                      />
                    )}
                  />
                </div>
                <div>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="destination"
                  >
                    Sân bay đến
                  </label>
                  <Autocomplete
                    onChange={(_, value) => {
                      setDestination(value);
                      const id = airportOptions.find(
                        (op) => op.airportName === value
                      )?.airportId;
                      setFormData({ ...formData, arrivalAirportId: id || "" });
                    }}
                    options={airportOptions.map((op) => op.airportName)}
                    value={destination}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        id="destination"
                        name="destination"
                        size="small"
                        placeholder="Nội Bài"
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            <div className="mb-3">
              <h2 className="text-xl font-semibold mb-6">Sân bay trung gian</h2>
              <div className="flex">
                <div className="w-20">
                  <span className="flex justify-center items-center text-gray-700 text-sm font-bold">
                    STT
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-5 w-full">
                  <span className="block text-gray-700 text-sm font-bold">
                    Sân bay trung gian
                  </span>
                  <span className="block text-gray-700 text-sm font-bold">
                    Thời gian
                  </span>
                  <span className="block text-gray-700 text-sm font-bold">
                    Ghi chú
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-3">
              {intermediateAirports.map((inter, index) => (
                <div className="flex mb-3" key={index}>
                  <div className="w-20 flex justify-center items-center">
                    <span>{index + 1}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-5 w-full">
                    <Autocomplete
                      onChange={(_, value) => {
                        const id = airportOptions.find(
                          (op) => op.airportName === value
                        )?.airportId;
                        if (id)
                          handleIntermediateAirportChange(
                            index,
                            "airportId",
                            id
                          );
                      }}
                      options={airportOptions.map((op) => op.airportName)}
                      value={
                        airportOptions.find(
                          (op) =>
                            op.airportId ===
                            intermediateAirports[index]["airportId"]
                        )?.airportName
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          id="departure"
                          name="departure"
                          size="small"
                          placeholder="Tân Sơn Nhất"
                        />
                      )}
                    />
                    <input
                      required
                      onChange={(e) =>
                        handleIntermediateAirportChange(
                          index,
                          "duration",
                          e.target.value
                        )
                      }
                      id={`time-${index}`}
                      className="border rounded w-full py-2 px-3 text-gray-700 focus:shadow-outline"
                      type="text"
                      placeholder="Thời gian"
                    />
                    <input
                      required
                      onChange={(e) =>
                        handleIntermediateAirportChange(
                          index,
                          "notes",
                          e.target.value
                        )
                      }
                      id={`note-${index}`}
                      className="border rounded w-full py-2 px-3 text-gray-700 focus:shadow-outline"
                      type="text"
                      placeholder="Ghi chú"
                    />
                  </div>
                </div>
              ))}
              <div>
                <button
                  type="button"
                  onClick={handleAddIntermediateAirport}
                  className="text-gray-500 text-sm font-bold mb-2 bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center focus:bg-gray-300"
                >
                  +
                </button>
              </div>
            </div>
            <div className="flex  gap-3 justify-end">
              <button
                onClick={() => {
                  setIntermediateAirports([]);
                  setShowModal(false);
                }}
                className="btn btn-ghost btn-sm rounded-2xl "
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-sm bg-green-500 text-white rounded-2xl"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreateFlightForm;
