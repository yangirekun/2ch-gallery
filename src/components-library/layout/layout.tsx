/* TODO: improve structure, implement unit tests */
import React, { FC, memo } from "react";

import "./layout.css";

const Component: FC = ({ children }) => (
  <div className="app">
    <header className="app-header" />
    <main className="app-main">{children}</main>
    <footer className="app-footer">
      implemented by
      {' '}
      <i>yangirekun</i>
    </footer>
  </div>
);

export const PageLayout: FC = memo(Component);
