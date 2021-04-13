import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Input } from "../index";
import { mockProps } from "./mocks";

describe("testing <Input />", () => {
  test("it should be rendered correctly", () => {
    expect(render(<Input {...mockProps[0]} />).asFragment()).toMatchSnapshot();
  });

  test("it should call onChange on user input", () => {
    const { getByTestId } = render(<Input {...mockProps[0]} />);
    const input: any = getByTestId("input-test-id-input");
    fireEvent.change(input, { target: { value: "Значение" } });
    expect(mockProps[0].onChange).toBeCalledTimes(1);
  });
});
