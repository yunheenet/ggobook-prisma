import { prisma } from "../../../../generated/prisma-client";
import { requestInterparkBookSearch } from "../../../utils";

export default {
  Query: {
    findGgoBook: async (_, args) => {
      const { isbn } = args;

      const ggoBooks = await prisma.ggoBooks({ where: { isbn } });
      if (ggoBooks.length !== 0) {
        return ggoBooks[0];
      }

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

        const replacedDescription = String(description)
          .replace(/&#34/g, '"')
          .replace(/&#39/g, "'");

        return await prisma.createGgoBook({
          isbn,
          title,
          author,
          publisher,
          description: replacedDescription,
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
