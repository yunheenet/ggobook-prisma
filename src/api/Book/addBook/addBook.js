import { isAuthenticated } from "../../../middlewares";
import { prisma } from "../../../../generated/prisma-client";
import { requestInterparkBookSearch } from "../../../utils";

export default {
  Mutation: {
    addBook: async (_, args, { request }) => {
      isAuthenticated(request);
      const { isbn } = args;
      const { user } = request;

      try {
        const findBook = await prisma.books({
          where: {
            isbn
          }
        });

        if (findBook.length !== 0) {
          return findBook[0];
        }

        const {
          id,
          title,
          author,
          publisher,
          description,
          coverLargeUrl,
          coverSmallUrl,
          link,
          mobileLink
        } = await requestInterparkBookSearch(isbn);

        const book = await prisma.createBook({
          id,
          isbn,
          title,
          author,
          description,
          publisher,
          coverLargeUrl,
          coverSmallUrl,
          link,
          mobileLink
        });
        console.log("createBook:" + book.isbn);
        return book;
      } catch (e) {
        throw Error(e);
      }
    }
  }
};
