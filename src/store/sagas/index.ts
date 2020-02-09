import axios, { AxiosResponse } from "axios";
import { AnyAction } from "redux";
import { all, call, put, takeEvery } from "redux-saga/effects";

import {
  SERVER_URL,
  FETCH_BOARDS_REQUEST,
  FETCH_BOARDS_SUCCESS,
  FETCH_BOARDS_FAILURE,
  FETCH_IMAGES_REQUEST,
  FETCH_IMAGES_SUCCESS,
  FETCH_IMAGES_FAILURE
} from "../../constants";

import { Image } from "../types";

type Board = {
  bump_limit: number;
  category: string;
  default_name: string;
  enable_names: boolean;
  enable_sage: boolean;
  id: string;
  info: string;
  last_num: number;
  name: string;
  speed: number;
  threads: number;
  unique_posters: number;
};
type BoardsServerData = {
  boards: Array<Board>;
};

function* onFetchBoards() {
  yield takeEvery(FETCH_BOARDS_REQUEST, function* fetchBoards() {
    try {
      const {
        data: { boards }
      }: AxiosResponse<BoardsServerData> = yield call(
        axios,
        `${SERVER_URL}/boards.json`
      );

      return yield put({
        type: FETCH_BOARDS_SUCCESS,
        payload: boards.map(board => ({
          id: board.id,
          label: board.name
        }))
      });
    } catch (error) {
      return yield put({
        type: FETCH_BOARDS_FAILURE,
        payload: error
      });
    }
  });
}

type File = {
  displayname: string;
  fullname: string;
  height: number;
  md5: string;
  name: string;
  nsfw: boolean;
  path: string;
  size: number;
  thumbnail: string;
  tn_height: number;
  tn_width: number;
  type: number;
  width: number;
};
type PostsServerData =
  | {
      threads: [
        {
          posts: Array<{
            banned: boolean;
            closed: boolean;
            comment: string;
            date: string;
            email: string;
            endless: boolean;
            files: Array<File>;
            lasthit: number;
            name: string;
            num: number;
            number: number;
            op: boolean;
            parent: string;
            sticky: number;
            subject: string;
            tags: string;
            timestamp: number;
            trip: string;
          }>;
        }
      ];
    }
  | string;

function* onFetchImages() {
  yield takeEvery(FETCH_IMAGES_REQUEST, function* fetchImages({
    boardID,
    threadID
  }: AnyAction) {
    try {
      const { data }: AxiosResponse<PostsServerData> = yield call(
        axios,
        `${SERVER_URL}/${boardID}/res/${threadID}.json`
      );

      if (typeof data !== "string") {
        let images: Array<Image> = [];

        data.threads[0].posts.reduce(
          (prev: void, current) =>
            current.files.map(file => {
              images.push({
                alt: file.displayname,
                path: `http://2ch.hk${file.path}`,
                preview: `http://2ch.hk${file.thumbnail}`,
                width: file.tn_width,
                height: file.tn_height
              });
            }),
          undefined
        );

        return yield put({
          type: FETCH_IMAGES_SUCCESS,
          payload: images
        });
      }

      throw "404 Not Found";
    } catch (error) {
      return yield put({
        type: FETCH_IMAGES_FAILURE,
        payload: error
      });
    }
  });
}

export function* rootSaga() {
  yield all([onFetchBoards(), onFetchImages()]);
}
