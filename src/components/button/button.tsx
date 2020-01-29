import React, { FC, memo, FormEvent } from "react";

import "./button.css";

type Props = {
  id: string;
  label?: string;
  className?: string;
  disabled?: boolean;
  onClick?: (e: FormEvent<HTMLButtonElement>) => void;
};

const Component: FC<Props> = ({
  id,
  label = "Текст кнопки",
  className = "",
  disabled = false,
  onClick
}) => (
  <button
    id={id}
    className={`button ${className}`}
    disabled={disabled}
    onClick={onClick}
  >
    {label}
  </button>
);

export const Button: FC<Props> = memo(Component);
