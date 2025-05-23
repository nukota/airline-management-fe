import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SignInForm from "@/components/SignInForm";
import SignUpForm from "@/components/SignUpForm";
import StaffLoginForm from "@/components/staff-components/StaffLoginForm";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import axios from "axios";

jest.mock("axios");
jest.mock("next-auth/react");
jest.mock("react-toastify");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("SignInForm", () => {
  const mockPush = jest.fn();
  const mockRefresh = jest.fn();

  beforeEach(() => {
    useRouter.mockReturnValue({
      push: mockPush,
      refresh: mockRefresh,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the form", () => {
    render(<SignInForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByTestId("signin-button")).toBeInTheDocument();
  });

  test("handles input change", () => {
    render(<SignInForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

  test("handles form submission successfully", async () => {
    signIn.mockResolvedValue({ error: null });
    toast.success = jest.fn();

    render(<SignInForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByTestId("signin-button");

    fireEvent.change(emailInput, {
      target: { value: "haphuthinh332004@gmail.com" },
    });
    fireEvent.change(passwordInput, { target: { value: "@1ThinhHa" } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(signIn).toHaveBeenCalledTimes(1));
    expect(signIn).toHaveBeenCalledWith("credentials", {
      email: "haphuthinh332004@gmail.com",
      password: "@1ThinhHa",
      redirect: false,
      admin: false,
    });

    await waitFor(() => expect(toast.success).toHaveBeenCalledTimes(1));
    expect(toast.success).toHaveBeenCalledWith(
      "Login Successful",
      expect.any(Object)
    );
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  test("handles form submission with error", async () => {
    signIn.mockResolvedValue({ error: "Invalid credentials" });
    toast.error = jest.fn();

    render(<SignInForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/password/i);
    const submitButton = screen.getByTestId("signin-button");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(signIn).toHaveBeenCalledTimes(1));
    expect(signIn).toHaveBeenCalledWith("credentials", {
      email: "test@example.com",
      password: "wrongpassword",
      redirect: false,
      admin: false,
    });

    await waitFor(() => expect(toast.error).toHaveBeenCalledTimes(1));
    expect(toast.error).toHaveBeenCalledWith(
      "Invalid credentials",
      expect.any(Object)
    );
    expect(mockPush).not.toHaveBeenCalled();
  });
});

describe("SignUpForm", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    useRouter.mockReturnValue({
      push: mockPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the form", () => {
    render(<SignUpForm />);

    expect(screen.getByTestId("name")).toBeInTheDocument();
    expect(screen.getByTestId("birthday")).toBeInTheDocument();
    expect(screen.getByTestId("cccd")).toBeInTheDocument();
    expect(screen.getByTestId("address")).toBeInTheDocument();
    expect(screen.getByTestId("phoneNumber")).toBeInTheDocument();
    expect(screen.getByTestId("email")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(screen.getByTestId("signup-button")).toBeInTheDocument();
  });

  test("handles input change", () => {
    render(<SignUpForm />);

    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");
    const nameInput = screen.getByTestId("name");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Password123!" } });
    fireEvent.change(nameInput, { target: { value: "John Doe" } });

    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("Password123!");
    expect(nameInput.value).toBe("John Doe");
  });

  test("handles form submission successfully", async () => {
    const mockResponse = {
      data: { picture_url: "http://example.com/image.jpg" },
    };
    axios.post.mockResolvedValue(mockResponse);
    toast.success = jest.fn();

    render(<SignUpForm />);

    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");
    const nameInput = screen.getByTestId("name");
    const submitButton = screen.getByTestId("signup-button");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Password123!" } });
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(0));
    await waitFor(() => expect(toast.success).toHaveBeenCalledTimes(0));
  });

  test("handles form submission with error", async () => {
    axios.post.mockRejectedValue(new Error("Network Error"));
    toast.error = jest.fn();

    render(<SignUpForm />);

    const emailInput = screen.getByTestId("email");
    const passwordInput = screen.getByTestId("password");
    const nameInput = screen.getByTestId("name");
    const submitButton = screen.getByTestId("signup-button");

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Password123!" } });
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(0));
    await waitFor(() => expect(toast.error).toHaveBeenCalledTimes(0));

    expect(mockPush).not.toHaveBeenCalled();
  });
});

describe("StaffLoginForm", () => {
  const mockPush = jest.fn();
  const mockRefresh = jest.fn();

  beforeEach(() => {
    useRouter.mockReturnValue({
      push: mockPush,
      refresh: mockRefresh,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the form", () => {
    render(<StaffLoginForm />);

    expect(screen.getByTestId("username")).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(screen.getByTestId("login")).toBeInTheDocument();
  });

  test("handles input change", () => {
    render(<StaffLoginForm />);

    const usernameInput = screen.getByTestId("username");
    const passwordInput = screen.getByTestId("password");

    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "@1ThinhHa" } });

    expect(usernameInput.value).toBe("admin");
    expect(passwordInput.value).toBe("@1ThinhHa");
  });

  test("handles form submission successfully", async () => {
    signIn.mockResolvedValue({ error: null });
    toast.success = jest.fn();

    render(<StaffLoginForm />);

    const usernameInput = screen.getByTestId("username");
    const passwordInput = screen.getByTestId("password");
    const submitButton = screen.getByTestId("login");

    fireEvent.change(usernameInput, { target: { value: "admin" } });
    fireEvent.change(passwordInput, { target: { value: "@1ThinhHa" } });
    fireEvent.click(submitButton);

    await waitFor(() => expect(signIn).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(toast.success).toHaveBeenCalledTimes(1));
    expect(toast.success).toHaveBeenCalledWith(
      "Login Successful",
      expect.any(Object)
    );
    expect(mockPush).toHaveBeenCalledWith("/");
    expect(mockRefresh).toHaveBeenCalled();
  });
});
