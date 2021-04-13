import { combineReducers } from "redux";

import {
  boardsActions,
  mediaActions,
} from "../../constants";

import { BoardsReducer, ImagesReducer, BoardsAction, ImagesAction } from "../types";

const boardsReducerInitialState: BoardsReducer = {
  loading: false,
  error: false,
  list: [],
};

const boardsReducer = (
  state = boardsReducerInitialState,
  action: BoardsAction,
) => {
  switch (action.type) {
    case boardsActions.FETCH_BOARDS_REQUEST:
      return { ...state, loading: true, error: false };
    case boardsActions.FETCH_BOARDS_SUCCESS:
      return { ...state, list: action.payload, loading: false, error: false };
    case boardsActions.FETCH_BOARDS_FAILURE:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

const imagesReducerInitialState: ImagesReducer = {
  loading: false,
  error: false,
  list: [],
};

const imagesReducer = (
  state = imagesReducerInitialState,
  action: ImagesAction,
) => {
  switch (action.type) {
    case mediaActions.FETCH_IMAGES_REQUEST:
    case mediaActions.DOWNLOAD_IMAGES_REQUEST:
    case mediaActions.REMOVE_IMAGES_REQUEST:
      return { ...state, loading: true, error: false };
    case mediaActions.FETCH_IMAGES_SUCCESS:
    case mediaActions.DOWNLOAD_IMAGES_SUCCESS:
    case mediaActions.REMOVE_IMAGES_SUCCESS:
      return {
        ...state,
        list: action.payload || [...state.list],
        loading: false,
        error: false,
      };
    case mediaActions.FETCH_IMAGES_FAILURE:
    case mediaActions.DOWNLOAD_IMAGES_FAILURE:
    case mediaActions.REMOVE_IMAGES_FAILURE:
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  boards: boardsReducer,
  images: imagesReducer,
});
