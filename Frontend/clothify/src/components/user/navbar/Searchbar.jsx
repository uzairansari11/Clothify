import {
  Box,
  Flex,
  Icon,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import API from '../../../api/axiosInstance';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Searchbar = () => {
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const [data, setData] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const debounceRef = useRef(null);

  const inputBg = useColorModeValue("gray.100", "gray.700");
  const inputFocusBg = useColorModeValue("white", "gray.600");
  const inputColor = useColorModeValue("gray.800", "white");
  const placeholderColor = useColorModeValue("gray.400", "gray.400");
  const dropdownBg = useColorModeValue("white", "gray.800");
  const dropdownBorder = useColorModeValue("gray.200", "gray.600");
  const itemHoverBg = useColorModeValue("accent.bg", "gray.700");
  const itemTitleColor = useColorModeValue("gray.800", "white");
  const itemBrandColor = useColorModeValue("gray.500", "gray.400");
  const imageBg = useColorModeValue("gray.50", "gray.700");
  const dropdownShadow = useColorModeValue(
    "0 10px 40px rgba(0,0,0,0.12)",
    "0 10px 40px rgba(0,0,0,0.5)"
  );

  const fetchData = useCallback((searchText) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!searchText || searchText.trim().length < 2) {
      setData([]);
      setHasSearched(false);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const response = await API.get('/product', {
          params: { search: searchText.trim(), limit: 8 },
        });
        setData(response.data.data.products || []);
      } catch (error) {
        console.log(error);
        setData([]);
      } finally {
        setHasSearched(true);
        setIsSearching(false);
      }
    }, 400);
  }, []);

  const handleInputChange = (e) => {
    const searchText = e.target.value;
    setText(searchText);
    fetchData(searchText);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const handleBlur = () => {
    setTimeout(() => setShow(false), 200);
  };

  const handleFocus = () => {
    setShow(true);
  };

  const handleItemClick = () => {
    setText('');
    setData([]);
    setHasSearched(false);
  };

  return (
    <Box position="relative">
      <InputGroup size="sm">
        <InputLeftElement pointerEvents="none">
          <FiSearch size={14} color="gray" />
        </InputLeftElement>
        <Input
          type="text"
          value={text}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder="Search products..."
          bg={inputBg}
          color={inputColor}
          border="none"
          borderRadius="xl"
          fontSize="sm"
          _placeholder={{ color: placeholderColor, fontSize: "xs" }}
          _focus={{
            bg: inputFocusBg,
            boxShadow: "0 0 0 2px rgba(128,90,213,0.3)",
            border: "none",
          }}
          transition="all 0.2s"
        />
      </InputGroup>

      {show && text.trim().length >= 2 && (hasSearched || isSearching) && (
        <Box
          position="absolute"
          top="calc(100% + 6px)"
          width="100%"
          minW="340px"
          maxH="320px"
          bg={dropdownBg}
          borderRadius="xl"
          border="1px solid"
          borderColor={dropdownBorder}
          boxShadow={dropdownShadow}
          overflowY="auto"
          zIndex={9999}
          py={2}
          css={{
            '&::-webkit-scrollbar': { width: '4px' },
            '&::-webkit-scrollbar-thumb': { background: 'rgba(128,90,213,0.3)', borderRadius: '4px' },
          }}
        >
          {isSearching ? (
            <Flex align="center" justify="center" py={6} gap={2}>
              <Text fontSize="sm" color={itemBrandColor}>Searching...</Text>
            </Flex>
          ) : data.length === 0 ? (
            <Flex direction="column" align="center" justify="center" py={6} gap={2}>
              <Icon as={FiSearch} boxSize={5} color={itemBrandColor} />
              <Text fontSize="sm" fontWeight="600" color={itemTitleColor}>
                No results found
              </Text>
              <Text fontSize="xs" color={itemBrandColor} textAlign="center" px={4}>
                No products match "{text.trim()}". Try a different search.
              </Text>
            </Flex>
          ) : (
            <>
              <Text px={3} pb={1.5} fontSize="10px" fontWeight="700" color={itemBrandColor} textTransform="uppercase" letterSpacing="1px">
                {data.length} result{data.length !== 1 ? 's' : ''} found
              </Text>
              {data.map((item) => (
                <Link
                  to={`/product/${item._id}`}
                  key={item._id}
                  onClick={handleItemClick}
                >
                  <Flex
                    align="center"
                    gap={3}
                    px={3}
                    py={2.5}
                    mx={1}
                    borderRadius="lg"
                    _hover={{ bg: itemHoverBg }}
                    transition="background 0.15s"
                    cursor="pointer"
                  >
                    <Image
                      src={item.images?.[0]}
                      alt={item.title}
                      boxSize="40px"
                      objectFit="contain"
                      borderRadius="md"
                      bg={imageBg}
                      flexShrink={0}
                    />
                    <Box flex="1" minW={0}>
                      <Text fontSize="sm" fontWeight="600" color={itemTitleColor} noOfLines={1}>
                        {item.title}
                      </Text>
                      <Flex align="center" gap={2} mt={0.5}>
                        <Text fontSize="xs" fontWeight="500" color={itemBrandColor}>{item.brand}</Text>
                        <Text fontSize="xs" fontWeight="700" color="accent.solid">${item.price}</Text>
                      </Flex>
                    </Box>
                  </Flex>
                </Link>
              ))}
            </>
          )}
        </Box>
      )}
    </Box>
  );
};

export default Searchbar;
