import { useState } from 'react';
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from '@mui/material';
import { ContentCopy as ContentCopyIcon, Check as CheckIcon } from '@mui/icons-material';
import axios from 'axios';
import { commonStyles, fadeIn } from '../styles/common';



const BE_BASE_URL = 'https://jayadhi-limited-be.vercel.app';
// const BE_BASE_URL = 'http://localhost:3000';

const languages = [
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
];

export default function Translation() {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [targetLanguage, setTargetLanguage] = useState('es');

  const handleTranslate = async () => {
    if (!sourceText.trim()) {
      setError('Please enter text to translate');
      return;
    }

    setLoading(true);
    setError('');
    setTranslatedText('');

    try {
      const response = await axios.post(`${BE_BASE_URL}/api/translate`, {
        text: sourceText,
        language: targetLanguage,
      });

      if (response.data && response.data.result) {
        setTranslatedText(response.data.result);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err: any) {
      console.error('Translation error:', err);
      setError(err.response?.data?.error || 'Translation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(translatedText);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  return (
    <Box sx={{ animation: `${fadeIn} 0.5s ease-in-out` }}>
      <Box sx={commonStyles.contentWrapper}>
        <Typography 
          variant="h4" 
          sx={{ 
            ...commonStyles.gradientText,
            mb: 3,
            textAlign: 'center',
          }}
        >
          Translation
        </Typography>

        <Card sx={{ 
          p: 3, 
          mb: 4,
          borderRadius: '16px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 1 }}>
                Source Language: English
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Target Language</InputLabel>
                <Select
                  value={targetLanguage}
                  onChange={(e) => setTargetLanguage(e.target.value)}
                  label="Target Language"
                  sx={commonStyles.inputField}
                >
                  {languages.map((lang) => (
                    <MenuItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Box sx={{ mt: 3 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="Enter English text to translate..."
              variant="outlined"
              sx={commonStyles.inputField}
            />
          </Box>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={handleTranslate}
              disabled={loading}
              sx={{
                px: 4,
                py: 1.5,
                borderRadius: '12px',
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Translate'}
            </Button>
          </Box>
        </Card>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {translatedText && (
          <Box sx={commonStyles.resultContainer}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" color="text.secondary">
                Translation Result
              </Typography>
              <IconButton 
                onClick={handleCopy}
                sx={{ 
                  color: copySuccess ? 'success.main' : 'text.secondary',
                  transition: 'all 0.3s ease',
                }}
              >
                {copySuccess ? <CheckIcon /> : <ContentCopyIcon />}
              </IconButton>
            </Box>
            <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
              {translatedText}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
} 