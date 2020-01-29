import React, { FC, memo } from "react";

import { FiltersContainer } from "../../containers/filters";
import { GalleryContainer } from "../../containers/gallery";

const Component: FC = () => (
  <section className="main-page">
    <FiltersContainer />
    <GalleryContainer />
  </section>
);

export const MainPage: FC = memo(Component);
