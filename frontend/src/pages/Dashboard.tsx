import { Grid, Card, CardContent, CardActions, Typography, Button, Box, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Translate as TranslateIcon,
  Summarize as SummarizeIcon,
  Email as EmailIcon,
} from '@mui/icons-material';

const services = [
  {
    title: 'Translation',
    description: 'Translate text between different languages using advanced AI models.',
    icon: <TranslateIcon sx={{ fontSize: 40 }} />,
    path: '/translation',
    color: '#2563eb',
  },
  {
    title: 'Summarization',
    description: 'Generate concise summaries of long texts while maintaining key information.',
    icon: <SummarizeIcon sx={{ fontSize: 40 }} />,
    path: '/summarization',
    color: '#7c3aed',
  },
  {
    title: 'Email Generation',
    description: 'Create professional emails with different tones and styles.',
    icon: <EmailIcon sx={{ fontSize: 40 }} />,
    path: '/email-generation',
    color: '#059669',
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Welcome to Smart Utility Tool
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        Choose a tool to get started with your task
      </Typography>
      <Grid container spacing={3}>
        {services.map((service) => (
          <Grid item xs={12} sm={6} md={4} key={service.title}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: theme.shadows[8],
                },
              }}
            >
              <CardContent sx={{ 
                flexGrow: 1, 
                textAlign: 'center',
                p: 3,
              }}>
                <Box sx={{ 
                  display: 'inline-flex',
                  p: 2,
                  borderRadius: '12px',
                  backgroundColor: service.color + '15',
                  color: service.color,
                  mb: 2,
                }}>
                  {service.icon}
                </Box>
                <Typography gutterBottom variant="h5" component="h2" sx={{ mb: 2 }}>
                  {service.title}
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 2 }}>
                  {service.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 3, pt: 0 }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => navigate(service.path)}
                  sx={{
                    backgroundColor: service.color,
                    '&:hover': {
                      backgroundColor: service.color,
                      opacity: 0.9,
                    },
                  }}
                >
                  Try Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
} 