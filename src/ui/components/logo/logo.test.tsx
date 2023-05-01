import renderer from "react-test-renderer";
import { Logo } from "./logo.component";

describe("Logo", () => {
  it("should match snapshot with default behavior", () => {
    const tree = renderer.create(<Logo />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("should match snapshot with dark theme", () => {
    const tree = renderer.create(<Logo theme="dark" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
