import { screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { LocalizationProvider } from "@mui/lab";
import DateAdapter from "@mui/lab/AdapterDayjs";
import { FunctionComponent } from "react";
import MockDate from "mockdate";
import { AcceptForm } from "./AcceptForm";
import { render } from "../../testutils/test-utils";

MockDate.set("2020-01-01");

const mocks = {
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

jest.mock("../SnackBar", () => ({
  useSnackBar: jest.fn().mockReturnValue(jest.fn()),
}));

jest.mock("../UserCalendar");

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

jest.mock("next-auth/react", () => ({
  useSession: () => mocks.useSession(),
}));

jest.mock("src", () => ({
  useGetInvitedEventQuery: jest.fn().mockReturnValue({
    data: {
      user: { userId: 1 },
      duration: 30,
      name: "Event",
      location: "Melbourne",
      notes: "Note",
      expiry: "2099-01-01T00:00:00.000Z",
      available_dates: [],
    },
    isFetching: false,
    isError: false,
    error: {},
  }),
}));

const Component: FunctionComponent = () => (
  <LocalizationProvider dateAdapter={DateAdapter}>
    <AcceptForm url="testing-my-url" />
  </LocalizationProvider>
);

describe("AcceptForm Component", () => {
  afterAll(() => {
    MockDate.reset();
  });

  test("should match snapshot", () => {
    const { baseElement } = render(<Component />);
    expect(baseElement).toMatchSnapshot();
  });
  test("should render url", () => {
    render(<Component />);
    expect(screen.getByText("Meeting Details")).toBeInTheDocument();
  });

  test("should render sign in button when unauthenticated", () => {
    mocks.useSession.mockReturnValue({
      sessionData: {
        user: {},
      },
      status: "unauthenticated",
    });
    render(<Component />);

    expect(screen.getByTestId("sign-in-button")).toBeInTheDocument();
  });
});
