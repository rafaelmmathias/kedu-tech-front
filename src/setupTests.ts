import "@testing-library/jest-dom";
import { server } from "./test/server/test-server";
import "./config";

const originalWarn = console.error.bind(console.error);

//Mocking methods which are not implemented in JSDOM
//https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

jest.mock("./config", () => ({
  API_BASE_URL_GRAPH_QL: "http://localhost:4000",
  ENVIRONMENT: "test",
  isTest: () => true,
  isDev: () => false,
}));

beforeAll(() => {
  server.listen();

  //supress unwanted img warnings because svg string on test env
  console.error = (msg) => {
    if (!msg.toString().includes("Invalid value for prop `src` on <img> tag"))
      return false;
    originalWarn(msg);
  };
  console.error = () => false;
});
afterEach(() => {
  server.resetHandlers();
});

afterAll(() => server.close());
