import { applyMiddleware, createStore } from "redux";
import { SagaMiddleware } from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

import { rootReducer } from "./reducers";

export default function configureStore(sagaMiddleware: SagaMiddleware) {
  const storeEnhacer = process.env.NODE_ENV
    ? composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
    : applyMiddleware(sagaMiddleware);

  return createStore(rootReducer, storeEnhacer);
}
