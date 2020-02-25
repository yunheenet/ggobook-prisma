import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";
import { requestInterparkBookSearch } from "../../../utils";

export default {
  Mutation: {
    addGgoBook: async (_, args, { request }) => {
      isAuthenticated(request);
      const { isbn } = args;

      try {
        const {
          title,
          author,
          publisher,
          description,
          coverLargeUrl,
          coverSmallUrl,
          link,
          mobileLink
        } = await requestInterparkBookSearch(isbn);

        return await prisma.createGgoBook({
          isbn,
          title,
          author,
          publisher,
          description,
          coverLargeUrl,
          coverSmallUrl,
          link,
          mobileLink
        });
      } catch (e) {
        throw Error(e);
      }
    }
  }
};
