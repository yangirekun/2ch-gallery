import React, { FC, useState, useCallback, FormEvent } from "react";
import { connect } from "react-redux";

import { mediaActionCreators } from "../../store/actions";

import { Filters } from "../../components/filters";

import { getBoards, getImages } from "../../store/reducers/selectors";

import { Store, Board, Image } from "../../store/types";

type Props = {
  boardsList?: ReadonlyArray<Board>;
  imagesList?: ReadonlyArray<Image>;
  fetchImages: typeof mediaActionCreators.fetchImagesRequest;
  downloadImages: typeof mediaActionCreators.downloadImagesRequest;
};

const Container: FC<Props> = ({
  boardsList = [],
  imagesList = [],
  fetchImages,
  downloadImages,
}) => {
  const [boardID, setBoardID] = useState("");
  const handleChangeBoardID = useCallback((args: { value: string }) => {
    setBoardID(args.value);
  }, []);

  const [threadID, setThreadID] = useState("");
  const handleChangeThreadID = useCallback((args: { value: string }) => {
    setThreadID(args.value);
  }, []);

  const handleSearchMedia = useCallback(
    (e: FormEvent<HTMLButtonElement>) => {
      e.preventDefault();

      fetchImages(boardID, threadID);
    },
    [boardID, threadID, fetchImages],
  );

  const handleDownloadAll = useCallback(
    (e: FormEvent<HTMLButtonElement>) => {
      e.preventDefault();

      downloadImages(imagesList);
    },
    [imagesList, downloadImages],
  );

  return (
    <Filters
      boardsList={boardsList}
      imagesList={imagesList}
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
  boardsList: getBoards(state),
  imagesList: getImages(state),
});

const dispatchToProps = {
  fetchImages: mediaActionCreators.fetchImagesRequest,
  downloadImages: mediaActionCreators.downloadImagesRequest,
};

export const FiltersContainer = connect(
  stateToProps,
  dispatchToProps,
)(Container);
