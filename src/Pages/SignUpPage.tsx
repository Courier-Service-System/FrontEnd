import React, { useState } from 'react';
import { TextField, Button, Typography, Grid } from '@mui/material';
import { ImageContainer, StyledCard } from './sharedStyles';

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    email: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = () => {
    console.log('Registering user...', formData);
  };

  return (
    <Grid container>
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
            Sign Up
          </Typography>
          <form noValidate autoComplete="off">
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={{ marginBottom: '20px' }}
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={{ marginBottom: '20px' }}
            />
            <TextField
              fullWidth
              label="Permanent Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={{ marginBottom: '20px' }}
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={{ marginBottom: '20px' }}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={{ marginBottom: '20px' }}
            />
            <Button fullWidth variant="contained" color="primary" onClick={handleRegister}>
              Register
            </Button>
          </form>
        </StyledCard>
      </Grid>
    </Grid>
  );
};

export default SignUpPage;
