import {
  Tr,
  Td,
  ButtonGroup,
  Button,
  Avatar,
  Flex,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import { m } from "framer-motion";
import React, { FC } from "react";
import { useState } from "react";
import { FaRegSave, FaRegTrashAlt, FaSave } from "react-icons/fa";
import { OperationContext } from "urql";
import {
  MemberInput,
  TableMemberFragment,
  useDeleteMemberMutation,
  useUpdateMemberMutation,
} from "../generated/graphql";
import { DropzoneFileType } from "./DropzoneField";
import EditAvatar from "./EditAvatar";
import InputField from "./InputField";

interface NariaiTableRowProps {
  m: TableMemberFragment;
  index: number;
  reuseMembersQuery: (opts?: Partial<OperationContext>) => void;
}

const NariaiTableRow: FC<NariaiTableRowProps> = ({
  m,
  index,
  reuseMembersQuery,
}) => {
  const inputSize = "sm";
  const [, updateMember] = useUpdateMemberMutation();
  const [, deleteMember] = useDeleteMemberMutation();
  const [saved, setSaved] = useState(true);
  return (
    <Formik<MemberInput & { image: File | null }>
      initialValues={{
        image: null,
        fullName: m.fullName,
        description: m.description,
      }}
      validate={() => {
        setSaved(false);
      }}
      onSubmit={async (values) => {
        console.log(`Submiting ${m.id}:`, values);
        const { error } = await updateMember({
          id: m.id,
          input: values,
        });
        if (error) {
          console.log("Error Updating:", error);
        } else {
          setSaved(true);
        }
      }}
      validateOnBlur={false}
    >
      {({ isSubmitting }) => (
        <Tr borderTop="1px solid #e2e8f0" as="div" key={m.id}>
          <Form>
            <Td fontSize="1.1em" as="div" isNumeric className="number">
              <b>
                {saved ? "" : "*"}
                {index}.
              </b>
            </Td>
            <Td as="div" className="profile">
              <Flex align="center" minWidth="200px">
                <Field name="image" src={m.imageUrl} component={EditAvatar} />
                <Box ml="1em">
                  <InputField
                    required
                    type="text"
                    name="fullName"
                    placeholder="Vardas Pavardė"
                    variant="filled"
                    size={inputSize}
                  />
                </Box>
              </Flex>
              {/* <span className="profile-name">{m.fullName}</span> */}
            </Td>
            <Td width="200px" as="div" className="description">
              <InputField
                maxLength={10}
                required
                type="text"
                name="description"
                placeholder="Trumpas aprašymas"
                variant="filled"
                size={inputSize}
              />
            </Td>
            <Td as="div">
              <ButtonGroup
                mr="1em"
                color="white"
                size="sm"
                isAttached
                fontSize="1.2em"
              >
                <IconButton
                  type="submit"
                  size="md"
                  className="edit"
                  boxShadow="base"
                  aria-label="Edit Member"
                  icon={<FaSave size="1.4em" />}
                  isLoading={isSubmitting}
                />
                <IconButton
                  size="md"
                  className="delete"
                  boxShadow="base"
                  aria-label="Delete Member"
                  icon={<FaRegTrashAlt size="1.4em" />}
                  onClick={async () => {
                    const { error } = await deleteMember({ id: m.id });
                    if (error) {
                      console.log("Error Deleting Member: ", error);
                    } else {
                      reuseMembersQuery({ requestPolicy: "network-only" });
                    }
                  }}
                />
              </ButtonGroup>
            </Td>
          </Form>
        </Tr>
      )}
    </Formik>
  );
};

export default NariaiTableRow;
