import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  try {
    const hashedPassword = await bcrypt.hash('123123123', 10);

    const user = await prisma.user.create({
      data: {
        name: 'Editor',
        email: 'editor@editor.com',
        password: hashedPassword,
        role: 'editor',
        active: true
      },
    });
    
    console.log('Usuário criado: ', user);
  } catch (error) {
    console.error('Erro ao criar usuário: ', error)
  } finally {
    await prisma.$disconnect();
  }
}

main();