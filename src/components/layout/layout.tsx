import React, { FC, memo } from "react";

const Component: FC = ({ children }) => (
  <div className="app">
    <header className="app-header" />
    <main className="app-main">{children}</main>
    <footer className="app-footer" />
  </div>
);

export const PageLayout: FC = memo(Component);
