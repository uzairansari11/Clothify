import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import {
  FiHeadphones,
  FiRefreshCw,
  FiShield,
  FiTruck,
} from "react-icons/fi";
import Carousel from "../components/user/carousel/Carousel";
import { handleProductData } from "../redux/User_Redux/products/action";
import LoadingSpinner from "../components/user/spinner/Spinner";

const MotionBox = motion(Box);

/* ─────────────────────────────────────────────
   Section-level entrance animation config
───────────────────────────────────────────── */
const sectionVariants = {
  hidden: { opacity: 0, y: 52 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.72, delay: delay * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ─────────────────────────────────────────────
   Trust-badge data
───────────────────────────────────────────── */
const TRUST_BADGES = [
  { icon: FiTruck,       label: "Free Shipping",    sub: "On orders over ₹999"   },
  { icon: FiRefreshCw,  label: "Easy Returns",     sub: "30-day return policy"  },
  { icon: FiShield,     label: "Secure Checkout",  sub: "256-bit SSL encrypted" },
  { icon: FiHeadphones, label: "24/7 Support",     sub: "Always here for you"   },
];

/* ─────────────────────────────────────────────
   Product-section definitions
───────────────────────────────────────────── */
const SECTIONS = [
  {
    title:       "New Arrivals",
    category:    "New Arrival",
    description: "Fresh picks, just dropped. Be the first to own the latest styles from our newest curated edit.",
  },
  {
    title:       "Men's Collection",
    category:    "Men",
    description: "Sharp cuts, premium fabrics, and looks built for the modern man — dressed for every occasion.",
  },
  {
    title:       "Women's Collection",
    category:    "Women",
    description: "Effortless elegance for every mood, every moment. Discover styles that move with you.",
  },
  {
    title:       "Kids' Collection",
    category:    "Kids",
    description: "Colorful, comfortable, and made to keep up with endless adventures. Fun fashion for little ones.",
  },
];

/* ════════════════════════════════════════════
   Homepage component
════════════════════════════════════════════ */
const Homepage = () => {
  /* ── Redux / router ─────────────────────── */
  const { products, isLoading } = useSelector((store) => store.productReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* ── Color tokens — ALL at top level ────── */
  const pageBg              = useColorModeValue("white",      "gray.900");
  const trustStripBg        = useColorModeValue("gray.50",    "gray.800");
  const trustStripBorder    = useColorModeValue("gray.100",   "gray.700");
  const trustIconCircleBg   = "accent.bg";
  const trustIconColor      = "accent.text";
  const trustLabelColor     = useColorModeValue("gray.800",   "white");
  const trustSubColor       = useColorModeValue("gray.500",   "gray.400");
  const sectionLabelColor   = "accent.solid";
  const sectionHeadingColor = useColorModeValue("gray.900",   "white");
  const sectionTextColor    = useColorModeValue("gray.500",   "gray.400");
  const dividerColor        = useColorModeValue("gray.100",   "gray.800");
  const heroFadeGradient    = useColorModeValue(
    "linear(to-b, transparent, white)",
    "linear(to-b, transparent, gray.900)"
  );
  const exploreBtnHoverBg   = useColorModeValue("accent.bg",  "whiteAlpha.100");

  // Hero section color-mode tokens
  const heroBg              = useColorModeValue("white",       "gray.900");
  const heroColor           = useColorModeValue("gray.900",    "white");
  const heroOrb1            = "card.hoverBorder";
  const heroOrb1Opacity     = useColorModeValue(0.35, 0.2);
  const heroOrb2            = useColorModeValue("blue.200",    "blue.600");
  const heroOrb2Opacity     = useColorModeValue(0.25, 0.14);
  const heroOrb3            = useColorModeValue("accent.bg",   "accent.solid");
  const heroOrb3Opacity     = useColorModeValue(0.3, 0.1);
  const heroPillColor       = "accent.text";
  const heroPillBorder      = "accent.subtle";
  const heroPillBg          = useColorModeValue("accent.bg",   "whiteAlpha.50");
  const heroHeadingGradient = useColorModeValue(
    "linear(to-br, gray.900 30%, accent.solid 70%, blue.500)",
    "linear(to-br, white 30%, accent.bg 70%, blue.300)"
  );
  const heroSubColor        = useColorModeValue("gray.500",    "whiteAlpha.650");
  const heroCta1Bg          = useColorModeValue("gray.900",    "white");
  const heroCta1Color       = useColorModeValue("white",       "gray.900");
  const heroCta1HoverBg     = useColorModeValue("gray.800",    "gray.100");
  const heroCta2Color       = useColorModeValue("gray.700",    "white");
  const heroCta2Border      = useColorModeValue("gray.300",    "whiteAlpha.350");
  const heroCta2HoverBg     = useColorModeValue("gray.50",     "whiteAlpha.150");
  const heroCta2HoverBorder = useColorModeValue("gray.400",    "whiteAlpha.600");

  /* ── Side-effects ───────────────────────── */
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(handleProductData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Navigation helper ──────────────────── */
  const handleExplore = (category) => {
    if (category !== "New Arrival") {
      navigate(`/${category.toLowerCase()}`);
    }
  };

  /* ── Product filter helper ──────────────── */
  const filterProducts = (category) =>
    products?.filter((ele, i) =>
      category === "New Arrival" ? i % 2 === 0 : ele.category === category
    ) || [];

  /* ══════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════ */
  return (
    <Box bg={pageBg} minH="100vh" overflowX="hidden">

      {/* ══════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════ */}
      <Box
        position="relative"
        overflow="hidden"
        bg={heroBg}
        color={heroColor}
        mt={{ base: "-48px", md: "-80px" }}
        pt={{ base: "90px", md: "120px" }}
        pb={{ base: "70px", md: "90px" }}
        px={4}
        textAlign="center"
      >
        {/* ── Background gradient orbs ─────── */}
        <Box
          position="absolute"
          top="-15%"
          left="-8%"
          width={{ base: "340px", md: "560px" }}
          height={{ base: "340px", md: "560px" }}
          borderRadius="full"
          bg={heroOrb1}
          opacity={heroOrb1Opacity}
          filter="blur(90px)"
          pointerEvents="none"
          aria-hidden="true"
        />
        <Box
          position="absolute"
          top="30%"
          right="-12%"
          width={{ base: "280px", md: "480px" }}
          height={{ base: "280px", md: "480px" }}
          borderRadius="full"
          bg={heroOrb2}
          opacity={heroOrb2Opacity}
          filter="blur(90px)"
          pointerEvents="none"
          aria-hidden="true"
        />
        <Box
          position="absolute"
          bottom="-10%"
          left="38%"
          width={{ base: "200px", md: "340px" }}
          height={{ base: "200px", md: "340px" }}
          borderRadius="full"
          bg={heroOrb3}
          opacity={heroOrb3Opacity}
          filter="blur(70px)"
          pointerEvents="none"
          aria-hidden="true"
        />

        {/* ── Hero content ─────────────────── */}
        <MotionBox
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          position="relative"
          zIndex={1}
          maxW="760px"
          mx="auto"
        >
          {/* Season pill badge */}
          <MotionBox
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            display="inline-block"
            mb={6}
          >
            <Text
              display="inline-block"
              fontSize="10px"
              fontWeight="700"
              textTransform="uppercase"
              letterSpacing="5px"
              color={heroPillColor}
              px={5}
              py={1.5}
              borderRadius="full"
              border="1px solid"
              borderColor={heroPillBorder}
              bg={heroPillBg}
              backdropFilter="blur(8px)"
            >
              New Season 2026
            </Text>
          </MotionBox>

          {/* Main headline */}
          <Heading
            as="h1"
            fontSize={{ base: "5xl", sm: "6xl", md: "7xl", lg: "8xl" }}
            fontWeight="900"
            mb={6}
            lineHeight="1.02"
            letterSpacing="-3px"
            bgGradient={heroHeadingGradient}
            bgClip="text"
          >
            Fashion That
            <br />
            Defines You
          </Heading>

          {/* Decorative rule under heading */}
          <Flex justify="center" mb={7}>
            <Box
              width="56px"
              height="3px"
              borderRadius="full"
              bgGradient="linear(to-r, accent.solid, blue.400)"
              opacity={0.8}
            />
          </Flex>

          {/* Sub-headline */}
          <Text
            fontSize={{ base: "md", md: "lg", lg: "xl" }}
            maxW="520px"
            mx="auto"
            color={heroSubColor}
            mb={10}
            lineHeight="1.8"
            fontWeight="400"
            letterSpacing="0.1px"
          >
            Discover curated collections crafted for every occasion.
            Style, comfort, and elegance — all in one place.
          </Text>

          {/* CTA buttons */}
          <Flex
            justify="center"
            gap={{ base: 3, md: 4 }}
            flexWrap="wrap"
          >
            <Button
              size="lg"
              bg={heroCta1Bg}
              color={heroCta1Color}
              fontWeight="700"
              fontSize="sm"
              letterSpacing="0.5px"
              textTransform="uppercase"
              borderRadius="full"
              px={{ base: 8, md: 10 }}
              h="52px"
              _hover={{
                bg: heroCta1HoverBg,
                transform: "translateY(-3px)",
                boxShadow: "0 12px 28px rgba(0,0,0,0.15)",
              }}
              _active={{ transform: "translateY(-1px)" }}
              transition="all 0.28s cubic-bezier(0.22,1,0.36,1)"
              onClick={() => navigate("/men")}
            >
              Shop Men
            </Button>
            <Button
              size="lg"
              variant="outline"
              color={heroCta2Color}
              borderColor={heroCta2Border}
              fontWeight="700"
              fontSize="sm"
              letterSpacing="0.5px"
              textTransform="uppercase"
              borderRadius="full"
              borderWidth="1.5px"
              px={{ base: 8, md: 10 }}
              h="52px"
              _hover={{
                bg: heroCta2HoverBg,
                borderColor: heroCta2HoverBorder,
                transform: "translateY(-3px)",
              }}
              _active={{ transform: "translateY(-1px)" }}
              transition="all 0.28s cubic-bezier(0.22,1,0.36,1)"
              onClick={() => navigate("/women")}
            >
              Shop Women
            </Button>
          </Flex>
        </MotionBox>

        {/* Bottom fade-out into page bg */}
        <Box
          position="absolute"
          bottom={0}
          left={0}
          right={0}
          height="100px"
          bgGradient={heroFadeGradient}
          pointerEvents="none"
          aria-hidden="true"
        />
      </Box>

      {/* ══════════════════════════════════════
          TRUST BADGES STRIP
      ══════════════════════════════════════ */}
      <Box
        bg={trustStripBg}
        borderTop="1px solid"
        borderBottom="1px solid"
        borderColor={trustStripBorder}
      >
        <Flex
          as="ul"
          listStyleType="none"
          maxW="1100px"
          mx="auto"
          px={{ base: 4, md: 8 }}
          py={{ base: 6, md: 7 }}
          justify={{ base: "center", md: "space-between" }}
          align="center"
          gap={{ base: 8, md: 4 }}
          flexWrap="wrap"
        >
          {TRUST_BADGES.map(({ icon, label, sub }) => (
            <Flex
              as="li"
              key={label}
              align="center"
              gap={3.5}
              flex={{ base: "0 0 calc(50% - 2rem)", md: "1" }}
              justify={{ base: "flex-start", md: "center" }}
            >
              {/* Icon circle */}
              <Flex
                align="center"
                justify="center"
                bg={trustIconCircleBg}
                borderRadius="full"
                w="42px"
                h="42px"
                flexShrink={0}
              >
                <Icon as={icon} color={trustIconColor} boxSize="18px" />
              </Flex>

              {/* Text */}
              <Box>
                <Text
                  fontSize="13px"
                  fontWeight="700"
                  color={trustLabelColor}
                  letterSpacing="0.1px"
                  lineHeight="1.3"
                >
                  {label}
                </Text>
                <Text
                  fontSize="11px"
                  color={trustSubColor}
                  mt={0.5}
                  lineHeight="1.4"
                >
                  {sub}
                </Text>
              </Box>
            </Flex>
          ))}
        </Flex>
      </Box>

      {/* ══════════════════════════════════════
          PRODUCT SECTIONS
      ══════════════════════════════════════ */}
      <Box
        maxW="1300px"
        mx="auto"
        px={{ base: 4, md: 6, lg: 8 }}
        py={{ base: 16, md: 24 }}
      >
        {SECTIONS.map(({ title, category, description }, index) => (
          <MotionBox
            key={category}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={sectionVariants}
            mb={{ base: 20, md: 28 }}
          >
            {/* Divider for all sections except the first */}
            {index > 0 && (
              <Box
                h="1px"
                bg={dividerColor}
                mb={{ base: 20, md: 28 }}
                mx="auto"
                maxW="200px"
                borderRadius="full"
              />
            )}

            {/* Section header */}
            <Flex direction="column" align="center" mb={10}>
              {/* Collection label */}
              <Text
                fontSize="10px"
                fontWeight="800"
                textTransform="uppercase"
                letterSpacing="5px"
                color={sectionLabelColor}
                mb={3.5}
              >
                Collection
              </Text>

              {/* Section title */}
              <Heading
                as="h2"
                fontSize={{ base: "2xl", sm: "3xl", md: "4xl", lg: "4xl" }}
                fontWeight="800"
                color={sectionHeadingColor}
                mb={4}
                textAlign="center"
                letterSpacing="-0.8px"
                lineHeight="1.12"
              >
                {title}
              </Heading>

              {/* Accent rule */}
              <Box
                width="36px"
                height="3px"
                borderRadius="full"
                bgGradient="linear(to-r, accent.solid, accent.text)"
                mb={5}
              />

              {/* Description */}
              <Text
                color={sectionTextColor}
                fontSize={{ base: "sm", md: "md" }}
                textAlign="center"
                maxW="500px"
                lineHeight="1.8"
                fontWeight="400"
              >
                {description}
              </Text>
            </Flex>

            {/* Carousel or loading state */}
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                <Box w={{ base: "100%", md: "94%" }} mx="auto">
                  <Carousel products={filterProducts(category)} />
                </Box>

                {/* Explore button — hidden for New Arrival */}
                {category !== "New Arrival" && (
                  <Flex justify="center" mt={10}>
                    <Button
                      size="md"
                      variant="outline"
                      onClick={() => handleExplore(category)}
                      borderRadius="full"
                      px={9}
                      h="44px"
                      fontWeight="600"
                      fontSize="13px"
                      letterSpacing="0.6px"
                      textTransform="uppercase"
                      borderWidth="1.5px"
                      _hover={{
                        bg: exploreBtnHoverBg,
                        borderColor: "accent.solid",
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 20px rgba(128,90,213,0.2)",
                      }}
                      _active={{ transform: "translateY(0)" }}
                      transition="all 0.25s cubic-bezier(0.22,1,0.36,1)"
                    >
                      Explore {category}
                    </Button>
                  </Flex>
                )}
              </>
            )}
          </MotionBox>
        ))}
      </Box>

      {/* ══════════════════════════════════════
          BOTTOM CTA BANNER
      ══════════════════════════════════════ */}
      <MotionBox
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        mx={{ base: 4, md: 8, lg: 12 }}
        mb={{ base: 12, md: 20 }}
        borderRadius="2xl"
        overflow="hidden"
        position="relative"
      >
        {/* Dark accent gradient background */}
        <Box
          bg="gray.900"
          px={{ base: 8, md: 16 }}
          py={{ base: 14, md: 20 }}
          textAlign="center"
          position="relative"
          overflow="hidden"
        >
          {/* Decorative orbs inside banner */}
          <Box
            position="absolute"
            top="-30%"
            left="-5%"
            width="300px"
            height="300px"
            borderRadius="full"
            bg="accent.solid"
            opacity={0.15}
            filter="blur(60px)"
            pointerEvents="none"
            aria-hidden="true"
          />
          <Box
            position="absolute"
            bottom="-30%"
            right="-5%"
            width="280px"
            height="280px"
            borderRadius="full"
            bg="blue.400"
            opacity={0.12}
            filter="blur(60px)"
            pointerEvents="none"
            aria-hidden="true"
          />

          {/* Content */}
          <Box position="relative" zIndex={1}>
            {/* Eyebrow label */}
            <Text
              fontSize="10px"
              fontWeight="800"
              textTransform="uppercase"
              letterSpacing="5px"
              color="accent.text"
              mb={4}
            >
              Exclusive Membership
            </Text>

            {/* Heading */}
            <Heading
              as="h2"
              fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
              fontWeight="900"
              color="white"
              mb={5}
              lineHeight="1.05"
              letterSpacing="-1.5px"
              bgGradient="linear(to-br, white 40%, accent.bg)"
              bgClip="text"
            >
              Join the Clothify Family
            </Heading>

            {/* Decorative rule */}
            <Flex justify="center" mb={6}>
              <Box
                width="48px"
                height="3px"
                borderRadius="full"
                bgGradient="linear(to-r, accent.solid, blue.300)"
                opacity={0.9}
              />
            </Flex>

            {/* Subtitle */}
            <Text
              color="whiteAlpha.700"
              fontSize={{ base: "md", md: "lg" }}
              maxW="480px"
              mx="auto"
              mb={10}
              lineHeight="1.75"
              fontWeight="400"
            >
              Get exclusive access to new arrivals, members-only deals,
              and early access to seasonal sales.
            </Text>

            {/* Visual accent row — styled stat pills instead of a form */}
            <Flex
              justify="center"
              gap={{ base: 3, md: 6 }}
              flexWrap="wrap"
              mb={10}
            >
              {[
                { stat: "50K+", label: "Happy Customers" },
                { stat: "200+", label: "New Styles Monthly" },
                { stat: "4.9★", label: "Average Rating" },
              ].map(({ stat, label }) => (
                <Flex
                  key={stat}
                  direction="column"
                  align="center"
                  bg="whiteAlpha.100"
                  backdropFilter="blur(8px)"
                  border="1px solid"
                  borderColor="whiteAlpha.200"
                  borderRadius="xl"
                  px={6}
                  py={4}
                  minW="110px"
                >
                  <Text
                    fontSize="xl"
                    fontWeight="800"
                    color="white"
                    lineHeight="1.1"
                  >
                    {stat}
                  </Text>
                  <Text
                    fontSize="11px"
                    color="whiteAlpha.600"
                    mt={1}
                    letterSpacing="0.3px"
                  >
                    {label}
                  </Text>
                </Flex>
              ))}
            </Flex>

            {/* Shop Now CTA */}
            <Button
              size="lg"
              bg="white"
              color="gray.900"
              fontWeight="800"
              fontSize="sm"
              letterSpacing="0.6px"
              textTransform="uppercase"
              borderRadius="full"
              px={12}
              h="54px"
              _hover={{
                bg: "accent.bg",
                transform: "translateY(-3px)",
                boxShadow: "0 14px 32px rgba(0,0,0,0.4)",
              }}
              _active={{ transform: "translateY(-1px)" }}
              transition="all 0.28s cubic-bezier(0.22,1,0.36,1)"
              onClick={() => navigate("/men")}
            >
              Shop Now
            </Button>
          </Box>
        </Box>
      </MotionBox>

    </Box>
  );
};

export default Homepage;
