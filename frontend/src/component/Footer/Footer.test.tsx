import { render } from "src/testutils/test-utils";
import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Footer } from "./Footer";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    pathname: "/",
  }),
}));

describe("Footer Component", () => {
  it("should match snapshot", () => {
    const { baseElement } = render(<Footer />);
    expect(baseElement).toMatchSnapshot();
  });

  test("should render one of the footer links", () => {
    render(<Footer />);

    expect(screen.getByTestId("privacypolicy")).toBeInTheDocument();
  });
});
