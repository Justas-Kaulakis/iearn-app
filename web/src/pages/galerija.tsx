import React, { FC } from "react";
import Layout from "../components/Layout";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/createUrqlClient";
import Fancybox from "../components/Fancybox";
import { useGalleryImagesQuery } from "../generated/graphql";

const Galerija: FC = ({}) => {
  const [{ data, fetching, error }] = useGalleryImagesQuery();

  return (
    <Layout active="galerija">
      <div className="Base">
        <h1 style={{ textAlign: "center" }} className="green-heading">
          Galerija
        </h1>
        <div className="gallery">
          <Fancybox>
            {fetching || !data?.galleryImages ? null : (
              <>
                {data?.galleryImages.map((item, index) => (
                  <a
                    className="gallery-item"
                    data-fancybox="gallery"
                    key={item.id}
                    href={item.imageUrl}
                    data-caption={item.description}
                  >
                    <img
                      className="gallery-image"
                      loading={index > 9 ? "lazy" : undefined}
                      src={item.resizedUrl}
                      alt="nuotrauka"
                    />
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

export default withUrqlClient(createUrqlClient)(Galerija);
