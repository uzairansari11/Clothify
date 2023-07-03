import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from '@chakra-ui/react';
import axios from 'axios';
import { debounce } from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Searchbar = () => {
  const [color, setColor] = useState('#edf2f2');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('');
  const [data, setData] = useState([]);

  const fetchData = useCallback(
    debounce(async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_URL}/product?search=${text}`,
        );
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    }, 1000),
    [],
  );

  const handleInputChange = (e) => {
    const searchText = e.target.value;
    setText(searchText);
    fetchData();
  };

  useEffect(() => {
    return () => {
      fetchData.cancel(); // Cancel the debounced function on component unmount
    };
  }, [fetchData]);

  const handleBlur = () => {
    setColor('gray.100');
    setTimeout(() => {
      setShow(false);
    }, 200);
  };

  const handleFocus = () => {
    setColor('white');
    setShow(true);
  };

  const handleItemClick = () => {
    setText('');
  };

  return (
    <Box bg={color} borderRadius="md" pos="relative">
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <FiSearch color="gray.500" />
        </InputLeftElement>
        <Input
          type="text"
          border="none"
          value={text}
          outline="none"
          onChange={handleInputChange}
          _focus={{
            boxShadow: 'none',
            border: '1px solid #787373',
            outline: 'none',
          }}
          placeholder="Search for products, brands, and more"
          onBlur={handleBlur}
          onFocus={handleFocus}
        />
      </InputGroup>
      {show && text.length > 0 && (
        <Box
          pos="absolute"
          top="3.2rem"
          width="full"
          maxH="10.7rem"
          bg="gray.100"
          borderRadius="md"
          overflowY="auto"
          sx={{
            '::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {data.map((item) => (
            <Link
              to={`/product/${item._id}`}
              key={item.id} // Assuming `item` has an `id` property for the key
              onClick={handleItemClick}
              _hover={{ textDecoration: 'none', bg: 'gray.200' }}
            >
              <Text padding="8px" pb="1.7px" pl="15px" borderBottomWidth="1px">
                {item.title}{' '}
              </Text>
            </Link>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Searchbar;
