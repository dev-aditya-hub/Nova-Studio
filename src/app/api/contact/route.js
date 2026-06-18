import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validateContactForm } from "@/lib/validators";

export async function POST(request) {
  try {
    const body = await request.json();

    if (body.website && body.website.trim().length > 0) {
      console.warn("Spam attempt detected and blocked (honeypot triggered).");
      return NextResponse.json(
        { message: "Thank you! We'll get back to you soon." },
        { status: 201 }
      );
    }

    const errors = validateContactForm(body);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const contact = await prisma.contact.create({
      data: {
        name: body.name.trim(),
        email: body.email.trim().toLowerCase(),
        message: body.message.trim(),
      },
    });

    return NextResponse.json(
      { message: "Thank you! We'll get back to you soon.", id: contact.id },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to save contact:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}
