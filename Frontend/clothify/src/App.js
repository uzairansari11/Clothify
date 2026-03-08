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
        reverseOrder={false}
        gutter={12}
        toastOptions={{
          duration: 3500,
          style: {
            background: '#1a1a2e',
            color: '#fff',
            borderRadius: '16px',
            padding: '14px 22px',
            fontSize: '14px',
            fontWeight: '500',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(10px)',
            maxWidth: '420px',
          },
          success: {
            style: {
              background: 'linear-gradient(135deg, #065f46 0%, #064e3b 100%)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
            },
            iconTheme: { primary: '#34d399', secondary: '#fff' },
          },
          error: {
            style: {
              background: 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 100%)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
            },
            iconTheme: { primary: '#f87171', secondary: '#fff' },
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
