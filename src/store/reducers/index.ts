import { AnyAction, combineReducers } from "redux";

import {
  FETCH_BOARDS_REQUEST,
  FETCH_BOARDS_SUCCESS,
  FETCH_BOARDS_FAILURE,
  FETCH_IMAGES_REQUEST,
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGES_FAILURE
} from "../../constants";

import { BoardsReducer, ImagesReducer } from "../types";

const boardsReducerInitialState: BoardsReducer = {
  loading: false,
  error: "",
  list: []
};

const boardsReducer = (
  state = boardsReducerInitialState,
  action: AnyAction
) => {
  switch (action.type) {
    case FETCH_BOARDS_REQUEST:
      return { ...state, loading: true };
    case FETCH_BOARDS_SUCCESS:
      return { ...state, list: action.payload, loading: false };
    case FETCH_BOARDS_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

const imagesReducerInitialState: ImagesReducer = {
  loading: false,
  error: "",
  list: []
};

const imagesReducer = (
  state = imagesReducerInitialState,
  action: AnyAction
) => {
  switch (action.type) {
    case FETCH_IMAGES_REQUEST:
      return { ...state, loading: true };
    case FETCH_IMAGES_SUCCESS:
      return { ...state, list: action.payload, loading: false };
    case FETCH_IMAGES_FAILURE:
      return { ...state, loading: false };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  boards: boardsReducer,
  images: imagesReducer
});
