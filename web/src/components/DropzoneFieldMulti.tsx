import React, { FC, Fragment, useState } from "react";
import { FieldProps } from "formik";
import Dropzone, { DropzoneProps, DropzoneRef } from "react-dropzone";
import { resizeImage } from "../utils/resizeImage";
import Slider, { Settings as SliderSettings } from "react-slick";
import { Box } from "@chakra-ui/layout";
import { FaAngleLeft, FaAngleRight, FaTimes } from "react-icons/fa";
import { Button, IconButton } from "@chakra-ui/button";
import { GenerationImage } from "../generated/graphql";

export const requiredDropzoneValidation = (value: File | null) => {
  if (!value) {
    return "Failas privalomas";
  }
};

export type DropzoneMultiValueType = { file: File; id: number }[];
const PrevArrow: React.FC<OnClickType> = ({ onClick }) => {
  return (
    <Box top="50%" onClick={onClick} className="priv_arrow">
      <FaAngleLeft size="30px" />
    </Box>
  );
};
const NextArrow: React.FC<OnClickType> = ({ onClick }) => {
  return (
    <Box top="50%" onClick={onClick} className="next_arrow">
      <FaAngleRight size="30px" />
    </Box>
  );
};
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
  }
> = ({
  field: { name, value },
  form: { setFieldValue, errors, setFieldError },
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
  const settings: SliderSettings = {
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1000,
    dots: true,
    useTransform: true,
    cssEase: "ease-out",
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  //console.log("Dropzone urls: ", props.imageUrls);
  return (
    <>
      <Dropzone
        accept="image/*"
        maxFiles={props?.maxFiles}
        onDrop={async (files, fileRejections) => {
          console.log({ files, fileRejections });
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
                  <Slider {...settings}>
                    {previews.map(({ id, imageUrl, isFromDB }) => (
                      <Fragment key={id}>
                        {imageUrl ? (
                          <div
                            style={{ margin: " 5px auto 0 auto" }}
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
                              onClick={() => {
                                if (isFromDB) {
                                  console.log("Is from DB", imageUrl);
                                } else {
                                  setPreviews((p) =>
                                    p.filter((item) => item.id != id)
                                  );
                                  URL.revokeObjectURL(imageUrl);
                                  setFieldValue(
                                    name,
                                    value.filter(
                                      ({ id: fileId }) => fileId !== id
                                    )
                                  );
                                }
                              }}
                            />
                            <Button
                              left={0}
                              onClick={() => {
                                console.log("Previews: ", previews);
                                console.log("Value: ", value);
                              }}
                            >
                              Values
                            </Button>
                          </div>
                        ) : null}
                      </Fragment>
                    ))}
                  </Slider>
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
