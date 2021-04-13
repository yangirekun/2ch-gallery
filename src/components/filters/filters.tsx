import React, { FC, memo, FormEvent } from "react";

import { Input } from "../../components-library/input";
import { Select } from "../../components-library/select";
import { Button } from "../../components-library/button";

import "./filters.css";

import { Board, Image } from "../../store/types";

type Props = {
  boardsList: ReadonlyArray<Board>;
  imagesList: ReadonlyArray<Image>;
  boardID: string;
  threadID: string;
  onChangeBoardID: (args: { value: string }) => void;
  onChangeThreadID: (args: { value: string }) => void;
  onSearchMedia: (e: FormEvent<HTMLButtonElement>) => void;
  onDownloadAll: (e: FormEvent<HTMLButtonElement>) => void;
};

const Component: FC<Props> = ({
  boardsList,
  imagesList,
  boardID,
  onChangeBoardID,
  threadID,
  onChangeThreadID,
  onSearchMedia,
  onDownloadAll,
}) => (
  <form className="app-filters">
    <Select
      id="board-id"
      label="Доска"
      className="app-filters__filter app-filters__filter--board-id"
      placeholder="Название доски"
      value={boardID}
      list={boardsList}
      onChange={onChangeBoardID}
    />
    <Input
      id="thread-id"
      label="Тред"
      className="app-filters__filter app-filters__filter--thread-id"
      placeholder="Номер треда"
      value={threadID}
      onChange={onChangeThreadID}
    />
    <Button
      id="search-media"
      label="Поиск"
      className="app-filters__control"
      onClick={onSearchMedia}
      disabled={!boardID || !threadID}
    />
    <Button
      id="download-media"
      label="Загрузить все"
      className="app-filters__control"
      onClick={onDownloadAll}
      disabled={!imagesList.length}
    />
  </form>
);

export const Filters: FC<Props> = memo(Component);
