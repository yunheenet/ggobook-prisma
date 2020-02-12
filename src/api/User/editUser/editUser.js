import { prisma } from "../../../../generated/prisma-client";

export default {
  Mutation: {
    editUser: async (_, args, { request, isAthenticated }) => {
      isAthenticated(request);
      const { username, firstName, lastName, bio } = args;
      const { user } = request;

      return prisma.updateUser({
        where: { id: user.id },
        data: { username, firstName, lastName, bio }
      });
    }
  }
};