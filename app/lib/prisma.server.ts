import { PrismaClient } from "../generated/prisma";

declare global {
    // eslint-disable-next-line no-var
    var prismaClient: PrismaClient;
}

globalThis.prismaClient ??= new PrismaClient();

const prisma = globalThis.prismaClient;

export default prisma;
