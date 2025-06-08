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
      // Convert attachments string to array, filtering out empty strings
      const attachmentsArray = formData.attachments
        ? formData.attachments.split(',').map(att => att.trim()).filter(att => att.length > 0)
        : [];

      const response = await axios.post('http://localhost:3000/api/generate-email', {
        ...formData,
        attachments: attachmentsArray
      });
       // console.log(response);
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
        sx={{ 
          p: 3, 
          mb: 2, 
          backgroundColor: '#f8f9fa',
          position: 'relative'
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6" color="primary">
            Generated Email
          </Typography>
          <IconButton 
            onClick={handleCopy}
            color={copySuccess ? "success" : "primary"}
            title="Copy to clipboard"
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
              fontFamily: 'monospace'
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
                color: 'text.secondary'
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
              right: 48
            }}
          >
            Copied!
          </Typography>
        )}
      </Paper>
    );
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom>
        Email Generation
      </Typography>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              fullWidth
              label="Subject"
              placeholder="Enter the main topic or purpose of the email"
              value={formData.subject}
              onChange={handleInputChange('subject')}
              required
              helperText="The main topic or purpose of your email (e.g., 'Meeting Request', 'Project Update')"
            />
            <TextField
              fullWidth
              label="Sender"
              placeholder="Enter your email address"
              value={formData.sender}
              onChange={handleInputChange('sender')}
              required
              helperText="Your email address that will appear as the sender (e.g., 'john.doe@company.com')"
            />
            <TextField
              fullWidth
              label="Receiver"
              placeholder="Enter recipient's email address"
              value={formData.receiver}
              onChange={handleInputChange('receiver')}
              required
              helperText="The email address of the person or team you're sending this to"
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
              helperText="The main content of your email. Be clear and concise about your message"
            />
            <TextField
              fullWidth
              multiline
              rows={2}
              label="Signature"
              placeholder="Enter your name, title, and contact information"
              value={formData.signature}
              onChange={handleInputChange('signature')}
              helperText="Your professional signature including name, title, and contact details"
            />
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={formData.type}
                label="Type"
                onChange={(e) => setFormData((prev) => ({ ...prev, type: e.target.value }))}
              >
                {emailTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Choose the tone and style of your email (e.g., Formal for business, Urgent for immediate attention)
              </Typography>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Priority</InputLabel>
              <Select
                value={formData.priority}
                label="Priority"
                onChange={(e) => setFormData((prev) => ({ ...prev, priority: e.target.value }))}
              >
                {priorityLevels.map((level) => (
                  <MenuItem key={level.value} value={level.value}>
                    {level.label}
                  </MenuItem>
                ))}
              </Select>
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                Set the importance level of your email (e.g., High for critical matters, Low for general updates)
              </Typography>
            </FormControl>
            <TextField
              fullWidth
              label="Attachment"
              placeholder="Enter the name of the file to attach"
              value={formData.attachments}
              onChange={handleInputChange('attachments')}
              helperText="Name of the file you want to attach (e.g., 'report.pdf', 'meeting_notes.docx')"
            />
            <Button
              variant="contained"
              onClick={handleGenerateEmail}
              disabled={loading}
              fullWidth
            >
              {loading ? <CircularProgress size={24} /> : 'Generate Email'}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {renderGeneratedEmail()}
    </Box>
  );
} 