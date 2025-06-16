import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Limpar as tabelas existentes
  await prisma.appointment.deleteMany();
  await prisma.doctor.deleteMany();
  await prisma.user.deleteMany();

  // Criar usuário
  const user = await prisma.user.create({
    data: {
      name: "Marcos Silva",
      email: "marcos.silva@example.com",
      avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=250&q=80",
      password: "senha123",
    }
  });

  // Criar médicos
  const doctors = await Promise.all([
    prisma.doctor.create({
      data: {
        name: "Dra. Márcia Santos", 
        specialty: "Neurologista", 
        rating: 5.0, 
        profilePicture: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        bio: "Dra. Márcia é especialista em distúrbios neurológicos, com mais de 10 anos de experiência.",
        location: "Rua Exemplo, 123, São Paulo",
        phone: "(11) 99999-1111",
        email: "marcia.santos@email.com",
        hours: "Seg-Sex: 09:00 - 18:00"
      }
    }),
    prisma.doctor.create({
      data: {
        name: "Dr. Carlos Lima", 
        specialty: "Cardiologista", 
        rating: 4.9, 
        profilePicture: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        bio: "Dr. Carlos dedica-se ao tratamento de doenças cardíacas, oferecendo cuidados preventivos e terapêuticos.",
        location: "Av. Principal, 456, Rio de Janeiro",
        phone: "(21) 99999-2222",
        email: "carlos.lima@email.com",
        hours: "Seg-Qui: 08:00 - 17:00"
      }
    }),
        prisma.doctor.create({
      data: {
        name: "Dr. Fernando Costa", 
        specialty: "Ortopedista", 
        rating: 4.9, 
        profilePicture: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        bio: "Dr. Carlos dedica-se ao tratamento de doenças cardíacas, oferecendo cuidados preventivos e terapêuticos.",
        location: "Av. Principal, 456, Rio de Janeiro",
        phone: "(21) 99999-2222",
        email: "carlos.lima@email.com",
        hours: "Seg-Qui: 08:00 - 17:00"
      }
    }),
        prisma.doctor.create({
      data: {
        name: "Dr. Maria Oliveira", 
        specialty: "Pediatra", 
        rating: 4.9, 
        profilePicture: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        bio: "Dr. Carlos dedica-se ao tratamento de doenças cardíacas, oferecendo cuidados preventivos e terapêuticos.",
        location: "Av. Principal, 456, Rio de Janeiro",
        phone: "(21) 99999-2222",
        email: "carlos.lima@email.com",
        hours: "Seg-Qui: 08:00 - 17:00"
      }
    }),
        prisma.doctor.create({
      data: {
        name: "Dr. Luiz Pereira", 
        specialty: "Pediatra", 
        rating: 4.9, 
        profilePicture: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        bio: "Dr. Carlos dedica-se ao tratamento de doenças cardíacas, oferecendo cuidados preventivos e terapêuticos.",
        location: "Av. Principal, 456, Rio de Janeiro",
        phone: "(21) 99999-2222",
        email: "carlos.lima@email.com",
        hours: "Seg-Qui: 08:00 - 17:00"
      }
    }),
        prisma.doctor.create({
      data: {
        name: "Dr. Ana Souza", 
        specialty: "Ginecologista", 
        rating: 4.9, 
        profilePicture: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80",
        bio: "Dr. Carlos dedica-se ao tratamento de doenças cardíacas, oferecendo cuidados preventivos e terapêuticos.",
        location: "Av. Principal, 456, Rio de Janeiro",
        phone: "(21) 99999-2222",
        email: "carlos.lima@email.com",
        hours: "Seg-Qui: 08:00 - 17:00"
      }
    }),
  ]);

  // Criar consultas
  await Promise.all([
    prisma.appointment.create({
      data: {
        date: "15 de Maio",
        time: "14:00",
        status: "aberto",
        doctorId: doctors[0].id,
        userId: user.id
      }
    }),
     prisma.appointment.create({
      data: {
        date: "18 de Maio",
        time: "14:00",
        status: "aberto",
        doctorId: doctors[0].id,
        userId: user.id
      }
    }),
    prisma.appointment.create({
      data: {
        date: "22 de Abril",
        time: "10:30",
        status: "finalizado",
        doctorId: doctors[1].id,
        userId: user.id
      }
    }),
  ]);

  console.log('Dados de teste criados com sucesso');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });