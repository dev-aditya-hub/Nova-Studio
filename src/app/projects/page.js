import prisma from "@/lib/prisma";
import MyWork from "@/components/MyWork";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main>
      <MyWork projects={projects} />
    </main>
  );
}
