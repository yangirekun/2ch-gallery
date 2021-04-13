import React, { FC, useEffect } from "react";
import { connect } from "react-redux";

import { boardsActionCreators } from "../../store/actions";

import { MainPage } from "../../components/main-page";

import {
  getBoards,
  getAppNetworkStatus,
  getAppError,
} from "../../store/reducers/selectors";

import { Store, Board } from "../../store/types";

type Props = {
  boards: ReadonlyArray<Board>;
  fetchBoards: typeof boardsActionCreators.fetchBoardsRequest;
  isLoading: boolean;
  error: boolean;
};

const Container: FC<Props> = ({ boards, fetchBoards, isLoading, error }) => {
  useEffect(() => {
    if (!boards.length) {
      fetchBoards();
    }
  }, [fetchBoards, boards.length]);

  return <MainPage isLoading={isLoading} error={error} />;
};

const stateToProps = (state: Store) => ({
  boards: getBoards(state),
  isLoading: getAppNetworkStatus(state),
  error: getAppError(state),
});

const dispatchToProps = {
  fetchBoards: boardsActionCreators.fetchBoardsRequest,
};

export const MainPageContainer = connect(
  stateToProps,
  dispatchToProps,
)(Container);
