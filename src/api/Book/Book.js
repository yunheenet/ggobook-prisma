import { prisma } from "../../../generated/prisma-client";

export default {
  Book: {
    data: ({ id }) => prisma.book({ id }).data(),
    user: ({ id }) => prisma.book({ id }).user()
  }
};
