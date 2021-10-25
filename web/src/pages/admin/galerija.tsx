import { Box, Button, IconButton, Text } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import Link from "next/link";
import React, { FC } from "react";
import { FaFileImage, FaPlus, FaRegTrashAlt } from "react-icons/fa";
import AdminLayout from "../../components/AdminLayout";
import AdminTopBar from "../../components/AdminTopBar";
import EditGalleryPictureModal from "../../components/EditGalleryPictureModal";
import { useGalleryImagesQuery } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

const Galerija: FC = ({}) => {
  const [{ data, fetching, error }, redoQuery] = useGalleryImagesQuery();

  if (error) {
    console.log("ERROR loading images: ", error);
  }

  return (
    <AdminLayout active="galerija">
      <AdminTopBar pageName="galerija">
        Nuotraukų sk. - {data?.galleryImages.length}
      </AdminTopBar>
      <div className="Admin-content korteles galerija">
        <EditGalleryPictureModal create redoQuery={redoQuery}>
          {(onOpen) => (
            <div onClick={onOpen} className="new-project hoverCursor image-card">
              <span>
                <FaPlus />
              </span>
              <p>Pridėti nuotrauką</p>
            </div>
          )}
        </EditGalleryPictureModal>
        {!data?.galleryImages || fetching ? null : (
          <>
            {data.galleryImages.map((i) => (
              <EditGalleryPictureModal
                redoQuery={redoQuery}
                item={i}
                key={i.id}
              >
                {(onOpen) => (
                  <div onClick={onOpen} className="korta image-card hoverCursor">
                    <div className="img-con">
                      {i.imageUrl ? (
                        <img src={i.imageUrl} alt="nuotrauka" />
                      ) : (
                        <FaFileImage />
                      )}
                    </div>
                    <div className="korta-button">
                      <div>Redaguoti</div>
                    </div>
                  </div>
                )}
              </EditGalleryPictureModal>
            ))}
          </>
        )}
      </div>
    </AdminLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Galerija);
