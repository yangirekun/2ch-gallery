import React, { FC, useState, useCallback, FormEvent } from "react";
import { connect } from "react-redux";

import { fetchImages } from "../../store/actions";

import { Filters } from "../../components/filters";

import { getBoards } from "../../store/reducers/selectors";

import { Store, Board } from "../../store/types";

type Props = {
  boardsList?: ReadonlyArray<Board>;
  fetchImages: typeof fetchImages;
};

const Container: FC<Props> = ({ boardsList = [], fetchImages }) => {
  const [boardID, setBoardID] = useState("");
  const handleChangeBoardID = useCallback(({ value }: { value: string }) => {
    setBoardID(value);
  }, []);

  const [threadID, setThreadID] = useState("");
  const handleChangeThreadID = useCallback(({ value }: { value: string }) => {
    setThreadID(value);
  }, []);

  const handleSearchMedia = useCallback(
    (e: FormEvent<HTMLButtonElement>) => {
      e.preventDefault();

      fetchImages(boardID, threadID);
    },
    [boardID, threadID, fetchImages]
  );

  const handleDownloadAll = useCallback((e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log("Скачиваю все...");
  }, []);

  return (
    <Filters
      boardsList={boardsList}
      boardID={boardID}
      onChangeBoardID={handleChangeBoardID}
      threadID={threadID}
      onChangeThreadID={handleChangeThreadID}
      onSearchMedia={handleSearchMedia}
      onDownloadAll={handleDownloadAll}
    />
  );
};

const stateToProps = (state: Store) => ({
  boardsList: getBoards(state)
});

const dispatchToProps = {
  fetchImages
};

export const FiltersContainer = connect(
  stateToProps,
  dispatchToProps
)(Container);
