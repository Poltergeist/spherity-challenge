import { FC } from "react";
import { GridItem, Stack, Heading, Table } from "@chakra-ui/react";
import { gridColumns, titleColor } from "@/components/Details";

const CellChemistry: FC<{ data: Record<string, unknown>; title: string }> = ({
  title,
  data,
}) => {
  const dataFlattend = Object.entries(
    data as Record<string, Record<string, string>[]>,
  ).flatMap(([key, value]) =>
    value.map((material: Record<string, string>) => ({
      type: key,
      ...material,
    })),
  );
  return (
    <GridItem gridColumn={gridColumns} py="4">
      <Stack>
        <Heading color={titleColor}>{title}</Heading>
        <Table.Root variant="outline">
          <Table.Header>
            <Table.Row>
              {Object.keys(dataFlattend[0]).map((value, index) => (
                <Table.Cell key={index}>{value}</Table.Cell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {dataFlattend.map((item, index) => (
              <Table.Row key={index}>
                {Object.values(item).map((value, index) => (
                  <Table.Cell key={index}>{value}</Table.Cell>
                ))}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Stack>
    </GridItem>
  );
};

export default CellChemistry;
