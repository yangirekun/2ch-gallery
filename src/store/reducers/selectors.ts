import { createSelector } from "reselect";

import { Store } from "../types";

const BOARDS = (state: Store) => state.boards.list;
export const getBoards = createSelector(BOARDS, list => list);

const IMAGES = (state: Store) => state.images.list;
export const getImages = createSelector(IMAGES, list => list);

export const getAppNetworkStatus = (state: Store) =>
  state.boards.loading || state.images.loading;
