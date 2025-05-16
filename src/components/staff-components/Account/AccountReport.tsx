import React, { useEffect, useState } from "react";
import PieChart from "../../PieChart";
import { chart } from "@/interfaces/type";
import LineChart from "../../LineChart";
import { useOriginalCustomers } from "@/provider/CustomerProvider";

const AccountReport = () => {
  const customers = useOriginalCustomers();
  const customerAccountValidated = customers.reduce((count, customer) => {
    return customer.emailValidated ? count + 1 : count;
  }, 0);
  const pieData: chart = {
    tittle: "Validated customer account.",
    unit: "Count",
    datas: [
      customerAccountValidated,
      customers.length - customerAccountValidated,
    ],
    labels: ["Validated", "Not Validated"],
  };

  const [customerInMonth, setCustomerInMonth] = useState<number[]>(
    Array(12).fill(0)
  );

  useEffect(() => {
    const monthCounts = Array(12).fill(0);
    customers.forEach((cus) => {
      const createMonth = cus.createAt?.slice(5, 7);
      if (createMonth) {
        const monthIndex = Number(createMonth) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
          monthCounts[monthIndex]++;
        }
      }
    });
    setCustomerInMonth(monthCounts);
  }, [customers]);

  const lineData: chart = {
    tittle: "Register customer account.",
    unit: "Count",
    datas: customerInMonth,
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oc",
      "Nov",
      "Dec",
    ],
  };
  return (
    <div className="flex justify-between h-full w-full gap-4">
      <PieChart props={pieData} />
      <LineChart props={lineData} />
      {/* <BarChart /> */}
    </div>
  );
};

export default AccountReport;
