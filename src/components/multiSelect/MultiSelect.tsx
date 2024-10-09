import React, {
  ChangeEvent,
  Dispatch,
  FunctionComponent,
  SetStateAction,
  useState,
} from "react";
import { ClickAwayListener } from "../";
import { CheckIcon, ArrowsIcon } from "../../assets/icons";
import classes from "./MultiSelect_styles.module.scss";
import clsx from "clsx";

//  ------- Types --------
export type Items = string[];

type Props = {
  selected: Items;
  setSelected: Dispatch<SetStateAction<Items>>;
  options?: Items;
  onOptionsChange?: (items: Items) => void;
};

/**
 *
 * A multi-select dropdown component that allows users to select multiple items from a list.
 * It includes functionality for adding new items.
 *
 * @component MultiSelect
 * @param {Items} props.selected - An array of selected items.
 * @param {Dispatch<SetStateAction<Items>>} props.setSelected - A function to update the selected items.
 * @param {Items} [props.options] - An optional array of available options to choose from.
 * @param {(items: Items) => void} [props.onOptionsChange] - An optional callback function that is called when the options list changes.
 *
 */
const MultiSelect: FunctionComponent<Props> = ({
  selected,
  setSelected,
  options = [],
  onOptionsChange,
}) => {
  const [openList, setOpenList] = useState(false);
  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState<Items>(options);

  // Handlers
  const closeListHandle = () => setOpenList(false);

  const toggleListHandle = () => setOpenList((prev) => !prev);

  const newItemChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewItem(e.target.value);
  };

  const enterPressedHandle = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newItem) {
      if (items.includes(newItem)) {
        alert("The item you are trying to add already exists in the list!");
      } else {
        let list = [newItem, ...items];
        setItems([...list]);
        onOptionsChange?.([...list]);
        setNewItem("");
      }
    }
  };

  const selectItemHandle = (item: string) => {
    setSelected((prevSelected) => {
      const list = prevSelected.includes(item)
        ? prevSelected.filter((i) => i !== item)
        : [...prevSelected, item];
      return list;
    });
  };

  return (
    <ClickAwayListener onClickAway={closeListHandle}>
      <div className={classes.dropdown}>
        {/* ========= Box ========== */}
        <div
          className={clsx(classes.box, { [classes.opened]: openList })}
          data-testid="box"
          onClick={toggleListHandle}
        >
          <div className={classes.selected_list}>
            {selected?.length ? selected?.join(", ") : "Choose your items"}
          </div>

          <div
            className={clsx(classes.arrow, {
              [classes.rotated]: openList,
            })}
          >
            <ArrowsIcon />
          </div>
        </div>

        {/* ========= Items ========== */}
        {openList && (
          <div className={classes.items_container} data-testid="list">
            {/* ========= New Item ========== */}
            <input
              type="text"
              placeholder="Add new item"
              className={clsx(classes.item, classes.new_input)}
              value={newItem}
              onChange={newItemChangeHandler}
              onKeyUp={enterPressedHandle}
            />

            {/* ========= Items List ========== */}
            <div className={classes.items}>
              {items?.map((item) => {
                return (
                  <div
                    className={clsx(classes.item, {
                      [classes.selected]: selected?.includes(item),
                    })}
                    onClick={() => selectItemHandle(item)}
                    key={item}
                  >
                    <div className={classes.item_title}>{item}</div>
                    <div className={classes.item_selected_icon}>
                      {selected?.includes(item) && <CheckIcon />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default MultiSelect;
