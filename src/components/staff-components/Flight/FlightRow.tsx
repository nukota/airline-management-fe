import React, { useState } from "react";
import { FlightType } from "@/interfaces/type";
import { useSession } from "next-auth/react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import IntermediateModal from "./IntermediateModal";
import UpdateFlightDescriptionForm from "./UpdateFlightDescriptionForm";
import StatusModal from "./StatusModal";
import SeatModal from "./SeatModal";
import { useDeleteFlight } from "@/hooks/flight-hooks/useDeleteFlight";

const FlightRow: React.FC<{ flight: FlightType; index: number }> = ({
  flight,
  index,
}) => {
  const { data: session } = useSession();
  const [updateFlightModal, setUpdateFlightModal] = useState<boolean>(false);

  const deleteFlight = useDeleteFlight();
  const deleteFlightById = async () => {
    if (session?.user.token) {
      await deleteFlight(session?.user.token, flight.flightId);
    } else {
      console.error("No access token available");
    }
  };

  return (
    <tr
      key={flight.flightId}
      className={flight.status === "sold" ? " bg-red-50" : ""}
    >
      <th>
        <label>
          <span>{index}</span>
        </label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="">
            <div className="w-8 object-cover">
              <picture>
                <img src={flight.logo} alt="Avatar" />
              </picture>
            </div>
          </div>
          <div>
            <div className="font-bold">{flight.flightId}</div>
            <div className="text-sm opacity-50">{flight.airlines}</div>
          </div>
        </div>
      </td>
      <td>
        <span className="font-semibold">{flight.departureAirport.city}</span>
        <br />
        <span className="text-sm">{flight.departureAirport.airportName}</span>
      </td>
      <td>
        <IntermediateModal />
      </td>
      <td>
        <span className="font-semibold">{flight.arrivalAirport.city}</span>
        <br />
        <span className="text-sm">{flight.arrivalAirport.airportName}</span>
      </td>
      <td>
        <span className="font-semibold">{flight.departureTime}</span>
        <p className="text-sm">{flight.flightDuration} hours</p>
      </td>
      <td>
        <SeatModal />
      </td>
      <td>
        <span className="font-semibold ">{flight.price}</span>
      </td>
      <td>
        <StatusModal />
      </td>
      <td>
        <td>
          <Dropdown key={flight.flightId}>
            <DropdownTrigger>
              <Button variant="bordered">
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
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Static Actions"
              className="bg-white rounded-xl drop-shadow-lg p-3"
            >
              <DropdownItem
                textValue="dropdown"
                key={`update-${flight.flightId}`}
                className="btn btn-sm btn-ghost "
                value={flight.flightId}
                onClick={() => {
                  setUpdateFlightModal(!updateFlightModal);
                }}
              >
                <div className="flex justify-between">
                  <p>Update Flight</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-4 h-4"
                  >
                    <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                  </svg>
                </div>
              </DropdownItem>
              <DropdownItem textValue="dropdown" className="h-2">
                <div className="divider m-0 divider-neutral opacity-50 h-[1px]"></div>
              </DropdownItem>

              <DropdownItem
                textValue="dropdown"
                key={`delete-${flight.flightId}`}
                className="btn btn-sm btn-ghost text-red-600"
                value={flight.flightId}
                onClick={deleteFlightById}
              >
                <div className="flex justify-between">
                  <p>Delete Flight</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="#f24a4a"
                      d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"
                    />
                  </svg>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </td>
      </td>
      {updateFlightModal && (
        <UpdateFlightDescriptionForm
          updateFlightModal={updateFlightModal}
          setUpdateFlightModal={setUpdateFlightModal}
        />
      )}
    </tr>
  );
};
export default FlightRow;
