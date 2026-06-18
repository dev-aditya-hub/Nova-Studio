const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Aditya@4044", 12);
  await prisma.admin.updateMany({
    where: { username: "admin" },
    data: { password: hashedPassword },
  });
  console.log("Admin password updated to Aditya@4044");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
