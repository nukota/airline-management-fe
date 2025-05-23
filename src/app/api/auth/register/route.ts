import { NextResponse } from "next/server";

import axios from "axios";
import qs from "qs";

export async function POST(request: Request) {
  const body = await request.json();
  console.log("register", body);
  try {
    const url = `${process.env.NEXT_PUBLIC_SERVER}/customer`;
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: url,
      headers: {},
      data: qs.stringify(body),
    };

    const response = await axios.request(config);

    return NextResponse.json(
      { message: { message: "success", statusCode: 200 }, data: response.data },
      { status: 200 }
    );
  } catch (e: any) {
    return NextResponse.json(
      { message: e.response?.data || "An error occurred" },
      { status: 500 }
    );
  }
}
