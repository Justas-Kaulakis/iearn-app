import React, { FC, Fragment, useState, useEffect, useRef} from "react";
import { FieldProps } from "formik";
import Dropzone, { DropzoneProps, DropzoneRef } from "react-dropzone";
import { resizeImage } from "../utils/resizeImage";
import { FaTimes } from "react-icons/fa";
import { IconButton } from "@chakra-ui/button";
import {Carousel as NativeCarousel} from "@fancyapps/ui";

export const requiredDropzoneValidation = (value: File | null) => {
  if (!value) {
    return "Failas privalomas";
  }
};

export type DropzoneMultiValueType = { file: File; id: number }[];
interface OnClickType {
  onClick?: React.MouseEventHandler<any>;
}
type PreviewType = {
  id: number;
  isFromDB: boolean;
  imageUrl: string;
};

//TODO:(Justas) Make all pictures appear on multiselect, delete file from "value" when clicking button
const DropzoneFieldMulti: FC<
  FieldProps<DropzoneProps & React.RefAttributes<DropzoneRef> & any> & {
    imageUrls?: { imageUrl: string; id: number }[];
    dim?: { x: number; y: number };
    maxFiles: number;
    onDeleteDBImage: (id: number) => Promise<void>;
  }
> = ({
  field: { name, value },
  form: { setFieldValue, errors, setFieldError },
  onDeleteDBImage,
  ...props
}) => {
    const [previews, setPreviews] = useState<PreviewType[]>(
      props?.imageUrls
        ? props.imageUrls.map(({ imageUrl, id }) => ({
          id,
          imageUrl,
          isFromDB: true,
        }))
        : []
    );

    const kartosCarouselRef = useRef(null);
    let kartosCarousel: any;

    // Initialise Carousel
    useEffect(() => {
      // Main Carousel
      kartosCarousel = new NativeCarousel(kartosCarouselRef.current, {
        slidesPerPage : "auto",
        infinite: false,
        dragfree: false,
      });
      
      return () => {
        kartosCarousel.destroy();
      };
    }, []);

    
    //console.log("Prevs", previews);
    //console.log("Dropzone urls: ", props.imageUrls);
    return (
      <>
        <Dropzone
          accept="image/*"
          maxFiles={props?.maxFiles}
          onDrop={async (files, fileRejections) => {
            //console.log({ files, fileRejections });

            if (!fileRejections.length) {
              /// compress file

              let newPreviews: Array<PreviewType> = [];
              const compressedFiles = await Promise.all(
                files.map(async (file) => {
                  const resized = props.dim
                    ? await resizeImage(file, props.dim.x, props.dim.y)
                    : file;

                  let newId = 0;
                  let found = false;
                  if (previews.length)
                    while (!found) {
                      for (let i = 0; i < previews.length; i++) {
                        found = newId !== previews[i].id;
                        if (!found) break;
                      }
                      if (!found) newId++;
                    }

                  newPreviews.push({
                    id: newId,
                    imageUrl: URL.createObjectURL(resized),
                    isFromDB: false,
                  });
                  return { file: resized, id: newId };
                })
              );
              setPreviews([...previews, ...newPreviews]);
              setFieldValue(
                name,
                Array.isArray(value)
                  ? [...value, ...compressedFiles]
                  : compressedFiles
              );
            } else {
              fileRejections.forEach((fr) => {
                let msg: string;
                switch (fr.errors[0].code) {
                  case "file-invalid-type":
                    msg = "Blogas failo tipas";
                    break;
                  case "too-many-files":
                    msg = `Failų įkėlimo max sk. ${props?.maxFiles}`;
                    break;
                  default:
                    msg = "Klaida, bandykite darkarta";
                    break;
                }
                setFieldError(name, `'${fr.file.name}': ${msg}`);
              });
              console.log("Dropzone Error: ", fileRejections);
            }
          }}
          {...props}
        >
          {({ getRootProps, getInputProps }) => (
            <>
              <section className="dropzone">
                <div className="area hoverCursor" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Įkelti Nuotraukas</p>
                  {!value ? null : <p>{value.path}</p>}
                </div>
                {errors ? <span className="error">{errors[name]}</span> : null}

                {!previews ? null : (
                  <div className="dropzone-carousel">
                    <div ref={kartosCarouselRef} className="KartosCarouselAdmin">
                      {previews.map(({ id, imageUrl, isFromDB }) => (
                        <Fragment key={id}>
                          {imageUrl ? (
                            <div
                              className="img-item"
                            >
                              <img src={imageUrl} alt="Uploaded File" />
                              <IconButton
                                rounded={0}
                                top="0"
                                size="sm"
                                aria-label="close"
                                colorScheme="red"
                                icon={<FaTimes />}
                                onClick={async () => {
                                  if (isFromDB) {
                                    await onDeleteDBImage(id);
                                  } else {
                                    URL.revokeObjectURL(imageUrl);
                                    setFieldValue(
                                      name,
                                      value.filter(
                                        ({ id: fileId }) => fileId !== id
                                      )
                                    );
                                  }
                                  setPreviews((p) =>
                                    p.filter((item) => item.id != id)
                                  );
                                }}
                              />
                            </div>
                          ) : null}
                        </Fragment>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            </>
          )}
        </Dropzone>
      </>
    );
  };

export default DropzoneFieldMulti;
