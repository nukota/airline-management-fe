import { AirplaneType } from "@/interfaces/type";
import React from "react";

const AirplaneTable = () => {
  const cardsData: AirplaneType[] = [
    {
      airplaneModel: "AIR2056",
      airlinePicture:
        "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
      airlines: "VietNamAirlines",
      description: "Biggest airplane",
      total_seat: "40",
      total_business_seat: "20",
      total_economy_seat: "20",
      status: "expried",
    },
    {
      airplaneModel: "AIR2056",
      airlinePicture:
        "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
      airlines: "VietNamAirlines",
      description: "Biggest airplane",
      total_seat: "40",
      total_business_seat: "20",
      total_economy_seat: "20",
      status: "available",
    },
    {
      airplaneModel: "AIR2056",
      airlinePicture:
        "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
      airlines: "VietNamAirlines",
      description: "Biggest airplane",
      total_seat: "40",
      total_business_seat: "20",
      total_economy_seat: "20",
      status: "available",
    },
    {
      airplaneModel: "AIR2056",
      airlinePicture:
        "https://i.pinimg.com/originals/7a/ec/17/7aec17946661a88378269d0b642b61f3.png",
      airlines: "VietNamAirlines",
      description: "Biggest airplane",
      total_seat: "40",
      total_business_seat: "20",
      total_economy_seat: "20",
      status: "expried",
    },
  ];
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Airline Model</th>
              <th>Airline Brand</th>
              <th>Technical Specifications</th>
              <th>Total Seat</th>
              <th>Seat</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cardsData.map((cardData, index) => (
              <tr
                key={index}
                className={cardData.status === "sold" ? " bg-red-50" : ""}
              >
                <th>
                  <label>
                    <span>{index}</span>
                  </label>
                </th>

                <td>
                  <span className="text-lg font-semibold">
                    {cardData.airplaneModel}
                  </span>
                </td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <picture>
                          <img
                            src={cardData.airlinePicture}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </picture>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm opacity-50">
                        {cardData.airlines}
                      </div>
                    </div>
                  </div>
                </td>
                <td className=" max-w-[300px]">
                  <span className="font-normal text-sm">
                    {cardData.description}
                  </span>
                </td>
                <td>
                  <span className="font-semibold">
                    {cardData.total_economy_seat}
                  </span>
                </td>

                <td>
                  <div>
                    <span className="font-normal text-sm">Busisness:</span>

                    <span className="font-semibold">
                      {cardData.total_business_seat}
                    </span>
                  </div>

                  <br />
                  <div>
                    <span className="font-normal text-sm">Economy:</span>
                    <span className="font-semibold ">
                      {cardData.total_economy_seat}
                    </span>
                  </div>
                </td>
                <td>
                  <div
                    className={
                      cardData.status === "expried"
                        ? "btn btn-ghost  text-red-400 btn-xs"
                        : "btn btn-ghost text-green-400 btn-xs"
                    }
                  >
                    {cardData.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AirplaneTable;
