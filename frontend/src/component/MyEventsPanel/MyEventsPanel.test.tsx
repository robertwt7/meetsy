import { screen } from "@testing-library/react";
import { MyEventsPanel } from "./MyEventsPanel";
import "@testing-library/jest-dom";
import { render } from "../../testutils/test-utils";

const eventData = {
  id: 33,
  user: {
    userId: "53795f83-3b3d-4381-9133-b1827ed365e0",
    email: "robertwt7@gmail.com",
    first_name: "Robert",
    last_name: "T",
  },
  name: "Test Event 21",
  location: "Melbourne, Victoria Footscray 3011",
  duration: 30,
  notes: "I want to have this event",
  expiry: "2022-03-23T09:45:02.729248Z",
  selected_time: null,
  pending: false,
  available_dates: [],
  invite_url:
    "eyJleHBpcnkiOiIyMDIyLTAzLTIzVDA5OjQ1OjAyLjcyOTI0OFoiLCJpZCI6MzN9:MsdLVEJ003nTYVM6PxhzLj9yyfFliu4BTsLeT_zNIys",
};

const mocks = {
  useGetMeetsyEventsQuery: jest.fn().mockReturnValue({
    data: { results: [eventData] },
    isError: false,
    isLoading: false,
  }),
};

jest.mock("src/services/backend", () => ({
  useGetMeetsyEventsQuery: () => mocks.useGetMeetsyEventsQuery(),
  useDeleteMeetsyEventMutation: jest
    .fn()
    .mockReturnValue([
      jest.fn().mockReturnValue({ unwrap: jest.fn() }),
      { isLoading: false, isSuccess: false, isError: false },
    ]),
}));

jest.mock("../SnackBar", () => ({
  useSnackBar: jest.fn().mockReturnValue(jest.fn()),
}));

jest.mock("../UserCalendar");

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

describe("MyEventsPanel Component", () => {
  test("should match snapshot", () => {
    const { baseElement } = render(<MyEventsPanel />);
    expect(baseElement).toMatchSnapshot();
  });

  test("copy button should be disabled", () => {
    render(<MyEventsPanel />);

    expect(screen.getByTestId("copy-button")).toBeDisabled();
  });

  test("delete button should be disabled", () => {
    render(<MyEventsPanel />);

    expect(screen.getByTestId("delete-button")).toBeDisabled();
  });
});
