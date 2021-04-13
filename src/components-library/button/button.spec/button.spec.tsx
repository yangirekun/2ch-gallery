import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "../index";
import { mockProps } from "./mocks";

describe("testing <Button />", () => {
  test("it should be rendered correctly", () => {
    expect(render(<Button {...mockProps[0]} />).asFragment()).toMatchSnapshot();
    expect(render(<Button {...mockProps[1]} />).asFragment()).toMatchSnapshot();
    expect(render(<Button {...mockProps[2]} />).asFragment()).toMatchSnapshot();
  });

  test("it should handle clicks if active", () => {
    render(<Button {...mockProps[0]} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockProps[0].onClick).toBeCalledTimes(1);
  });

  test("it should ignore clicks if disabled", () => {
    render(<Button {...mockProps[1]} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(mockProps[1].onClick).toBeCalledTimes(0);
  });
});
