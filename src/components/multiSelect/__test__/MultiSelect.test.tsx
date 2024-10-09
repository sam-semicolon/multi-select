import React from "react";
import {
  render,
  screen,
  fireEvent,
  cleanup,
  within,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import MultiSelect, { Items } from "../MultiSelect";

describe("MultiSelect Component", () => {
  let selected: Items;
  let setSelected: jest.Mock;
  let newItemPlaceholder = "Add new item";
  let boxTestId = "box";
  let listTestId = "list";
  let options = ["Option 1", "Option 2"];

  afterEach(cleanup);

  test("should be in the document", () => {
    selected = [];
    setSelected = jest.fn();

    render(
      <MultiSelect
        selected={selected}
        setSelected={setSelected}
        options={options}
      />
    );

    let box = screen.getByTestId(boxTestId);
    expect(box).toBeInTheDocument();
  });

  test("should the dropdown open when the user clicks on the box", () => {
    selected = [];
    setSelected = jest.fn();

    render(
      <MultiSelect
        selected={selected}
        setSelected={setSelected}
        options={options}
      />
    );

    const box = screen.getByTestId(boxTestId);
    fireEvent.click(box);

    expect(screen.getByTestId(listTestId)).toBeInTheDocument();
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
  });

  test("should the dropdown close when the user clicks outside of it", () => {
    selected = [];
    setSelected = jest.fn();

    render(
      <MultiSelect
        selected={selected}
        setSelected={setSelected}
        options={options}
      />
    );

    const box = screen.getByTestId(boxTestId);
    fireEvent.click(box); // open the dropdown

    fireEvent.click(document.body);

    expect(
      screen.queryByPlaceholderText(newItemPlaceholder)
    ).not.toBeInTheDocument();
  });

  test("should toggle the dropdown list when the user clicks on the box", () => {
    selected = [];
    setSelected = jest.fn();
    render(
      <MultiSelect
        selected={selected}
        setSelected={setSelected}
        options={options}
      />
    );

    const box = screen.getByTestId(boxTestId);
    fireEvent.click(box); // Open the dropdown

    expect(screen.getByPlaceholderText(newItemPlaceholder)).toBeInTheDocument();

    fireEvent.click(box); // Close the dropdown
    expect(
      screen.queryByPlaceholderText(newItemPlaceholder)
    ).not.toBeInTheDocument();
  });

  test("should render with initial selected items", () => {
    selected = ["Option 1"];
    setSelected = jest.fn();

    render(
      <MultiSelect
        selected={selected}
        setSelected={setSelected}
        options={options}
      />
    );

    expect(screen.getByText("Option 1")).toBeInTheDocument();
  });

  test("should add a new item when Enter is pressed", () => {
    selected = [];
    setSelected = jest.fn();
    render(
      <MultiSelect
        selected={selected}
        setSelected={setSelected}
        options={options}
      />
    );

    fireEvent.click(screen.getByTestId(boxTestId)); // Open dropdown
    const input = screen.getByPlaceholderText(newItemPlaceholder);

    fireEvent.change(input, { target: { value: "New Option" } });
    fireEvent.keyUp(input, { key: "Enter" });

    expect(screen.getByText("New Option")).toBeInTheDocument();
  });

  test("should make the input empty after adding a new item", () => {
    selected = [];
    setSelected = jest.fn();
    render(
      <MultiSelect
        selected={selected}
        setSelected={setSelected}
        options={options}
      />
    );

    fireEvent.click(screen.getByTestId(boxTestId)); // Open dropdown
    const input = screen.getByPlaceholderText(
      newItemPlaceholder
    ) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "New Option" } });
    fireEvent.keyUp(input, { key: "Enter" });

    expect(input.value).toBe("");
  });

  test("should select and deselect items", () => {
    selected = ["Option 1"];
    setSelected = jest.fn();
    render(
      <MultiSelect
        selected={selected}
        setSelected={setSelected}
        options={options}
      />
    );

    const box = screen.getByTestId(boxTestId);
    fireEvent.click(box); // Open the dropdown

    const list = screen.getByTestId(listTestId);

    const option1 = within(list).getByText("Option 1");
    const option2 = within(list).getByText("Option 2");

    fireEvent.click(option2); // Select Option 2

    let lastCall = setSelected.mock.calls[setSelected.mock.calls.length - 1][0];

    // Call the function returned by setSelected with the previous selected state
    let newState = lastCall(selected); // Pass in the previous selected state

    expect(newState).toEqual(options);

    fireEvent.click(option1); // Deselect Option 1

    lastCall = setSelected.mock.calls[setSelected.mock.calls.length - 1][0];
    newState = lastCall(options);
    expect(newState).toEqual(["Option 2"]);
  });
});
