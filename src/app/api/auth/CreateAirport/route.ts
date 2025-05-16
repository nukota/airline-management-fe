import { NextResponse } from "next/server";

import axios from "axios";
import qs from "qs";
import { getServerSession } from "next-auth";
import { options } from "../[...nextauth]/options";

export async function POST(request: Request) {
  const session = await getServerSession(options);

  try {
    const body = await request.json();

    if (!body) {
      return NextResponse.json({ message: "Body not found" }, { status: 400 });
    }

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${process.env.NEXT_PUBLIC_SERVER}/airport`,
      headers: {
        Authorization: session?.user.token,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify(body),
    };
    const response = await axios.request(config);
    console.log("CreateAirport/route.ts", response.data);

    return NextResponse.json({ message: "success", data: response.data });
  } catch (e: any) {
    console.log("error------------------------------", e);
    return NextResponse.json(
      { message: e.response?.data || "An error occurred" },
      { status: 500 }
    );
  }
}
