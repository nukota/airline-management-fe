import { signIn } from "next-auth/react";

export function GoogleSignInButton() {
  const handleClick = () => {
    signIn("google");
  };

  return (
    <button
      onClick={handleClick}
      className="btn btn-ghost w-full py-2 px-4 bg-white  rounded "
    >
      Sign In with Google
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
