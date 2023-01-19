import {
  Text,
  Button,
  Heading,
  NumberInput,
  NumberInputField,
  SimpleGrid,
  useRadioGroup,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import RadioCard from "./RadioCard";

type Props = {
  next: (values: any) => void;
  initialCount: number;
};

const options = [0, 5, 20, 50, 100];

const AmountSelection = ({ next, initialCount }: Props) => {
  const [pounds, setPounds] = useState(initialCount);

  const [customAmount, setCustomAmount] = useState(
    "" + (options.includes(pounds) ? "" : pounds)
  );

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "pounds",
    value: pounds.toString(),
    onChange: (nextValue) => {
      setCustomAmount("");
      setPounds(parseInt(nextValue));
    },
  });

  const nextStep = () => {
    next({ count: pounds });
  };

  const group = getRootProps();

  return (
    <VStack spacing={4} align="stretch">
      <Heading as="h3" size="md">
        JOIN #TEAMSEAS
      </Heading>
      <Text fontSize="md" fontWeight="bold">
        $1 removes 1 pound of trash
      </Text>
      <SimpleGrid mt={5} columns={2} spacing={2} {...group}>
        {/* see documentation radio card chakra ui */}
        {options.map((value) => {
          const radio = getRadioProps({ value, enterKeyHint: "" });
          if (value !== 0) {
            return (
              <RadioCard key={value} {...radio}>
                {value} pounds
              </RadioCard>
            );
          }
        })}
      </SimpleGrid>
      <NumberInput
        bg="gray.50"
        borderColor="gray.200"
        onFocus={() => setPounds(0)}
        onChange={(value) => {
          setPounds(parseInt(value));
          setCustomAmount(value);
        }}
        value={customAmount}
      >
        <NumberInputField
          placeholder="Other amount"
          _placeholder={{ color: "black" }}
          color="black"
        />
      </NumberInput>

      <hr />

      <Button
        colorScheme="orange"
        width="full"
        size="lg"
        borderRadius="full"
        onClick={nextStep}
      >
        Next
      </Button>
    </VStack>
  );
};

export default AmountSelection;
