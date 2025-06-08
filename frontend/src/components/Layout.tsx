import { Box, useTheme, useMediaQuery } from '@mui/material';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8f9fa' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${280}px)` },
          ml: { md: `${280}px` },
          p: { xs: 2, sm: 3, md: 4 },
          pt: { xs: 8, sm: 9, md: 4 }, // Extra padding top on mobile for the menu button
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          maxWidth: '1200px',
          mx: 'auto',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          '& > *': {
            width: '100%',
            maxWidth: '100%',
          },
          position: 'relative',
          left: { md: '-120px' }, // Increased left shift to -120px
        }}
      >
        {children}
      </Box>
    </Box>
  );
} 