import { GraphQLClient } from 'graphql-request'
import { clientConfig } from '../config.client'

const endpoint = `${clientConfig.sitecoreEdgeUrl}/v1/content/api/graphql/v1?sitecoreContextId=${clientConfig.sitecoreEdgeContextId}`
export const client = new GraphQLClient(endpoint)
