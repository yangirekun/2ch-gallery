import { AnyAction, combineReducers } from "redux";

import {
  FETCH_BOARDS_REQUEST,
  FETCH_BOARDS_SUCCESS,
  FETCH_BOARDS_FAILURE,
  FETCH_IMAGES_REQUEST,
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGES_FAILURE,
  DOWNLOAD_IMAGES_REQUEST,
  DOWNLOAD_IMAGES_SUCCESS,
  DOWNLOAD_IMAGES_FAILURE,
  REMOVE_IMAGES_REQUEST,
  REMOVE_IMAGES_SUCCESS,
  REMOVE_IMAGES_FAILURE
} from "../../constants";

import { BoardsReducer, ImagesReducer } from "../types";

const boardsReducerInitialState: BoardsReducer = {
  loading: false,
  error: false,
  list: []
};

const boardsReducer = (
  state = boardsReducerInitialState,
  action: AnyAction
) => {
  switch (action.type) {
    case FETCH_BOARDS_REQUEST:
      return { ...state, loading: true, error: false };
    case FETCH_BOARDS_SUCCESS:
      return { ...state, list: action.payload, loading: false, error: false };
    case FETCH_BOARDS_FAILURE:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

const imagesReducerInitialState: ImagesReducer = {
  loading: false,
  error: false,
  list: []
};

const imagesReducer = (
  state = imagesReducerInitialState,
  action: AnyAction
) => {
  switch (action.type) {
    case FETCH_IMAGES_REQUEST:
    case DOWNLOAD_IMAGES_REQUEST:
    case REMOVE_IMAGES_REQUEST:
      return { ...state, loading: true, error: false };
    case FETCH_IMAGES_SUCCESS:
    case DOWNLOAD_IMAGES_SUCCESS:
    case REMOVE_IMAGES_SUCCESS:
      return {
        ...state,
        list: action.payload || [...state.list],
        loading: false,
        error: false
      };
    case FETCH_IMAGES_FAILURE:
    case DOWNLOAD_IMAGES_FAILURE:
    case REMOVE_IMAGES_FAILURE:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  boards: boardsReducer,
  images: imagesReducer
});
