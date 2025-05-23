import { NextResponse } from "next/server";

import axios from "axios";
import qs from "qs";

export async function POST(request: Request) {
  const body = await request.json();
  //console.log("verify", body);
  try {
    const url = `${process.env.NEXT_PUBLIC_SERVER}/customer/send-verify-email`;
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: url,
      headers: {},
      data: qs.stringify({ email: body }),
    };

    const response = await axios.request(config);

    return NextResponse.json({ message: "success" });
  } catch (e: any) {
    //console.log("Not here", { e });
    //console.log(e.response.data);
    return NextResponse.json({ message: "false" });
  }
}
