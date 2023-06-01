import React, { useState } from 'react';
import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  IconButton,
  Spinner,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiHeart, FiShoppingBag, FiChevronRight } from 'react-icons/fi';

const ProductDetail = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [mainImage, setMainImage] = useState('https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRvZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60');
  const [additionalImages, setAdditionalImages] = useState([
    'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGRvZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGRvZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60',
    'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGRvZ3xlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=600&q=60',
  ]);
  const heartColor = useColorModeValue('red.500', 'red.200');

  const handleAddToCart = () => {
    setIsLoading(true);
    // Simulating an API call or asynchronous operation
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleImageChange = (image) => {
    setMainImage(image);
  };

  return (
    <Box p="4">
      <Flex flexWrap="wrap" justifyContent="center" alignItems="center" mb="4">
        <Box width={{ base: '100%', md: '50%' }} pr={{ base: '0', md: '4' }}>
          <Image src={mainImage} alt="Product" objectFit="cover" height="400px" />
          <Flex mt="2">
            {additionalImages.map((image, index) => (
              <Box
                key={index}
                onClick={() => handleImageChange(image)}
                cursor="pointer"
                mx="1"
               
              >
                <Image
                  src={image}
                  alt={`Product Image ${index}`}
                  objectFit="cover"
                  height="60px"
                  width="60px"
                  alignSelf={'center'}
                />
              </Box>
            ))}
          </Flex>
        </Box>
        <Box width={{ base: '100%', md: '50%' }} pl={{ base: '0', md: '4' }}>
          <Text fontWeight="bold" fontSize="2xl" mb="2">
            Product Name
          </Text>
          <Text fontWeight="bold" color="teal.500" mb="2">
            Category: Category Name
          </Text>
          <Text mb="2">
            Type: Product Type | Brand: Product Brand | Weight: Product Weight
          </Text>
          <Text fontWeight="bold" fontSize="xl" mb="2">
            $Price
          </Text>
          <Flex alignItems="center" mb="2">
            <Text textDecoration="line-through" mr="2">
              $DiscountedPrice
            </Text>
            <Text fontWeight="bold" color="teal.500">
              Save $Discount
            </Text>
          </Flex>
          <Text mb="2">Description: Product Description</Text>
          <Text mb="2">Expiry: Product Expiry Date</Text>
          <Text mb="2">Rating: Product Rating</Text>
          <Text mb="2">Life Stage: Product Life Stage</Text>
          <Button
            colorScheme="teal"
            leftIcon={<FiShoppingBag />}
            onClick={handleAddToCart}
            disabled={isLoading}
            isLoading={isLoading}
            loadingText="Adding..."
            mr="2"
          >
            Add to Cart
          </Button>
          <IconButton
            icon={<FiHeart />}
            color={heartColor}
            size="md"
            aria-label="Add to Wishlist"
          />
        </Box>
      </Flex>
      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Additional Details</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Text mb="4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ac magna
              faucibus, molestie odio in, aliquet nunc. Etiam id bibendum nisi, ut
              porttitor sem. Fusce varius turpis a lacus consequat efficitur. Integer
              accumsan eleifend neque, nec pretium odio tristique et. In sit amet
              tellus tristique, scelerisque ante nec, tincidunt nibh. Praesent in justo
              accumsan, cursus diam nec, eleifend sem. Suspendisse at turpis et massa
              fringilla lacinia id vel mauris.
            </Text>
          </TabPanel>
          <TabPanel>
            <Text mb="4">Additional details about the product go here.</Text>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default ProductDetail;
