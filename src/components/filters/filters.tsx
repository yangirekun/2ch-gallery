import React, { FC, memo, FormEvent } from "react";

import { Input } from "../input";
import { Select } from "../select";
import { Button } from "../button";

import "./filters.css";

import { Board } from "../../store/types";

type Props = {
  boardsList: ReadonlyArray<Board>;
  boardID: string;
  threadID: string;
  onChangeBoardID: ({ value }: { value: string }) => void;
  onChangeThreadID: ({ value }: { value: string }) => void;
  onSearchMedia: (e: FormEvent<HTMLButtonElement>) => void;
  onDownloadAll: (e: FormEvent<HTMLButtonElement>) => void;
};

const Component: FC<Props> = ({
  boardsList,
  boardID,
  onChangeBoardID,
  threadID,
  onChangeThreadID,
  onSearchMedia,
  onDownloadAll
}) => (
  <form className="app-filters">
    <Select
      id="board-id"
      label="Доска"
      className="app-filters__filter"
      placeholder="Название доски"
      value={boardID}
      list={boardsList}
      onChange={onChangeBoardID}
    />
    <Input
      id="thread-id"
      label="Тред"
      className="app-filters__filter"
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
      disabled
    />
  </form>
);

export const Filters: FC<Props> = memo(Component);
