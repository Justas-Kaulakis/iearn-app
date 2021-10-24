import React, { FC } from "react";

interface GalleryItemProps {
  src: string;
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

const GalleryItem: FC<GalleryItemProps> = ({ src, onClick }) => {
  return (
    <div onClick={onClick} className="gallery-item" tabIndex={0}>
      <div
        className="gallery-image"
        style={{
          backgroundImage: `url("${src}")`,
        }}
      ></div>
    </div>
  );
};

export default GalleryItem;
