import React, { FC, memo, useCallback, MouseEvent } from "react";
import "lazysizes";

import "./gallery.css";

import { Image } from "../../store/types";

type Props = {
  imagesList: ReadonlyArray<Image>;
};

const Component: FC<Props> = ({ imagesList }) => {
  const handleImageClick = useCallback((e: MouseEvent<HTMLImageElement>) => {
    window.open(e.currentTarget.id);
  }, []);

  return (
    <section className="app__gallery">
      {imagesList.map(({ alt, path, preview, width, height }, i) => (
        <img
          id={path}
          className="lazyload app__gallery-item"
          key={i}
          alt={alt}
          data-src={preview}
          width={width}
          height={height}
          onClick={handleImageClick}
        />
      ))}
    </section>
  );
};

export const Gallery: FC<Props> = memo(Component);
