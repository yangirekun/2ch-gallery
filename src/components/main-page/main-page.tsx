import React, { FC, memo } from "react";

import { FiltersContainer } from "../../containers/filters";
import { GalleryContainer } from "../../containers/gallery";

import { Spinner } from "../spinner";

type Props = {
  isLoading: boolean;
};

const Component: FC<Props> = ({ isLoading }) => (
  <section className="main-page">
    {isLoading && <Spinner />}
    <FiltersContainer />
    <GalleryContainer />
  </section>
);

export const MainPage: FC<Props> = memo(Component);
