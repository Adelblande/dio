import { Text, Stack, SimpleGrid } from "@chakra-ui/react";
import formatDate from "../utils/formatDate";

interface CardItemProps {
  email: string
  message: string
  created_at: string
}

export function CardMessage({ email, message, created_at}: CardItemProps) {
  return (
    <SimpleGrid
      mx="2"
      my="4"
      border="2px"
      p="4"
      borderRadius="8"
      // textAlign="justify"
      minChildWidth={["250px", '200px']}
    >
      <Stack spacing="4">
        <Text fontWeight="bold" color="pink.500" >{email}</Text>
        <Text textAlign="justify" >{message}</Text>
        <Text>{formatDate(created_at)}</Text>

      </Stack>
    </SimpleGrid>
  )
}
