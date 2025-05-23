import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import { Customer } from "@/interfaces/type";
import DeleteCustomerAccountModal from "./DeleteCustomerAccountModal";

const CustomerAccountRow: React.FC<{ customer: Customer; index: number }> = ({
  customer,
  index,
}) => {
  const [deleteModal, setDeletedModal] = useState<boolean>(false);

  return (
    <tr key={customer.customerId}>
      <th>{index}</th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <picture>
                <img
                  src={customer?.cccdPicture}
                  crossOrigin="anonymous"
                  alt="Avatar Tailwind CSS Component"
                />
              </picture>
            </div>
          </div>
          <div>
            <div className="font-bold">{customer.fullname}</div>
            <div className="text-sm opacity-50">{customer.birthday}</div>
          </div>
        </div>
      </td>
      <td>
        {customer.cccd}
        <br />
        {customer.nationality}, {customer.address}
      </td>
      <td>
        {customer.email}
        <br />
        {customer.phoneNumber}
      </td>

      <td>
        Update at: {customer.updateAt}
        <br />
        Create at: {customer.createAt}
      </td>
      <td>
        <div>
          <button
            className={
              customer.emailValidated
                ? "btn btn-ghost text-green-400 btn-xs font-medium"
                : "btn btn-ghost text-rose-400 btn-xs font-medium"
            }
          >
            {customer.emailValidated.toString()}
          </button>
        </div>
      </td>
      <td>
        <div className="flex w-full items-center justify-center">
          <Dropdown key={customer.customerId}>
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
                key={`detail-${customer.customerId}`}
                className="btn btn-sm btn-ghost"
              >
                <div className="flex justify-between">
                  <p> Details Activity</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 192 512"
                    className="w-4 h-4"
                  >
                    <path d="M48 80a48 48 0 1 1 96 0A48 48 0 1 1 48 80zM0 224c0-17.7 14.3-32 32-32H96c17.7 0 32 14.3 32 32V448h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H64V256H32c-17.7 0-32-14.3-32-32z" />
                  </svg>
                </div>
              </DropdownItem>

              <DropdownItem textValue="dropdown" className="h-2">
                <div className="divider m-0 divider-neutral opacity-50 h-[1px]"></div>
              </DropdownItem>

              <DropdownItem
                textValue="dropdown"
                key={`delete-${customer.customerId}`}
                className="btn btn-sm btn-ghost text-red-600"
                value={customer.customerId}
                onClick={() => setDeletedModal(!deleteModal)}
              >
                <div className="flex justify-between">
                  <p> Delete user</p>
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
        </div>
      </td>
      {deleteModal && (
        <DeleteCustomerAccountModal
          canceledModal={deleteModal}
          setDeletedModal={setDeletedModal}
        />
      )}
    </tr>
  );
};

export default CustomerAccountRow;
