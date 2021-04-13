import React, { FC, memo, FormEvent } from "react";
import "./input.styles.css";
import { Props } from "./input.types";

const Component: FC<Props> = ({
  id,
  label = "Название поля",
  className = "",
  placeholder = "Подсказка",
  value = "",
  onChange,
}) => {
  const handleChange = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;

    onChange && onChange({ value });
  };

  return (
    <div className={`input ${className}`} data-testid={`${id}-wrapper`}>
      <label htmlFor={id} className="input__label" data-testid={`${id}-label`}>
        {label}
      </label>
      <input
        id={id}
        type="text"
        className="input__field"
        data-testid={`${id}-input`}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export const Input: FC<Props> = memo(Component);
