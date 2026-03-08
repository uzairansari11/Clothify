import {
  Badge,
  Box,
  Button,
  Circle,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Icon,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  Text,
  Textarea,
  VStack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import {
  FiArrowRight,
  FiCheck,
  FiChevronLeft,
  FiCreditCard,
  FiLock,
  FiMapPin,
  FiMail,
  FiShield,
  FiShoppingBag,
  FiTruck,
  FiUser,
  FiGift,
  FiStar,
} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import LoadingScreen from '../components/common/LoadingScreen';
import { handleDeleteAllToCartData } from '../redux/User_Redux/cart/action';
import { handleAddToOrderData } from '../redux/User_Redux/order/action';

const MotionBox = motion(Box);
const MotionVStack = motion(VStack);

// ─── Step Indicator ──────────────────────────────────────────────────────────

function StepIndicator({ currentStep }) {
  const activeBg = "accent.text";
  const doneBg = "accent.solid";
  const inactiveBg = useColorModeValue('gray.200', 'gray.600');
  const activeText = 'white';
  const inactiveText = useColorModeValue('gray.500', 'gray.400');
  const labelActive = "accent.text";
  const labelInactive = useColorModeValue('gray.500', 'gray.400');
  const connectorActive = "accent.solid";
  const connectorInactive = useColorModeValue('gray.200', 'gray.600');
  const stepShadow = useColorModeValue('0 0 0 4px rgba(128,90,213,0.15)', '0 0 0 4px rgba(183,148,244,0.15)');
  const wrapperBg = useColorModeValue('white', 'gray.800');
  const wrapperBorder = useColorModeValue('gray.100', 'gray.700');

  const steps = [
    { number: 1, label: 'Shipping Info', icon: FiTruck },
    { number: 2, label: 'Payment', icon: FiCreditCard },
  ];

  return (
    <Box
      bg={wrapperBg}
      borderWidth="1px"
      borderColor={wrapperBorder}
      borderRadius="2xl"
      py={5}
      px={8}
      mb={8}
      boxShadow="sm"
    >
      <HStack spacing={0} justify="center">
        {steps.map((step, idx) => {
          const isDone = currentStep > step.number;
          const isActive = currentStep === step.number;
          return (
            <React.Fragment key={step.number}>
              <VStack spacing={2} position="relative">
                <Circle
                  size="46px"
                  bg={isDone ? doneBg : isActive ? activeBg : inactiveBg}
                  color={isActive || isDone ? activeText : inactiveText}
                  fontWeight="bold"
                  fontSize="sm"
                  transition="all 0.35s ease"
                  boxShadow={isActive ? stepShadow : 'none'}
                >
                  {isDone ? (
                    <Icon as={FiCheck} boxSize={4} strokeWidth={3} />
                  ) : (
                    <Icon as={step.icon} boxSize={4} />
                  )}
                </Circle>
                <Text
                  fontSize="xs"
                  fontWeight={isActive ? '700' : '500'}
                  color={isActive ? labelActive : labelInactive}
                  whiteSpace="nowrap"
                  letterSpacing="0.01em"
                >
                  {step.label}
                </Text>
              </VStack>
              {idx < steps.length - 1 && (
                <Box
                  h="2px"
                  w={{ base: '80px', md: '120px' }}
                  borderRadius="full"
                  bg={currentStep > 1 ? connectorActive : connectorInactive}
                  mx={3}
                  mb={5}
                  transition="background 0.45s ease"
                  position="relative"
                  overflow="hidden"
                >
                  {currentStep > 1 && (
                    <MotionBox
                      position="absolute"
                      top={0}
                      left={0}
                      h="100%"
                      bg="white"
                      opacity={0.3}
                      initial={{ x: '-100%' }}
                      animate={{ x: '200%' }}
                      transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                      w="40%"
                    />
                  )}
                </Box>
              )}
            </React.Fragment>
          );
        })}
      </HStack>
    </Box>
  );
}

// ─── Order Item Row ───────────────────────────────────────────────────────────

function OrderItemRow({ item }) {
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const subtextColor = useColorModeValue('gray.500', 'gray.400');
  const priceColor = "accent.text";
  const imageFallbackBg = useColorModeValue('gray.100', 'gray.700');
  const brandColor = useColorModeValue('gray.800', 'gray.100');

  return (
    <HStack
      spacing={3}
      py={3}
      borderBottomWidth="1px"
      borderColor={borderColor}
      align="center"
      _last={{ borderBottomWidth: 0 }}
    >
      <Box
        w="54px"
        h="54px"
        borderRadius="xl"
        overflow="hidden"
        flexShrink={0}
        bg={imageFallbackBg}
        boxShadow="sm"
      >
        {item.images?.[0] ? (
          <Image
            src={item.images[0]}
            alt={item.brand}
            w="100%"
            h="100%"
            objectFit="cover"
          />
        ) : (
          <Flex w="100%" h="100%" align="center" justify="center">
            <Icon as={FiShoppingBag} color="gray.400" boxSize={5} />
          </Flex>
        )}
      </Box>
      <VStack align="start" spacing={0.5} flex={1} minW={0}>
        <Text fontWeight="600" fontSize="sm" noOfLines={1} color={brandColor}>
          {item.brand}
        </Text>
        <HStack spacing={2}>
          {item.size && (
            <Badge
                            variant="subtle"
              fontSize="9px"
              borderRadius="md"
              px={1.5}
              py={0.5}
            >
              Size {item.size}
            </Badge>
          )}
          <Text fontSize="xs" color={subtextColor}>
            Qty: {item.quantity}
          </Text>
        </HStack>
      </VStack>
      <Text fontWeight="700" fontSize="sm" color={priceColor} flexShrink={0}>
        ${(item.price * item.quantity).toFixed(2)}
      </Text>
    </HStack>
  );
}

// ─── Order Summary Panel ──────────────────────────────────────────────────────

function OrderSummaryPanel({ cartData, calculateTotalPrice }) {
  const panelBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const headerBg = useColorModeValue('gray.50', 'gray.750');
  const labelColor = useColorModeValue('gray.500', 'gray.400');
  const valueColor = useColorModeValue('gray.700', 'gray.200');
  const totalColor = "accent.text";
  const totalBg = "accent.bg";
  const freeBg = useColorModeValue('green.50', 'green.900');
  const freeBorder = useColorModeValue('green.200', 'green.700');
  const freeText = useColorModeValue('green.700', 'green.300');
  const secureColor = useColorModeValue('gray.400', 'gray.500');
  const scrollbarThumb = useColorModeValue('gray.200', 'gray.600');
  const cardBadgeBg = useColorModeValue('gray.100', 'gray.700');
  const cardBadgeColor = useColorModeValue('gray.500', 'gray.400');

  const shipping = calculateTotalPrice > 50 ? 0 : 4.99;
  const tax = +(calculateTotalPrice * 0.08).toFixed(2);
  const grandTotal = +(calculateTotalPrice + shipping + tax).toFixed(2);

  return (
    <MotionBox
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.45, delay: 0.15 }}
      bg={panelBg}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="sm"
      position={{ lg: 'sticky' }}
      top={{ lg: '100px' }}
    >
      {/* Panel header */}
      <Box bg={headerBg} px={6} py={4} borderBottomWidth="1px" borderColor={borderColor}>
        <HStack spacing={2}>
          <Icon as={FiShoppingBag} color="accent.solid" boxSize={5} />
          <Heading size="sm" fontWeight="700">
            Order Summary
          </Heading>
          <Badge
                        borderRadius="full"
            px={2}
            py={0.5}
            fontSize="11px"
            fontWeight="700"
          >
            {cartData.length} {cartData.length === 1 ? 'item' : 'items'}
          </Badge>
        </HStack>
      </Box>

      {/* Item list */}
      <Box
        px={6}
        maxH="240px"
        overflowY="auto"
        sx={{
          '&::-webkit-scrollbar': { width: '4px' },
          '&::-webkit-scrollbar-track': { background: 'transparent' },
          '&::-webkit-scrollbar-thumb': { background: scrollbarThumb, borderRadius: '4px' },
        }}
      >
        {cartData.map((item, idx) => (
          <OrderItemRow key={idx} item={item} />
        ))}
      </Box>

      {/* Totals */}
      <Box px={6} pb={5} pt={4}>
        <VStack spacing={2.5} align="stretch">
          <HStack justify="space-between">
            <Text fontSize="sm" color={labelColor}>
              Subtotal
            </Text>
            <Text fontSize="sm" fontWeight="600" color={valueColor}>
              ${calculateTotalPrice.toFixed(2)}
            </Text>
          </HStack>
          <HStack justify="space-between">
            <HStack spacing={1}>
              <Icon as={FiTruck} boxSize={3.5} color={labelColor} />
              <Text fontSize="sm" color={labelColor}>
                Shipping
              </Text>
            </HStack>
            <Text
              fontSize="sm"
              fontWeight="600"
              color={shipping === 0 ? 'green.500' : valueColor}
            >
              {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
            </Text>
          </HStack>
          <HStack justify="space-between">
            <Text fontSize="sm" color={labelColor}>
              Tax (8%)
            </Text>
            <Text fontSize="sm" fontWeight="600" color={valueColor}>
              ${tax.toFixed(2)}
            </Text>
          </HStack>

          <Divider my={1} />

          <HStack
            justify="space-between"
            bg={totalBg}
            px={4}
            py={3}
            borderRadius="xl"
          >
            <Text fontWeight="700" fontSize="md">
              Total
            </Text>
            <Text fontWeight="800" fontSize="xl" color={totalColor}>
              ${grandTotal.toFixed(2)}
            </Text>
          </HStack>
        </VStack>

        {/* Free shipping banner */}
        {calculateTotalPrice > 50 && (
          <MotionBox
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            mt={4}
            p={3}
            bg={freeBg}
            border="1px"
            borderColor={freeBorder}
            borderRadius="xl"
          >
            <HStack spacing={2}>
              <Icon as={FiTruck} color={freeText} boxSize={4} />
              <Text fontSize="xs" color={freeText} fontWeight="700">
                You qualify for FREE shipping!
              </Text>
            </HStack>
          </MotionBox>
        )}

        {/* Security badges */}
        <VStack mt={5} spacing={2}>
          <HStack spacing={2} justify="center">
            <Icon as={FiLock} boxSize={3} color={secureColor} />
            <Text fontSize="11px" color={secureColor} fontWeight="500">
              SSL Encrypted
            </Text>
            <Text fontSize="11px" color={secureColor}>·</Text>
            <Icon as={FiShield} boxSize={3} color={secureColor} />
            <Text fontSize="11px" color={secureColor} fontWeight="500">
              Secure Checkout
            </Text>
          </HStack>
          <HStack spacing={1} justify="center">
            {['VISA', 'MC', 'AMEX', 'PayPal'].map((card) => (
              <Box
                key={card}
                px={2}
                py={0.5}
                bg={cardBadgeBg}
                borderRadius="sm"
                fontSize="9px"
                fontWeight="700"
                color={cardBadgeColor}
                letterSpacing="0.02em"
              >
                {card}
              </Box>
            ))}
          </HStack>
        </VStack>
      </Box>
    </MotionBox>
  );
}

// ─── Shipping Form ────────────────────────────────────────────────────────────

function ShippingForm({ name, setName, email, setEmail, address, setAddress, isPlacingOrder, handlePlaceOrder }) {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const labelColor = useColorModeValue('gray.600', 'gray.300');
  const inputBg = useColorModeValue('gray.50', 'gray.700');
  const inputBorder = useColorModeValue('gray.200', 'gray.600');
  const headerBg = useColorModeValue('gray.50', 'gray.750');
  const iconBg = "accent.bg";
  const inputColor = useColorModeValue('gray.800', 'gray.100');
  const placeholderColor = useColorModeValue('gray.400', 'gray.500');

  const inputProps = {
    bg: inputBg,
    borderColor: inputBorder,
    focusBorderColor: 'accent.solid',
    color: inputColor,
    _hover: { borderColor: 'accent.text' },
    _placeholder: { color: placeholderColor },
    size: 'md',
    borderRadius: 'xl',
    h: '48px',
    fontSize: 'sm',
  };

  return (
    <MotionBox
      key="shipping"
      initial={{ opacity: 0, x: -32 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 32 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      as="form"
      onSubmit={handlePlaceOrder}
      bg={cardBg}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="sm"
    >
      {/* Card header */}
      <Box bg={headerBg} px={{ base: 5, md: 8 }} py={5} borderBottomWidth="1px" borderColor={borderColor}>
        <HStack spacing={3}>
          <Flex
            w="38px"
            h="38px"
            align="center"
            justify="center"
            bg={iconBg}
            borderRadius="xl"
          >
            <Icon as={FiTruck} color="accent.solid" boxSize={4.5} />
          </Flex>
          <Box>
            <Heading size="md" fontWeight="700">
              Shipping Information
            </Heading>
            <Text fontSize="xs" color={labelColor} mt={0.5}>
              Where should we deliver your order?
            </Text>
          </Box>
        </HStack>
      </Box>

      {/* Form fields */}
      <Stack spacing={5} px={{ base: 5, md: 8 }} py={7}>
        <FormControl isRequired>
          <FormLabel fontSize="sm" fontWeight="600" color={labelColor} mb={1.5}>
            <HStack spacing={1.5}>
              <Icon as={FiUser} boxSize={3.5} />
              <Text>Full Name</Text>
            </HStack>
          </FormLabel>
          <Input
            {...inputProps}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontSize="sm" fontWeight="600" color={labelColor} mb={1.5}>
            <HStack spacing={1.5}>
              <Icon as={FiMail} boxSize={3.5} />
              <Text>Email Address</Text>
            </HStack>
          </FormLabel>
          <Input
            {...inputProps}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel fontSize="sm" fontWeight="600" color={labelColor} mb={1.5}>
            <HStack spacing={1.5}>
              <Icon as={FiMapPin} boxSize={3.5} />
              <Text>Delivery Address</Text>
            </HStack>
          </FormLabel>
          <Textarea
            bg={inputBg}
            borderColor={inputBorder}
            focusBorderColor="accent.solid"
            color={inputColor}
            _hover={{ borderColor: 'accent.text' }}
            _placeholder={{ color: placeholderColor }}
            borderRadius="xl"
            fontSize="sm"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="123 Main St, City, State, ZIP"
            rows={3}
            resize="none"
          />
        </FormControl>
      </Stack>

      {/* Submit button */}
      <Box px={{ base: 5, md: 8 }} pb={7}>
        <Button
          w="100%"
          size="lg"
          type="submit"
          rightIcon={<Icon as={FiArrowRight} boxSize={4} />}
          isLoading={isPlacingOrder}
          loadingText="Validating..."
          borderRadius="xl"
          h="54px"
          fontWeight="700"
          fontSize="sm"
          letterSpacing="0.02em"
          bg="accent.solid"
          color="white"
          _hover={{
            opacity: 0.9,
            transform: 'translateY(-2px)',
            boxShadow: '0 8px 25px rgba(128,90,213,0.35)',
          }}
          _active={{ transform: 'translateY(0)', boxShadow: 'none' }}
          transition="all 0.25s ease"
        >
          Continue to Payment
        </Button>
      </Box>
    </MotionBox>
  );
}

// ─── Payment Form ─────────────────────────────────────────────────────────────

function PaymentForm({
  name,
  email,
  address,
  register,
  errors,
  handleSubmit,
  handleConfirmOrder,
  isPlacingOrder,
  setShowSummary,
  calculateTotalPrice,
}) {
  const cardBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const labelColor = useColorModeValue('gray.600', 'gray.300');
  const inputBg = useColorModeValue('gray.50', 'gray.700');
  const inputBorder = useColorModeValue('gray.200', 'gray.600');
  const inputColor = useColorModeValue('gray.800', 'gray.100');
  const placeholderColor = useColorModeValue('gray.400', 'gray.500');
  const summaryBg = "accent.bg";
  const summaryBorder = "accent.subtle";
  const summaryHeadColor = "accent.text";
  const summaryTextColor = useColorModeValue('accent.text', 'accent.bg');
  const summarySubColor = "accent.text";
  const headerBg = useColorModeValue('gray.50', 'gray.750');
  const iconBg = "accent.bg";
  const errorColor = useColorModeValue('red.500', 'red.400');

  const inputProps = {
    bg: inputBg,
    borderColor: inputBorder,
    focusBorderColor: 'accent.solid',
    color: inputColor,
    _hover: { borderColor: 'accent.text' },
    _placeholder: { color: placeholderColor },
    size: 'md',
    borderRadius: 'xl',
    h: '48px',
    fontSize: 'sm',
  };

  const shipping = calculateTotalPrice > 50 ? 0 : 4.99;
  const tax = +(calculateTotalPrice * 0.08).toFixed(2);
  const grandTotal = +(calculateTotalPrice + shipping + tax).toFixed(2);

  return (
    <MotionBox
      key="payment"
      initial={{ opacity: 0, x: 32 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -32 }}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      bg={cardBg}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="sm"
    >
      {/* Shipping summary strip */}
      <Box
        bg={summaryBg}
        border="1px"
        borderColor={summaryBorder}
        mx={{ base: 5, md: 8 }}
        mt={6}
        borderRadius="xl"
        px={4}
        py={3.5}
      >
        <HStack spacing={2} mb={1.5}>
          <Circle size="20px" bg="accent.solid">
            <Icon as={FiCheck} color="white" boxSize={2.5} strokeWidth={3} />
          </Circle>
          <Text fontSize="11px" fontWeight="700" color={summaryHeadColor} textTransform="uppercase" letterSpacing="0.08em">
            Shipping Details Confirmed
          </Text>
        </HStack>
        <Stack spacing={0.5} pl={7}>
          <Text fontSize="sm" color={summaryTextColor} fontWeight="600">
            {name}
          </Text>
          <Text fontSize="xs" color={summarySubColor}>
            {email}
          </Text>
          <Text fontSize="xs" color={summarySubColor} noOfLines={1}>
            {address}
          </Text>
        </Stack>
      </Box>

      {/* Card header */}
      <Box bg={headerBg} px={{ base: 5, md: 8 }} py={5} mt={5} borderTopWidth="1px" borderColor={borderColor}>
        <HStack spacing={3}>
          <Flex
            w="38px"
            h="38px"
            align="center"
            justify="center"
            bg={iconBg}
            borderRadius="xl"
          >
            <Icon as={FiCreditCard} color="accent.solid" boxSize={4.5} />
          </Flex>
          <Box flex={1}>
            <Heading size="md" fontWeight="700">
              Payment Details
            </Heading>
            <Text fontSize="xs" color={labelColor} mt={0.5}>
              Your card information is encrypted & secure
            </Text>
          </Box>
          <HStack spacing={1.5} opacity={0.7}>
            <Icon as={FiLock} color="gray.400" boxSize={3.5} />
            <Icon as={FiShield} color="gray.400" boxSize={3.5} />
          </HStack>
        </HStack>
      </Box>

      {/* Payment fields */}
      <Stack spacing={5} px={{ base: 5, md: 8 }} py={7}>
        <FormControl isRequired isInvalid={!!errors.cardNumber}>
          <FormLabel fontSize="sm" fontWeight="600" color={labelColor} mb={1.5}>
            Card Number
          </FormLabel>
          <Input
            {...inputProps}
            type="text"
            maxLength={16}
            {...register('cardNumber', {
              required: 'Card number is required',
              pattern: {
                value: /^\d{16}$/,
                message: 'Card number must be exactly 16 digits',
              },
            })}
            placeholder="1234 5678 9012 3456"
          />
          <FormErrorMessage fontSize="xs" color={errorColor}>
            {errors.cardNumber?.message}
          </FormErrorMessage>
        </FormControl>

        <HStack spacing={4} align="start">
          <FormControl isRequired isInvalid={!!errors.expiryDate}>
            <FormLabel fontSize="sm" fontWeight="600" color={labelColor} mb={1.5}>
              Expiry Date
            </FormLabel>
            <Input
              {...inputProps}
              type="text"
              {...register('expiryDate', {
                required: 'Expiry date is required',
                pattern: {
                  value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                  message: 'Use MM/YY format',
                },
              })}
              placeholder="MM/YY"
            />
            <FormErrorMessage fontSize="xs" color={errorColor}>
              {errors.expiryDate?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isRequired isInvalid={!!errors.cvv}>
            <FormLabel fontSize="sm" fontWeight="600" color={labelColor} mb={1.5}>
              CVV
            </FormLabel>
            <Input
              {...inputProps}
              type="password"
              maxLength={3}
              {...register('cvv', {
                required: 'CVV is required',
                pattern: {
                  value: /^\d{3}$/,
                  message: 'CVV must be 3 digits',
                },
              })}
              placeholder="..."
            />
            <FormErrorMessage fontSize="xs" color={errorColor}>
              {errors.cvv?.message}
            </FormErrorMessage>
          </FormControl>
        </HStack>
      </Stack>

      {/* Action buttons */}
      <Box px={{ base: 5, md: 8 }} pb={7}>
        <HStack spacing={3}>
          <Button
            variant="outline"
            leftIcon={<Icon as={FiChevronLeft} boxSize={4} />}
            onClick={() => setShowSummary(false)}
            borderRadius="xl"
            h="54px"
            fontWeight="600"
            fontSize="sm"
            flex="1"
            transition="all 0.2s ease"
            _hover={{ bg: 'accent.bg', transform: 'translateX(-2px)' }}
            _dark={{ _hover: { bg: 'accent.bg' } }}
          >
            Back
          </Button>
          <Button
            flex="2"
            rightIcon={<Icon as={FiLock} boxSize={4} />}
            isLoading={isPlacingOrder}
            loadingText="Processing..."
            onClick={handleSubmit(handleConfirmOrder)}
            borderRadius="xl"
            h="54px"
            fontWeight="700"
            fontSize="sm"
            letterSpacing="0.02em"
            bg="accent.solid"
            color="white"
            _hover={{
              opacity: 0.9,
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 25px rgba(128,90,213,0.35)',
            }}
            _active={{ transform: 'translateY(0)', boxShadow: 'none' }}
            transition="all 0.25s ease"
          >
            Pay ${grandTotal.toFixed(2)}
          </Button>
        </HStack>
      </Box>
    </MotionBox>
  );
}

// ─── Success Modal ────────────────────────────────────────────────────────────

function SuccessModal({ isOpen, onClose }) {
  const overlayBg = useColorModeValue('blackAlpha.600', 'blackAlpha.800');
  const contentBg = useColorModeValue('white', 'gray.800');
  const bodyBg = useColorModeValue('gray.50', 'gray.850');
  const detailItemBg = useColorModeValue('white', 'gray.800');
  const detailBorder = useColorModeValue('gray.100', 'gray.700');
  const detailText = useColorModeValue('gray.700', 'gray.200');
  const redirectText = useColorModeValue('gray.400', 'gray.500');

  const detailItems = [
    { icon: FiCheck, iconBg: 'green.50', iconColor: 'green.500', text: 'Order confirmed & being processed' },
    { icon: FiTruck, iconBg: 'accent.bg', iconColor: 'accent.solid', text: 'Estimated delivery in 3-5 business days' },
    { icon: FiGift, iconBg: 'orange.50', iconColor: 'orange.400', text: 'A confirmation email is on its way' },
    { icon: FiStar, iconBg: 'yellow.50', iconColor: 'yellow.500', text: 'Earn loyalty points with this purchase' },
  ];

  const floatingItems = [
    { top: '8%', left: '6%', delay: 0 },
    { top: '15%', left: '80%', delay: 0.3 },
    { top: '60%', left: '5%', delay: 0.6 },
    { top: '55%', left: '85%', delay: 0.9 },
    { top: '30%', left: '45%', delay: 1.2 },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md" motionPreset="slideInBottom">
      <ModalOverlay bg={overlayBg} backdropFilter="blur(6px)" />
      <ModalContent bg={contentBg} borderRadius="2xl" mx={4} overflow="hidden" boxShadow="2xl">
        <ModalCloseButton top={4} right={4} color="whiteAlpha.800" zIndex={10} _hover={{ color: 'white', bg: 'whiteAlpha.200' }} />

        {/* Purple gradient header */}
        <Box
          bgGradient="linear(135deg, accent.solid, #6B21A8)"
          py={12}
          px={6}
          textAlign="center"
          position="relative"
          overflow="hidden"
        >
          {/* Background pattern */}
          <Box
            position="absolute"
            top="-40px"
            right="-40px"
            w="160px"
            h="160px"
            borderRadius="full"
            bg="whiteAlpha.100"
          />
          <Box
            position="absolute"
            bottom="-30px"
            left="-30px"
            w="120px"
            h="120px"
            borderRadius="full"
            bg="whiteAlpha.100"
          />

          {/* Floating icons */}
          {floatingItems.map((item, i) => (
            <MotionBox
              key={i}
              position="absolute"
              top={item.top}
              left={item.left}
              animate={{
                y: [0, -14, 0],
                rotate: [0, 12, -12, 0],
                opacity: [0.5, 0.9, 0.5],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: item.delay,
                ease: 'easeInOut',
              }}
            >
              <Icon as={FiStar} color="whiteAlpha.600" boxSize={4} />
            </MotionBox>
          ))}

          {/* Check circle */}
          <MotionBox
            initial={{ scale: 0, rotate: -90 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 280, damping: 20, delay: 0.1 }}
            display="inline-block"
            mb={4}
          >
            <Circle
              size="80px"
              bg="whiteAlpha.200"
              mx="auto"
              backdropFilter="blur(8px)"
              border="2px"
              borderColor="whiteAlpha.400"
              boxShadow="0 0 0 8px rgba(255,255,255,0.1)"
            >
              <Icon as={FiCheck} color="white" boxSize={8} strokeWidth={2.5} />
            </Circle>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.4 }}
          >
            <Heading color="white" size="lg" fontWeight="800" mb={1.5}>
              Order Placed!
            </Heading>
            <Text color="accent.subtle" fontSize="sm" fontWeight="500">
              Thank you for shopping with Clothify
            </Text>
          </MotionBox>
        </Box>

        {/* Detail items */}
        <ModalBody py={6} px={6} bg={bodyBg}>
          <MotionVStack
            spacing={3}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.4 }}
          >
            {detailItems.map((item, i) => (
              <HStack
                key={i}
                spacing={3}
                w="100%"
                bg={detailItemBg}
                px={4}
                py={3}
                borderRadius="xl"
                borderWidth="1px"
                borderColor={detailBorder}
              >
                <Circle size="34px" bg={item.iconBg} flexShrink={0}>
                  <Icon as={item.icon} color={item.iconColor} boxSize={3.5} />
                </Circle>
                <Text fontSize="sm" fontWeight="500" color={detailText}>
                  {item.text}
                </Text>
              </HStack>
            ))}
          </MotionVStack>

          <Text fontSize="xs" color={redirectText} textAlign="center" mt={5} fontWeight="500">
            Redirecting you to home in a few seconds...
          </Text>
        </ModalBody>

        <ModalFooter px={6} pb={6} pt={0} bg={bodyBg}>
          <Button
            w="100%"
            onClick={onClose}
            borderRadius="xl"
            h="50px"
            fontWeight="700"
            fontSize="sm"
            bg="accent.solid"
            color="white"
            _hover={{
              opacity: 0.9,
              transform: 'translateY(-1px)',
              boxShadow: '0 6px 20px rgba(128,90,213,0.3)',
            }}
            _active={{ transform: 'translateY(0)' }}
            transition="all 0.2s ease"
            rightIcon={<Icon as={FiShoppingBag} boxSize={4} />}
          >
            Continue Shopping
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

function CheckoutPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [loading, setLoading] = useState(false);

  const { cartData } = useSelector((store) => store.cartReducer);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();

  const pageBg = useColorModeValue('gray.50', 'gray.900');
  const headingColor = useColorModeValue('gray.800', 'white');
  const subHeadingColor = useColorModeValue('gray.500', 'gray.400');
  const headerIconBg = "accent.bg";

  // ── Business logic ────────────────────────────────────────────────────────

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedData = localStorage.getItem('checkoutData');
    if (storedData) {
      const { name, email, address } = JSON.parse(storedData);
      setName(name);
      setEmail(email);
      setAddress(address);
    }
  }, [loading]);

  const handlePlaceOrder = (event) => {
    event.preventDefault();
    setIsPlacingOrder(true);
    setTimeout(() => {
      setIsPlacingOrder(false);
      setShowSummary(true);
    }, 2000);
  };

  const handleConfirmOrder = async () => {
    const items = cartData.map((item) => ({
      brand: item.brand,
      price: item.price,
      discount: item.discount,
      images: item.images,
      size: item.size,
      quantity: item.quantity,
    }));
    const payload = { name, email, address, items };
    setLoading(true);
    dispatch(handleAddToOrderData(payload))
      .then((res) => {
        if (res) {
          dispatch(handleDeleteAllToCartData());
          setTimeout(() => {
            setLoading(false);
            onOpen();
            setTimeout(() => {
              navigate('/', { replace: true });
            }, 5000);
          }, 2000);
        } else {
          toast.error('Something went wrong! Please try again.');
        }
      })
      .catch(() => {
        setLoading(false);
        toast({
          title: 'Something Went Wrong!',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    localStorage.setItem(
      'checkoutData',
      JSON.stringify({ name, email, address }),
    );
  }, [name, email, address]);

  const calculateTotalPrice = cartData.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  // ── Loading state ─────────────────────────────────────────────────────────

  if (loading) {
    return <LoadingScreen message="Processing your order..." />;
  }

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <Box minH="100vh" bg={pageBg} pt={{ base: '72px', md: '80px' }} pb={16}>
      <Box maxW="1100px" mx="auto" px={{ base: 4, md: 6, lg: 8 }}>

        {/* Page header */}
        <MotionBox
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          textAlign="center"
          mb={8}
        >
          <HStack justify="center" spacing={3} mb={2}>
            <Flex
              w="44px"
              h="44px"
              align="center"
              justify="center"
              bg={headerIconBg}
              borderRadius="xl"
            >
              <Icon as={FiShoppingBag} color="accent.solid" boxSize={5} />
            </Flex>
            <Heading size="xl" color={headingColor} fontWeight="800" letterSpacing="-0.01em">
              Checkout
            </Heading>
          </HStack>
          <Text color={subHeadingColor} fontSize="sm" fontWeight="500">
            Complete your purchase securely in just two steps
          </Text>
        </MotionBox>

        {/* Step indicator */}
        <StepIndicator currentStep={showSummary ? 2 : 1} />

        {/* Main layout: form left, summary right */}
        <Flex
          direction={{ base: 'column', lg: 'row' }}
          gap={{ base: 6, lg: 8 }}
          align="start"
        >
          {/* Left: animated form area */}
          <Box flex="1" minW={0}>
            <AnimatePresence mode="wait">
              {!showSummary ? (
                <ShippingForm
                  key="shipping"
                  name={name}
                  setName={setName}
                  email={email}
                  setEmail={setEmail}
                  address={address}
                  setAddress={setAddress}
                  isPlacingOrder={isPlacingOrder}
                  handlePlaceOrder={handlePlaceOrder}
                />
              ) : (
                <PaymentForm
                  key="payment"
                  name={name}
                  email={email}
                  address={address}
                  register={register}
                  errors={errors}
                  handleSubmit={handleSubmit}
                  handleConfirmOrder={handleConfirmOrder}
                  isPlacingOrder={isPlacingOrder}
                  setShowSummary={setShowSummary}
                  calculateTotalPrice={calculateTotalPrice}
                />
              )}
            </AnimatePresence>
          </Box>

          {/* Right: sticky order summary */}
          <Box w={{ base: '100%', lg: '360px' }} flexShrink={0}>
            <OrderSummaryPanel
              cartData={cartData}
              calculateTotalPrice={calculateTotalPrice}
            />
          </Box>
        </Flex>
      </Box>

      {/* Success modal */}
      <SuccessModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export default CheckoutPage;
