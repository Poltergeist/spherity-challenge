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
import { Credential, CredentialSubject } from "../types";
import { NavLink, useParams } from "react-router";
import Loader from "@/components/Loader";
const gridSize = { base: "1fr", lg: "27ch auto" };
const gridColumns = { base: "1", lg: "1 / span 2" };

const recursiveDeepFilter = (
  data: CredentialSubject | Partial<CredentialSubject>,
  search: string,
): Partial<CredentialSubject> => {
  const deepFilter = (
    obj: Record<string, unknown>,
    search: string,
  ): Partial<Record<string, unknown>> => {
    return Object.entries(obj).reduce(
      (acc, [key, value]) => {
        if (value == null) return acc;

        if (key.toLowerCase().includes(search)) {
          acc[key] = value;
        } else if (typeof value === "object") {
          if (Array.isArray(value)) {
            const filteredArray = value
              .map((item) =>
                typeof item === "object" && item !== null
                  ? deepFilter(item as Record<string, unknown>, search)
                  : item,
              )
              .filter((item) => {
                return (
                  (typeof item === "object" && Object.keys(item).length > 0) ||
                  (typeof item === "string" &&
                    item.toLowerCase().includes(search))
                );
              });

            if (filteredArray.length > 0) {
              acc[key] = filteredArray;
            }
          } else {
            const filteredObject = deepFilter(
              value as Record<string, unknown>,
              search,
            );
            if (Object.keys(filteredObject).length > 0) {
              acc[key] = filteredObject;
            }
          }
        } else if (
          typeof value === "string" &&
          value.toLowerCase().includes(search)
        ) {
          acc[key] = value;
        }

        return acc;
      },
      {} as Partial<Record<string, unknown>>,
    );
  };

  return deepFilter(
    data as Record<string, unknown>,
    search,
  ) as Partial<CredentialSubject>;
};

const RecursiveDataList: FC<{
  data: Record<string, unknown | string | number | Date>;
}> = ({ data }) => {
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
                  data={
                    value as Record<string, unknown | string | number | Date>
                  }
                />
              </GridItem>
            </Fragment>
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
            <GridItem pl={{ base: "2", lg: "0" }}>{value as string}</GridItem>
          </Fragment>
        );
      })}
    </Grid>
  );
};

const Details = ({ data }: { data: Array<Credential> | null }) => {
  const { id } = useParams();
  const [search, setSearch] = useState<string>("");
  let subject: Partial<CredentialSubject> | CredentialSubject | undefined =
    data?.find((item) => item.id === id)?.credentialSubject;

  if (subject == null) {
    return <Loader />;
  }
  if (search !== "" && subject != null) {
    subject = recursiveDeepFilter(subject, search);
  }

  return (
    <Grid>
      <GridItem p="4">
        <Stack>
          <Heading color="teal.600">{id}</Heading>
          <Card.Root>
            <Card.Header>Search</Card.Header>
            <Card.Body>
              <Input
                defaultValue={search != null ? search : ""}
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
              />
              <Box py="1">
                <Link asChild>
                  <NavLink to={`/`}>
                    <Button as={Text} colorPalette="teal" variant="outline">
                      Back to Overview
                    </Button>
                  </NavLink>
                </Link>
              </Box>
            </Card.Body>
          </Card.Root>

          <RecursiveDataList
            data={
              subject as unknown as Record<
                string,
                unknown | string | number | Date
              >
            }
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
