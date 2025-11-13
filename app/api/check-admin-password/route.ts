console.log("ADMIN_PASSWORD from env:", process.env.ADMIN_PASSWORD);
// app/api/check-admin-password/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // parse JSON body
    const password = body?.password;
    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

    console.log("Received password:", password);
    console.log("Server ADMIN_PASSWORD:", ADMIN_PASSWORD);

    if (!password) {
      return NextResponse.json(
        { ok: false, message: "Password is required" },
        { status: 400 }
      );
    }

    if (password === ADMIN_PASSWORD) {
      return NextResponse.json({ ok: true });
    } else {
      return NextResponse.json(
        { ok: false, message: "Incorrect password" },
        { status: 401 }
      );
    }
  } catch (err) {
    console.error("Error in POST /api/check-admin-password:", err);
    return NextResponse.json(
      { ok: false, message: "Server error" },
      { status: 500 }
    );
  }
}
