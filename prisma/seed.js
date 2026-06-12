const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  // wipe everything first so re-running seed doesn't duplicate data
  await prisma.project.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.service.deleteMany();
  await prisma.stat.deleteMany();
  await prisma.admin.deleteMany();

  // the three core services the agency offers
  const services = [
    {
      title: "Web Design",
      description:
        "We craft visually stunning, user-centric websites that capture your brand identity and engage your audience from the very first click.",
      icon: "DesignServices",
    },
    {
      title: "Front-End Development",
      description:
        "Our team builds fast, responsive, and accessible front-end experiences using modern frameworks and clean, maintainable code.",
      icon: "Code",
    },
    {
      title: "Branding",
      description:
        "From logo design to full brand guidelines, we help you establish a memorable identity that resonates with your target market.",
      icon: "Brush",
    },
  ];

  for (const service of services) {
    await prisma.service.create({ data: service });
  }

  // key numbers shown in the stats section with count-up animation
  const stats = [
    { label: "Projects Completed", value: 150, suffix: "+" },
    { label: "Clients Worldwide", value: 50, suffix: "+" },
    { label: "Years Experience", value: 5, suffix: "" },
  ];

  for (const stat of stats) {
    await prisma.stat.create({ data: stat });
  }

  // sample portfolio projects — images stored in /public/images/
  const projects = [
    {
      title: "Apex Fitness",
      category: "Web Design",
      imageUrl: "/images/project-1.jpg",
      description: "A modern fitness brand website with bold visuals and smooth animations.",
    },
    {
      title: "Verdant Gardens",
      category: "Branding",
      imageUrl: "/images/project-2.jpg",
      description: "Complete brand identity for an organic landscaping company.",
    },
    {
      title: "CloudSync Dashboard",
      category: "Front-End Development",
      imageUrl: "/images/project-3.jpg",
      description: "A real-time analytics dashboard built with React and WebSocket integration.",
    },
    {
      title: "Nomad Travel Co.",
      category: "Web Design",
      imageUrl: "/images/project-4.jpg",
      description: "Travel booking platform designed for adventure seekers and digital nomads.",
    },
  ];

  for (const project of projects) {
    await prisma.project.create({ data: project });
  }

  // hash the password before storing — never store plain text
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || "NovaStudio@2024",
    12
  );

  await prisma.admin.create({
    data: {
      username: process.env.ADMIN_USERNAME || "admin",
      password: hashedPassword,
    },
  });

  console.log("Database seeded.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
