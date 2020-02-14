export default {
  Like: {
    post: ({ id }) => prisma.like({ id }).poost(),
    user: ({ id }) => prisma.like({ id }).user()
  }
};
