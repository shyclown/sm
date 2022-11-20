import { render } from "@testing-library/react";
import { LoginView } from "./LoginView";

describe("Login View", () => {
  it("should render component", () => {
    const { container } = render(<LoginView />);
    expect(container).toBeInTheDocument();
  });
});
