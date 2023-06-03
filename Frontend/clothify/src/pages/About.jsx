import React from "react";
import { Box, Text, Flex, VStack, Icon } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaAward, FaGem, FaStar } from "react-icons/fa";

const AboutPage = () => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const slideIn = {
    hidden: { y: -100 },
    visible: { y: 0 },
  };

  return (
    <Box>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 1 }}
      >
        <Text
          fontSize="3xl"
          textAlign="center"
          mb={4}
          fontFamily={"cursive"}
          fontWeight={"extrabold"}
        >
          About Us
        </Text>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={slideIn}
        transition={{ duration: 1 }}
      >
        <Box mb={8}>
          <Flex justifyContent="center">
            <VStack spacing={2}>
              <Icon as={FaAward} boxSize={8} color="pink.500" />
              <Icon as={FaGem} boxSize={8} color="blue.500" />
              <Icon as={FaStar} boxSize={8} color="yellow.500" />
            </VStack>
          </Flex>
        </Box>
      </motion.div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 1 }}
      >
        <Text fontSize="xl" textAlign="center" mb={8}>
          Welcome to Clothify, the epitome of fashion redefined! Established in
          2020, Clothify has been on a mission to deliver stylish clothing for
          men, women, and kids that exude unparalleled quality and
          craftsmanship. Our commitment to excellence has earned us recognition
          in the fashion industry, with prestigious awards such as the Fashion
          Excellence Award, Gem of Style Award, and Stellar Fashion Brand of the
          Year. At Clothify, we believe in empowering individuals to express
          their unique style through our meticulously curated collection of
          trendsetting outfits. Whether you're a fashion-forward woman, a modern
          gentleman, or a doting parent, Clothify offers a diverse range of
          apparel that caters to your fashion needs. Each garment is
          thoughtfully designed with premium fabrics and attention to detail,
          ensuring that you look and feel your best on every occasion. Immerse
          yourself in a world of fashion possibilities as you browse through our
          exclusive selection and discover the perfect ensemble to elevate your
          wardrobe. Let Clothify be your trusted fashion destination, where
          style, comfort, and elegance come together to redefine your fashion
          journey. Join us today and experience the transformative power of
          fashion with Clothify!
        </Text>
      </motion.div>
    </Box>
  );
};

export default AboutPage;
