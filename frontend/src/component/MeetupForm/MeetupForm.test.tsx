import { MeetupForm } from "./MeetupForm";
import { render } from "../../testutils/test-utils";

jest.mock("src/services/backend", () => ({
  useCreateMeetsyEventsMutation: jest
    .fn()
    .mockReturnValue([
      jest.fn().mockReturnValue({ unwrap: jest.fn() }),
      { isLoading: false, isSuccess: false },
    ]),
}));

jest.mock("../SnackBar", () => ({
  useSnackBar: jest.fn().mockReturnValue(jest.fn()),
}));

jest.mock("../UserCalendar");

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

describe("MeetupForm Component", () => {
  test("should match snapshot", () => {
    const { baseElement } = render(<MeetupForm />);
    expect(baseElement).toMatchSnapshot();
  });
});
