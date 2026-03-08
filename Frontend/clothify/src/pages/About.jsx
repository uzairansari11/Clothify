import {
  Box,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import React from "react";
import { FaAward, FaGem, FaHeart, FaStar } from "react-icons/fa";

const MotionBox = motion(Box);

const features = [
  { icon: FaAward, title: "Premium Quality", description: "Every garment is crafted with premium fabrics and attention to detail.", color: "violet" },
  { icon: FaGem, title: "Unique Style", description: "Meticulously curated collections that help you express your individuality.", color: "blue" },
  { icon: FaStar, title: "Award Winning", description: "Recognized in the fashion industry for excellence and innovation.", color: "yellow" },
  { icon: FaHeart, title: "Customer First", description: "We prioritize your satisfaction with hassle-free returns and support.", color: "red" },
];

const AboutPage = () => {
  const bgColor = useColorModeValue("gray.50", "gray.900");
  const cardBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const cardBorderColor = useColorModeValue("gray.100", "gray.700");

  return (
    <Box bg={bgColor} minH="100vh">
      {/* Hero */}
      <Box
        bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        color="white"
        py={{ base: 16, md: 24 }}
        px={4}
        textAlign="center"
      >
        <Container maxW="700px">
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Text fontSize="sm" fontWeight="600" textTransform="uppercase" letterSpacing="3px" mb={4} opacity={0.8}>
              Our Story
            </Text>
            <Heading fontSize={{ base: "3xl", md: "4xl" }} fontWeight="800" mb={4}>
              About Clothify
            </Heading>
            <Text fontSize="lg" opacity={0.9} lineHeight="1.8">
              Fashion redefined since 2020. We deliver stylish clothing for men, women,
              and kids that exude unparalleled quality and craftsmanship.
            </Text>
          </MotionBox>
        </Container>
      </Box>

      {/* Features */}
      <Container maxW="1000px" py={16}>
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={6}>
          {features.map((feature, idx) => (
            <GridItem key={feature.title}>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                bg={cardBg}
                p={6}
                borderRadius="xl"
                border="1px solid"
                borderColor={cardBorderColor}
                _hover={{ boxShadow: "lg", transform: "translateY(-2px)" }}
                transitionProperty="all"
                transitionDuration="0.3s"
              >
                <Flex align="center" gap={4}>
                  <Box bg={`${feature.color}.50`} p={3} borderRadius="lg">
                    <Icon as={feature.icon} boxSize={6} color={`${feature.color}.500`} />
                  </Box>
                  <Box>
                    <Heading size="sm" mb={1}>{feature.title}</Heading>
                    <Text fontSize="sm" color={textColor}>{feature.description}</Text>
                  </Box>
                </Flex>
              </MotionBox>
            </GridItem>
          ))}
        </Grid>

        <MotionBox
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          mt={12}
          textAlign="center"
        >
          <Text fontSize="md" color={textColor} lineHeight="2" maxW="700px" mx="auto">
            At Clothify, we believe in empowering individuals to express their unique style.
            Whether you're a fashion-forward woman, a modern gentleman, or a doting parent,
            we offer a diverse range of apparel that caters to your fashion needs. Each garment
            is thoughtfully designed to ensure you look and feel your best on every occasion.
          </Text>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default AboutPage;
