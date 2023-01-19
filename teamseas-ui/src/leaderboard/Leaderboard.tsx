import { Box, Heading, Radio, RadioGroup, Stack, VStack } from "@chakra-ui/react";
import React, { useState } from "react";
import { useQuery } from "urql";
import { Donation } from "../types";
import { LeaderboardItem } from "./LeaderboardItem";

const DonationsQuery = `
    query Query($orderBy: OrderByParams){
        donations(orderBy: $orderBy) {
            id
            displayName
            count
            createdAt
            team
            message
        }
    }
`;

type DonationsQueryRes = {
  donations: Donation[];
};

export const Leaderboard = (props: any) => {
  const [field, setOrderByField] = useState("createdAt");

  const [{ data, fetching, error }] = useQuery<DonationsQueryRes>({
    query: DonationsQuery,
    variables: {
      orderBy: {
        field,
        direction: "desc",
      },
    },
  });

  if (fetching) return <div>Fetching...</div>;
  if (error) return <div>Error!</div>;

  return (
    <Box w="100%">
      <VStack spacing={4}>
        <Heading as="h1" size="2xl">Leaderboard</Heading>

        <RadioGroup onChange={setOrderByField} value={field}>
            <Stack direction="row">
                <Radio bg="white" borderColor="black" value="createdAt">Most Recent</Radio>
                <Radio bg="white" borderColor="black" value="count">Most Pounds</Radio>
            </Stack>
        </RadioGroup>

        {data?.donations.map((d) => {
          return <LeaderboardItem key={d.id} donation={d} />;
        })}
      </VStack>
    </Box>
  );
};
