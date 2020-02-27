import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addBookMemo: async (_, args, { request }) => {
      isAuthenticated(request);
      const { bookId, text } = args;
      const { user } = request;

      return await prisma.createMemo({
        text,
        user: {
          connect: {
            id: user.id
          }
        },
        book: {
          connect: {
            id: bookId
          }
        }
      });
    }
  }
};
