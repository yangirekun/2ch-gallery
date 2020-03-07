import React from "react";
import { Provider } from "react-redux";

import { MainPageContainer } from "../../containers/main-page";

import { PageLayout } from "../layout";

import store from "../../store";

import "./app.css";

export const App: React.FC = () => (
  <Provider store={store}>
    <PageLayout>
      <MainPageContainer />
    </PageLayout>
  </Provider>
);
