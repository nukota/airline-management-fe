import { useFlightRow } from "@/provider/FlightRowProvider";
import React, { useState } from "react";

const IntermediateModal = () => {
  const flight = useFlightRow();
  const [intermediateModal, setIntermediateModal] = useState<boolean>(false);

  return (
    <div>
      <span
        className="btn btn-xs btn-ghost"
        onClick={() => {
          setIntermediateModal(!intermediateModal);
        }}
      >
        -
      </span>
      {intermediateModal && (
        <div className="fixed bg-black bg-opacity-15 backdrop-blur-sm inset-0 flex items-center justify-center z-50">
          <div className="bg-white shadow-black p-10 rounded-2xl">
            <div className="flex flex-col">
              <div className="flex items-center justify-between gap-4">
                <h2 className="text-2xl font-semibold">Intermediate flight</h2>
                <p
                  onClick={() => {
                    setIntermediateModal(!intermediateModal);
                  }}
                >
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    className="w-5 h-5 hover:opacity-75 cursor-pointer"
                  >
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                  </svg>
                </p>
              </div>
              <div className="">
                <table className="table flex justify-center ">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Airport</th>
                      <th>Duration</th>
                      <th>Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flight?.intermediateAirports &&
                      flight?.intermediateAirports.map((it, index) => (
                        <tr key={index}>
                          <td>{index}</td>
                          <td>
                            <div>{it.airportId}</div>
                          </td>
                          <td>
                            <div> {it.duration}</div>
                          </td>
                          <td>
                            <div> {it.notes}</div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntermediateModal;
