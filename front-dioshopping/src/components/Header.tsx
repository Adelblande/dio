import { Flex, Link, Text, Icon, HStack, Box } from "@chakra-ui/react";
import NextLink from 'next/link'
import {FiShoppingCart} from 'react-icons/fi'
import { useSelector } from 'react-redux';

export function Header() {
  const qtdItems = useSelector( (state: any) => state.cart.value)
  return (
    <Flex
      as="header"
      w="100%"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px={['10', '20']}
      align="center"
      justify="space-between"
    >
        <Flex>
          <Text fontSize="3xl" >Dio</Text>
        </Flex>
        <Flex>
          <HStack spacing="6">
            <NextLink href='/' passHref>
              <Link fontSize="20" _hover={{color: 'pink.500'}}>Home</Link>
            </NextLink>
            <NextLink href='/contato' passHref>
              <Link fontSize="20"_hover={{color: 'pink.500'}}>Contato</Link>
            </NextLink>
          </HStack>
        </Flex>
        <Flex>
          <NextLink href='/carrinho' passHref>
            <Flex>
              <Icon as={FiShoppingCart} fontSize="20" _hover={{color: 'pink.500', cursor: 'pointer'}} />
              <Box
                boxSize="6"
                display="flex"
                alignItems="center"
                justifyContent="center"
                borderRadius="6"
                backgroundColor="pink.500"
                ml="2"
                >
                <Text>{qtdItems}</Text>
              </Box>
            </Flex>
          </NextLink>
        </Flex>
    </Flex>
  )
}
