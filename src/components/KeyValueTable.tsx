import { Box, Container, Table } from "@chakra-ui/react";
import { ClipboardIconButton, ClipboardRoot } from "@/components/ui/clipboard";

import { Credential, Proof, CredentialSubject } from "../types";
const KeyValueTable = ({
  item,
}: {
  item:
    | Omit<Credential, "proof" | "credentialSubject">
    | Proof
    | CredentialSubject;
}) => {
  return (
    <Table.Root variant="outline">
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Key</Table.ColumnHeader>
          <Table.ColumnHeader>Value</Table.ColumnHeader>
          <Table.ColumnHeader display={{ base: "none", md: "table-cell" }}>
            Copy
          </Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {Object.entries(item).map(([key, value]) => (
          <Table.Row key={key}>
            <Table.Cell>{key}</Table.Cell>
            <Table.Cell>
              <Container
                m="0"
                p="0"
                maxW={{
                  base: "50vw",
                  sm: "60vw",
                  md: "56ch",
                  lg: "86ch",
                  xl: "116ch",
                  "2xl": "100%",
                }}
              >
                {Array.isArray(value) ? value.join(", ") : value}
              </Container>
            </Table.Cell>
            <Table.Cell display={{ base: "none", md: "table-cell" }}>
              <Box textAlign="end">
                <ClipboardRoot value={value}>
                  <ClipboardIconButton />
                </ClipboardRoot>
              </Box>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};

export default KeyValueTable;
