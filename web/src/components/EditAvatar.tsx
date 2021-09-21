import { Avatar, Flex, Text } from "@chakra-ui/react";
import { FieldProps } from "formik";
import React, { FC, useState } from "react";
import Dropzone from "react-dropzone";
import { resizeImage } from "../utils/resizeImage";

interface EditAvatarProps {
  src: string;
}

const EditAvatar: FC<EditAvatarProps & FieldProps<File>> = ({
  field: { name, value },
  form: { setFieldValue, errors, setFieldError },
  src,
  ...props
}) => {
  const [preview, setPreview] = useState<string | null>(null);
  //console.log("src: ", src);
  return (
    <Dropzone
      accept="image/*"
      multiple={false}
      onDrop={async ([file], [fileRejection]) => {
        if (!fileRejection) {
          /// compress file
          const compressedFile = await resizeImage(file);
          setPreview(URL.createObjectURL(compressedFile));
          setFieldValue(name, compressedFile);
        } else {
          //setMyError()
          console.log("Rejection errors: ", fileRejection.errors[0]);
          setFieldError(name, fileRejection.errors[0].message);
        }
      }}
      {...props}
    >
      {({ getRootProps, getInputProps }) => (
        <Flex
          width="fit-content"
          align="center"
          direction="column"
          className="hoverCursor"
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <Avatar
            className={!errors[name] ? undefined : "avatar-error"}
            _hover={{
              border: "3px #0d8bf1 solid",
            }}
            size="md"
            src={preview || src}
          />
          {errors[name] ? (
            <Text className="error" textAlign="center">
              Blogas failo tipas
              {/* {errors[name]} */}
            </Text>
          ) : null}
        </Flex>
      )}
    </Dropzone>
  );
};

export default EditAvatar;
