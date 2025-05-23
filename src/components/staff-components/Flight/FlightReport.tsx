"use client";
import BarChart from "@/components/BarChart";
import LineChart from "@/components/LineChart";
import PieChart from "@/components/PieChart";
import { useOriginalFlights } from "@/provider/FlightProvider";
import { chart } from "@/interfaces/type";
import React, { useEffect, useState } from "react";

const FlightReport = () => {
  const data = useOriginalFlights();

  const [Loading, seatLoading] = useState<boolean>(true);

  const [flightInMonth, setFlightInMonth] = useState<number[]>(
    Array(12).fill(0)
  );
  const [topDestination, setTopDestination] = useState<
    { country: string; count: number }[]
  >([]);
  const [brandData, setBrandData] = useState<
    { brand: string; count: number }[]
  >([]);

  useEffect(() => {
    const monthCounts = Array(12).fill(0);
    const countryCounts: { [key: string]: number } = {};
    const brandCounts: { [key: string]: number } = {};

    data.forEach((flight) => {
      /////////////////////
      const createDay = flight.createAt?.slice(3, 5);
      if (createDay) {
        const monthIndex = Number(createDay) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
          monthCounts[monthIndex]++;
        }
      }

      /////////////////////
      if (countryCounts[flight.arrivalAirport.country]) {
        countryCounts[flight.arrivalAirport.country]++;
      } else {
        countryCounts[flight.arrivalAirport.country] = 1;
      }
      if (countryCounts[flight.departureAirport.country]) {
        countryCounts[flight.departureAirport.country]++;
      } else {
        countryCounts[flight.departureAirport.country] = 1;
      }
      ////
      if (brandCounts[flight.airlines]) {
        brandCounts[flight.airlines]++; // Fixing this line
      } else {
        brandCounts[flight.airlines] = 1; // Fixing this line
      }
    });
    /////
    const topDestinationsArray = Object.keys(countryCounts).map((country) => ({
      country,
      count: countryCounts[country],
    }));

    const brandDatas = Object.keys(brandCounts).map((brand) => ({
      brand,
      count: brandCounts[brand],
    }));

    topDestinationsArray.sort((a, b) => b.count - a.count);
    const top5Destinations = topDestinationsArray.slice(0, 5);

    setTopDestination(top5Destinations);
    setBrandData(brandDatas);
    //////
    setFlightInMonth(monthCounts);
    seatLoading(false);
  }, [data]);

  const pieData: chart = {
    tittle: "Flights of each brand",
    unit: "Count",
    indicate: "Count",
    datas: brandData.map((d) => d.count),
    labels: brandData.map((d) => d.brand),
  };

  const brandChartData: chart = {
    tittle: "Top 5 most created cities",
    unit: "Count",
    indicate: "Count",
    datas: topDestination.map((d) => d.count),
    labels: topDestination.map((d) => d.country),
  };

  const barData: chart = {
    tittle: "Number of flights created monthly",
    unit: "Flight",
    datas: flightInMonth,
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
    <div className="collapse-content">
      {Loading ? (
        <span className="flex justify-center  loading loading-spinner loading-lg"></span>
      ) : (
        <div className="flex gap-5 h-full">
          <BarChart data={brandChartData} orientation={"horizontal"} />
          <PieChart props={pieData} />
          <LineChart props={barData} />
        </div>
      )}
    </div>
  );
};

export default FlightReport;
