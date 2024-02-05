// // /graphql/types/User.ts
// import { builder } from "../builder";

// builder.prismaObject('User', {
//   fields: (t) => ({
//     id: t.exposeID('id'),
//     email: t.exposeString('email', { nullable: true, }),
//     image: t.exposeString('image', { nullable: true, }),
//     role: t.expose('role', { type: Role, }),
//     bookmarks: t.relation('bookmarks'),
//   })
// })

// const Role = builder.enumType('Role', {
//   values: ['USER', 'ADMIN'] as const,
// })

// builder.queryField('favorites', (t) =>
//   t.prismaField({
//     type: 'User',
//     resolve: async (query, _parent, _args, ctx) => {
//       if (!(await ctx).user) {
//         throw new Error("You have to be logged in to perform this action")
//       }

//       const user = await prisma.user.findUnique({
//         ...query,
//         where: {
//           email: (await ctx).user?.email,
//         }
//       })

//       if (!user) throw Error('User does not exist');

//       return user
//     }
//   })
// )

import { enumType, objectType } from "nexus";
import { Link } from './Link'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.string('id');
    t.string('name');
    t.string('email');
    t.string('image');
    t.field('role', {type: Role});
    t.list.field('bookmarks', {
      type: Link,
      async resolve(parent, _args, context) {
        return await context.prisma.user
          .findUnique({
            where: {
              id: parent.id,
            },
          })
        .bookmarks();
      },
    });
  },
});

const Role = enumType({
  name: 'Role',
  members: ['USER', 'ADMIN'],
})