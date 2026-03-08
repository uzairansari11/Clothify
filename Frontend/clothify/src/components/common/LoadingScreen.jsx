import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionText = motion(Text);

const LoadingScreen = ({ message = "Loading...", height = "80vh", size = "xl" }) => {
  const logoTextColor = useColorModeValue("gray.800", "white");
  const dotAccentColor = "accent.solid";
  const messageColor = useColorModeValue("gray.500", "gray.400");
  const bounceDotColor = "accent.solid";

  const logoFontSize =
    size === "sm" ? "2xl" : size === "md" ? "3xl" : size === "lg" ? "4xl" : "5xl";

  const bounceDotSize =
    size === "sm" ? "7px" : size === "md" ? "9px" : size === "lg" ? "10px" : "11px";

  const messageFontSize =
    size === "sm" ? "xs" : size === "md" ? "sm" : "sm";

  const pulseVariants = {
    animate: {
      opacity: [1, 0.6, 1],
      scale: [1, 0.97, 1],
      transition: {
        duration: 2.4,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const dotVariants = {
    animate: (i) => ({
      y: ["0%", "-55%", "0%"],
      transition: {
        duration: 0.7,
        repeat: Infinity,
        ease: "easeInOut",
        delay: i * 0.18,
      },
    }),
  };

  const messageVariants = {
    initial: { opacity: 0, y: 6 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut", delay: 0.2 },
    },
  };

  return (
    <Flex
      justify="center"
      align="center"
      height={height}
      direction="column"
      gap={6}
    >
      {/* Pulsing logo */}
      <MotionBox
        variants={pulseVariants}
        animate="animate"
        display="flex"
        alignItems="center"
        gap="3px"
      >
        <Text
          fontSize={logoFontSize}
          fontWeight="700"
          color={logoTextColor}
          letterSpacing="-1px"
          lineHeight="1"
          userSelect="none"
        >
          Clothify
        </Text>
        <Box
          w={size === "sm" ? "6px" : size === "md" ? "7px" : "9px"}
          h={size === "sm" ? "6px" : size === "md" ? "7px" : "9px"}
          borderRadius="full"
          bg={dotAccentColor}
          mb="2px"
          flexShrink={0}
        />
      </MotionBox>

      {/* Bouncing dots */}
      <Flex align="center" gap="10px">
        {[0, 1, 2].map((i) => (
          <MotionBox
            key={i}
            custom={i}
            variants={dotVariants}
            animate="animate"
            w={bounceDotSize}
            h={bounceDotSize}
            borderRadius="full"
            bg={bounceDotColor}
          />
        ))}
      </Flex>

      {/* Message */}
      <MotionText
        variants={messageVariants}
        initial="initial"
        animate="animate"
        color={messageColor}
        fontSize={messageFontSize}
        fontWeight="400"
        letterSpacing="0.08em"
        textTransform="uppercase"
        userSelect="none"
      >
        {message}
      </MotionText>
    </Flex>
  );
};

export default LoadingScreen;
