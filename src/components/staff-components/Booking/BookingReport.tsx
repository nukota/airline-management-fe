"use client";
import LineChart from "@/components/LineChart";
import PieChart from "@/components/PieChart";
import { useBookings, useOriginalBookings } from "@/provider/BookingProvider";
import { BookingType, chart } from "@/interfaces/type";
import React, { useEffect, useState } from "react";

const BookingReport = () => {
  const originalBookings = useOriginalBookings();

  const [customerBookingCount, setCustomerBookingCount] = useState<
    {
      customer: string;
      count: number;
    }[]
  >([]);

  const [customerInMonth, setCustomerInMonth] = useState<number[]>(
    Array(12).fill(0)
  );
  const [revenueInMonth, setRevenueInMonth] = useState<number[]>(
    Array(12).fill(0)
  );

  useEffect(() => {
    const customerCount: { [key: string]: number } = {};
    const monthCounts = Array(12).fill(0);
    const revenueMonth = Array(12).fill(0);
    const proceedPerMonth = Array(12).fill(0);
    let paidCount = 0;
    let unpaidCount = 0;
    let proceeds = 0;
    originalBookings.forEach((book) => {
      if (customerCount[book.passengerId]) {
        customerCount[book.passengerId]++;
      } else {
        customerCount[book.passengerId] = 1;
      }

      // Assuming book.bookedAt is in the format 'DD-MM-YYYY'
      const createMonth = book.bookedAt.slice(3, 5);
      if (createMonth) {
        const monthIndex = Number(createMonth) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
          monthCounts[monthIndex]++;
          revenueMonth[monthIndex] += Number(book.price);
        }
      }
      if (book.paymentStatus) {
        paidCount++;
      } else {
        unpaidCount++;
        proceedPerMonth[Number(createMonth) - 1] += Number(book.price);
      }
    });

    const top5Count = Object.keys(customerCount).map((customer) => ({
      customer,
      count: customerCount[customer],
    }));
    top5Count.sort((a, b) => b.count - a.count);
    const top5Destinations = top5Count.slice(0, 5);
    setCustomerBookingCount(top5Destinations);
    setCustomerInMonth(monthCounts);
    setRevenueInMonth(revenueMonth);

    const total = paidCount + unpaidCount;
    const paidPercentage = total > 0 ? (paidCount / total) * 100 : 0;
    const unpaidPercentage = total > 0 ? (unpaidCount / total) * 100 : 0;
    setPieData((prevData) => ({
      ...prevData,
      datas: [paidPercentage, unpaidPercentage],
    }));
  }, [originalBookings]);

  const [pieData, setPieData] = useState<chart>({
    tittle: "Payment rate",
    unit: "Percent",
    datas: [],
    labels: ["Paid", "Unpaid"],
  });
  const brandChartData = {
    tittle: "Top 5 the most customer booking",
    unit: "Count",
    indicate: "Count",
    datas: customerBookingCount.map((d) => d.count),
    labels: customerBookingCount.map((d) => d.customer),
  };

  const lineData = {
    tittle: "Number of customer bookings each month",
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
      "Oct",
      "Nov",
      "Dec",
    ],
  };

  const MonthlyRevenuelineData = {
    tittle: "Monthly revenue in current year",
    unit: "VND",
    datas: revenueInMonth,
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
      "Oct",
      "Nov",
      "Dec",
    ],
  };
  return (
    <div className="collapse collapse-arrow bg-base-200 my-3">
      <input type="checkbox" defaultChecked />
      <div className="collapse-title text-2xl font-semibold">
        Booking Dashboard
      </div>
      <div className="collapse-content">
        <div className="flex gap-5 h-full">
          <LineChart props={MonthlyRevenuelineData} />
          <PieChart props={pieData} />
          <LineChart props={lineData} />
        </div>{" "}
      </div>
    </div>
  );
};

export default BookingReport;
