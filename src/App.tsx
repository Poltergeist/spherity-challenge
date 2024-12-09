import { useState, useEffect } from "react";
import { Grid, GridItem, Box, Button } from "@chakra-ui/react";
import { Code } from "@chakra-ui/react";
import { Credential } from "./types";
import { fetchService } from "./services/fetchService";
import Loader from "@/components/Loader";

function App() {
  const [data, setData] = useState<Credential[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServiceInstance = new fetchService({
      url: "https://api-vera.susi.spherity.dev/credential-registry/did:web:api-rcs.susi.spherity.dev:did-registry:acme-power-drive-x-1000-3985-cb-1739186-d-8-d",
      setError,
      setData,
    });

    fetchServiceInstance.fetchData();
  }, []);

  const Loading = () => data == null && error == null && <Loader />;
  const Data = () =>
    data != null && <Code as="pre">{JSON.stringify(data, null, 2)}</Code>;
  const ErrorFrame = () =>
    error != null && <Code as="pre">{JSON.stringify(error, null, 2)}</Code>;
  return (
    <Grid templateColumns={{ base: "1fr", md: "10ch auto" }} gap="6">
      <GridItem>
        <Box minH="100vh" bg="gray.100" _dark={{ bg: "gray.900" }} p="1">
          <Button variant="outline" w="100%">
            Outline
          </Button>
        </Box>
      </GridItem>
      <GridItem>
        <Loading />
        <Data />
        <ErrorFrame />
      </GridItem>
    </Grid>
  );
}

export default App;
