/* TODO: improve structure, implement unit tests */
import React, { FC, memo } from "react";

import "./error.css";

const Component: FC = () => (
  <div className="error-wrapper">
    <div className="error">Произошла ошибка :(</div>
  </div>
);

export const Error: FC = memo(Component);
