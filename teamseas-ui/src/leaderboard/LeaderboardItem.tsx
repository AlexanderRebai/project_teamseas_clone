import { Avatar, Badge, Box, Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Donation } from "../types";
import formatDate from "../utils/formatDate";

type Props = {
  donation: Donation;
};

export const LeaderboardItem = ({ donation }: Props) => {
  return (
    <Flex
      boxShadow="md"
      p={3}
      bg="white"
      borderRadius="lg"
      maxWidth="xl"
      w="100%"
    >
      <Avatar size="lg" />
      <Box flex={1} ml={4}>
        <Flex justifyContent="space-between" h="100%">
          <Flex flexDirection="column" textAlign="left">
            <Text
              fontWeight="bold"
              color="blue.500"
              fontSize="sm"
              textTransform="uppercase"
            >
              {donation.team}
            </Text>
            <Text fontWeight="bold">{donation.displayName}</Text>
            <Text fontSize="sm">{donation.message}</Text>
          </Flex>
          <Flex flexDirection="column" justifyContent="space-around">
            <div>
              <Badge
                colorScheme="blue"
                color="blue.500"
                textAlign="right"
                borderRadius="full"
                textTransform="lowercase"
                py={1}
                px={3}
                as="div"
              >
                {donation.count} Pounds
              </Badge>
            </div>
            <Text fontSize="xs">{formatDate(donation.createdAt)}</Text>{" "}
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};
