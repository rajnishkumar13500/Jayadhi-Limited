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
import { ContentCopy as CopyIcon, Email as EmailIcon } from '@mui/icons-material';
import axios from 'axios';
import { commonStyles, pulse, fadeIn } from '../styles/common';

const BE_BASE_URL = 'https://jayadhi-limited-be.vercel.app' ;
// const BE_BASE_URL = 'http://localhost:3000' ;


const emailTypes = [
  { value: 'formal', label: 'Formal' },
  { value: 'informal', label: 'Informal' },
  { value: 'urgent', label: 'Urgent' },
];

const priorityLevels = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' },
  { value: 'urgent', label: 'Urgent' },
];

export default function EmailGeneration() {
  const [formData, setFormData] = useState({
    subject: '',
    body: '',
    sender: '',
    receiver: '',
    type: 'professional',
    signature: '',
    priority: 'medium',
    attachments: '',
  });
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const theme = useTheme();

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedEmail);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleGenerateEmail = async () => {
    if (!formData.subject || !formData.body || !formData.sender || !formData.receiver) {
      setError('Please fill in all required fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const attachmentsArray = formData.attachments
        ? formData.attachments.split(',').map(att => att.trim()).filter(att => att.length > 0)
        : [];

      const response = await axios.post(`${BE_BASE_URL}/api/generate-email`, {
        ...formData,
        attachments: attachmentsArray
      });
      setGeneratedEmail(response.data.result);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to generate email. Please try again.');
      console.error('Email generation error:', err);
    } finally {
      setLoading(false);
    }
  };

  const renderGeneratedEmail = () => {
    if (!generatedEmail) return <></>;

    return (
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
            Generated Email
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
        
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            From: {formData.sender}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            To: {formData.receiver}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Subject: {formData.subject}
          </Typography>
          {formData.attachments && (
            <Typography variant="subtitle2" color="text.secondary" gutterBottom>
              Attachments: {formData.attachments}
            </Typography>
          )}
        </Box>

        <Box sx={{ 
          borderTop: 1, 
          borderBottom: 1, 
          borderColor: 'divider',
          py: 2,
          mb: 2
        }}>
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
            {generatedEmail}
          </Typography>
        </Box>

        {formData.signature && (
          <Box sx={{ 
            borderTop: 1, 
            borderColor: 'divider',
            pt: 2
          }}>
            <Typography 
              sx={{ 
                whiteSpace: 'pre-wrap',
                lineHeight: 1.6,
                fontSize: '1rem',
                color: 'text.secondary',
                fontFamily: '"Roboto Mono", monospace'
              }}
            >
              {formData.signature}
            </Typography>
          </Box>
        )}

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
    );
  };

  return (
    <Box sx={commonStyles.pageContainer}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <EmailIcon sx={{ fontSize: 40, mr: 2, color: theme.palette.primary.main }} />
        <Typography variant="h4" sx={commonStyles.title}>
          Email Generation
        </Typography>
      </Box>

      <Card sx={commonStyles.card}>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              fullWidth
              label="Subject"
              placeholder="Enter the main topic or purpose of the email"
              value={formData.subject}
              onChange={handleInputChange('subject')}
              required
              sx={commonStyles.inputField}
              InputProps={{
                sx: { fontFamily: '"Roboto Mono", monospace' }
              }}
            />
            <TextField
              fullWidth
              label="Sender"
              placeholder="Enter your email address"
              value={formData.sender}
              onChange={handleInputChange('sender')}
              required
              sx={commonStyles.inputField}
              InputProps={{
                sx: { fontFamily: '"Roboto Mono", monospace' }
              }}
            />
            <TextField
              fullWidth
              label="Receiver"
              placeholder="Enter recipient's email address"
              value={formData.receiver}
              onChange={handleInputChange('receiver')}
              required
              sx={commonStyles.inputField}
              InputProps={{
                sx: { fontFamily: '"Roboto Mono", monospace' }
              }}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Body"
              placeholder="Write the main content of your email here"
              value={formData.body}
              onChange={handleInputChange('body')}
              required
              sx={commonStyles.inputField}
              InputProps={{
                sx: { fontFamily: '"Roboto Mono", monospace' }
              }}
            />
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Signature"
              placeholder="Enter your name, title, and contact information"
              value={formData.signature}
              onChange={handleInputChange('signature')}
              sx={commonStyles.inputField}
              InputProps={{
                sx: { fontFamily: '"Roboto Mono", monospace' }
              }}
            />
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={formData.type}
                label="Type"
                onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))}
                sx={commonStyles.inputField}
              >
                {emailTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={formData.priority}
                label="Priority"
                onChange={(e) => setFormData((prev) => ({ ...prev, priority: e.target.value }))}
                sx={commonStyles.inputField}
              >
                {priorityLevels.map((level) => (
                  <MenuItem key={level.value} value={level.value}>
                    {level.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Attachment"
              placeholder="Enter the name of the file to attach"
              value={formData.attachments}
              onChange={handleInputChange('attachments')}
              sx={commonStyles.inputField}
              InputProps={{
                sx: { fontFamily: '"Roboto Mono", monospace' }
              }}
            />
            <Button
              variant="contained"
              onClick={handleGenerateEmail}
              disabled={loading}
              fullWidth
              sx={commonStyles.button}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <EmailIcon />}
            >
              {loading ? 'Generating...' : 'Generate Email'}
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

      {renderGeneratedEmail()}
    </Box>
  );
} 