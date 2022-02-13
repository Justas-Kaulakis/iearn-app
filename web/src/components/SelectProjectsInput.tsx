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
  Flex,
} from "@chakra-ui/react";
import { FieldHookConfig, useField } from "formik";
import React, { FC, useEffect, useState } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";
import { useSearchProjectsQuery } from "../generated/graphql";

export type SelectProjectType = {
  id: number;
  title: string;
  description: string;
  isFromDB: boolean;
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
      //console.log("Filtering!");
      if (trim) {
        setSelections(
          data?.searchProjects
            .filter((s) => {
              if (s.title.includes(trim)) return true;
              if (s.description.includes(trim)) return true;
              return false;
            })
            .map((s) => ({ ...s, isFromDB: true }))
        );
      } else {
        setSelections(
          data?.searchProjects.map((s) => ({ ...s, isFromDB: true }))
        );
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [field.value, data?.searchProjects]);

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
                isFromDB: false,
              }))
            );
          }}
        >
          Pridėti projektą
        </MenuButton>
        <MenuList maxWidth="300px">
          <FormControl isInvalid={!!error}>
            <InputGroup pb="0.2rem">
              <InputLeftElement pointerEvents="none">
                <FaSearch color="gray" />
              </InputLeftElement>

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
          {fetching ? null : (
            <>
              {!selections.length ? (
                <Flex justify="center">
                  <b>-- projektų nėra --</b>
                </Flex>
              ) : (
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
            </>
          )}
        </MenuList>
      </Menu>
    </>
  );
};

export default SelectProjectsInput;
