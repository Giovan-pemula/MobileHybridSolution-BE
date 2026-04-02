// import bcrypt from 'bcryptjs'
// import { PrismaClient } from '../../generated/prisma/client'

// async function seedAdmin(prisma: PrismaClient) {
//   console.log("seed admin")
//   const hashedPassword = await bcrypt.hash('admin123', 10)

//   const admin = await prisma.admin.upsert({
//     where: { email: 'admin@example.com' },
//     update: {
//       password: hashedPassword,
//     },
//     create: {
//       email: 'admin@example.com',
//       password: hashedPassword,
//     },
//   })

//   console.log('Admin seeded:', admin.email)
// }

// export default seedAdmin;