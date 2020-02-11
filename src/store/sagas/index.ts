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
        type: FETCH_BOARDS_FAILURE,
        payload: error
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
        type: FETCH_IMAGES_FAILURE,
        payload: error
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

      for (const image of imagesList) {
        const link = document.createElement("a");

        link.download = image.fileName;
        link.href = `/images/${image.fileName}`;

        link.click();
      }

      yield put({
        type: DOWNLOAD_IMAGES_SUCCESS
      });

      yield put({
        type: REMOVE_IMAGES_REQUEST
      });
    } catch (error) {
      yield put({
        type: DOWNLOAD_IMAGES_FAILURE,
        payload: error
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
        type: REMOVE_IMAGES_FAILURE,
        payload: error
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
