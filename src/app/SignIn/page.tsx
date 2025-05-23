import SignInForm from "@/components/SignInForm";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SignIn = async () => {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }
  return (
    <>
      <div
        className="hidden lg:block fixed w-2/3 h-48 bg-no-repeat top-30 right-0.5 rotate-12 "
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/CxjRL1xY/plane-01-7-2.png')",
        }}
      ></div>

      <div className="flex justify-center items-center h-fit">
        <div className="flex flex-row h-full">
          <div className="flex p-10 flex-col justify-between rounded-2xl lg:rounded-l-2xl lg:rounded-r-none h-full bg-white ">
            <h2 className="text-2xl font-bold mb-5 text-indigo-900">
              Welcome, <br /> sign in to continue
            </h2>
            <SignInForm />

            <p className="mt-4 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                href="/SignUp"
                className=" text-sm text-blue-600 mt-5 hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
          <div className=" w-96 hidden lg:block ">
            <picture>
              <img
                src="https://i.postimg.cc/9f1FPGGC/image-2024-03-26-170516871.png"
                alt="Illustration"
                className="w-full h-full object-cover rounded-e-2xl justify-center "
              />
            </picture>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
