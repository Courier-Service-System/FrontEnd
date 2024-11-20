import React from 'react';
import { TextField, Button, Typography, Grid } from '@mui/material';
import { ImageContainer, StyledCard } from './sharedStyles';

const LoginPage: React.FC = () => {
  const handleLogin = () => {
    console.log('Logging in...');
  };

  return (
    <Grid container style={{ height: '100vh' }}>
      {/* Left Side Image */}
      <Grid item xs={12} md={6}>
        <ImageContainer>
          Join Our Platform!
        </ImageContainer>
      </Grid>

      {/* Right Side Registration Form */}
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#f7f8fa',
        }}
      >
        <StyledCard>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          <form noValidate autoComplete="off">
            <TextField
              fullWidth
              label="Username"
              name="username"
              variant="outlined"
              size="small"
              sx={{ marginBottom: '20px' }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              size="small"
              sx={{ marginBottom: '20px' }}
            />
            <Button fullWidth variant="contained" color="primary" onClick={handleLogin}>
              Login
            </Button>
            <Typography variant="body2" align="center" sx={{ marginTop: '15px' }}>
  <a href="/forgot-password" style={{ color: '#3f51b5' }}>
    Forgot Password?
  </a>
</Typography>

            <Typography
              variant="body2"
              align="center"
              sx={{ marginTop: '10px' }}
            >
              New to this platform?{' '}
              <a href="/register" style={{ color: '#3f51b5' }}>
                Click to Register here
              </a>
            </Typography>
          </form>
        </StyledCard>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
