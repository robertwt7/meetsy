import "@testing-library/jest-dom";
import { render } from "../../testutils/test-utils";
import { ComponentLoader } from "./ComponentLoader";

jest.mock("../ComponentLoader");

describe("ComponentLoader", () => {
  test("should match snapshot", () => {
    const { baseElement } = render(<ComponentLoader />);
    expect(baseElement).toMatchSnapshot();
  });
});
