import { FETCH_BOARDS_REQUEST, FETCH_IMAGES_REQUEST } from "../../constants";

export const fetchBoards = () => ({
  type: FETCH_BOARDS_REQUEST
});

export const fetchImages = (boardID: string, threadID: string) => ({
  type: FETCH_IMAGES_REQUEST,
  boardID,
  threadID
});
