import React, { FC, useEffect } from "react";
import { connect } from "react-redux";

import { fetchBoards } from "../../store/actions";

import { MainPage } from "../../components/main-page";

import { getBoards } from "../../store/reducers/selectors";

import { Store, Board } from "../../store/types";

type Props = {
  boards: ReadonlyArray<Board>;
  fetchBoards: typeof fetchBoards;
};

const Container: FC<Props> = ({ boards, fetchBoards }) => {
  useEffect(() => {
    if (!boards.length) {
      fetchBoards();
    }
  }, [fetchBoards, boards.length]);

  return <MainPage />;
};

const stateToProps = (state: Store) => ({
  boards: getBoards(state)
});

const dispatchToProps = {
  fetchBoards
};

export const MainPageContainer = connect(
  stateToProps,
  dispatchToProps
)(Container);
