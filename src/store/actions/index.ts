import {
  boardsActions,
  mediaActions,
} from "../../constants";

import { Image, Board, ImagesAction, BoardsAction } from "../types";

export const boardsActionCreators = {
  fetchBoardsRequest: (): BoardsAction => ({
    type: boardsActions.FETCH_BOARDS_REQUEST,
  }),

  fetchBoardsSuccess: (payload: ReadonlyArray<Board>): BoardsAction => ({
    type: boardsActions.FETCH_BOARDS_SUCCESS,
    payload,
  }),

  fetchBoardsFailure: (): BoardsAction => ({
    type: boardsActions.FETCH_BOARDS_FAILURE,
  }),
};

export const mediaActionCreators = {
  fetchImagesRequest: (boardID: string, threadID: string): ImagesAction => ({
    type: mediaActions.FETCH_IMAGES_REQUEST,
    boardID,
    threadID,
  }),

  fetchImagesSuccess: (payload: ReadonlyArray<Image>): ImagesAction => ({
    type: mediaActions.FETCH_IMAGES_SUCCESS,
    payload,
  }),

  fetchImagesFailure: (): ImagesAction => ({
    type: mediaActions.FETCH_IMAGES_FAILURE,
  }),

  downloadImagesRequest: (imagesList: ReadonlyArray<Image>): ImagesAction => ({
    type: mediaActions.DOWNLOAD_IMAGES_REQUEST,
    imagesList,
  }),

  downloadImagesSuccess: (): ImagesAction => ({
    type: mediaActions.DOWNLOAD_IMAGES_SUCCESS,
  }),

  downloadImagesFailure: (): ImagesAction => ({
    type: mediaActions.DOWNLOAD_IMAGES_FAILURE,
  }),

  removeImagesRequest: (): ImagesAction => ({
    type: mediaActions.REMOVE_IMAGES_REQUEST,
  }),

  removeImagesSuccess: (): ImagesAction => ({
    type: mediaActions.REMOVE_IMAGES_SUCCESS,
  }),

  removeImagesFailure: (): ImagesAction => ({
    type: mediaActions.REMOVE_IMAGES_FAILURE,
  }),
};
