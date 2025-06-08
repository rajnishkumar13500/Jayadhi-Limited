import { keyframes } from '@mui/system';

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const slideIn = keyframes`
  from {
    transform: translateX(-20px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

export const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

export const commonStyles = {
  pageContainer: {
    maxWidth: 1200,
    mx: 'auto',
    py: 4,
    px: 2,
    animation: `${fadeIn} 0.5s ease-out`,
  },
  title: {
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 600,
    mb: 2,
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  gradientText: {
    fontFamily: '"Poppins", sans-serif',
    fontWeight: 600,
    background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  card: {
    borderRadius: 2,
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
    transition: 'all 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
    },
  },
  inputField: {
    '& .MuiOutlinedInput-root': {
      borderRadius: 2,
      '&:hover fieldset': {
        borderColor: 'primary.main',
      },
    },
  },
  button: {
    borderRadius: 2,
    textTransform: 'none',
    fontWeight: 500,
    px: 3,
    py: 1,
  },
  resultContainer: {
    mt: 4,
    p: 3,
    borderRadius: '12px',
    backgroundColor: 'background.paper',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    animation: `${fadeIn} 0.5s ease-in-out`,
    '& pre': {
      p: 2,
      borderRadius: '8px',
      backgroundColor: 'rgba(0, 0, 0, 0.02)',
      overflowX: 'auto',
    },
  },
  contentWrapper: {
    width: '100%',
    maxWidth: '900px',
    mx: 'auto',
    px: { xs: 2, sm: 3, md: 4 },
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}; 