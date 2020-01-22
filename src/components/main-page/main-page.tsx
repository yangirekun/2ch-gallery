import React, { FC, FormEvent, memo } from "react";

import "./main-page.css";

type Props = {
  handleAuth: (e: FormEvent<HTMLButtonElement>) => void;
};

const Component: FC<Props> = ({ handleAuth }) => (
  <section className="main-page">
	<form className="form-auth">
	  <button className="form-auth__control" onClick={handleAuth}>
			авторизоваться
	  </button>
	</form>
  </section>
);

export const MainPage = memo(Component);
