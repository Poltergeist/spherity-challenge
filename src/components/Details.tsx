import { Fragment, FC, useState } from "react";
import {
  Box,
  Grid,
  GridItem,
  Link,
  Button,
  Stack,
  Text,
  Heading,
  Card,
  Input,
} from "@chakra-ui/react";
import { Credential } from "../types";
import { NavLink, useParams } from "react-router";
import Loader from "@/components/Loader";
const gridSize = { base: "1fr", lg: "27ch auto" };
const gridColumns = { base: "1", lg: "1 / span 2" };

const RecursiveDataList: FC<{
  data: Record<string, unknown | string | number | Date>;
  search: string | null;
}> = ({ data, search }) => {
  return (
    <Grid templateColumns={gridSize} borderWidth="1px" p="2">
      {Object.entries(data).map(([key, value]) => {
        if (typeof value === "object") {
          if (Array.isArray(value)) {
            return (
              <GridItem gridColumn={gridColumns} key={key}>
                <Grid templateColumns={gridSize} borderWidth="1px" p="2">
                  <GridItem>
                    <Text
                      fontWeight="bold"
                      color={{ _dark: "teal.200", base: "teal.600" }}
                      mb={{ base: "2", lg: "0" }}
                    >
                      {key}
                    </Text>
                  </GridItem>
                  <GridItem>
                    {value.map((item, index) => (
                      <RecursiveDataList
                        key={index}
                        search={
                          search != null && key.toLowerCase().includes(search)
                            ? null
                            : search
                        }
                        data={
                          item as unknown as Record<
                            string,
                            unknown | string | number | Date
                          >
                        }
                      />
                    ))}
                  </GridItem>
                </Grid>
              </GridItem>
            );
          }

          return (
            <Fragment key={key}>
              <GridItem>
                <Text
                  fontWeight="bold"
                  color={{ _dark: "teal.200", base: "teal.600" }}
                  mb={{ base: "2", lg: "0" }}
                >
                  {key}
                </Text>
              </GridItem>
              <GridItem gridColumn="">
                <RecursiveDataList
                  search={
                    search != null && key.toLowerCase().includes(search)
                      ? null
                      : search
                  }
                  data={
                    value as Record<string, unknown | string | number | Date>
                  }
                />
              </GridItem>
            </Fragment>
          );
        }

        if (search != null) {
          if (
            !key.toLowerCase().includes(search.toLowerCase()) &&
            !value?.toString().toLowerCase().includes(search.toLowerCase())
          ) {
            return null;
          }
        }

        return (
          <Fragment key={key}>
            <GridItem>
              <Text
                fontWeight="bold"
                color={{ _dark: "teal.200", base: "teal.600" }}
                mb={{ base: "2", lg: "0" }}
              >
                {key}
              </Text>
            </GridItem>
            <GridItem pl={{ base: "2", lg: "0" }}>{value as string}</GridItem>
          </Fragment>
        );
      })}
    </Grid>
  );
};

const Details = ({ data }: { data: Array<Credential> | null }) => {
  const { id } = useParams();
  const [search, setSearch] = useState<string | null>(null);
  const subject = data?.find((item) => item.id === id)?.credentialSubject;

  if (subject == null) {
    return <Loader />;
  }

  return (
    <Grid>
      <GridItem p="4">
        <Stack>
          <Heading color="teal.600">{id}</Heading>
          <Card.Root>
            <Card.Header>Suche</Card.Header>
            <Card.Body>
              <Input
                defaultValue={search != null ? search : ""}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Card.Body>
          </Card.Root>

          <RecursiveDataList
            data={
              subject as unknown as Record<
                string,
                unknown | string | number | Date
              >
            }
            search={search}
          />
          <Box px="1">
            <Link asChild>
              <NavLink to={`/`}>
                <Button as={Text} colorPalette="teal" variant="outline">
                  Back to Overview
                </Button>
              </NavLink>
            </Link>
          </Box>
        </Stack>
      </GridItem>
    </Grid>
  );
};

export default Details;
