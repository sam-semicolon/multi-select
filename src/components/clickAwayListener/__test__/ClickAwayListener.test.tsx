import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ClickAwayListener from "../ClickAwayListener";

describe("ClickAwayListener Component", () => {
  let onClickAwayMock: () => void;

  beforeEach(() => {
    onClickAwayMock = jest.fn();
  });

  test("should call onClickAway when clicking outside of the element", () => {
    render(
      <ClickAwayListener onClickAway={onClickAwayMock}>
        <div>Inside</div>
      </ClickAwayListener>
    );

    fireEvent.click(document.body); //click outside the element

    expect(onClickAwayMock).toHaveBeenCalledTimes(1);
  });

  test("should not call onClickAway when clicking inside the element", () => {
    render(
      <ClickAwayListener onClickAway={onClickAwayMock}>
        <div>Inside</div>
      </ClickAwayListener>
    );

    fireEvent.click(screen.getByText("Inside")); //click inside the element

    expect(onClickAwayMock).not.toHaveBeenCalled();
  });

  test("should remove the event listener on unmount", () => {
    const { unmount } = render(
      <ClickAwayListener onClickAway={onClickAwayMock}>
        <div>Inside</div>
      </ClickAwayListener>
    );

    unmount();

    // click outside (should not call since unmounted)
    fireEvent.click(document.body);

    expect(onClickAwayMock).not.toHaveBeenCalled();
  });
});
