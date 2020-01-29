import React, { FC, memo, useCallback, MouseEvent } from "react";

import "./gallery.css";

import { Image } from "../../store/types";

type Props = {
  imagesList: ReadonlyArray<Image>;
};

const Component: FC<Props> = ({ imagesList }) => {
  const handleImageClick = useCallback((e: MouseEvent<HTMLImageElement>) => {
    window.open(e.currentTarget.src);
  }, []);

  return (
    <section className="app__gallery">
      {imagesList.map(({ alt, path, width, height }, i) => (
        <img
          className="app__gallery-item"
          key={i}
          alt={alt}
          src={path}
          width={width}
          height={height}
          onClick={handleImageClick}
        />
      ))}
    </section>
  );
};

export const Gallery: FC<Props> = memo(Component);
