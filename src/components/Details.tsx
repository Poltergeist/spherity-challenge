import { Fragment, FC } from "react";
import {
  Box,
  Grid,
  GridItem,
  Link,
  Button,
  Stack,
  Text,
  Heading,
} from "@chakra-ui/react";
import { Credential } from "../types";
import { NavLink, useParams } from "react-router";
import Loader from "@/components/Loader";
const gridSize = { base: "1fr", lg: "27ch auto" };
const gridColumns = { base: "1", lg: "1 / span 2" };

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
                      color="teal.200"
                      mb={{ base: "2", lg: "0" }}
                    >
                      {key}
                    </Text>
                  </GridItem>
                  <GridItem>
                    {value.map((item) => (
                      <RecursiveDataList
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
                  color="teal.200"
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
                color="teal.200"
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
  const subject = data?.find((item) => item.id === id)?.credentialSubject;

  if (subject == null) {
    return <Loader />;
  }
  return (
    <Grid>
      <GridItem p="4">
        <Stack>
          <Heading color="teal.600">{id}</Heading>
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
