import React, { FC, useEffect } from "react";
import { connect } from "react-redux";

import { fetchBoards } from "../../store/actions";

import { MainPage } from "../../components/main-page";

import { getBoards, getAppNetworkStatus } from "../../store/reducers/selectors";

import { Store, Board } from "../../store/types";

type Props = {
  boards: ReadonlyArray<Board>;
  fetchBoards: typeof fetchBoards;
  isLoading: boolean;
};

const Container: FC<Props> = ({ boards, fetchBoards, isLoading }) => {
  useEffect(() => {
    if (!boards.length) {
      fetchBoards();
    }
  }, [fetchBoards, boards.length]);

  return <MainPage isLoading={isLoading} />;
};

const stateToProps = (state: Store) => ({
  boards: getBoards(state),
  isLoading: getAppNetworkStatus(state)
});

const dispatchToProps = {
  fetchBoards
};

export const MainPageContainer = connect(
  stateToProps,
  dispatchToProps
)(Container);
