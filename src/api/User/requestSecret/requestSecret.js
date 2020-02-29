import { prisma } from "../../../../generated/prisma-client";
import { generateSecret, sendSecretMail } from "../../../utils";

export default {
  Mutation: {
    requestSecret: async (_, args, { request }) => {
      const { email } = args;
      const loginSecret = generateSecret();
      try {
        const user = await prisma.updateUser({
          data: { loginSecret },
          where: { email }
        });
        if (user) {
          await sendSecretMail(email, loginSecret);
          return true;
        }
      } catch (error) {
        return false;
      }
    }
  }
};
