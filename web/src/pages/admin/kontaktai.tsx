import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React, { FC } from "react";
import { useState } from "react";
import { FaPlus, FaSave } from "react-icons/fa";
import AdminLayout from "../../components/AdminLayout";
import AdminTopBar from "../../components/AdminTopBar";
import InputField from "../../components/InputField";
import {
  useContactsQuery,
  useSocialLinksQuery,
  useUpdateContactsMutation,
  useUpdateLinksMutation,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";

interface kontaktaiProps {}

interface MediaFormTypes {
  instagram: string;
  facebook: string;
  youtube: string;
  iearnGlobal: string;
}

interface ContactFormTypes {
  contact1: string;
  contact2: string;
  contact3: string;
  contact4: string;
}

const Kontaktai: FC<kontaktaiProps> = ({}) => {
  const inputSize = "sm";
  const [{ data: links, fetching: fLinks, error: lError }] =
    useSocialLinksQuery();
  const [{ data: contacts, fetching: fcontacts, error: cError }] =
    useContactsQuery();
  const [, updateLinks] = useUpdateLinksMutation();
  const [, updateContacts] = useUpdateContactsMutation();
  const [lSaved, setLSaved] = useState(true);
  const [kSaved, setKSaved] = useState(true);

  if (lError || cError) {
    console.log("errors: ");
    console.log(lError);
    console.log(cError);
  }
  return (
    <AdminLayout active="kontaktai">
      <AdminTopBar pageName="kontaktai" />
      <Flex mt="2em" justifyContent="center" flexWrap="wrap" w="100%">
        {!links?.socialLinks && fLinks ? null : (
          <Box
            width="100%"
            minW="210px"
            maxW="300px"
            p="0.5em"
            mt="1em"
            mr="1em"
            rounded="md"
            boxShadow="md"
            bg="white"
          >
            <Heading textAlign="center" size="md">
              {!lSaved && "*"}Socialiniai Tinklai
            </Heading>
            <Formik<MediaFormTypes>
              initialValues={{
                instagram: links?.socialLinks.instagram,
                facebook: links?.socialLinks.facebook,
                youtube: links?.socialLinks.youtube,
                iearnGlobal: links?.socialLinks.iearnGlobal,
              }}
              validate={() => {
                setLSaved(false);
              }}
              onSubmit={(values, { setSubmitting }) => {
                updateLinks({
                  id: links.socialLinks.id,
                  input: values,
                });
                setLSaved(true);
                setSubmitting(false);
              }}
              validateOnBlur={false}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Flex width="100%" fontSize="0.8em" direction="column">
                    <InputField
                      type="url"
                      label="Instagram"
                      name="instagram"
                      placeholder="Instagram profilio nuoroda"
                      size={inputSize}
                    />
                    <InputField
                      type="url"
                      label="Facebook"
                      name="facebook"
                      placeholder="Facebook profilio nuoroda"
                      size={inputSize}
                    />
                    <InputField
                      type="url"
                      label="Youtube"
                      name="youtube"
                      placeholder="Youtube profilio nuoroda"
                      size={inputSize}
                    />
                    <InputField
                      type="url"
                      label="iEARN (globalus)"
                      name="iearnGlobal"
                      placeholder='Mūsų "iearn.org" profilis'
                      size={inputSize}
                    />
                    <Button
                      leftIcon={<FaSave />}
                      colorScheme="blue"
                      mt="1em"
                      size="sm"
                      type="submit"
                      isDisabled={isSubmitting}
                    >
                      {!lSaved ? "Išsaugoti" : "Išsaugota"}
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </Box>
        )}
        {!contacts?.contacts && fcontacts ? null : (
          <Box
            width="100%"
            minW="210px"
            maxW="300px"
            p="0.5em"
            mt="1em"
            mr="1em"
            rounded="md"
            boxShadow="md"
            bg="white"
          >
            <Heading textAlign="center" size="md">
              {!kSaved && "*"}Kontaktai
            </Heading>
            <Formik<ContactFormTypes>
              initialValues={{
                contact1: contacts.contacts[0].contact,
                contact2: contacts.contacts[1].contact,
                contact3: contacts.contacts[2].contact,
                contact4: contacts.contacts[3].contact,
              }}
              validate={() => {
                setKSaved(false);
              }}
              onSubmit={async (values) => {
                updateContacts({
                  contacts: [
                    { contact: values.contact1, id: contacts.contacts[0].id },
                    { contact: values.contact2, id: contacts.contacts[1].id },
                    { contact: values.contact3, id: contacts.contacts[2].id },
                    { contact: values.contact4, id: contacts.contacts[3].id },
                  ],
                });
                setKSaved(true);
                // setSubmitting(false);
              }}
              validateOnBlur={false}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Flex width="100%" fontSize="0.8em" direction="column">
                    {contacts.contacts?.map((c, i) => (
                      <Box key={c.id} mt="1.5em">
                        <InputField
                          type="text"
                          name={`contact${i + 1}`}
                          placeholder="Numeris ar el. paštas"
                          size={inputSize}
                        />
                      </Box>
                    ))}
                    <Button
                      leftIcon={<FaSave />}
                      colorScheme="blue"
                      mt="2em"
                      size="sm"
                      type="submit"
                      isDisabled={isSubmitting}
                    >
                      {!kSaved ? "Išsaugoti" : "Išsaugota"}
                    </Button>
                  </Flex>
                </Form>
              )}
            </Formik>
          </Box>
        )}
      </Flex>
    </AdminLayout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(Kontaktai);
