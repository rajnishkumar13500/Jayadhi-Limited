import { Grid, Card, CardContent, CardActions, Typography, Button, Box, useTheme } from '@mui/material';
import { Translate as TranslateIcon, Summarize as SummarizeIcon, Email as EmailIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { commonStyles, fadeIn, pulse } from '../styles/common';

const services = [
  {
    title: 'Translation',
    description: 'Translate text between different languages with high accuracy and natural-sounding results.',
    icon: <TranslateIcon sx={{ fontSize: 40 }} />,
    path: '/translation',
    color: '#4CAF50',
  },
  {
    title: 'Summarization',
    description: 'Generate concise summaries of long texts while maintaining key information and context.',
    icon: <SummarizeIcon sx={{ fontSize: 40 }} />,
    path: '/summarization',
    color: '#FF9800',
  },
  {
    title: 'Email Generation',
    description: 'Create professional emails quickly with customizable templates and smart suggestions.',
    icon: <EmailIcon sx={{ fontSize: 40 }} />,
    path: '/email-generation',
    color: '#9C27B0',
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{ animation: `${fadeIn} 0.5s ease-in-out` }}>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography 
          variant="h3" 
          sx={{ 
            ...commonStyles.gradientText,
            mb: 2,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
            fontWeight: 700,
            letterSpacing: '-0.5px',
          }}
        >
          Welcome to Jayadhi Limited
        </Typography>
        <Typography 
          variant="h6" 
          color="text.secondary"
          sx={{ 
            maxWidth: '800px',
            mx: 'auto',
            fontSize: { xs: '1rem', sm: '1.1rem', md: '1.25rem' },
            lineHeight: 1.6,
          }}
        >
          Your all-in-one solution for translation, summarization, and email generation needs.
          Choose a service below to get started.
        </Typography>
      </Box>

      <Grid container spacing={4} justifyContent="center">
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.title}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
                  '& .service-icon': {
                    animation: `${pulse} 1s ease-in-out`,
                  },
                },
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: 4 }}>
                <Box 
                  className="service-icon"
                  sx={{ 
                    display: 'inline-flex',
                    p: 2,
                    borderRadius: '12px',
                    bgcolor: `${service.color}15`,
                    color: service.color,
                    mb: 3,
                  }}
                >
                  {service.icon}
                </Box>
                <Typography 
                  variant="h5" 
                  component="h2" 
                  gutterBottom
                  sx={{ 
                    fontWeight: 600,
                    mb: 2,
                    color: 'text.primary',
                  }}
                >
                  {service.title}
                </Typography>
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{ 
                    lineHeight: 1.7,
                    mb: 2,
                  }}
                >
                  {service.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 3, pt: 0 }}>
                <Button
                  variant="contained"
                  onClick={() => navigate(service.path)}
                  sx={{
                    width: '100%',
                    py: 1.5,
                    borderRadius: '12px',
                    bgcolor: service.color,
                    color: 'white',
                    '&:hover': {
                      bgcolor: service.color,
                      opacity: 0.9,
                    },
                  }}
                >
                  Get Started
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 