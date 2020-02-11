export type Board = {
  readonly id: string;
  readonly label: string;
};

export type BoardsReducer = {
  readonly loading: boolean;
  readonly error: "";
  readonly list: ReadonlyArray<Board>;
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
  readonly error: "";
  readonly list: ReadonlyArray<Image>;
};

export type Store = {
  readonly boards: BoardsReducer;
  readonly images: ImagesReducer;
};
