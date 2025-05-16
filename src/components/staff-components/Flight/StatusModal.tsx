import { useUpdateFlightStatus } from "@/hooks/flight-hooks/useUpdateFlightStatus";
import { useFlightRow } from "@/provider/FlightRowProvider";
import { apiRequest } from "@/utils/apiRequest";
import { showErrorToast, showSuccessToast } from "@/utils/toastUtils";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

const StatusModal = () => {
  const { data: session } = useSession();

  const flight = useFlightRow();
  const [status, setStatus] = useState<string | null>(null);

  const statusColor = (status: any) => {
    switch (status) {
      case "Đã hủy chuyến":
        return `btn btn-ghost text-red-400 btn-xs`;
      case "Đang bay":
        return `btn btn-ghost text-green-400 btn-xs`;
      case "Chưa khởi hành":
        return `btn btn-ghost text-yellow-400 btn-xs`;
      default:
        return `btn btn-ghost text-blue-400 btn-xs`;
    }
  };
  const [showStatusModal, setShowStatusModal] = useState<boolean>(false);

  const updateStatus = useUpdateFlightStatus();

  const handleStatusChange = async () => {
    if (session?.user.token && status) {
      await updateStatus(status, session?.user.token, flight.flightId);
    } else {
      console.error("No access token available");
    }
  };

  return (
    <div>
      <div className="tooltip" data-tip="Change status">
        <button
          onClick={() => {
            setShowStatusModal(true);
          }}
          className={statusColor(flight.status)}
        >
          {flight.status}
        </button>
      </div>
      {showStatusModal && (
        <div className="fixed bg-black bg-opacity-15 backdrop-blur-sm inset-0 flex items-center justify-center z-50">
          <div className="bg-white shadow-black p-10 rounded-2xl">
            <h3 className="font-bold text-2xl">Update Flight Status</h3>

            <div>
              <select
                value={status ?? "set-finish"}
                onChange={(e) => {
                  setStatus(e.target.value);
                }}
                className="select select-bordered select-sm w-full mt-5"
              >
                <option value="set-finish">Success</option>
                <option value="set-in-progress">In Progress</option>
                <option value="set-cancel">Cancel</option>
                <option value="set-not-started">Not Started</option>
              </select>
            </div>
            <div className="modal-action">
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => setShowStatusModal(false)}
              >
                Close
              </button>
              <button
                className="btn bg-green-500 btn-sm text-white"
                onClick={handleStatusChange}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusModal;
