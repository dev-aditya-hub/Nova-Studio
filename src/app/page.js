import prisma from "@/lib/prisma";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Stats from "@/components/Stats";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AnalyticsTracker from "@/components/AnalyticsTracker";

// force dynamic rendering so we always get the latest data from the db
export const dynamic = "force-dynamic";

async function getServices() {
  try {
    return await prisma.service.findMany({
      orderBy: { id: "asc" },
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getProjects() {
  try {
    return await prisma.project.findMany({
      // show newest projects at the top
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function getStats() {
  try {
    return await prisma.stat.findMany({
      orderBy: { id: "asc" },
    });
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function Home() {
  // run all queries at the same time to make page load faster
  const [services, projects, stats] = await Promise.all([
    getServices(),
    getProjects(),
    getStats(),
  ]);

  return (
    <>
      <AnalyticsTracker />
      <Navbar />
      <main>
        <Hero />
        <Services services={services} />
        <Portfolio projects={projects} />
        <Stats stats={stats} />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
