import { render } from "src/testutils/test-utils";
import { screen } from "@testing-library/react";
import { Copyright } from "./Copyright";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    pathname: "/",
  }),
}));

describe("Copyright Component", () => {
  test("should match snapshot", () => {
    const { baseElement } = render(<Copyright />);

    expect(baseElement).toMatchSnapshot();
  });

  test("should render Meetsy word", () => {
    render(<Copyright />);

    expect(screen.getByText("Meetsy")).toBeTruthy();
  });
});
