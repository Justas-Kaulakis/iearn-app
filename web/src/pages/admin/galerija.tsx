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

const galerija: FC = ({}) => {
  const [{ data, fetching, error }, redoQuery] = useGalleryImagesQuery();

  if (error) {
    console.log("ERROR loading images: ", error);
  }

  return (
    <AdminLayout scrollable active="galerija">
      <AdminTopBar pageName="galerija">
        Nuotraukų sk. - {data?.galleryImages.length}
      </AdminTopBar>
      <Box bg="#f1f1f1" className="korteles gallery-grid">
        <EditGalleryPictureModal create redoQuery={redoQuery}>
          {(onOpen) => (
            <Button
              height="250px"
              variant="link"
              onClick={() => {
                onOpen();
              }}
            >
              <div className="new-project hoverCursor image-card">
                <span>
                  <FaPlus />
                </span>
                <p>Pridėti nuotrauką</p>
              </div>
            </Button>
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
                  <Button onClick={onOpen} height="250px" variant="link">
                    <div className="korta image-card hoverCursor">
                      <div className="img-con">
                        {i.imageUrl ? (
                          <img src={i.imageUrl} alt="nuotrauka" />
                        ) : (
                          <FaFileImage />
                        )}
                      </div>
                      <p>
                        {i.description.slice(0, 30)}
                        {i.description.length < 30 ? null : "..."}
                      </p>
                      <div className="korta-button">
                        <div>Redaguoti</div>
                      </div>
                    </div>
                  </Button>
                )}
              </EditGalleryPictureModal>
            ))}
          </>
        )}
      </Box>
    </AdminLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(galerija);
