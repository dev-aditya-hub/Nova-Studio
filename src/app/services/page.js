import prisma from "@/lib/prisma";
import WhatIDo from "@/components/WhatIDo";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: { id: "asc" },
  });

  return (
    <main>
      <WhatIDo services={services} />
    </main>
  );
}
