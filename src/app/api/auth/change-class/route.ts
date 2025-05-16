import { NextResponse } from "next/server";

import axios from "axios";
import { getServerSession } from "next-auth";
import { options } from "../[...nextauth]/options";
import qs from "qs";

export async function PUT(request: Request) {
  const session = await getServerSession(options);
  console.log("change-class/route.ts");

  try {
    const body = await request.json();
    console.log("register", body);

    if (!body) {
      return NextResponse.json({ message: "Body not found" }, { status: 400 });
    }

    const url = `${process.env.NEXT_PUBLIC_SERVER}/seat-flight/change-class`;

    const config = {
      method: "put",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        Authorization: session?.user.token,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: qs.stringify(body),
    };

    const response = await axios.request(config);
    console.log(response.data);

    return NextResponse.json(
      { message: "success", data: response.data },
      { status: 200 }
    );
  } catch (e: any) {
    console.log("error------------------------------", e);
    return NextResponse.json(
      { message: e.response?.data || "An error occurred" },
      { status: 500 }
    );
  }
}
