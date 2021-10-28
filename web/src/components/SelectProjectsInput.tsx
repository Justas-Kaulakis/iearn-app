import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  InputGroup,
  InputLeftElement,
  FormControl,
  FormErrorMessage,
  Input,
  FormLabel,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { FC } from "react";
import {
  FaAngleDown,
  FaPhone,
  FaPhoneSquare,
  FaPlus,
  FaSearch,
} from "react-icons/fa";
import { useSearchProjectsQuery } from "../generated/graphql";
import InputField from "./InputField";

interface SelectProjectsInputProps {
  name: string;
}

const SelectProjectsInput: FC<SelectProjectsInputProps> = ({ name }) => {
  const [field, { error }] = useField({ name });
  const [{ data, fetching }] = useSearchProjectsQuery();

  return (
    <Menu
      id="jonas"
      closeOnSelect={false}
      closeOnBlur={false}
      placement="top-end"
    >
      <MenuButton
        as={Button}
        rightIcon={<FaPlus />}
        ml="auto"
        mb="1em"
        size="sm"
        variant="outline"
        colorScheme="blue"
        id="lochas"
      >
        Pridėti projektą
      </MenuButton>
      <MenuList>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            children={<FaSearch color="gray" />}
          />
          <FormLabel key={`label-${name}`} htmlFor={name} />
          <Input
            {...field}
            variant="flushed"
            name={name}
            placeholder="ieškoti"
            size="sm"
            value=""
            id="asd-asd"
          />
        </InputGroup>
        {fetching ? null : (
          <>
            {data?.searchProjects.map((p) => (
              <MenuItem py="0.1rem" key={p.id}>
                {p.title}
              </MenuItem>
            ))}
          </>
        )}
      </MenuList>
    </Menu>
  );
};

export default SelectProjectsInput;
