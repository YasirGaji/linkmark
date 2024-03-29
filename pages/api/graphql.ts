// import { createYoga } from 'graphql-yoga'
// import type { NextApiRequest, NextApiResponse } from 'next'
// import { schema } from '../../graphql/schema'
// import { createContext } from '../../graphql/context'




// export default createYoga<{
//   req: NextApiRequest
//   res: NextApiResponse
// }>({
//   schema,
//   context: createContext,
//   graphqlEndpoint: '/api/graphql'
// })

// export const config = {
//   api: {
//     bodyParser: false
//   }
// }


 

import { ApolloServer } from 'apollo-server-micro'
import { schema } from '../../graphql/schema'
import { resolvers } from '../../graphql/resolvers'
import Cors from 'micro-cors'
import { createContext } from '../../graphql/context'

const cors = Cors()


const apolloServer = new ApolloServer({ schema, resolvers, context: createContext, });

const startServer = apolloServer.start()

export default cors(async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    res.end();
    return false
  }

  await startServer;

  await apolloServer.createHandler({
    path:'/api/graphql',
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  }
}

