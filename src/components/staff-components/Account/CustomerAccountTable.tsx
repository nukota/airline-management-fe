"use client";
import React, { useState } from "react";

import { Customer } from "@/interfaces/type";
import { useCustomers } from "@/provider/CustomerProvider";
import PaginationControl from "@/components/PaginationControl ";
import { CustomerRowProvider } from "@/provider/CustomerRowProvider";
import CustomerAccountRow from "./CustomerAccountRow";

const MAX_LENGTH_COL = 7;

const CustomerAccountTable = () => {
  const customers = useCustomers();
  // Page pagination
  const [page, setPage] = useState<number>(1);
  return (
    <div className="flex flex-col collapse-content">
      <div className="flex justify-between h-full items-center mt-5">
        <div></div>
      </div>
      <div className=" bg-white rounded-2xl p-5 my-3">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>Id</th>
                <th>Account</th>
                <th>CCCD</th>
                <th>Contact</th>
                <th>Activated</th>
                <th>Email Validated</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer, index) => {
                if (
                  index >= MAX_LENGTH_COL * (page - 1) &&
                  index < MAX_LENGTH_COL * page
                ) {
                  return (
                    <CustomerRowProvider
                      key={customer.customerId}
                      customer={customer}
                    >
                      <CustomerAccountRow
                        key={customer.customerId}
                        customer={customer}
                        index={index}
                      />
                    </CustomerRowProvider>
                  );
                } else {
                  return null;
                }
              })}
            </tbody>
          </table>
        </div>
        <PaginationControl
          totalItems={customers.length}
          currentPage={page}
          setPage={setPage}
        />{" "}
      </div>
    </div>
  );
};

export default CustomerAccountTable;
