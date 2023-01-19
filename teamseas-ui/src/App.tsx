import "@fontsource/montserrat/500.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/300.css";

import * as React from "react";
import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Grid,
  Heading,
  extendTheme,
} from "@chakra-ui/react";
import { Logo } from "./Logo";
import { AnimatedCounter } from "./donation/AnimatedCounter";
import { useQuery, useSubscription } from "urql";
import { Leaderboard } from "./leaderboard/Leaderboard";
import { DonationWizard } from "./donation/DonationWizard";

//extend theme with custom font
const theme = extendTheme({
  fonts: {
    heading: "Montserrat",
    body: "Montserrat",
  },
});

//fetch totalDonations on page load
const TotalDonationsQuery = `
  query Query {
    totalDonations
  }
`;

//subscribe to totalUpdated, which is updated when a new donation is made
const TotalUpdatedDonationsQuery = `
  subscription Subscription {
    totalUpdated {
      total
    }
  }
`;

const handleSubscription = (prev: any, newTotal: any) => {
  return newTotal?.totalUpdated?.total;
};

export const App = () => {
  const [result] = useSubscription(
    { query: TotalUpdatedDonationsQuery },
    handleSubscription
  );

  const [{ data, fetching, error }] = useQuery({
    query: TotalDonationsQuery,
  });

  if (fetching) return <div>Fetching...</div>;
  if (error) return <div>Error!</div>;

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3} bg="gray.50" color="black">
          <VStack spacing={8}>
            <Logo h="32" pointerEvents="none" />
            <Heading as="h1" size="xl">
              JOIN THE MOVEMENT
            </Heading>
            <Text>
              The team is growing everyday and scoring wins for the planet.
              <br />
              Remove thrash with us, and help us grow our impact!
            </Text>

            <Heading as="h2" size="4xl">
              <AnimatedCounter
                from={0}
                to={result.data || data.totalDonations}
              ></AnimatedCounter>{" "}
            </Heading>

            <DonationWizard />

            <Leaderboard />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
