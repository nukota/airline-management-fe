"use client";
import { useFlightRow } from "@/provider/FlightRowProvider";
import React, { useState } from "react";

import { apiRequest } from "@/utils/apiRequest";
import { useSession } from "next-auth/react";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { useUpdateFlightDescription } from "@/hooks/flight-hooks/useUpdateFlightDescription";

type UpdateFlightDescriptionFormProps = {
  updateFlightModal: boolean;
  setUpdateFlightModal: (state: boolean) => void;
};

const UpdateFlightDescriptionForm: React.FC<
  UpdateFlightDescriptionFormProps
> = ({ updateFlightModal, setUpdateFlightModal }) => {
  const { data: session } = useSession();

  const flight = useFlightRow();
  const updateDescription = useUpdateFlightDescription();
  const [description, setDescription] = useState<string>(flight.description);

  const updateFlight = async () => {
    if (session?.user.token) {
      await updateDescription(
        session?.user.token,
        description,
        flight.flightId
      );
    } else {
      console.error("No access token available");
    }
  };

  return (
    <div className="fixed bg-black bg-opacity-15 backdrop-blur-sm inset-0 flex items-center justify-center z-50">
      <div className="bg-white shadow-black p-10 rounded-2xl">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-2xl font-semibold">Change flight description</h2>
          <p
            onClick={() => {
              setUpdateFlightModal(!updateFlightModal);
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
        <table className="table flex justify-center ">
          <thead>
            <tr>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div className="flex flex-col gap-1">
                  <label htmlFor="description">Description</label>
                  <textarea
                    name="description"
                    value={description}
                    className="textarea textarea-bordered textarea-sm"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="modal-action">
          <button
            className="btn btn-sm btn-ghost"
            onClick={() => setUpdateFlightModal(!updateFlightModal)}
          >
            Close
          </button>
          <button
            onClick={updateFlight}
            className="btn bg-green-500 btn-sm text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateFlightDescriptionForm;
