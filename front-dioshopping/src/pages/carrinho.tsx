import { useMemo } from "react";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { Header } from "../components/Header";
import { useSelector, useDispatch } from "react-redux";
import cartActions from "../store/actions/cart";

import {
  Flex,
  Text,
  Image,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Icon,
  HStack,
} from "@chakra-ui/react";

import formatPrice from "../utils/formatPrice";

interface Product {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
}

export default function Carrinho() {
  const cart = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  const total = useMemo(() => {
    const sum = cart.Cart.reduce((acc: number, content: Product) => {
      return acc + content.quantity * content.price;
    }, 0);

    return sum;
  }, [cart]);
  return (
    <Flex h="100vh" direction="column">
      <Header />
      <Flex
        w="100%"
        maxWidth={1480}
        mx="auto"
        mt="8"
        mb="10"
        px={["10", "20"]}
        textAlign="center"
        flexWrap="wrap"
      >
        {cart.Cart.length > 0 ? (
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Produto</Th>
                <Th>Qtd</Th>
                <Th isNumeric>Total</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {cart.Cart.map((item: Product) => (
                <Tr key={`key-${item.id}`}>
                  <Td>
                    <Image src={item.image} boxSize="50" alt={item.name} />
                  </Td>
                  <Td>
                    <HStack spacing="2">
                      <Icon
                        as={FiMinus}
                        w={4}
                        h={4}
                        _hover={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch(cartActions.RemoveItem(cart, item))
                        }
                      />
                      <Text>{item.quantity}</Text>
                      <Icon
                        as={FiPlus}
                        w={4}
                        h={4}
                        _hover={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch(cartActions.AddItem(cart, item))
                        }
                      />
                    </HStack>
                  </Td>
                  <Td isNumeric>{formatPrice(item.price)}</Td>
                  <Td textAlign="right">
                    <Icon
                      as={FiTrash2}
                      w={4}
                      h={4}
                      _hover={{ cursor: "pointer" }}
                      onClick={() =>
                        dispatch(cartActions.DeleteItem(cart, item))
                      }
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
            <Tfoot>
              <Tr>
                <Th colSpan={4} isNumeric color="pink.500">
                  <Text fontWeight="bold" fontSize="2xl">
                    {formatPrice(total)}
                  </Text>
                </Th>
              </Tr>
            </Tfoot>
          </Table>
        ) : (
          <Text>Seu carrinho está vazio</Text>
        )}
      </Flex>
    </Flex>
  );
}
