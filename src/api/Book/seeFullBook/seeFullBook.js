import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    seeFullBook: async (_, args) => {
      const { id } = args;
      return prisma.book({ id });
    }
  }
};
