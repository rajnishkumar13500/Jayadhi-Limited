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

const BE_BASE_URL = 'https://jayadhi-limited-be.vercel.app';

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
       // console.log(response);
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
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Text Summarization
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              multiline
              rows={6}
              label="Enter text to summarize"
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              required
              helperText="Enter the text you want to summarize"
            />
            <FormControl fullWidth>
              <InputLabel>Summary Type</InputLabel>
              <Select
                value={summaryType}
                label="Summary Type"
                onChange={(e) => setSummaryType(e.target.value)}
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
            >
              {loading ? <CircularProgress size={24} /> : 'Summarize'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {summary && (
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
              Summary Result
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
              fontSize: '1.1rem',
              fontFamily: summaryType === 'bullet' ? 'monospace' : 'inherit'
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