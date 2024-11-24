import React, { useState } from "react";
import { TextField, Button, Typography, Grid, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ImageContainer, StyledCard } from "./sharedStyles";
import { registerUser } from "../services/authService";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  first_name: yup.string().required("First name is required"),
  last_name: yup.string().required("Last name is required"),
  address: yup.string().required("Address is required"),
  telephone_number: yup
    .string()
    .required("Phone number is required")
    .matches(/^[0-9]+$/, "Phone number is not valid"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
  nic: yup.string().required("NIC is required"),
});

interface AdminSignUpFormValues {
  first_name: string;
  last_name: string;
  address: string;
  telephone_number: string;
  email: string;
  password: string;
  nic: string;
}

interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const AdminSignUpPage: React.FC = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const formik = useFormik<AdminSignUpFormValues>({
    initialValues: {
      first_name: "",
      last_name: "",
      address: "",
      telephone_number: "",
      email: "",
      password: "",
      nic: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const userData = { ...values, role: "admin" };
        const response = await registerUser(userData);
        console.log("Registration successful:", response);
        setSuccess(true);
        setError(null);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } catch (err: unknown) {
        const error = err as ErrorResponse;
        console.error("Registration error:", error);
        setError(
          error.response?.data?.message ||
            "Registration failed. Please try again."
        );
        setSuccess(false);
      }
    },
  });

  return (
    <Grid container>
      <Grid item xs={12} md={6}>
        <ImageContainer>Join Our Platform!</ImageContainer>
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f7f8fa",
        }}
      >
        <StyledCard>
          <Typography variant="h5" align="center" gutterBottom>
            Admin Sign Up
          </Typography>
          {success && (
            <Alert severity="success" sx={{ marginBottom: "20px" }}>
              Account created successfully! Redirecting to login...
            </Alert>
          )}
          {error && (
            <Alert severity="error" sx={{ marginBottom: "20px" }}>
              {error}
            </Alert>
          )}
          <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
            <TextField
              fullWidth
              label="First Name"
              name="first_name"
              value={formik.values.first_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.first_name && Boolean(formik.errors.first_name)
              }
              helperText={formik.touched.first_name && formik.errors.first_name}
              variant="outlined"
              size="small"
              sx={{ marginBottom: "20px" }}
            />
            <TextField
              fullWidth
              label="Last Name"
              name="last_name"
              value={formik.values.last_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.last_name && Boolean(formik.errors.last_name)
              }
              helperText={formik.touched.last_name && formik.errors.last_name}
              variant="outlined"
              size="small"
              sx={{ marginBottom: "20px" }}
            />
            <TextField
              fullWidth
              label="Permanent Address"
              name="address"
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.address && Boolean(formik.errors.address)}
              helperText={formik.touched.address && formik.errors.address}
              variant="outlined"
              size="small"
              sx={{ marginBottom: "20px" }}
            />
            <TextField
              fullWidth
              label="Phone Number"
              name="telephone_number"
              value={formik.values.telephone_number}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.telephone_number &&
                Boolean(formik.errors.telephone_number)
              }
              helperText={
                formik.touched.telephone_number &&
                formik.errors.telephone_number
              }
              variant="outlined"
              size="small"
              sx={{ marginBottom: "20px" }}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              variant="outlined"
              size="small"
              sx={{ marginBottom: "20px" }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              variant="outlined"
              size="small"
              sx={{ marginBottom: "20px" }}
            />
            <TextField
              fullWidth
              label="NIC"
              name="nic"
              value={formik.values.nic}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.nic && Boolean(formik.errors.nic)}
              helperText={formik.touched.nic && formik.errors.nic}
              variant="outlined"
              size="small"
              sx={{ marginBottom: "20px" }}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                marginBottom: "15px",
                backgroundColor: "#1976d2",
                "&:hover": {
                  backgroundColor: "#1565c0",
                },
              }}
            >
              Register
            </Button>
          </form>
          <Typography
            variant="body2"
            align="center"
            sx={{
              marginTop: "10px",
              color: "#666",
            }}
          >
            Already have an account?{" "}
            <Button
              href="/login"
              sx={{
                textTransform: "none",
                color: "#1976d2",
                padding: "0 4px",
                "&:hover": {
                  backgroundColor: "transparent",
                  textDecoration: "underline",
                },
              }}
            >
              Login here
            </Button>
          </Typography>
        </StyledCard>
      </Grid>
    </Grid>
  );
};

export default AdminSignUpPage;
