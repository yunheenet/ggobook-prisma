import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    deleteBookMemo: async (_, args, { request }) => {
      isAuthenticated(request);
      const { memoId } = args;
      const { user } = request;

      const memo = await prisma.$exists.memo({
        id: memoId,
        user: {
          id: user.id
        }
      });

      if (!memo) {
        return undefined;
      }

      return await prisma.deleteMemo({ id: memoId });
    }
  }
};
