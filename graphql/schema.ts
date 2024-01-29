// graphql/schema.ts

import { gql } from 'apollo-server-micro'

import { builder } from "./builder";
import "./types/Link"
import "./types/User"

export const schema = builder.toSchema()
