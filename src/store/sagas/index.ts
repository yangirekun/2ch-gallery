import axios, { AxiosResponse } from "axios";
import { all, call, put, takeEvery } from "redux-saga/effects";

import { boardsActionCreators, mediaActionCreators } from "../actions";

import { boardsActions, mediaActions } from "../../constants";

import { Image, Board, ImagesAction } from "../types";

function* onFetchBoards() {
  yield takeEvery(boardsActions.FETCH_BOARDS_REQUEST, function* fetchBoards() {
    try {
      const { data }: AxiosResponse<Board[]> = yield call(axios, `/api/boards`);

      yield put(boardsActionCreators.fetchBoardsSuccess(data));
    } catch {
      yield put(boardsActionCreators.fetchBoardsFailure());
    }
  });
}

function* onFetchImages() {
  yield takeEvery(mediaActions.FETCH_IMAGES_REQUEST, function* fetchImages({
    boardID,
    threadID,
  }: ImagesAction) {
    try {
      const { data }: AxiosResponse<Image[]> = yield call(
        axios,
        `/api/images`,
        { params: { boardID, threadID } }
      );

      yield put(mediaActionCreators.fetchImagesSuccess(data));
    } catch {
      yield put(mediaActionCreators.fetchImagesFailure());
    }
  });
}

function* onDownloadImages() {
  yield takeEvery(
    mediaActions.DOWNLOAD_IMAGES_REQUEST,
    function* downloadImages({ imagesList = [] }: ImagesAction) {
      try {
        yield call(axios, `/api/download-images`, {
          method: "post",
          data: { images: imagesList },
        });

        yield call(
          () =>
            new Promise(res => {
              let i = 0;

              const timer = setInterval(() => {
                if (i < imagesList.length) {
                  const link = document.createElement("a");

                  link.download = imagesList[i].fileName;
                  link.href = `/images/${imagesList[i].fileName}`;

                  link.click();
                  i++;
                } else {
                  clearInterval(timer);
                  res(0);
                }
              }, 500);
            })
        );

        yield put(mediaActionCreators.downloadImagesSuccess());
        yield put(mediaActionCreators.removeImagesRequest());
      } catch {
        yield put(mediaActionCreators.downloadImagesFailure());
      }
    }
  );
}

function* onRemoveImages() {
  yield takeEvery(
    mediaActions.REMOVE_IMAGES_REQUEST,
    function* downloadImages() {
      try {
        yield call(axios, `/api/remove-images`);

        yield put(mediaActionCreators.removeImagesSuccess());
      } catch {
        yield put(mediaActionCreators.removeImagesFailure());
      }
    }
  );
}

export function* rootSaga() {
  yield all([
    onFetchBoards(),
    onFetchImages(),
    onDownloadImages(),
    onRemoveImages(),
  ]);
}
