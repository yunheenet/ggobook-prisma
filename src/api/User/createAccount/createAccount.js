import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    createAccount: async (_, args) => {
      const { username, email, firstName = "", lastName = "", bio = "" } = args;

      const exists = await prisma.$exists.user({
        OR: [{ username }, { email }]
      });

      if (exists) {
        throw Error("This username / email is already used it.");
      }

      await prisma.createUser({
        username,
        email,
        firstName,
        lastName,
        bio,
        following: {
          connect: {
            email: "ggobooking@gmail.com"
          }
        },
        followers: {
          connect: {
            email: "ggobooking@gmail.com"
          }
        }
      });

      return true;
    }
  }
};
