/* TODO: improve structure, implement unit tests */
import React, { FC, memo } from "react";

import "./spinner.css";

const Component: FC = () => (
  <div className="spinner">
    <main className="spinner__image" />
    <footer className="spinner__message">Загрузка...</footer>
  </div>
);

export const Spinner: FC = memo(Component);
