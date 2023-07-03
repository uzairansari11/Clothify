import { SearchIcon } from '@chakra-ui/icons';
import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import axios from 'axios';
import { debounce } from 'lodash';
import { useCallback, useLayoutEffect, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';

const AdminSearchBar = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSearch = searchParams.get('serach');
  const [search, setSearch] = useState(initialSearch);
  let params = Object.fromEntries(searchParams);
  const [text, setText] = useState('');
  const [data, setData] = useState([]);

  const fetchData = useCallback(
    debounce(async () => {
      params = { ...params, search: search, page: 1, limit: 6 };
      setSearchParams(params);
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

  useLayoutEffect(() => {
    return () => {
      fetchData.cancel(); // Cancel the debounced function on component unmount
    };
  }, [fetchData]);

  return (
    <Box width={['100%', '300px']} margin="auto">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="teal.500" />}
        />
        <Input
          type="text"
          placeholder="Search"
          focusBorderColor="teal.500"
          borderRadius="md"
          _placeholder={{ color: 'gray.500' }}
          bg="white"
          border="1px"
          borderColor="teal.300"
          boxShadow="sm"
          _hover={{
            borderColor: 'teal.500',
          }}
          _focus={{
            borderColor: 'teal.500',
            boxShadow: 'outline',
          }}
          onChange={handleInputChange}
        />
      </InputGroup>
    </Box>
  );
};

export default AdminSearchBar;
