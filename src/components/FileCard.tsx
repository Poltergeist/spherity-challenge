import { FC } from "react";
import { GridItem, Link, Stack, Text, Heading, Card } from "@chakra-ui/react";
import { gridColumns, titleColor, DataProp } from "@/components/Details";

const FileCard: FC<{ data: DataProp; title: string }> = ({ data, title }) => {
  return (
    <GridItem gridColumn={gridColumns} py="4">
      <Stack>
        <Heading color={titleColor}>{title}</Heading>
        {Array.isArray(data)
          ? data.map((item, index) => (
              <Card.Root key={index}>
                <Card.Body>
                  <Text>
                    <Link as="a" href={item.fileUrl} color="teal">
                      {item.fileName}
                    </Link>
                    (Size: {item.fileSize}) - uploaded at {item.uploadDate}
                  </Text>
                </Card.Body>
              </Card.Root>
            ))
          : null}
      </Stack>
    </GridItem>
  );
};
export default FileCard;
