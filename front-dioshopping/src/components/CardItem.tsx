import { Button, Text, Stack, Image, Icon, SimpleGrid } from "@chakra-ui/react";
import {FiShoppingCart} from 'react-icons/fi'
import { useSelector, useDispatch } from 'react-redux';
import cartActions from '../store/actions/cart';
import formatPrice from "../utils/formatPrice";

interface CardItemProps {
  id: number
  image: string
  name: string
  price: number
}

export function CardItem({ id, image, name, price}: CardItemProps) {
  const qtdItems = useSelector( (state: any) => state.cart.value)
  const dispatch = useDispatch();

  return (
    <SimpleGrid
      mx="2"
      my="4"
      border="2px"
      p="4"
      borderRadius="8"
      textAlign="center"
      minChildWidth={["250px", '200px']}
    >
      <Stack spacing="4">
        <Image src={image} boxSize={["250px", '200px']} alt={name} />
        <Text>{name}</Text>
        <Text>{formatPrice(price)}</Text>
        <Button
          rightIcon={<Icon as={FiShoppingCart} />}
          variant="solid"
          colorScheme="pink"
          onClick={()=>dispatch(cartActions.Add(qtdItems, {id, image, name, price}))}
        >
          Comprar
        </Button>
      </Stack>
    </SimpleGrid>
  )
}
