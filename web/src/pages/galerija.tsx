import React, { FC, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import { useGalleryImagesQuery } from "../generated/graphql";
import Fancybox from "../components/Fancybox";

interface GalerijaProps {}

const Galerija: FC<GalerijaProps> = ({}) => {
  const [{ data, fetching, error }] = useGalleryImagesQuery();

  return (
    <Layout active="galerija">
      <div className="Base">
        <h1 style={{ textAlign: "center" }} className="green-heading">
          Galerija
        </h1>
        <div className="gallery">
          <Fancybox options={{
          Thumbs: {
            Carousel: {
              Sync: {
                friction: 0.9,
              },
            },
          },
          Toolbar: {
            display: [
              "zoom",
              "slideshow",
              "fullscreen",
              "thumbs",
              "close",
            ],
          },
        }}>
            {fetching || !data?.galleryImages ? null : (
              <>
                {data?.galleryImages.map((item) => (
                  <a 
                  className="gallery-item"
                  data-fancybox="gallery"
                  key={item.id}
                  href={item.imageUrl}
                  data-caption={item.description}
                  >
                    <div className="gallery-image" style={{backgroundImage: `url("${item.imageUrl}")`,}} ></div>
                  </a>
                ))}
              </>
            )}
          </Fancybox>
        </div>
      </div>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Galerija);
