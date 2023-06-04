import { Box, Text, Icon } from "@chakra-ui/react";
import React from "react";
import { motion } from "framer-motion";
import { AiOutlineMan, AiOutlineWoman } from "react-icons/ai";
import { MdOutlineChildCare } from "react-icons/md";
import { Link as ReactLink } from "react-router-dom";

const ProductOptions = () => {
  const options = [
    { id: 1, title: "MEN", route: "/products/Men", icon: AiOutlineMan },
    { id: 2, title: "WOMEN", route: "/products/Women", icon: AiOutlineWoman },
    { id: 3, title: "KID", route: "/products/Kids", icon: MdOutlineChildCare },
  ];
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
      {options.map((element, index) => {
        return (
          <ReactLink to={element.route} key={element.id}>
            <motion.div whileHover="hover">
              <motion.div
                initial="initial"
                animate="animate"
                variants={variants}
                transition={{ duration: 0.3 }}
              >
                <Box display="flex" alignItems="center">
                  <Icon as={element.icon} boxSize={5} mr={1} color={"teal"} />
                  <Text
                    cursor="pointer"
                    _hover={{ textDecoration: "underline" }}
                    color="gray.700"
                  >
                    {element.title}
                  </Text>
                </Box>
              </motion.div>
            </motion.div>
          </ReactLink>
        );
      })}
    </Box>
  );
};

export default ProductOptions;
