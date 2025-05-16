"use client";

import React from "react";
import CreateStaffForm from "./CreateStaffForm";
import { useStaffs } from "@/provider/StaffProvider";
import FilterStaffBar from "./FilterStaffBar";
import { StaffRowProvider } from "@/provider/StaffRowProvider";
import StaffAccountRow from "./StaffAccountRow";

const StaffAccountTable = () => {
  const staffs = useStaffs();
  return (
    <div className="flex flex-col collapse-content">
      <div className="flex justify-between h-full items-center mt-5">
        <CreateStaffForm />
        <FilterStaffBar />
      </div>
      <div className=" bg-white rounded-2xl p-5 my-3">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Id</th>
                <th>Contact</th>

                <th>Activated</th>
                <th>Role</th>
                <th>Account</th>
              </tr>
            </thead>
            <tbody>
              {staffs.map((staff, index) => (
                <StaffRowProvider key={staff.staffId} staff={staff}>
                  <StaffAccountRow
                    key={staff.staffId}
                    staff={staff}
                    index={index}
                  />
                </StaffRowProvider>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* {changeRoleModal && (
        <div className="fixed bg-black bg-opacity-15 backdrop-blur-sm inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-10 rounded-2xl">
            <h3 className="font-bold text-2xl">Change Staff Role</h3>
            <label className="inline-flex items-center  mt-5">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={checkDelete}
                onChange={(e) => setCheckDelete(e.target.checked)}
              />
              <span className="ml-2 text-black">
                Confirm to change customer to staff
              </span>
            </label>
            <div className="flex flex-col justify-between"></div>
            <div className="modal-action">
              <button
                className="btn btn-sm btn-ghost"
                onClick={() => {
                  setCheckDelete(false);
                  setDeleteModal(false);
                  setSelectedStaffId("");
                }}
              >
                Close
              </button>
              {checkDelete && (
                <button
                  type="button"
                  className="btn btn-sm bg-green-500 text-white"
                  onClick={handleDeleteStaff}
                >
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default StaffAccountTable;
