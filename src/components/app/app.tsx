import React from "react";
import { HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";

import { MainPageContainer } from "../../containers/main-page";

import { PageLayout } from "../layout";

import { rootSaga } from "../../store/sagas";

import "./app.css";

import configureStore from "../../store";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore(sagaMiddleware);

sagaMiddleware.run(rootSaga);

export const App: React.FC = () => {
  return (
    <HashRouter>
      <Provider store={store}>
        <PageLayout>
          <MainPageContainer />
        </PageLayout>
      </Provider>
    </HashRouter>
  );
};
