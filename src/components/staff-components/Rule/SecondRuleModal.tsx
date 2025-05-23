import React, { useEffect, useState } from "react";
import CreateClassForm from "./CreateClassForm";
import axios from "axios";
import { ticketClassEndpoint } from "@/services/axios/endpoints/ticket-class.endpoint";
import { apiRequest } from "@/utils/apiRequest";
import { useSession } from "next-auth/react";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { useTicketClass } from "@/provider/TicketClassProvider";

const SecondRuleModal = () => {
  const { data: session } = useSession();
  const ticketClasses = useTicketClass();

  const [secondRegulationModal, setSecondRegulationModal] =
    useState<boolean>(false);

  const [secondRegulation, setSecondRegulation] = useState<
    {
      ticketClass: string;
      ticketPriceInterest: string;
    }[]
  >([]);

  const handlSaveChange = async () => {};
  return (
    <td>
      <button onClick={() => setSecondRegulationModal(true)}>
        <svg
          className="w-4 h-4 hover:opacity-50 cursor-pointer"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 200 50"
          fill="none"
        >
          <circle cx="25" cy="25" r="25" fill="#2F2F2F" />
          <circle cx="100" cy="25" r="25" fill="#2F2F2F" />
          <circle cx="175" cy="25" r="25" fill="#2F2F2F" />
        </svg>
      </button>
      {secondRegulationModal && (
        <div className="fixed bg-black bg-opacity-15 backdrop-blur-sm inset-0 flex items-center justify-center z-50">
          <div className="bg-white max-w-2xl p-10 rounded-2xl">
            <h3 className="font-bold text-2xl mb-10">Update Booking Rules</h3>

            <CreateClassForm />
            <div className="flex justify-between">
              <div className="mt-5 w-[300px] collapse bg-slate-100">
                <input type="checkbox" />
                <div className="collapse-title text-xl font-semibold">
                  Update price interest
                </div>
                <div className="collapse-content ">
                  <div className="overflow-x-auto">
                    <table className="table flex justify-center ">
                      {/* head */}
                      <thead>
                        <tr>
                          <th>Class</th>
                          <th>Price Bonus Interest</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ticketClasses.map((regulation, index) => (
                          <tr key={index}>
                            <td> {regulation.className}</td>

                            <td>
                              <input
                                type="text"
                                value={regulation.priceBonusInterest}
                                className="input input-bordered input-sm w-[100px] max-w-xs"
                                // onChange={(e) => {
                                //   const updatedRegulations = [
                                //     ...secondRegulation,
                                //   ];
                                //   updatedRegulations[
                                //     index
                                //   ].ticketPriceInterest = e.target.value;
                                //   // setTmpSecondR(updatedRegulations);
                                // }}
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex justify-end gap-3">
                    <button
                      className="btn btn-sm bg-green-500 text-white"
                      onClick={handlSaveChange}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
              <div className="modal-action flex justify-end flex-col">
                <button
                  className="btn btn-sm"
                  onClick={() => setSecondRegulationModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </td>
  );
};

export default SecondRuleModal;
