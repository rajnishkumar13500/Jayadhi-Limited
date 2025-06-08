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
  useTheme,
} from '@mui/material';
import { ContentCopy as CopyIcon, Summarize as SummarizeIcon } from '@mui/icons-material';
import axios from 'axios';
import { commonStyles, pulse, fadeIn } from '../styles/common';

const BE_BASE_URL = 'https://jayadhi-limited-be.vercel.app';
// const BE_BASE_URL = 'http://localhost:3000';

const summaryTypes = [
  { value: 'light', label: 'Light Summary' },
  { value: 'medium', label: 'Medium Summary' },
  { value: 'extreme', label: 'Extreme Summary' },
];

export default function Summarization() {
  const [sourceText, setSourceText] = useState('');
  const [summaryType, setSummaryType] = useState('light');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const theme = useTheme();

  const handleSummarize = async () => {
    if (!sourceText) {
      setError('Please enter text to summarize');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${BE_BASE_URL}/api/summarize`, {
        text: sourceText,
        level: summaryType,
      });
      setSummary(response.data.result);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to summarize text. Please try again.');
      console.error('Summarization error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  return (
    <Box sx={commonStyles.pageContainer}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <SummarizeIcon sx={{ fontSize: 40, mr: 2, color: theme.palette.primary.main }} />
        <Typography variant="h4" sx={commonStyles.title}>
          Text Summarization
        </Typography>
      </Box>

      <Card sx={commonStyles.card}>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              multiline
              rows={6}
              label="Enter text to summarize"
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              required
              sx={commonStyles.inputField}
              InputProps={{
                sx: { fontFamily: '"Roboto Mono", monospace' }
              }}
            />
            <FormControl fullWidth>
              <InputLabel>Summary Type</InputLabel>
              <Select
                value={summaryType}
                label="Summary Type"
                onChange={(e) => setSummaryType(e.target.value)}
                sx={commonStyles.inputField}
              >
                {summaryTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              onClick={handleSummarize}
              disabled={loading}
              fullWidth
              sx={commonStyles.button}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SummarizeIcon />}
            >
              {loading ? 'Summarizing...' : 'Summarize'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {error && (
        <Alert 
          severity="error" 
          sx={{ 
            mt: 3, 
            animation: `${pulse} 0.5s ease-in-out`,
            borderRadius: 2
          }}
        >
          {error}
        </Alert>
      )}

      {summary && (
        <Paper 
          elevation={3} 
          sx={commonStyles.resultContainer}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography 
              variant="h6" 
              sx={{ 
                color: theme.palette.primary.main,
                fontFamily: '"Poppins", sans-serif',
                fontWeight: 600
              }}
            >
              Summary Result
            </Typography>
            <IconButton 
              onClick={handleCopy}
              color={copySuccess ? "success" : "primary"}
              title="Copy to clipboard"
              sx={{
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.1)',
                }
              }}
            >
              <CopyIcon />
            </IconButton>
          </Box>
          <Typography 
            sx={{ 
              whiteSpace: 'pre-wrap',
              lineHeight: 1.6,
              fontSize: '1.1rem',
              fontFamily: '"Roboto Mono", monospace',
              color: theme.palette.text.primary,
              p: 2,
              backgroundColor: 'rgba(0,0,0,0.02)',
              borderRadius: 1
            }}
          >
            {summary}
          </Typography>
          {copySuccess && (
            <Typography 
              variant="caption" 
              color="success.main"
              sx={{ 
                position: 'absolute',
                top: 8,
                right: 48,
                animation: `${fadeIn} 0.3s ease-out`
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