import { Box } from '@chakra-ui/react';
import "./App.css";
import Navbar from "./components/navbar/Navbar";

import Routing from "./routing/Routing";
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Box mt={24}>
        {" "}
        <Routing />
      </Box>
      <Footer />
    </div>
  );
}

export default App;
