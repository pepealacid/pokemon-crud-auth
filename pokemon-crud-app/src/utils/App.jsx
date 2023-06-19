import { Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import PokemonDetailsPage from "../pages/PokemonDetailsPage";
import ProfilePage from "../pages/ProfilePage";
import ErrorPage from "../pages/ErrorPage";
import { Box } from "@chakra-ui/react";
import Meadow from "../pages/Meadow/Meadow";

function App() {
  return (
    <Box pt="32px">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/pokemons/:id" element={<PokemonDetailsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/meadow" element={<Meadow />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Box>
  );
}

export default App;