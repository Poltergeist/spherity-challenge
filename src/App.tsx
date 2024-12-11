import { useState, useEffect } from "react";
import {
  Grid,
  GridItem,
  Text,
  Heading,
  Stack,
  Link,
  Box,
  Button,
} from "@chakra-ui/react";
import { Code } from "@chakra-ui/react";
import { Credential } from "./types";
import { fetchService } from "./services/fetchService";
import Loader from "@/components/Loader";
import KeyValueTable from "@/components/KeyValueTable";
import Details from "@/components/Details";
import { HashRouter, Routes, Route, NavLink } from "react-router";

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
    <HashRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Grid templateColumns={{ base: "1fr" }} gap={{ base: "0" }}>
              <GridItem p="4">
                <Loading />
                <AccordionRoot collapsible>
                  {data?.map((item: Credential, index: number) => {
                    const {
                      proof: _proof,
                      credentialSubject: _subject,
                      ...rest
                    } = item;

                    return (
                      <AccordionItem key={index} value={index + ""}>
                        <AccordionItemTrigger
                          color={{ base: "teal.600", _dark: "teal.200" }}
                        >
                          <Text title={item.id}>{item.id.split(":")[2]}</Text>
                        </AccordionItemTrigger>
                        <AccordionItemContent>
                          <Stack>
                            <Heading
                              py="4"
                              color={{ base: "teal.400", _dark: "teal.600" }}
                            >
                              Attributes
                            </Heading>
                            <KeyValueTable item={rest} />
                            <Heading
                              py="4"
                              color={{ base: "teal.400", _dark: "teal.600" }}
                            >
                              Proofs
                            </Heading>
                            <KeyValueTable item={item.proof} />
                            <Box px="1">
                              <Link asChild>
                                <NavLink to={`/detail/${item.id}`}>
                                  <Button
                                    as={Text}
                                    colorPalette="teal"
                                    variant="outline"
                                  >
                                    Details
                                  </Button>
                                </NavLink>
                              </Link>
                            </Box>
                          </Stack>
                        </AccordionItemContent>
                      </AccordionItem>
                    );
                  })}
                </AccordionRoot>
                <ErrorFrame />
              </GridItem>
            </Grid>
          }
        />
        <Route path="/detail/:id" element={<Details data={data} />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
