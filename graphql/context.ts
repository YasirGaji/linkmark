// graphql/context

// import {  getSession } from '@auth0/nextjs-auth0'
// import type { NextApiRequest, NextApiResponse } from 'next'

// export async function createContext({ req, res }: { req: NextApiRequest, res: NextApiResponse }) {
//   const session = await getSession(req, res)

//   // if the user is not logged in, return null
//   if (!session || typeof session === 'undefined') return {}

//   const { user, accessToken } = session

//   return {
//     user,
//     accessToken,
//   }
// }


import { PrismaClient } from "@prisma/client";
import prisma from "../lib/prisma"

export type Context = {
  prisma: PrismaClient;
};

export async function createContext(req, res): Promise<Context> {
  return {
    prisma,
  }
}