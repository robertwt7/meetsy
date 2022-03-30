import { screen } from "@testing-library/react";
import { SuccessPanel } from "./SuccessPanel";
import "@testing-library/jest-dom";
import { render } from "../../testutils/test-utils";

jest.mock("../SnackBar", () => ({
  useSnackBar: jest.fn().mockReturnValue(jest.fn()),
}));

jest.mock("../UserCalendar");

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({ push: jest.fn() }),
}));

describe("SuccessPanel Component", () => {
  test("should match snapshot", () => {
    const { baseElement } = render(<SuccessPanel url="testing-my-url" />);
    expect(baseElement).toMatchSnapshot();
  });
  test("should render url", () => {
    render(<SuccessPanel url="testing-my-url" />);
    expect(screen.getByTestId("success-panel-url")).toHaveTextContent(
      "testing-my-url"
    );
  });
});
