import React, { FC, useState } from "react";
import { FieldProps } from "formik";
import Dropzone, { DropzoneProps, DropzoneRef } from "react-dropzone";
//import {resizeImage} from "../utils/resizeImage";

export const requiredDropzoneValidation = (value: File | null) => {
  if (!value) {
    return "Failas privalomas";
  }
};

const DropzoneField: FC<
  FieldProps<DropzoneProps & React.RefAttributes<DropzoneRef> & any> & {
    imageUrl: string;
    dim?: { x: number; y: number };
  }
> = ({
  field: { name, value },
  form: { setFieldValue, errors, setFieldError },
  dim = null,
  ...props
}) => {
  const [preview, setPreview] = useState("");

  return (
    <>
      <Dropzone
        accept="image/*"
        multiple={false}
        onDrop={async ([file], [fileRejection]) => {
          if (!fileRejection) {
            let compressedFile: File;
            if (dim) {
              console.log("importing!...");
              const resizeImage = (await import("../utils/resizeImage"))
                .resizeImage;
              /// compress file

              compressedFile = await resizeImage(file, dim.x, dim.y);
            } else compressedFile = file;

            setPreview(URL.createObjectURL(compressedFile));

            setFieldValue(name, compressedFile);
          } else {
            setFieldError(name, fileRejection.errors[0].message);
          }
        }}
        {...props}
      >
        {({ getRootProps, getInputProps }) => (
          <>
            <section className="dropzone">
              <div className="area hoverCursor" {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Įkelti Nuotrauką</p>
                {!value ? null : <p>{value.path}</p>}
              </div>
              {errors ? <span className="error">{errors[name]}</span> : null}
              {
                <div>
                  {preview || props.imageUrl ? (
                    <img
                      style={{ margin: " 5px auto 0 auto" }}
                      src={preview || props.imageUrl}
                      alt="Uploaded File"
                    />
                  ) : null}
                </div>
              }
            </section>
          </>
        )}
      </Dropzone>
    </>
  );
};

export default DropzoneField;
