import { Formik, Form, Field } from "formik";
import { withUrqlClient } from "next-urql";
import React, { FC } from "react";
import DropzoneField, {
  DropzoneFileType,
  requiredDropzoneValidation,
} from "../../components/DropzoneField";
import {
  CreateMemberMutationVariables,
  MemberInput,
  useCreateMemberMutation,
} from "../../generated/graphql";
import { createUrqlClient } from "../../utils/createUrqlClient";
interface FormInputType {
  fullName: string;
  description: string;
  image: DropzoneFileType | null;
}

const CreateMember: FC = () => {
  const [, createMember] = useCreateMemberMutation();
  return (
    <Formik<FormInputType>
      initialValues={{ fullName: "", description: "", image: null }}
      onSubmit={async (values, { setSubmitting }) => {
        console.log("Values:", values);
        if (values) {
          const { data, error } = await createMember({
            input: {
              fullName: values.fullName,
              description: values.description,
              image: values.image?.file,
            },
          });
          if (error) {
            console.log("Mutation Error: ", error);
          }
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <Field required placeholder="full name" name="fullName" as="input" />
          <br />
          <Field
            required
            placeholder="description"
            name="description"
            as="input"
          />
          <div style={{ width: "300px" }}>
            <Field
              name="image"
              validate={requiredDropzoneValidation}
              required
              component={DropzoneField}
            />
          </div>
          <br />
          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default withUrqlClient(createUrqlClient)(CreateMember);
