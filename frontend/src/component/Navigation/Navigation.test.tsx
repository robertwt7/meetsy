import "@testing-library/jest-dom";
import { render } from "src/testutils/test-utils";
import { screen } from "@testing-library/react";
import { Navigation } from "./Navigation";

const mocks = {
  useMediaQuery: jest.fn().mockReturnValue(true),
  useSession: jest.fn().mockReturnValue({
    sessionData: {
      user: {
        name: "Test user",
        email: "test@gmail.com",
      },
    },
    status: "authenticated",
  }),
};

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    route: "/",
  }),
}));
jest.mock("@mui/material", () => {
  const rest = jest.requireActual("@mui/material");

  return {
    ...rest,
    useMediaQuery: () => mocks.useMediaQuery(),
  };
});

jest.mock("next-auth/react", () => ({
  useSession: () => mocks.useSession(),
}));

describe("Navigation component", () => {
  test("should match snapshot", () => {
    const { baseElement } = render(<Navigation />);

    expect(baseElement).toMatchSnapshot();
  });

  test("should render menu toggle if media is not medium up", () => {
    mocks.useMediaQuery.mockImplementation(() => false);

    render(<Navigation />);

    expect(screen.getByTestId("menu-toggle")).toBeInTheDocument();
  });
});
