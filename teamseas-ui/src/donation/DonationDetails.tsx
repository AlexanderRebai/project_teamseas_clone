import { Button, Heading, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import React from "react";
import { InputField } from "../form/InputField";
import { TextareaField } from "../form/TextAreaField";
import * as yup from "yup";

const detailsSchema = yup.object().shape({
  displayName: yup.string().required("Display name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  mobile: yup.string().nullable(),
  team: yup.string().nullable(),
  message: yup.string().nullable()
});

type Props = {
  next: (values: any) => void;
  previous: () => void;
};

const DonationDetails = ({ next, previous }: Props) => {
  const submit = (values: any) => {
    next(values);
  };

  return (
    <Formik
      initialValues={{
        displayName: "",
        email: "",
        mobile: "",
        team: "",
        message: "",
      }}
      onSubmit={submit}
      validationSchema={detailsSchema}
    >
      {(formikProps) => (
        <Form>
          <VStack spacing={4} align="stretch">
            <Heading size="md" as="h3">
                Donation Details
            </Heading>
            <InputField
              label="Display Name"
              name="displayName"
              placeholder="Display Name"
            />
            <InputField label="Email" name="email" placeholder="Email" />
            <InputField
              label="Phone number"
              name="mobile"
              placeholder="Phone number"
            />
            <InputField label="Team" name="team" placeholder="Team" />
            <TextareaField
              label="Message"
              name="message"
              placeholder="Message"
            />
            <VStack spacing={2}>
              <Button
                width="full"
                colorScheme="orange"
                size="lg"
                borderRadius="full"
                type="submit"
              >
                Submit
              </Button>
              <Button
                width="full"
                size="lg"
                borderRadius="full"
                variant="ghost"
                fontSize="sm"
                color="gray.700"
                onClick={previous}
              >
                Previous
              </Button>
            </VStack>
          </VStack>
        </Form>
      )}
    </Formik>
  );
};

export default DonationDetails;
