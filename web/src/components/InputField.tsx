import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { FieldHookConfig, useField } from "formik";
import React, { FC } from "react";
import shortid from "shortid";

type InputFieldProps = FieldHookConfig<string> & {
  name: string;
  placeholder: string;
  label?: string;
  isTextarea?: boolean;
  variant?: (string & {}) | "outline" | "flushed" | "filled" | "unstyled";
  size?: (string & {}) | "sm" | "md" | "lg" | "xs";
  rand?: string;
};

const InputField: FC<InputFieldProps> = ({ rand, ...props }) => {
  const [field, { error }] = useField(props);
  const C = props.isTextarea ? Textarea : Input;
  return (
    <FormControl isInvalid={!!error}>
      {!props.label ? null : (
        <FormLabel id={`label-${field.name}`} htmlFor={field.name}>
          {props.label}
        </FormLabel>
      )}
      <C
        required={props.required}
        {...field}
        id={`${field.name}-${rand}`}
        placeholder={props.placeholder}
        type={props.type}
        fontSize="1em"
        backgroundColor="white"
        autoComplete="off"
        variant={props.variant}
        boxShadow="base"
        size={props.size}
      />
      {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
    </FormControl>
  );
};

export default InputField;
