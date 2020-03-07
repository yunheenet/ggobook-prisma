import { prisma } from "../../../../generated/prisma-client";
import { isAuthenticated } from "../../../middlewares";

export default {
  Mutation: {
    deleteBook: async (_, args, { request }) => {
      isAuthenticated(request);
      const { id } = args;
      const { user } = request;

      const book = await prisma.$exists.book({ id, user: { id: user.id } });
      if (book) {
        try {
          await prisma.deleteBook({ id });
          return true;
        } catch (e) {
          console.log(e);
        }
      }

      return false;
    }
  }
};
