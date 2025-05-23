import React from "react";
import CustomerAccountTable from "./CustomerAccountTable";
import StaffAccountTable from "./StaffAccountTable";
import AccountReport from "./AccountReport";

const AccountManage = () => {
  return (
    <div>
      <div>
        <div className="collapse collapse-arrow bg-base-200 my-3">
          <input type="checkbox" defaultChecked />
          <div className="collapse-title text-2xl font-semibold">
            Account DashBoard
          </div>
          <div className="collapse-content">
            <AccountReport />
          </div>
        </div>
        <div className="collapse collapse-arrow bg-base-200 my-3">
          <input type="checkbox" />
          <div className="collapse-title ">
            <div className="text-2xl font-semibold inline-flex items-center">
              Staff Account Management
            </div>
          </div>

          <StaffAccountTable />
        </div>
        <div className="collapse collapse-arrow bg-base-200 my-3">
          <input type="checkbox" />
          <div className="collapse-title ">
            <div className="text-2xl font-semibold inline-flex items-center">
              Customer Account Management
            </div>
          </div>

          <CustomerAccountTable />
        </div>
      </div>
    </div>
  );
};

export default AccountManage;
