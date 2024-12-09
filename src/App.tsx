import { useState, useEffect } from "react";
import { Grid, GridItem, Text, Heading, Stack } from "@chakra-ui/react";
import { Code } from "@chakra-ui/react";
import { Credential } from "./types";
import { fetchService } from "./services/fetchService";
import Loader from "@/components/Loader";
import KeyValueTable from "@/components/KeyValueTable";

import {
  AccordionItem,
  AccordionItemContent,
  AccordionItemTrigger,
  AccordionRoot,
} from "@/components/ui/accordion";

function App() {
  const [data, setData] = useState<Credential[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServiceInstance = new fetchService({
      url: "https://api-vera.susi.spherity.dev/credential-registry/did:web:api-rcs.susi.spherity.dev:did-registry:acme-power-drive-x-1000-3985-cb-1739186-d-8-d",
      setError,
      setData,
    });
    setData(null);
    setError(null);

    fetchServiceInstance.fetchData();
  }, []);

  const Loading = () => data == null && error == null && <Loader />;
  const ErrorFrame = () =>
    error != null && (
      <Code as="pre" maxW="100%">
        {JSON.stringify(error, null, 2)}
      </Code>
    );
  return (
    <Grid templateColumns={{ base: "1fr" }} gap={{ base: "0" }}>
      <GridItem p="4">
        <Loading />
        <AccordionRoot collapsible>
          {data?.map((item: Credential, index: number) => {
            const { proof, credentialSubject, ...rest } = item;

            return (
              <AccordionItem key={index} value={index + ""}>
                <AccordionItemTrigger>
                  <Text title={item.id}>{item.id.split(":")[2]}</Text>
                </AccordionItemTrigger>
                <AccordionItemContent>
                  <Stack>
                    <Heading py="4">Attributes</Heading>
                    <KeyValueTable item={rest} />
                    <Heading py="4">Proofs</Heading>
                    <KeyValueTable item={item.proof} />
                  </Stack>
                </AccordionItemContent>
              </AccordionItem>
            );
          })}
        </AccordionRoot>
        <ErrorFrame />
      </GridItem>
    </Grid>
  );
}

export default App;
