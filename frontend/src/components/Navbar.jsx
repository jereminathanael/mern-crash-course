import { Button, Container, Flex, HStack, Text, Icon } from "@chakra-ui/react";
import { useColorMode, ColorModeIcon } from "@/components/ui/color-mode";
import { Link } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text fontSize={{ base: "22px", sm: "28px" }} fontWeight={"bold"} textTransform={"uppercase"} textAlign={"center"} bgGradient={"to-r"} gradientFrom={"cyan.400"} gradientTo={"blue.500"} bgClip={"text"}>
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>

        <HStack spaceX={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button variant={"subtle"}>
              <Icon size={"xl"}>
                <CiSquarePlus />
              </Icon>
            </Button>
          </Link>
          <Button variant={"subtle"} onClick={toggleColorMode}>
            {ColorModeIcon()}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
