import { Box, Icon, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { AiOutlineMan, AiOutlineWoman } from "react-icons/ai";
import { MdOutlineChildCare } from "react-icons/md";
import { NavLink } from "react-router-dom";

const ProductOptions = () => {
  const options = [
    { id: 1, title: "MEN", route: "/men", icon: AiOutlineMan },
    { id: 2, title: "WOMEN", route: "/women", icon: AiOutlineWoman },
    { id: 3, title: "KID", route: "/kids", icon: MdOutlineChildCare },
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
      fontFamily="arial, cursive"
      fontSize="xl"
      fontWeight="bold"
    >
      {options.map((element, index) => {
        return (
          <NavLink to={element.route} key={element.id}>
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
          </NavLink>
        );
      })}
    </Box>
  );
};

export default ProductOptions;
