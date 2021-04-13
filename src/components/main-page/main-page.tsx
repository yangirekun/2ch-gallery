import React, { FC, memo } from "react";

import { FiltersContainer } from "../../containers/filters";
import { GalleryContainer } from "../../containers/gallery";

import { Spinner } from "../../components-library/spinner";
import { Error } from "../../components-library/error";

type Props = {
  isLoading: boolean;
  error: boolean;
};

const Component: FC<Props> = ({ isLoading, error }) => (
  <section className="main-page">
    {isLoading && <Spinner />}
    {error && <Error />}
    <FiltersContainer />
    <GalleryContainer />
  </section>
);

export const MainPage: FC<Props> = memo(Component);
