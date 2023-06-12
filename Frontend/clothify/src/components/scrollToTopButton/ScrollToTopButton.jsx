import React, { useState, useEffect } from 'react';
import { Box, IconButton } from '@chakra-ui/react';
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton = () => {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowButton(window.scrollY > 200);
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <Box
            position="fixed"
            bottom={6}
            right={6}
            opacity={showButton ? 1 : 0}
            transition="opacity 0.3s"
        >
            <IconButton
                aria-label="Scroll to Top"
                icon={<FaArrowUp />}
                size="lg"
                color="white"
                bg="black"
                _hover={{ bg: 'black' }} // Disable hover effect
                borderRadius="full"
                onClick={handleScrollToTop}
            />
        </Box>
    );
};

export default ScrollToTopButton;
