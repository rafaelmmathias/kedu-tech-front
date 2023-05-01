import {
  ClientError,
  GraphQLError,
  GraphQLRequestContext,
  GraphQLResponse,
} from "graphql-request/dist/types";

export class ExtendedClientError extends ClientError {
  type: string;
  constructor(response: GraphQLResponse, request: GraphQLRequestContext) {
    super(response, request);

    const error = response.errors?.find(
      (error: GraphQLError) => error.extensions?.code,
    );

    this.type = error?.extensions?.code || "UnknownErrorException";
  }
}

export class UnknownErrorException extends Error {
  constructor() {
    super("Ocorreu um erro desconhecido, por favor tente novamente");
    this.name = "UnknownErrorException";
  }
}

export class UnauthorizedException extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnauthorizedException";
  }
}

export class CredentialsException extends Error {
  constructor() {
    super("Usuário ou senha inválidos");
    this.name = "CredentialsException";
  }
}

export class AccessDeniedException extends Error {
  constructor() {
    super("Você não tem permissão para executar essa operação.");
    this.name = "AccessDeniedException";
  }
}

export class TimeoutException extends Error {
  constructor() {
    super("Tempo limite de espera atingido, tente novamente.");
    this.name = "TimeoutException";
  }
}

export class AlreadyUsedDocumentException extends Error {
  constructor() {
    super("Este documento já está sendo utiliado");
    this.name = "AlreadyUsedDocumentException";
  }
}
