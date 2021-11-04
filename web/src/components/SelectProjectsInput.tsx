import {
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  InputGroup,
  InputLeftElement,
  FormControl,
  Input,
} from "@chakra-ui/react";
import { FieldHookConfig, useField } from "formik";
import React, { FC, useEffect, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { useSearchProjectsQuery } from "../generated/graphql";

export type SelectProjectType = {
  id: number;
  title: string;
  description: string;
};

type SelectProjectsInputProps = FieldHookConfig<string> & {
  name: string;
  setListProjects: React.Dispatch<React.SetStateAction<SelectProjectType[]>>;
};

const SelectProjectsInput: FC<SelectProjectsInputProps> = ({
  setListProjects,
  ...props
}) => {
  const [field, { error }] = useField(props);
  const [{ data, fetching }] = useSearchProjectsQuery();
  const [selections, setSelections] = useState<SelectProjectType[]>([]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const trim = field.value.trim();
      console.log("Filtering!");
      if (trim) {
        setSelections(
          data?.searchProjects.filter(
            (s) => s.title.includes(trim) || s.description.includes(trim)
          )
        );
      } else {
        setSelections(data?.searchProjects);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [field.value]);

  return (
    <>
      <Menu
        id="jonas"
        closeOnSelect={false}
        autoSelect={false}
        //closeOnBlur={false}
        placement="bottom-end"
      >
        <MenuButton
          as={Button}
          rightIcon={<FaPlus />}
          ml="auto"
          mt="1em"
          size="sm"
          variant="outline"
          colorScheme="blue"
          id="lochas"
          onClick={() => {
            setSelections(
              data?.searchProjects.map((p) => ({
                id: p.id,
                title: p.title,
                description: p.description,
              }))
            );
          }}
        >
          Pridėti projektą
        </MenuButton>
        <MenuList maxWidth="300px">
          <FormControl isInvalid={!!error}>
            <InputGroup pb="0.2rem">
              <InputLeftElement
                pointerEvents="none"
                children={<FaSearch color="gray" />}
              />
              <Input
                {...field}
                variant="flushed"
                name={field.name}
                placeholder="ieškoti"
                size="sm"
                id="asd-asd"
                autoComplete="off"
              />
            </InputGroup>
          </FormControl>
          {fetching || !selections ? null : (
            <>
              {selections.map((p) => (
                <MenuItem
                  onClick={() => {
                    console.log("selected: ", p.id);
                    setListProjects((projects) => {
                      for (let i = 0; i < projects.length; i++) {
                        if (projects[i].id === p.id) return projects;
                      }

                      return [...projects, p];
                    });
                  }}
                  py="0.1rem"
                  key={p.id}
                >
                  {p.title}
                </MenuItem>
              ))}
            </>
          )}
        </MenuList>
      </Menu>
    </>
  );
};

export default SelectProjectsInput;
