export type Board = {
  readonly id: string;
  readonly label: string;
};

export type BoardsReducer = {
  readonly loading: boolean;
  readonly list: ReadonlyArray<Board>;
};

export type Image = {
  readonly alt: string;
  readonly path: string;
  readonly height: number;
  readonly width: number;
};

export type ImagesReducer = {
  readonly loading: boolean;
  readonly list: ReadonlyArray<Image>;
};

export type Store = {
  boards: BoardsReducer;
  images: ImagesReducer;
};
