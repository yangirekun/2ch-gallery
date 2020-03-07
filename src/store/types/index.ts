export type Board = {
  readonly id: string;
  readonly label: string;
};

export type BoardsReducer = {
  readonly loading: boolean;
  readonly error: boolean;
  readonly list: ReadonlyArray<Board>;
};

export type BoardsAction = {
  readonly type: string;
  readonly payload?: ReadonlyArray<Board>;
};

export type Image = {
  readonly fileName: string;
  readonly alt: string;
  readonly path: string;
  readonly preview: string;
  readonly height: number;
  readonly width: number;
};

export type ImagesReducer = {
  readonly loading: boolean;
  readonly error: boolean;
  readonly list: ReadonlyArray<Image>;
};

export type ImagesAction = {
  readonly type: string;
  readonly boardID?: string;
  readonly threadID?: string;
  readonly payload?: ReadonlyArray<Image>;
  readonly imagesList?: ReadonlyArray<Image>;
};

export type Store = {
  readonly boards: BoardsReducer;
  readonly images: ImagesReducer;
};
