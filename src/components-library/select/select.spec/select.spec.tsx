import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { Select } from "../index";
import { mockProps } from "./mocks";

describe("testing <Select />", () => {
  test("it should be rendered correctly", () => {
    const renderResult = render(<Select {...mockProps[0]} />);
    const { getByTestId } = renderResult;

    expect(renderResult.asFragment()).toMatchSnapshot();
    fireEvent.click(getByTestId("select-test-id-switcher"));
    expect(renderResult.asFragment()).toMatchSnapshot();
  });

  test("it should toggle data-list", () => {
    const { container, getByTestId } = render(<Select {...mockProps[0]} />);
    const toggle = getByTestId("select-test-id-switcher");
    fireEvent.click(toggle);
    expect(
      container.querySelector(`[data-testid="select-test-id-data-list"`)
    ).toBeVisible();
    fireEvent.click(toggle);
    expect(
      container.querySelector(`[data-testid="select-test-id-data-list`)
    ).toBeNull();
  });

  test("it should filter data-list correctly", () => {
    const { getByTestId } = render(<Select {...mockProps[0]} />);
    const toggle = getByTestId("select-test-id-switcher");
    const input: any = getByTestId("select-test-id-input");
    fireEvent.click(toggle);
    const dataList = getByTestId("select-test-id-data-list");
    fireEvent.change(input, { target: { value: "Бр" } });
    expect(input.value).toBe("Бр");
    expect(dataList.children.length).toBe(4);
  });

  test("it should call onChange when value is selected", () => {
    const { getByTestId } = render(<Select {...mockProps[0]} />);
    const toggle = getByTestId("select-test-id-switcher");
    const input: any = getByTestId("select-test-id-input");
    fireEvent.click(toggle);
    fireEvent.change(input, { target: { value: "Бред" } });
    const listItem = getByTestId("select-test-id-data-list-item-0");
    fireEvent.click(listItem);
    expect(mockProps[0].onChange).toBeCalledTimes(1);
  });
});
