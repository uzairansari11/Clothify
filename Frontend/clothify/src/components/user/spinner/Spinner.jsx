import { Box, Spinner as ChakraSpinner } from "@chakra-ui/react";

const LoadingSpinner = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Box position="relative" width="200px" height="200px">
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          borderRadius="50%"
          animation="spin 2s linear infinite"
        >
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            width="30%"
            height="30%"
            borderRadius="50%"
            border="4px dotted teal"
          />
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            width="40%"
            height="40%"
            borderRadius="50%"
            border="4px dotted teal"
          />
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            width="50%"
            height="50%"
            borderRadius="50%"
            border="4px dotted teal"
          />
        </Box>
        <style jsx global>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </Box>
    </Box>
  );
};

export default LoadingSpinner;