import React from "react";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";

import { MainPageContainer } from "../../containers/main-page";

import { PageLayout } from "../../components-library/layout";

import { rootSaga } from "../../store/sagas";

import "./app.css";

import configureStore from "../../store";

const sagaMiddleware = createSagaMiddleware();
const store = configureStore(sagaMiddleware);

sagaMiddleware.run(rootSaga);

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PageLayout>
        <MainPageContainer />
      </PageLayout>
    </Provider>
  );
};
