import { redirect } from "next/navigation";
import { verifyAdmin } from "@/lib/auth";
import prisma from "@/lib/prisma";
import connectMongo from "@/lib/mongodb";
import Analytics from "@/lib/models/Analytics";
import DashboardClient from "./DashboardClient";

export const dynamic = "force-dynamic";

async function getContacts() {
  try {
    return await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getProjects() {
  try {
    return await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getAnalytics() {
  try {
    await connectMongo();
    const events = await Analytics.find()
      .sort({ timestamp: -1 })
      .limit(100)
      .lean();

    return events.map((event) => ({
      id: event._id.toString(),
      eventType: event.eventType,
      page: event.page,
      metadata: event.metadata || {},
      userAgent: event.userAgent || "",
      timestamp: event.timestamp.toISOString(),
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function AdminDashboard() {
  const admin = await verifyAdmin();
  if (!admin) {
    redirect("/admin/login");
  }

  const [contacts, projects, analytics] = await Promise.all([
    getContacts(),
    getProjects(),
    getAnalytics(),
  ]);

  return (
    <DashboardClient
      adminUser={admin}
      initialContacts={contacts}
      initialProjects={projects}
      initialAnalytics={analytics}
    />
  );
}
