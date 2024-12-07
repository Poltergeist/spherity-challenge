import { Spinner, VStack, Text, Center } from "@chakra-ui/react";
export default function Loader() {
  return (
    <Center h="100%">
      <VStack colorPalette="teal">
        <Spinner color="colorPalette.600" size="xl" />
        <Text color="colorPalette.600">Loading...</Text>
      </VStack>
    </Center>
  );
}
