import { jssConfig } from "@/jssConfig";
import { GraphQLClient } from "graphql-request";

const endpoint = `${jssConfig.sitecoreEdgeUrl}/v1/content/api/graphql/v1?sitecoreContextId=${jssConfig.sitecoreEdgeContextId}`;
export const client = new GraphQLClient(endpoint);
