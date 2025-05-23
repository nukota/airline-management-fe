import { useOriginalStaffs, useStaffsDispatch } from "@/provider/StaffProvider";
import React, { useEffect, useState } from "react";

const FilterStaffBar = () => {
  const originalStaffs = useOriginalStaffs();
  const dispatch = useStaffsDispatch();

  const [filterRole, setFilterRole] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  useEffect(() => {
    dispatch({
      type: "filter_staffs",
      origin: originalStaffs,
      query: {
        username: userName,
        role: filterRole,
      },
    });
  }, [dispatch, originalStaffs, userName, filterRole]);

  const handleFilterStaffRole = (role: string) => {
    setFilterRole(role);
  };

  return (
    <div className="flex justify-between">
      <label className="input input-bordered flex items-center gap-2">
        <p className=" ">Username</p>
        <input
          value={userName}
          onChange={(e: any) => setUserName(e.target.value)}
          type="text"
          className="grow font-medium"
          placeholder="admin"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      <div className="flex rounded-md p-1 items-center justify-around h-12 bg-base-300 ml-3">
        <div
          className={`${
            filterRole === "" ? "bg-white" : ""
          } flex justify-center rounded-md px-5 py-2  text-sm font-medium`}
          onClick={() => handleFilterStaffRole("")}
        >
          All
        </div>

        <div
          className={`${
            filterRole === "Staff_LV1" ? "bg-white" : ""
          } flex justify-center rounded-md px-5 py-2  text-sm font-medium`}
          onClick={() => handleFilterStaffRole("Staff_LV1")}
        >
          StaffLV1
        </div>

        <div
          className={`${
            filterRole === "Staff_LV2" ? "bg-white" : ""
          } flex justify-center rounded-md px-5 py-2  text-sm font-medium`}
          onClick={() => handleFilterStaffRole("Staff_LV2")}
        >
          StaffLV2
        </div>
      </div>
    </div>
  );
};

export default FilterStaffBar;
