import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    postBook: async (_, args, { request }) => {
      isAuthenticated(request);
      const { bookId } = args;
      const { user } = request;

      try {
        await prisma.updateUser({
          where: {
            id: user.id
          },
          data: {
            books: {
              create: {
                data: {
                  connect: {
                    id: bookId
                  }
                }
              }
            }
          }
        });
        return true;
      } catch {
        return false;
      }
    }
  }
};
