
export const resolvers = {
  Query: {
    links: async (_parent, args, context) =>
      context.prisma.link.findMany(),
  },
}












