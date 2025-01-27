import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.log("Webhook processing error", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
