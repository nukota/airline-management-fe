"use client";
import { useRouter } from "next/navigation";
import BarChart from "@/components/BarChart";
import PieChart from "@/components/PieChart";
import ProfileCard from "@/components/ProfileCard";
import TicketCard from "@/components/TIcketCard";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import TicketsPurchasedModal from "@/components/TicketsPurchasedModal";
import { BookingType, chart } from "@/interfaces/type";
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

  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [totalMoneySpent, setTotalMoneySpent] = useState<number>(0);

  useEffect(() => {
    const getBookingTicket = async () => {
      const url = `${process.env.NEXT_PUBLIC_SERVER}${bookingEndpoint["get-my-booking-history"]}`;

      const { result, error } = await apiRequest<BookingType[]>(
        url,
        "GET",
        session?.user.token
      );

      const mappedData = result?.map((dt: any) => ({
        bookingId: dt.bookingId,
        paymentStatus: dt.paymentStatus,
        bookingStatus: dt.bookingStatus,
        passengerId: dt.passengerId,
        price: dt.price,
        bookedAt: dt.bookedAt,
        updateAt: dt.updateAt,
        seatId: dt.seatFlight.seatId,
        flightId: dt.seatFlight.flightId,
        class: dt.seatFlight.class,
        brand: dt.seatFlight.flight.airlines,
      }));

      setBookings(sortByDateDesc(mappedData, "bookedAt"));
    };
    getBookingTicket();
  }, [session?.user.token, setBookings]);

  useEffect(() => {
    const total = bookings.reduce((acc, book) => acc + Number(book.price), 0);
    setTotalMoneySpent(total);
  }, [bookings]);

  const [flightInMonth, setFlightInMonth] = useState<number[]>(
    Array(12).fill(0)
  );

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
      "Oc",
      "Nov",
      "Dec",
    ],
  };
  const [brandData, setBrandData] = useState<
    {
      brand: string;
      count: number;
    }[]
  >([]);

  const pieData: chart = {
    tittle: "Flights of each brand",
    unit: "Count",
    indicate: "Count",
    datas: brandData.map((d) => d.count),
    labels: brandData.map((d) => d.brand),
  };

  useEffect(() => {
    const monthCounts = Array(12).fill(0);
    const countryCounts: { [key: string]: number } = {};
    const brandCounts: { [key: string]: number } = {};

    bookings.forEach((book) => {
      const createDay = book.bookedAt?.slice(3, 5);
      if (createDay) {
        const monthIndex = Number(createDay) - 1;
        if (monthIndex >= 0 && monthIndex < 12) {
          monthCounts[monthIndex]++;
        }
      }
      ////
      if (brandCounts[book.brand]) {
        brandCounts[book.brand]++; // Fixing this line
      } else {
        brandCounts[book.brand] = 1; // Fixing this line
      }
      const brandDatas = Object.keys(brandCounts).map((brand) => ({
        brand,
        count: brandCounts[brand],
      }));
      console.log(brandDatas);

      setBrandData(brandDatas);
      setFlightInMonth(monthCounts);
    });
  }, [bookings]);

  return (
    <div className="container ">
      <div className="flex flex-row justify-between ">
        <ProfileCard />
        <div className="flex flex-col justify-between w-full ml-5">
          <div className="  mb-5 flex justify-between h-full  items-center gap-5">
            {/* <PieChart /> */}
            <LineChart props={barData} />
            {/* <BarChart data={barData} orientation={"vertical"} /> */}
            <BarChart data={pieData} orientation={"horizontal"} />
            {/* <BarChart /> */}
          </div>

          <div className="flex flex-col items-center  w-full bg-slate-50 p-5 rounded-2xl">
            <div className="flex w-full justify-between">
              <div>
                <div>
                  <span className="text-lg font-normal ">
                    Totals ticket booked:{" "}
                  </span>
                  <span className="text-xl font-semibold">
                    {bookings.length}
                  </span>
                </div>

                <div>
                  <span className="text-lg font-normal ">Money spent: </span>
                  <span className="text-xl font-semibold">
                    {totalMoneySpent} VND
                  </span>
                </div>
              </div>
              <div>
                <p className="text-lg font-semibold">Lastest Ticket</p>
                {bookings[0] && (
                  <TicketCard
                    bookingId={bookings[0]?.bookingId}
                    flightId={bookings[0]?.flightId}
                    bookedAt={bookings[0]?.bookedAt}
                    seatId={bookings[0]?.seatId}
                    paymentStatus={bookings[0]?.paymentStatus}
                    seatClass={bookings[0]?.class}
                    price={bookings[0]?.price}
                  />
                )}
              </div>
            </div>
            <TicketsPurchasedModal allBookings={bookings} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
