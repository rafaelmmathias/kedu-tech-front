import { render, screen } from "@/test/test-utils";
import { LoginPage } from "./login.page";

describe("Auth", () => {
  it("should render first step", async () => {
    render(<LoginPage />);

    const title = screen.queryByText(
      "Para acessar sua conta, por favor, informe suas credenciais de login abaixo:",
    );

    expect(title).toBeInTheDocument();
  });
});
