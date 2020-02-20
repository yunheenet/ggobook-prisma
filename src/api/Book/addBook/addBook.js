import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    addBook: async (_, args, { request }) => {
      isAuthenticated(request);
      const {
        isbn,
        title,
        author,
        publisher,
        coverLargeUrl,
        coverSmallUrl,
        link,
        mobileLink
      } = args;
      const { user } = request;

      const book = await prisma.createBook({
        isbn,
        title,
        author,
        publisher,
        coverLargeUrl,
        coverSmallUrl,
        link,
        mobileLink
      });

      return book;
    }
  }
};
