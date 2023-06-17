import {
    Box,
    Image,
    Flex,
    Heading,
    Text,
    Button,
    IconButton,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";

const Card = ({
    images,
    title,
    discount,
    price,
    category,
    brand,
    description,
}) => {
    return (
        <Box
            bg="white"
            boxShadow="md"
            borderRadius="md"
            p={4}
            maxW="sm"
            w="100%"
            height="100%"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
        >
            <Box>
                <Image
                    src={images[0]}
                    alt={title}
                    mb={4}
                    borderRadius="md"
                    height="200px"
                    width='200px'
                    objectFit="contain"
                    margin={'auto'}
                />

                <Heading as="h2" size="md" mb={2}>
                    {title}
                </Heading>

                {discount && (
                    <Flex align="center" mb={2}>
                        <Text color="gray.500" textDecor="line-through" mr={2}>
                            ${price}
                        </Text>
                        <Text color="teal.500" fontWeight="bold">
                            ${discount}
                        </Text>
                    </Flex>
                )}

                {!discount && (
                    <Text color="teal.500" fontWeight="bold" mb={2}>
                        ${price}
                    </Text>
                )}

                <Text fontSize="sm" color="gray.500" mb={2}>
                    Category: {category}
                </Text>

                <Text fontSize="sm" color="gray.500" mb={4}>
                    Brand: {brand}
                </Text>

                <Text fontSize="sm" color="gray.500" mb={4}>
                    {description.substring(0, 42)} ...
                </Text>
            </Box>

            <Flex justify="space-between" alignItems="center">
                <Button colorScheme="teal" size="sm" leftIcon={<EditIcon />}>
                    Edit
                </Button>

                <IconButton
                    icon={<DeleteIcon />}
                    aria-label="Delete"
                    colorScheme="red"
                    size="sm"
                />
            </Flex>
        </Box>
    );
};

export default Card;
