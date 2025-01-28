// import { PrismaClient } from "@prisma/client"
//
// const prismaClientSingleton = () => {
//   return new PrismaClient({
//     log: ["error", "info", "warn", "query"]
//   });
// }
//
// declare const globalThis: {
//   prismaGlobal: ReturnType<typeof prismaClientSingleton>
// } & typeof global;
//
// const db = globalThis.prismaGlobal ?? prismaClientSingleton();
//
// export default db;
//
// if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = db;

import { PrismaClient } from '@prisma/client';

const db = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL, // Use your remote DB URL
    },
  },
});

export default db;
