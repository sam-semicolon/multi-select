import React, { FunctionComponent, useEffect, useRef } from "react";

// ----------- Types ----------
type Props = {
  onClickAway: () => void;
  children: React.ReactNode;
};

/**
 *
 * A component that listens for click events outside of its child elements and
 * triggers the specified callback function.
 *
 * @component ClickAwayListener
 * @param {() => void} props.onClickAway - A callback function that is called when a click is detected outside the component.
 * @param {React.ReactNode} props.children - The child elements to be rendered inside the component.
 *
 */
const ClickAwayListener: FunctionComponent<Props> = ({
  onClickAway,
  children,
}) => {
  let element = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (element?.current) {
      let eventHandler = (e: Event): void => {
        let { target } = e;

        if (element.current?.contains(target as Node)) {
          return;
        }

        onClickAway();
      };

      document.addEventListener("click", eventHandler);

      return () => {
        document.removeEventListener("click", eventHandler);
      };
    }
  }, [onClickAway]);

  return <div ref={element}>{children}</div>;
};

export default ClickAwayListener;
