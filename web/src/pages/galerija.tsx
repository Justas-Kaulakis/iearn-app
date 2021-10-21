import React, { FC, useEffect, useState } from "react";
// import { v4 } from "uuid";
import GalleryItem from "../components/GalleryItem";
import Layout from "../components/Layout";
// @ts-ignore: Unreachable code error
import BigPicture from "bigpicture";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useGalleryImagesQuery } from "../generated/graphql";

interface GalerijaProps {}

const Galerija: FC<GalerijaProps> = ({}) => {
  const [{ data, fetching, error }] = useGalleryImagesQuery();

  const [currentItem, setCurrentItem] = useState<{
    index: number;
    e: React.MouseEvent<HTMLDivElement, MouseEvent> | null;
  }>({
    index: 0,
    e: null,
  });

  useEffect(() => {
    if (currentItem?.e && data) {
      BigPicture({
        el: currentItem.e.target,
        gallery: data?.galleryImages.map((i) => ({
          src: i.imageUrl,
          caption: i.description,
        })),
        position: currentItem.index,
        loop: true,
      });
    }
  }, [currentItem]);

  return (
    <Layout active="galerija">
      <div className="Base">
        <h1 style={{ textAlign: "center" }} className="green-heading">
          Galerija
        </h1>
        <div className="container">
          <div className="gallery">
            {!data?.galleryImages || fetching ? null : (
              <>
                {data?.galleryImages.map((item, index) => (
                  <GalleryItem
                    onClick={(e) => {
                      setCurrentItem({ index, e });
                    }}
                    key={item.id}
                    src={item.imageUrl}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Galerija);
