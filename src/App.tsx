import { useState, useEffect } from "react";
import { Grid, GridItem, Button } from "@chakra-ui/react";
import { Code } from "@chakra-ui/react";
import { Credential } from "./types";
import { fetchService } from "./services/fetchService";
import Loader from "@/components/Loader";
import Sidebar from "@/components/Sidebar";

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
        <Sidebar>
          <Button variant="outline" w="100%" color="teal.600">
            Outline
          </Button>
        </Sidebar>
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
