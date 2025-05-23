import { NextResponse } from "next/server";

import axios from "axios";
import qs from "qs";

export async function POST(request: Request) {
  const body = await request.json();
  try {
    const url = `${process.env.NEXT_PUBLIC_SERVER}/customer/upload-profile-picture`;
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: url,
      headers: {
        ...body.getHeaders(),
      },
      data: body,
    };

    const response = await axios.request(config);
    console.log(response);

    return NextResponse.json({ message: "success" });
  } catch (e: any) {
    return NextResponse.json({ message: "false" });
  }
}
