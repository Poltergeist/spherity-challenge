import { ReactNode, FC } from "react";
import { Box } from "@chakra-ui/react";
export type SidebarProps = {
  children?: ReactNode;
};
export const Sidebar: FC<SidebarProps> = ({ children }) => {
  return (
    <Box minH="100vh" bg="gray.100" _dark={{ bg: "gray.900" }} p="1">
      {children}
    </Box>
  );
};

export default Sidebar;
