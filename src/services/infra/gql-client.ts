import { RequestDocument, GraphQLClient, ClientError } from "graphql-request";
import { API_BASE_URL_GRAPH_QL } from "@/config";
import {
  AccessDeniedException,
  AlreadyUsedDocumentException,
  CredentialsException,
  ExtendedClientError,
  UnknownErrorException,
} from "@/entities/errors.entities";
import { authStorage } from "@/modules/auth";
interface ErrorTypeMap {
  [key: string]: new () => Error;
}

export const errorTypeMap: ErrorTypeMap = {
  AccessDeniedException,
  USER_NOT_FOUND: CredentialsException,
  AlreadyUsedDocumentException,
};

const httpStatusExceptions: Record<number, new () => Error> = {
  401: CredentialsException,
  403: AccessDeniedException,
};

const getAuthHeader = () => {
  const token = authStorage.getToken();
  return token ? { Authorization: `Bearer ${token}` } : undefined;
};

export const graphQLClient = new GraphQLClient(API_BASE_URL_GRAPH_QL, {
  headers: getAuthHeader,
});

export function gqlRequest<T>(document: RequestDocument): Promise<T>;
export function gqlRequest<T, TParams extends object>(
  document: RequestDocument,
  params: TParams,
): Promise<T>;
export async function gqlRequest<T, TParams extends object>(
  document: RequestDocument,
  params?: TParams,
) {
  try {
    return await graphQLClient.request<T>(document, params);
  } catch (err) {
    if (err instanceof ClientError) {
      const error = new ExtendedClientError(err.response, err.request);

      const ExceptionClass = errorTypeMap[error.type];
      if (ExceptionClass) {
        throw new ExceptionClass();
      }

      const httpStatusException = httpStatusExceptions[err.response.status];

      if (httpStatusException) {
        throw new httpStatusException();
      }
    }

    throw new UnknownErrorException();
  }
}
