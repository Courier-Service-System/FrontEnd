import React, { useState } from 'react';
import { TextField, Button, Typography, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage: React.FC = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!input.trim()) {
      setError(true);
    } else {
      setError(false);
      console.log('Submitting reset request for:', input);
      alert('Password reset instructions sent to your email/username!');
      navigate('/login'); // Redirect back to login page after submission
    }
  };

  return (
    <Grid
      container
      style={{ height: '100vh' }}
      alignItems="center"
      justifyContent="center"
      sx={{ backgroundColor: 'linear-gradient(135deg, #e3f2fd, #90caf9)' }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          padding: '30px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 'bold',
            color: '#1976d2',
            marginBottom: '20px',
          }}
        >
          Forgot Password
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#666666',
            marginBottom: '20px',
          }}
        >
          Enter your email or username to reset your password.
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter your email or username"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          error={error}
          helperText={error ? 'Please enter a valid email or username' : ''}
          variant="outlined"
          size="small"
          sx={{
            marginBottom: '20px',
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
            },
          }}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            padding: '10px',
            borderRadius: '8px',
            marginBottom: '10px',
          }}
        >
          Submit
        </Button>
        <Typography variant="body2">
          <a
            href="/login"
            style={{
              textDecoration: 'none',
              color: '#1976d2',
              fontWeight: 'bold',
            }}
          >
            Back to Login
          </a>
        </Typography>
      </Box>
    </Grid>
  );
};

export default ForgotPasswordPage;
