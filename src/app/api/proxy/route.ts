import { NextResponse } from "next/server";
import axios from "axios";
import { headers } from "next/headers";
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const params = Object.fromEntries(searchParams.entries());


  const headersList = headers();
  const ip = headersList.get("x-forwarded-for");

  try {
    const response = await axios.get("https://api.ip2location.io/", {
      params: { key: process.env.API_KEY, ...params },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
