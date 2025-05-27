"use client";
import { useRouter } from "next/navigation";
import BarChart from "@/components/BarChart";
import PieChart from "@/components/PieChart";
import ProfileCard from "@/components/ProfileCard";
import TicketCard from "@/components/TIcketCard";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import TicketsPurchasedModal from "@/components/TicketsPurchasedModal";
import { BookingType, chart, OrderType } from "@/interfaces/type";
import LineChart from "@/components/LineChart";
import { customerEndpoint } from "@/services/axios/endpoints/customer.endpoint";
import { sortByDateDesc } from "@/utils/dataDateSort";
import { apiRequest } from "@/utils/apiRequest";
import { bookingEndpoint } from "@/services/axios/endpoints/booking.endpoint";

function ProfilePage() {
  const { data: session } = useSession();

  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(() => {
      if (!session) {
        router.push("/");
      }
    }, 500);

    return () => clearInterval(interval);
  }, [session, router]);

  const [orders, setOrders] = useState<OrderType[]>([]);
  const [totalMoneySpent, setTotalMoneySpent] = useState<number>(0);

  useEffect(() => {
    const getOrders = async () => {
      const url = `${process.env.NEXT_PUBLIC_SERVER}${bookingEndpoint["get-my-orders"]}`;
      const { result, error } = await apiRequest<any>(
        url,
        "GET",
        session?.user.token
      );
      console.log("result", result);
      if (Array.isArray(result.data)) setOrders(result.data);
      else setOrders([]);
    };
    getOrders();
  }, [session?.user.token]);

  useEffect(() => {
    // Sum all ticket prices in all orders
    let total = 0;
    orders.forEach((order) => {
      order.flightBookings.forEach((fb) => {
        total += Number(fb.totalPrice || 0);
      });
    });
    setTotalMoneySpent(total);
  }, [orders]);

  // For chart data, flatten all tickets and include required TicketDisplayType fields
  const allTickets = orders.flatMap((order) =>
    order.flightBookings.flatMap((fb) =>
      fb.tickets.map((ticket) => ({
        ...ticket,
        flightId: fb.flightId,
        brand: fb.contactName, // or use airline if available
        bookedAt: "", // add if available in API
        price: ticket.price,
        bookingId: order.orderId,
        paymentStatus: fb.status,
        seatId: ticket.seatNumber,
        seatClass: ticket.status,
      }))
    )
  );

  const flightInMonth = Array(12).fill(0);
  allTickets.forEach((ticket) => {
    // If you have bookedAt, parse month here
    // const monthIndex = ...;
    // flightInMonth[monthIndex]++;
  });

  const barData: chart = {
    tittle: "Number booking during the year",
    indicate: "Monthly Average",
    unit: "Book",
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
      "Oct",
      "Nov",
      "Dec",
    ],
  };

  const brandCounts: { [key: string]: number } = {};
  allTickets.forEach((ticket) => {
    const brand = ticket.brand || "Unknown";
    brandCounts[brand] = (brandCounts[brand] || 0) + 1;
  });
  const brandData = Object.keys(brandCounts).map((brand) => ({
    brand,
    count: brandCounts[brand],
  }));

  const pieData: chart = {
    tittle: "Flights of each brand",
    unit: "Count",
    indicate: "Count",
    datas: brandData.map((d) => d.count),
    labels: brandData.map((d) => d.brand),
  };
console.log("orders[0]", orders[0]);
  return (
    <div className="container ">
      <div className="flex flex-row justify-between ">
        <ProfileCard />
        <div className="flex flex-col justify-between w-full ml-5">
          <div className="mb-5 flex justify-between h-full items-center gap-5">
            <LineChart props={barData} />
            <BarChart data={pieData} orientation={"horizontal"} />
          </div>
          <div className="flex flex-col items-center w-full bg-slate-50 p-5 rounded-2xl">
            <div className="flex w-full justify-between">
              <div>
                <div>
                  <span className="text-lg font-normal ">Total orders: </span>
                  <span className="text-xl font-semibold">{orders.length}</span>
                </div>
                <div>
                  <span className="text-lg font-normal ">Money spent: </span>
                  <span className="text-xl font-semibold">
                    {totalMoneySpent} VND
                  </span>
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold">Latest Order</p>
                {orders[0] && orders[0].flightBookings[0] && (
                  <TicketCard
                    bookingId={orders[0].orderId}
                    flightId={orders[0].flightBookings[0].flightId}
                    bookedAt={""} // Add if available
                    seatId={orders[0].flightBookings[0].tickets[0]?.seatNumber}
                    paymentStatus={orders[0].flightBookings[0].status}
                    seatClass={orders[0].flightBookings[0].tickets[0]?.status}
                    price={orders[0].flightBookings[0].tickets[0]?.price}
                  />
                )}
              </div>
            </div>
            {/* Pass allTickets or orders as needed */}
            <TicketsPurchasedModal allBookings={allTickets} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
