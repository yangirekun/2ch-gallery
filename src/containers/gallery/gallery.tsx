import React, { FC } from "react";
import { connect } from "react-redux";

import { Gallery } from "../../components/gallery";

import { getImages } from "../../store/reducers/selectors";

import { Store, Image } from "../../store/types";

type Props = {
  imagesList?: ReadonlyArray<Image>;
};

const Container: FC<Props> = ({ imagesList = [] }) => {
  return <Gallery imagesList={imagesList} />;
};

const stateToProps = (state: Store) => ({
  imagesList: getImages(state)
});

export const GalleryContainer = connect(
  stateToProps,
  null
)(Container);
