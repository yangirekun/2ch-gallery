import {
  FETCH_BOARDS_REQUEST,
  FETCH_IMAGES_REQUEST,
  DOWNLOAD_IMAGES_REQUEST,
  REMOVE_IMAGES_REQUEST
} from "../../constants";

import { Image } from "../types";

export const fetchBoards = () => ({
  type: FETCH_BOARDS_REQUEST
});

export const fetchImages = (boardID: string, threadID: string) => ({
  type: FETCH_IMAGES_REQUEST,
  boardID,
  threadID
});

export const downloadImages = (imagesList: ReadonlyArray<Image>) => ({
  type: DOWNLOAD_IMAGES_REQUEST,
  imagesList
});

export const removeImages = () => ({
  type: REMOVE_IMAGES_REQUEST
});
