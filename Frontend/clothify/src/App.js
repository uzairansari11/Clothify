import "./App.css";
import { Box } from "@chakra-ui/react";
import Navbar from "./components/navbar/Navbar";
import Routing from "./routing/Routing";
import Footer from "./components/footer/Footer";
import { useLocation, } from "react-router-dom";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Navbar />
      <Box mt={{ base: 12, md: 20 }}>
        {" "}
        <Routing />
      </Box>
      {location.pathname === "/cart" || location.pathname === "/wishlist" ? "" : <Footer />}
    </div>
  );
}

export default App;
