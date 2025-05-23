import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${process.env.NEXT_PUBLIC_SERVER}/airport/country`,
    headers: {},
  };

  const response = await axios.request(config);
  console.log(response.data);

  return NextResponse.json({
    message: "success",
    data: response.data,
  });
}
