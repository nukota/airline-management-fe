import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import CreateStaffForm from "./CreateStaffForm";
import { Staff } from "@/interfaces/type";
import DeleteStaffAcountModal from "./DeleteStaffAcountModal";

const StaffAccountRow: React.FC<{ staff: Staff; index: number }> = ({
  staff,
  index,
}) => {
  const [changeRoleModal, setChangeRoleModal] = useState<boolean>(false);
  const [deleteModal, setDeleteModal] = useState<boolean>(false);

  const [createStaffModal, setCreateStaffModal] = useState<boolean>(false);

  return (
    <tr key={staff?.staffId}>
      <th>{index}</th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <picture>
                <img
                  src="https://th.bing.com/th/id/OIP.2hAVCZRMcBjsE8AGQfWCVQHaHa?rs=1&pid=ImgDetMain"
                  alt="Avatar Tailwind CSS Component"
                />
              </picture>
            </div>
          </div>
          <div>
            <div className="font-bold">{staff?.username}</div>
            <div className="text-sm opacity-50">{staff?.birthday}</div>
          </div>
        </div>
      </td>
      <td>
        {staff?.email}
        <br />
        {staff?.phoneNumber}
      </td>

      <td>
        Update at: {staff?.updateAt}
        <br />
        Create at: {staff?.createAt}
      </td>
      <td>
        <div>
          <div
            className={
              staff?.role === "Staff_LV1"
                ? " badge badge-primary badge-outline btn-xs font-medium"
                : " badge badge-accent badge-outline btn-xs font-medium"
            }
          >
            {staff?.role.toString()}
          </div>
        </div>
      </td>
      <td>
        <Dropdown key={staff?.staffId}>
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
              key={`detail-${staff?.staffId}`}
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

            <DropdownItem
              textValue="dropdown"
              key={`Delete-${staff?.staffId}`}
              className="btn btn-sm btn-ghost"
              onClick={() => {
                setChangeRoleModal(!changeRoleModal);
              }}
            >
              <div className="flex justify-between">
                <p>Change role</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  viewBox="0 0 512 512"
                >
                  <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z" />
                </svg>
              </div>
            </DropdownItem>
            <DropdownItem textValue="dropdown" className="h-2">
              <div className="divider m-0 divider-neutral opacity-50 h-[1px]"></div>
            </DropdownItem>

            <DropdownItem
              textValue="dropdown"
              onClick={() => {
                if (staff?.role !== "Staff_LV1") {
                  setDeleteModal(!deleteModal);
                }
              }}
              key={`delete-${staff?.staffId}`}
              className="btn btn-sm btn-ghost text-red-600"
              value={staff?.staffId}
            >
              <div className="flex justify-between">
                <p> Delete Staff</p>
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
      {createStaffModal && (
        <div className="fixed bg-black bg-opacity-15 backdrop-blur-sm inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-2xl ">
            <CreateStaffForm />
          </div>
        </div>
      )}
      {deleteModal && (
        <DeleteStaffAcountModal
          deleteModal={deleteModal}
          setDeleteModal={setDeleteModal}
        />
      )}
    </tr>
  );
};

export default StaffAccountRow;
