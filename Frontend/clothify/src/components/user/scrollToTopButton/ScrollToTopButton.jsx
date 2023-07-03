import { Box, IconButton } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BsFillRocketFill } from "react-icons/bs";

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Box
      position="fixed"
      bottom={6}
      right={6}
      opacity={showButton ? 1 : 0}
      transition="opacity 0.3s"
    >
      <IconButton
        aria-label="Scroll to Top"
              icon={<BsFillRocketFill color="white" />}
        size="lg"
        borderRadius="full"
        onClick={handleScrollToTop}
              bg={"black"}
              _hover={{bg:"black"}}
      />
    </Box>
  );
};

export default ScrollToTopButton;
