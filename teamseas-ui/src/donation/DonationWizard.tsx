import { Box, Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { useMutation } from "urql";
import AmountSelection from "./AmountSelection";
import DonationDetails from "./DonationDetails";

type Props = {};

const CreateDonation = `
  mutation Mutation($createDonationInput: CreateDonationInput!) {
    createDonation(createDonationInput: $createDonationInput) {
      count
      displayName
      email
    }
  }
  `;

export const DonationWizard = (props: Props) => {
  const [step, setStep] = useState(0);

  const [donationResult, createDonation] = useMutation(CreateDonation);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [donationDetails, setDonationDetails] = useState({
    count: 0,
  });

  const submitDonation = async (values: any) => {
    await createDonation({ createDonationInput: values });
    console.log(donationResult);
    setShowConfirmation(true);
  };

  const next = (values: any = {}) => {
    const mergedDetails = { ...donationDetails, ...values };

    if (step === pages.length - 1) {
      submitDonation(mergedDetails);
    } else {
      setStep(step + 1);
      setDonationDetails(mergedDetails);
    }
  };

  const prev = () => {
    setStep(step - 1);
  };

  const pages = [
    <AmountSelection next={next} initialCount={donationDetails.count} />,
    <DonationDetails next={next} previous={prev} />,
  ];

  return (
    <Box boxShadow="xl" p={8} bg="white" borderRadius="xl" minW="sm">
      {showConfirmation ? (
        <div>
          Thank you for your donation of $
          {donationResult?.data?.createDonation?.count} !!
          <Button
            colorScheme="orange"
            width="full"
            size="lg"
            borderRadius="full"
            onClick={() => {
              setShowConfirmation(false)
              setStep(0)
            }}
          >
            Donate
          </Button>
        </div>
      ) : (
        pages[step]
      )}
    </Box>
  );
};
