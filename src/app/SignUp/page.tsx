import SignUpForm from "@/components/SignUpForm";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const SignUp = async () => {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return (
    <>
      <div className="flex justify-center items-center ">
        <div className="flex p-3">
          <div className="hidden lg:block">
            <picture>
              <img
                src="https://images.pexels.com/photos/2517931/pexels-photo-2517931.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Illustration"
                className="w-full h-full object-cover rounded-s-2xl"
              />
            </picture>
          </div>
          <div className="flex p-6 flex-col justify-between rounded-2xl lg:rounded-e-2xl lg:rounded-l-none h-full bg-white ">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-800">
              Let's get started
            </h2>
            <SignUpForm />
            <p className="ml-5 text-sm text-gray-600 mt-3">
              Already have an account?{" "}
              <Link href="/SignIn" className="text-indigo-600 hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
