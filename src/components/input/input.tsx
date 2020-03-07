import React, { FC, memo, FormEvent } from "react";

import "./input.css";

type Props = {
  id: string;
  label?: string;
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (args: { value: string }) => void;
};

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

    if (onChange) {
      onChange({ value });
    }
  };

  return (
    <div className={`input ${className}`}>
      <label htmlFor={id} className="input__label">
        {label}
      </label>
      <input
        id={id}
        type="text"
        className="input__field"
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
};

export const Input: FC<Props> = memo(Component);
