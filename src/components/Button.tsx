import Link from "next/link";
import React from "react";

type inputType = {
  link: string;
  content: any;
  color?: string;
  textcolor?: string;
};

const Button: React.FC<inputType> = ({ link, content }) => {
  return (
    <Link
      href={`${link}`}
      className="btn btn-ghost rounded-full mx-3 hover:text-white"
    >
      {content}
    </Link>
  );
};

export default Button;
