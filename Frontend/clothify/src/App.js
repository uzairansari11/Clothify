import './App.css';
import { Box } from '@chakra-ui/react';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/user/navbar/Navbar';
import Routing from './routing/Routing';
import Footer from './components/user/footer/Footer';
import { useLocation } from 'react-router-dom';
import ScrollToTopButton from './components/user/scrollToTopButton/ScrollToTopButton';

const HIDE_NAVBAR_PATHS = ['/admin'];
const SHOW_NAVBAR_EXCEPTIONS = ['/admin/signup', '/admin/login'];
const HIDE_FOOTER_PATHS = ['/cart', '/wishlist', '/orderhistory', '/admin'];

function App() {
  const { pathname } = useLocation();

  const showNavbar = !HIDE_NAVBAR_PATHS.some((p) => pathname.startsWith(p)) ||
    SHOW_NAVBAR_EXCEPTIONS.includes(pathname);

  const showFooter = !HIDE_FOOTER_PATHS.some((p) =>
    p === '/admin' ? pathname.startsWith(p) : pathname === p
  );

  const isAdmin = pathname.startsWith('/admin') && !SHOW_NAVBAR_EXCEPTIONS.includes(pathname);

  return (
    <div className="App">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: '12px',
            padding: '12px 20px',
            fontSize: '14px',
            fontWeight: '500',
          },
          success: {
            iconTheme: { primary: '#38A169', secondary: '#fff' },
          },
          error: {
            iconTheme: { primary: '#E53E3E', secondary: '#fff' },
          },
        }}
      />
      {showNavbar && <Navbar />}
      <Box mt={showNavbar ? { base: 12, md: 20 } : 0} overflow={isAdmin ? "hidden" : undefined}>
        <Routing />
        {showFooter && <Footer />}
        {!isAdmin && <ScrollToTopButton />}
      </Box>
    </div>
  );
}

export default App;
