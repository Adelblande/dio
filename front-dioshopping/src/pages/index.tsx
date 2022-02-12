import { Flex } from '@chakra-ui/react'
import { useSelector } from 'react-redux';
import { CardItem } from '../components/CardItem';
import { Header } from '../components/Header'

interface Product {
  id: number
  image: string
  name: string
  price: number
}

export default function Home() {
  const products = useSelector((state: any) => state.products)

  return (
    <Flex h="100vh" flexDir="column">
      <Header />
      <Flex
        w="100%"
        maxWidth={1480}
        mx="auto"
        mt="8"
        mb="10"
        px={['10', '20']}
        textAlign="center"
        flexWrap="wrap"
      >
        {
          products.map((product: Product) => (
            <CardItem {...product} key={`key-${product.id}`}/>
          ))
        }
      </Flex>
    </Flex>
  )
}
