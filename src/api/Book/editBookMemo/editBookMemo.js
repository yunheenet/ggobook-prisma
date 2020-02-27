import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deleteBookMemo: async (_, args, { request }) => {
      isAuthenticated(request);
      const { memoId, text } = args;
      const { user } = request;

      const memo = prisma.$exists.memo({
        id: memoId,
        user: {
          id: user.id
        }
      });
      if (memo) {
        return await prisma.updateMemo({
          data: text,
          where: {
            id: memoId
          }
        });
      }
    }
  }
};
