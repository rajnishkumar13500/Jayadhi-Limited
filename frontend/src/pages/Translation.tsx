import { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Paper,
} from '@mui/material';
import { ContentCopy as CopyIcon } from '@mui/icons-material';
import axios from 'axios';

const languages = [
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'nl', name: 'Dutch' },
  { code: 'pl', name: 'Polish' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ar', name: 'Arabic' },
  { code: 'hi', name: 'Hindi' },
];

export default function Translation() {
  const [sourceText, setSourceText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  

  const handleTranslate = async () => {
    if (!sourceText || !targetLanguage) {
      setError('Please enter text and select a target language');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/api/translate', {
        text: sourceText,
        language: targetLanguage,
      });
       // console.log(response);
      setTranslatedText(response.data.result);
     
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to translate text. Please try again.');
      console.error('Translation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Translation
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Enter text to translate"
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              required
            />
            <FormControl fullWidth>
              <InputLabel>Target Language</InputLabel>
              <Select
                value={targetLanguage}
                label="Target Language"
                onChange={(e) => setTargetLanguage(e.target.value)}
                required
              >
                {languages.map((lang) => (
                  <MenuItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              onClick={handleTranslate}
              disabled={loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : 'Translate'}
            </Button>
          </Box>
        </CardContent>
        {/* {console.log(translatedText)} */}
      </Card>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
  
      {translatedText && (
        <Paper 
          elevation={3} 
          sx={{ 
            p: 3, 
            mb: 2, 
            backgroundColor: '#f8f9fa',
            position: 'relative'
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" color="primary">
              Translation Result
            </Typography>
            <IconButton 
              onClick={handleCopy}
              color={copySuccess ? "success" : "primary"}
              title="Copy to clipboard"
            >
              <CopyIcon />
            </IconButton>
          </Box>
          <Typography 
            sx={{ 
              whiteSpace: 'pre-wrap',
              lineHeight: 1.6,
              fontSize: '1.1rem'
            }}
          >
            {translatedText}
          </Typography>
          {copySuccess && (
            <Typography 
              variant="caption" 
              color="success.main"
              sx={{ 
                position: 'absolute',
                top: 8,
                right: 48
              }}
            >
              Copied!
            </Typography>
          )}
        </Paper>
      )}
    </Box>
  );
} 