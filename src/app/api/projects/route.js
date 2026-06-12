import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { verifyAdmin } from "@/lib/auth";
import { validateProject } from "@/lib/validators";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" }, // newest first
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  // only admins can add projects
  const admin = await verifyAdmin();
  if (!admin) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const body = await request.json();

    // validate on server side too, not just frontend
    const errors = validateProject(body);
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ errors }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        title: body.title.trim(),
        category: body.category.trim(),
        imageUrl: body.imageUrl.trim(),
        description: body.description ? body.description.trim() : null,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}
