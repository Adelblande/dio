import { GetServerSideProps } from "next";
import { Header } from "../components/Header";
import {
  Button,
  Flex,
  FormErrorMessage,
  Input,
  Stack,
  FormControl,
} from "@chakra-ui/react";
import { CardMessage } from "../components/CardMessage";
import { useCallback, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { send } from "process";

interface IMessage {
  id: string;
  email: string;
  message: string;
  created_at: string;
}

interface ContatoProps {
  messages: IMessage[];
}

type ContatoFormData = {
  email: string;
  message: string;
};

const schema = yup.object().shape({
  email: yup.string().required("E-mail obrigatório").email("E-mail inválido"),
  message: yup.string().required("Mensagem obrigatório"),
});

export default function Contato({ messages }: ContatoProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const handleSendMessage: SubmitHandler<ContatoFormData> = useCallback(
    async (data) => {
      const setting = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };

      try {
        const response = await fetch("http://localhost:5000/message", setting);
        const sendMessage = await response.json();
        if (sendMessage.id) {
          messages.push({
            id: sendMessage.id,
            email: sendMessage.email,
            message: sendMessage.message,
            created_at: sendMessage.created_at,
          });
        }

        reset();
      } catch (error) {
        console.warn(error);
      }
    },
    [messages, reset]
  );

  return (
    <Flex h="100vh" w="100vw" direction="column">
      <Header />
      <Flex
        as="form"
        onSubmit={handleSubmit(handleSendMessage)}
        w="100%"
        maxWidth={460}
        mx="auto"
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDir="column"
      >
        <Stack spacing="4">
          <Input
            name="email"
            placeholder="E-mail"
            {...register("email")}
            focusBorderColor="pink.500"
            border="2px"
          />
          <Input
            name="message"
            placeholder="Mensagem"
            {...register("message")}
            focusBorderColor="pink.500"
            border="2px"
          />
        </Stack>
        <Button
          type="submit"
          colorScheme="pink"
          mt="6"
          size="lg"
          isLoading={isSubmitting}
        >
          Enviar
        </Button>
      </Flex>
      <Flex
        w="100%"
        maxWidth={1480}
        mx="auto"
        mt="8"
        mb="10"
        px={["10", "20"]}
        flexWrap="wrap"
      >
        {messages.map((message) => (
          <CardMessage {...message} key={`message-id-${message.id}`} />
        ))}
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps<
  ContatoProps
> = async () => {
  const response = await fetch("http://localhost:5000/message");
  const messages: IMessage[] = await response.json();

  return {
    props: {
      messages,
    },
  };
};
