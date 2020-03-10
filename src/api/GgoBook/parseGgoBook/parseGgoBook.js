import { prisma } from "../../../../generated/prisma-client";

export default {
  Query: {
    parseGgoBook: async (_, args) => {
      const ggobooks = await prisma.ggoBooks({
        where: { description_contains: "&#34" }
      });

      ggobooks.map(async item => {
        const replaced = item.description
          .replace(/&#34/g, '"')
          .replace(/&#39/g, "'");
        await prisma.updateGgoBook({
          where: {
            id: item.id
          },
          data: {
            description: replaced
          }
        });
      });

      return ggobooks.length;
    }
  }
};
