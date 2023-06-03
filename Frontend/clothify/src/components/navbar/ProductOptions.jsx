import { Box, Text, Icon } from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";
import { AiOutlineMan, AiOutlineWoman } from "react-icons/ai";
import { MdOutlineChildCare } from "react-icons/md";

const ProductOptions = () => {
  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    hover: { scale: 1.1 },
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      width="100%"
      fontFamily="cursive"
      fontSize="xl"
      fontWeight="extrabold"
    >
      <motion.div whileHover="hover">
        <motion.div
          initial="initial"
          animate="animate"
          variants={variants}
          transition={{ duration: 0.3 }}
        >
          <Box display="flex" alignItems="center">
            <Icon as={AiOutlineMan} boxSize={5} mr={1} color={"teal"} />
            <Text
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
              color="gray.700"
            >
              MEN
            </Text>
          </Box>
        </motion.div>
      </motion.div>

      <motion.div whileHover="hover">
        <motion.div
          initial="initial"
          animate="animate"
          variants={variants}
          transition={{ duration: 0.3 }}
        >
          <Box display="flex" alignItems="center">
            <Icon as={AiOutlineWoman} boxSize={5} mr={1} color={"teal"} />
            <Text
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
              color="gray.700"
            >
              WOMEN
            </Text>
          </Box>
        </motion.div>
      </motion.div>

      <motion.div whileHover="hover">
        <motion.div
          initial="initial"
          animate="animate"
          variants={variants}
          transition={{ duration: 0.3 }}
        >
          <Box display="flex" alignItems="center">
            <Icon as={MdOutlineChildCare} boxSize={5} mr={1} color={"teal"} />
            <Text
              cursor="pointer"
              _hover={{ textDecoration: "underline" }}
              color="gray.700"
            >
              KIDS
            </Text>
          </Box>
        </motion.div>
      </motion.div>
    </Box>
  );
};

export default ProductOptions;
