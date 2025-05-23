"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import AirportManage from "@/components/staff-components/Airport/AirportManage";
import FlightManage from "@/components/staff-components/Flight/FlightManage";
import RegulationsManage from "@/components/staff-components/Rule/RegulationsManage";
import BookingManage from "@/components/staff-components/Booking/BookingManage";
import AccountManage from "@/components/staff-components/Account/AccountManage";
import TicketManage from "@/components/staff-components/Ticket/TicketManage";
import { TicketsProvider } from "@/provider/TicketsProvider";
import FlightProvider from "@/provider/FlightProvider";
import BookingProvider from "@/provider/BookingProvider";
import CustomersProvider from "@/provider/CustomerProvider";
import StaffsProvider from "@/provider/StaffProvider";
import AirportsProvider from "@/provider/AirportProvider";
import RulesProvider from "@/provider/RulesProvider";
import TicketClassTypeProvider from "@/provider/TicketClassProvider";

interface TabPanelProps {
  label: string;
  index: number;
  activeTab: number;
  onChange: (index: number) => void;
  children: React.ReactNode;
}

const TabPanel: React.FC<TabPanelProps> = ({
  label,
  index,
  activeTab,
  onChange,
  children,
}) => (
  <>
    <input
      type="radio"
      name={`my_tabs_${index}`}
      role="tab"
      className="tab font-semibold text-lg h-12"
      aria-label={label}
      checked={activeTab === index}
      onChange={() => onChange(index)}
    />
    <div
      role="tabpanel"
      className={`tab-content bg-base-100 border-base-300 rounded-box p-6 ${
        activeTab === index ? "" : "hidden"
      }`}
    >
      {children}
    </div>
  </>
);

interface TabConfig {
  label: string;
  content: React.ReactNode;
}

export default function StaffHome() {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState(1);

  const handleTabChange = (tabIndex: number) => {
    setActiveTab(tabIndex);
  };

  const staffLV2Tabs: TabConfig[] = [
    {
      label: "Flight",
      content: (
        <FlightProvider>
          <FlightManage />
        </FlightProvider>
      ),
    },
    {
      label: "Booked",
      content: (
        <BookingProvider>
          <BookingManage />
        </BookingProvider>
      ),
    },
    {
      label: "Ticket",
      content: (
        <TicketsProvider>
          <TicketManage />
        </TicketsProvider>
      ),
    },
  ];

  const staffLV1Tabs: TabConfig[] = [
    {
      label: "Regulations",
      content: (
        <RulesProvider>
          <TicketClassTypeProvider>
            <RegulationsManage />
          </TicketClassTypeProvider>
        </RulesProvider>
      ),
    },
    {
      label: "Airport",
      content: (
        <AirportsProvider>
          <AirportManage />
        </AirportsProvider>
      ),
    },
    {
      label: "Account",
      content: (
        <StaffsProvider>
          <CustomersProvider>
            <AccountManage />
          </CustomersProvider>
        </StaffsProvider>
      ),
    },
  ];

  const tabs = session?.user.role === "Staff_LV2" ? staffLV2Tabs : staffLV1Tabs;

  return (
    <main className="main">
      <div role="tablist" className="tabs tabs-lifted">
        {tabs.map((tab, index) => (
          <TabPanel
            key={index}
            label={tab.label}
            index={index + 1}
            activeTab={activeTab}
            onChange={handleTabChange}
          >
            {tab.content}
          </TabPanel>
        ))}
      </div>
    </main>
  );
}
