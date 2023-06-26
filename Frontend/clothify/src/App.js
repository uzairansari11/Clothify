import "./App.css";
import { Box } from "@chakra-ui/react";
import Navbar from "./components/user/navbar/Navbar";
import Routing from "./routing/Routing";
import Footer from "./components/user/footer/Footer";
import { useLocation } from "react-router-dom";
import ScrollToTopButton from "./components/user/scrollToTopButton/ScrollToTopButton";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname.startsWith("/admin") &&
      location.pathname !== "/admin/signup" &&
      location.pathname !== "/admin/login" ? (
        <></>
      ) : (
        <Navbar />
      )}

      <Box mt={{ base: 12, md: 20 }}>
        <Routing />
        {location.pathname === "/cart" ||
        location.pathname === "/wishlist" ||
        location.pathname === "/orderhistory" ||
        location.pathname.startsWith("/admin") ? (
          ""
        ) : (
          <Footer />
        )}
        <ScrollToTopButton />
      </Box>
    </div>
  );
}

export default App;
