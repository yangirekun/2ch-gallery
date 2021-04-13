import React, { FC, memo } from "react";
import "./button.styles.css";
import { Props } from "./button.types";

const Component: FC<Props> = ({
  id,
  label = "Текст кнопки",
  className = "",
  disabled = false,
  onClick,
}) => (
  <button
    id={id}
    data-testid={`${id}-button`}
    className={`button ${className}`}
    disabled={disabled}
    onClick={onClick}
  >
    {label}
  </button>
);

export const Button: FC<Props> = memo(Component);
