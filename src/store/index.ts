import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

import { rootReducer } from "./reducers";
import { rootSaga } from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const storeEnhacer = process.env.NODE_ENV === "development"
  ? composeWithDevTools(applyMiddleware(sagaMiddleware, logger))
  : applyMiddleware(sagaMiddleware);

const store = createStore(rootReducer, storeEnhacer);

sagaMiddleware.run(rootSaga);

export default store;
