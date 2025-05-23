import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import SearchingPage from "@/app/SearchingPage/page.tsx"; // Adjust the import path as needed
import "@testing-library/jest-dom";

jest.mock("axios");

const mockFlightData = {
  data: [
    {
      flightId: "123",
      logo: "mockLogo.png",
      brand: "Mock Airlines",
      date: "2024-07-08",
      time: "12:00",
      departure: "Mock Departure City",
      airportStart: "Mock Airport Start",
      arrival: "Mock Arrival City",
      airportEnd: "Mock Airport End",
      status: "Chưa khởi hành",
      price: "100",
      seatsTotal: 150,
      seatsAvailable: 50,
      createAt: "2024-06-01",
      updateAt: "2024-06-02",
      description: "Mock flight description",
      duration: "2h 30m",
      seat: "Economy",
      placed: "Window",
    },
  ],
};

describe("SearchingPage", () => {
  test("renders main elements correctly", async () => {
    axios.get.mockResolvedValue({ data: mockFlightData });

    render(<SearchingPage />);

    expect(screen.getByText("Mock Departure City")).toBeInTheDocument();

    expect(screen.getByText("Mock Arrival City")).toBeInTheDocument();

    expect(screen.getByText("Mock Airlines")).toBeInTheDocument();
    expect(screen.getByText("12:00")).toBeInTheDocument();
    expect(screen.getByText("2h 30m")).toBeInTheDocument();
    expect(screen.getByText("Economy")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  test("renders loading spinner during fetch", () => {
    axios.get.mockResolvedValue(new Promise(() => {}));

    render(<SearchingPage />);

    expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
  });

  test("handles no available flights gracefully", async () => {
    axios.get.mockResolvedValue({ data: { data: [] } });

    render(<SearchingPage />);

    await waitFor(() =>
      expect(screen.queryByText("Mock Departure City")).not.toBeInTheDocument()
    );
    expect(screen.getByText("No flights available")).toBeInTheDocument();
  });
});
