import { Box, Flex, Heading, Spacer, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const Navbar = () => {
const { logout } = useContext(AuthContext)

  return (
    <Box bg="blue.500" px={4} py={2} color="white">
      <Flex alignItems="center">
        <Heading as="h1" size="md" letterSpacing="tight">
          Pokemon!!
        </Heading>
        <Spacer />
        <Link to={"/meadow"}>Captura pokemons</Link>
        <Link to={"/profile"}>Ver tus pokemon</Link>
        <Button colorScheme="blue" ml={4} onClick={logout}>
          Logout
        </Button>
      </Flex>
    </Box>
  );
};

export default Navbar;
