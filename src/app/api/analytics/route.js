import { NextResponse } from "next/server";
import connectMongo from "@/lib/mongodb";
import Analytics from "@/lib/models/Analytics";
import { verifyAdmin } from "@/lib/auth";

export async function POST(request) {
  try {
    await connectMongo();

    const body = await request.json();
    const { eventType, page, metadata } = body;

    if (!eventType || !page) {
      return NextResponse.json(
        { error: "eventType and page are required" },
        { status: 400 }
      );
    }

    const allowedTypes = ["page_visit", "cta_click"];
    if (!allowedTypes.includes(eventType)) {
      return NextResponse.json(
        { error: "Invalid event type" },
        { status: 400 }
      );
    }

    const userAgent = request.headers.get("user-agent") || "";

    const event = await Analytics.create({
      eventType,
      page,
      metadata: metadata || {},
      userAgent,
      timestamp: new Date(),
    });

    return NextResponse.json({ message: "Event tracked", id: event._id }, { status: 201 });
  } catch (error) {
    console.error("Analytics tracking error:", error);
    return NextResponse.json(
      { error: "Failed to track event" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const admin = await verifyAdmin();
  if (!admin) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    await connectMongo();

    const events = await Analytics.find()
      .sort({ timestamp: -1 })
      .limit(200)
      .lean();

    return NextResponse.json(events);
  } catch (error) {
    console.error("Failed to fetch analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
