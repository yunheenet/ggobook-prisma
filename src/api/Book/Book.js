import { prisma } from "../../../generated/prisma-client";

export default {
  Book: {
    data: ({ id }) => prisma.book({ id }).data(),
    user: ({ id }) => prisma.book({ id }).user(),
    memos: ({ id }) => prisma.book({ id }).memos(),
    isMyBook: async (parent, _, { request }) => {
      const { user } = request;
      return await prisma.$exists.book({
        AND: [
          {
            id: parent.id
          },
          {
            user: {
              id: user.id
            }
          }
        ]
      });
    }
  }
};
