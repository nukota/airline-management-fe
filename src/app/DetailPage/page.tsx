"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import AirPlaneDetail from "@/components/AirPlaneDetail";
import axios from "axios";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { SeatColor } from "@/interfaces/type";
import SignInForm from "@/components/SignInForm";

const DetailPage = () => {
  const router = useRouter();
  const buildQuery = (params: any) => {
    return Object.keys(params)
      .map(
        (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
      )
      .join("&");
  };
  const handlePaymentClick = () => {
    const query = buildQuery({
      flightId,
      logo,
      brand,
      date,
      time,
      departure,
      destination,
      airportStart,
      airportEnd,
      duration,
      chooseSeat: JSON.stringify(
        chooseSeats.filter((seat) => seat.seat !== "")
      ),
    });
    router.push(`/PayingPage?${query}`);
  };
  const { data: session } = useSession();

  const [flightId, setFlightId] = useState<string>("");
  const [departure, setDeparture] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [brand, setBrand] = useState<string>("");
  const [logo, setLogo] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [airportStart, setAirportStart] = useState<string>("");
  const [airportEnd, setAirportEnd] = useState<string>("");

  const searchParams = useSearchParams();

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());

    setFlightId(params.flightId);
    setDeparture(params.departure || "");
    setDestination(params.destination || "");
    setDate(params.date || "");
    setTime(params.time || "");
    setBrand(params.brand || "");
    setLogo(params.logo || "");
    setPrice(params.price || "");
    setDuration(params.duration || "");
    setAirportStart(params.airportStart || "");
    setAirportEnd(params.airportEnd || " ");
  }, [searchParams]);

  const baseSeatChoose = {
    seat: "",
    color: "",
    class: "",
    priceBonusInterest: "",
    price: "",
  };
  const [chooseSeats, setChooseSeats] = useState<
    {
      seat: string;
      color: string;
      class: string;
      priceBonusInterest: string;
      price: string;
    }[]
  >([baseSeatChoose]);

  const handleSeatSelection = (
    seat: string,
    color: string,
    seatClass: string,
    priceBonusInterest: string
  ) => {
    if (!chooseSeats.find((selectedSeat) => selectedSeat.seat === seat)) {
      const newSeat = {
        seat,
        color: color,
        class: seatClass,
        priceBonusInterest: priceBonusInterest,
        price: (
          parseFloat(price) *
          (1 + parseFloat(priceBonusInterest))
        ).toString(),
      };
      const updatedSeats = [...chooseSeats];
      updatedSeats[updatedSeats.length - 1] = newSeat;
      setChooseSeats(updatedSeats);
    }
  };

  const handleChooseMoreSeat = () => {
    if (chooseSeats[chooseSeats.length - 1].seat === "") {
      toast.error("You must choose one", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    setChooseSeats([...chooseSeats, baseSeatChoose]);
  };

  const [alreadySelectedSeats, setAlreadySelectedSeats] = useState<
    {
      seatId: string;
      class: string;
      color: string;
      priceBonusInterest: string;
      selected: boolean;
    }[]
  >([]);

  useEffect(() => {
    const getSeatOfAirplane = async () => {
      const url = `${process.env.NEXT_PUBLIC_SERVER}/seat-flight/seat-list?flightId=${flightId}`;

      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: url,
        headers: {},
      };
      try {
        const response = await axios.request(config);
        const seatData = response.data.data;

        setAlreadySelectedSeats((prevSeats) => {
          const newSeats = seatData.map((seat: any) => ({
            seatId: seat.seatId,
            class: seat.class,
            priceBonusInterest: seat.ticketClass.priceBonusInterest,
            color: seat.ticketClass.color,
            selected: !seat.isEmpty,
          }));

          const uniqueSeats = newSeats.filter((newSeat: any) => {
            return !prevSeats.some(
              (prevSeat) => prevSeat.seatId === newSeat.seatId
            );
          });

          return [...prevSeats, ...uniqueSeats];
        });
      } catch (e: any) {
        console.error("Error fetching flight data:", e);
      }
    };

    getSeatOfAirplane();
  }, [flightId]);

  const colorVariants: Record<SeatColor, string[]> = {
    green: ["bg-green-100", "bg-green-500"],
    red: ["bg-red-100", "bg-red-500"],
    blue: ["bg-blue-100", "bg-blue-500"],
    yellow: ["bg-yellow-100", "bg-yellow-500"],
  };
  const renderSeat = (seat: {
    seatId: string;
    class: string;
    priceBonusInterest: string;
    color: string;
    selected: boolean;
  }) => {
    const seatWithTypedColor = { ...seat, color: seat.color as SeatColor };

    const baseClassName =
      "seat text-base font-light w-10 h-6 flex justify-center items-center rounded-lg m-2 cursor-pointer";
    let seatBgColor;
    let textColor = "text-white";

    if (!seatWithTypedColor.selected) {
      const isSeatChosen = chooseSeats.find(
        (selectedSeat) => selectedSeat.seat === seatWithTypedColor.seatId
      );
      seatBgColor = isSeatChosen
        ? colorVariants[seatWithTypedColor.color][1]
        : colorVariants[seatWithTypedColor.color][0];
      textColor = "text-white";
    } else {
      seatBgColor = "bg-slate-500";
      textColor = "text-white";
    }

    return (
      <div className="flex justify-between" key={seatWithTypedColor.seatId}>
        <div
          className={`${baseClassName} ${seatBgColor} ${textColor}`}
          onClick={() => {
            if (
              !chooseSeats.find(
                (findSeat) => findSeat.seat === seatWithTypedColor.seatId
              ) &&
              seatWithTypedColor.selected !== true
            ) {
              handleSeatSelection(
                seatWithTypedColor.seatId,
                seatWithTypedColor.color,
                seatWithTypedColor.class,
                seatWithTypedColor.priceBonusInterest
              );
            } else {
              if (chooseSeats.length > 1) {
                let cancelChooseSeats = chooseSeats;
                cancelChooseSeats = cancelChooseSeats.filter(
                  (selectedSeat) =>
                    selectedSeat.seat !== seatWithTypedColor.seatId
                );
                setChooseSeats(cancelChooseSeats);
              }
            }
          }}
        >
          {seatWithTypedColor.seatId}
        </div>
      </div>
    );
  };

  const renderSeatGrid = () => {
    const numRows = 6;

    return Array.from({ length: numRows }, (_, rowIndex) => (
      <div
        key={`row-${rowIndex}`}
        className="seat-row flex w-full justify-between items-center"
      >
        {Array.from(
          { length: alreadySelectedSeats.length / numRows },
          (_, seatIndex) => {
            const seatNumber = seatIndex + 1;
            const seatLabel = String.fromCharCode(65 + rowIndex) + seatNumber;
            const seat = alreadySelectedSeats.find(
              (seat) => seat.seatId === seatLabel
            );
            if (!seat) {
              return null;
            }
            return renderSeat(seat);
          }
        )}
      </div>
    ));
  };

  const [signInModal, setSignInModal] = useState<boolean>(false);

  return (
    <div className="flex justify-center h-screen">
      <div className="flex flex-row justify-between w-full">
        <div className="mt-5 ml-5 h-full w-full">
          <div className="card bg-white h-80 w-full mb-5 p-5">
            <div className="flex items-center">
              <div className="flex items-center mb-4">
                <picture>
                  <img
                    src={logo}
                    alt={brand}
                    className="w-12 object-cover mr-4"
                  />
                </picture>

                <h2 className="text-2xl font-semibold">{brand}</h2>
              </div>
            </div>
            <div className="my-4 grid grid-cols-4 gap-4">
              <div>
                <h3 className="font-bold text-gray-600">FLIGHT CODE</h3>
                <p className="text-xl font-bold">{flightId}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-600">DEPARTURE TIME</h3>
                <p className="text-xl">{time}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-600">DURATION</h3>
                <p className="text-xl">{duration} hours</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-600">DATE</h3>
                <p className="text-xl">{date}</p>
              </div>
            </div>
            <div className="mb-4">
              <div className="text-gray-900 text-2xl font-semibold mb-3">
                {departure} - {destination}
              </div>
              <div className="text-base text-gray-500">
                {airportStart} - {airportEnd}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-gray-900 text-2xl font-bold">
                {price} VND
              </div>
            </div>
          </div>
          <div className="card bg-white w-full p-5">
            <div className="flex justify-between">
              <span className="font-semibold ml-2 text-2xl">Sơ đồ ghế</span>
              <AirPlaneDetail />
            </div>

            {renderSeatGrid()}
          </div>
        </div>

        <div className="flex w-full justify-between flex-col items-center m-5 p-5 max-w-72 h-fit bg-white rounded-2xl shadow">
          <span className="font-semibold text-2xl mb-4">
            Chỗ ngồi đã chọn: {chooseSeats.length}
          </span>
          <div className=" max-h-[450px] w-full overflow-y-scroll pl-2   scroll-p-2">
            {chooseSeats.map((param, index) => (
              <div
                key={index}
                className="flex flex-col bg-white h-32 w-full p-4 drop-shadow-lg mb-5 rounded-2xl"
              >
                <span className="font-semibold text-lg mb-2">
                  Ghế: {param.seat}
                </span>
                <span className="font-semibold text-lg mb-2 ">
                  Hạng: {param.class}
                </span>
                <span className="font-semibold text-lg mb-2 ">
                  Giá: {param.price}
                </span>
              </div>
            ))}
          </div>
          <button
            onClick={handleChooseMoreSeat}
            className="btn btn-ghost flex justify-center items-center mb-5 w-full drop-shadow-md bg-white rounded-full "
          >
            <svg
              className="w-12 h-12"
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 24 24"
              height="200px"
              width="200px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="Circle_Plus">
                <g>
                  <path d="M15,12.5H12.5V15a.5.5,0,0,1-1,0V12.5H9a.5.5,0,0,1,0-1h2.5V9a.5.5,0,0,1,1,0v2.5H15A.5.5,0,0,1,15,12.5Z"></path>
                </g>
              </g>
            </svg>
          </button>
          {/* {!(chooseSeats[0].seat === "") && (
            <Link
              href={{
                pathname: "/PayingPage",
                query: {
                  logo: logo,
                  brand: brand,
                  date: date,
                  time: time,
                  departure: departure,
                  destination: destination,
                  chooseSeat: JSON.stringify(
                    chooseSeats
                      .filter((seat) => seat.seat !== "")
                      .map((seat) => seat)
                  ),
                },
              }}
              className="btn bg-orange-500 text-white w-full rounded-full"
            >
              Tiếp tục thanh toán
            </Link>
          )} */}
          {!(chooseSeats[0]?.seat === "") && !session?.user.role && (
            <button className="btn bg-orange-500 text-white w-full rounded-full">
              {!session ? (
                <p onClick={() => setSignInModal(!signInModal)}>
                  Đăng nhập để tiếp tục
                </p>
              ) : (
                <a onClick={() => handlePaymentClick()}>Tiếp tục thanh toán</a>
              )}
            </button>
          )}
          {signInModal && !session && (
            <div className="fixed bg-black bg-opacity-15 inset-0 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-full shadow-lg transform transition-all duration-300">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-semibold">Sign In</h2>
                  <p
                    onClick={() => {
                      setSignInModal(!signInModal);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                      className="w-5 h-5 hover:opacity-75 cursor-pointer"
                    >
                      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                    </svg>
                  </p>
                </div>

                <SignInForm isModal={true} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
