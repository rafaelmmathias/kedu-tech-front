const API_BASE_URL_GRAPH_QL = import.meta.env.VITE_API_ENDPOINT || "";

const { MODE: ENVIRONMENT } = import.meta.env;

const isProduction = () => ENVIRONMENT === "production";
const isDev = () => ENVIRONMENT === "development";
const isTest = () => ENVIRONMENT === "test";

export { API_BASE_URL_GRAPH_QL, isProduction, isDev, isTest };
