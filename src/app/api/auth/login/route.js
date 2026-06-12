import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { comparePassword, createToken, setAuthCookie } from "@/lib/auth";

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { username: username.trim() },
    });

    // return same error for wrong username and wrong password
    // so attackers can't tell which one was wrong
    if (!admin) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isValid = await comparePassword(password, admin.password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // create a JWT and set it as an httpOnly cookie
    const token = createToken(admin);
    await setAuthCookie(token);

    return NextResponse.json({
      message: "Login successful",
      user: { id: admin.id, username: admin.username },
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "An error occurred during login" },
      { status: 500 }
    );
  }
}
