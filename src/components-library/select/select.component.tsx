import React, {
  FC,
  useState,
  useEffect,
  memo,
  MouseEvent,
  FormEvent,
} from "react";
import src from "../../assets/icons8-expand-arrow-24.png";
import "./select.styles.css";
import { Props } from "./select.types";

const Component: FC<Props> = ({
  id,
  label = "Название поля",
  className = "",
  placeholder = "Подсказка",
  list = [],
  value = "",
  onChange,
}) => {
  useEffect(() => {
    setFilteredList(list);

    const inputValue = list.find((item) => item.id === value);
    inputValue && setInputValue(inputValue.label);
  }, [list, value]);

  const [selectIsExpanded, toggleSelect] = useState(false);
  const handleToggleSelect = () => {
    toggleSelect(!selectIsExpanded);
  };

  const [inputValue, setInputValue] = useState("");
  const [filteredList, setFilteredList] = useState<typeof list>([]);
  const handleFilterList = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    setInputValue(value);
    setFilteredList(
      list.filter((item) =>
        item.label.toLowerCase().includes(value.toLowerCase())
      )
    );

    if (!selectIsExpanded) {
      toggleSelect(true);
    }
  };

  const handleSelectValue = (e: MouseEvent<HTMLLIElement>) => {
    const { id: value } = e.currentTarget;

    onChange && onChange({ value });
    toggleSelect(false);
  };

  return (
    <div className={`select ${className}`} data-testid={`${id}-wrapper`}>
      <label htmlFor={id} className="select__label" data-testid={`${id}-label`}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        className="select__field"
        data-testid={`${id}-input`}
        placeholder={placeholder}
        value={inputValue}
        onChange={handleFilterList}
      />
      <img
        alt="dropdown-arrow"
        src={src}
        className={`select__switcher ${
          selectIsExpanded
            ? "select__switcher--expanded"
            : "select__switcher--collapsed"
        }`}
        data-testid={`${id}-switcher`}
        onClick={handleToggleSelect}
      />
      {selectIsExpanded && (
        <ul className="select__data-list" data-testid={`${id}-data-list`}>
          {filteredList.map((item, i) => (
            <li
              key={item.id}
              id={item.id}
              className="select__list-item"
              data-testid={`${id}-data-list-item-${i}`}
              onClick={handleSelectValue}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export const Select: FC<Props> = memo(Component);
