import { signIn } from "next-auth/react";

export function GoogleSignUpButton() {
  const handleClick = () => {
    signIn("google");
  };

  return (
    <button
      onClick={handleClick}
      className="w-full flex justify-center items-center py-3 gap-2 bg-white text-gray-700 rounded-lg border border-gray-300 hover:bg-gray-50 "
    >
      <p>Sign Up with Google </p>{" "}
      <picture>
        <img
          className="w-4 h-4"
          src="https://th.bing.com/th/id/R.1e01fe36388e7453ab926c23b190827c?rik=pQoqct3ys2U8zg&pid=ImgRaw&r=0"
          alt="gg_logo"
        />
      </picture>
    </button>
  );
}
