import axios, { AxiosResponse } from "axios";
import { AnyAction } from "redux";
import { all, call, put, takeEvery } from "redux-saga/effects";

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

import { Image, Board } from "../types";

function* onFetchBoards() {
  yield takeEvery(FETCH_BOARDS_REQUEST, function* fetchBoards() {
    try {
      const { data }: AxiosResponse<Board[]> = yield call(axios, `/api/boards`);

      yield put({
        type: FETCH_BOARDS_SUCCESS,
        payload: data
      });
    } catch (error) {
      yield put({
        type: FETCH_BOARDS_FAILURE
      });
    }
  });
}

function* onFetchImages() {
  yield takeEvery(FETCH_IMAGES_REQUEST, function* fetchImages({
    boardID,
    threadID
  }: AnyAction) {
    try {
      const { data }: AxiosResponse<Image[]> = yield call(
        axios,
        `/api/images`,
        { params: { boardID, threadID } }
      );

      yield put({
        type: FETCH_IMAGES_SUCCESS,
        payload: data
      });
    } catch (error) {
      yield put({
        type: FETCH_IMAGES_FAILURE
      });
    }
  });
}

function* onDownloadImages() {
  yield takeEvery(DOWNLOAD_IMAGES_REQUEST, function* downloadImages({
    imagesList
  }: AnyAction) {
    try {
      yield call(axios, `/api/download-images`, {
        method: "post",
        data: { images: imagesList }
      });

      yield call(() => {
        return new Promise((res, rej) => {
          let i = 0;
      
          let timer = setInterval(() => {
      
            if (i < imagesList.length) {
              const link = document.createElement("a");
      
              link.download = imagesList[i].fileName;
              link.href = `/images/${imagesList[i].fileName}`;
      
              link.click();
              i++;
            } else {
              clearInterval(timer);
              res();
            }
          }, 500);
        });
      });

      yield put({
        type: DOWNLOAD_IMAGES_SUCCESS
      });

      yield put({
        type: REMOVE_IMAGES_REQUEST
      });
    } catch (error) {
      yield put({
        type: DOWNLOAD_IMAGES_FAILURE
      });
    }
  });
}

function* onRemoveImages() {
  yield takeEvery(REMOVE_IMAGES_REQUEST, function* downloadImages() {
    try {
      yield call(axios, `/api/remove-images`);

      yield put({
        type: REMOVE_IMAGES_SUCCESS
      });
    } catch (error) {
      yield put({
        type: REMOVE_IMAGES_FAILURE
      });
    }
  });
}

export function* rootSaga() {
  yield all([
    onFetchBoards(),
    onFetchImages(),
    onDownloadImages(),
    onRemoveImages()
  ]);
}
