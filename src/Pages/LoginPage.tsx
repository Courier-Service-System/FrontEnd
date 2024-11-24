import React, { useState } from "react";
import { TextField, Button, Typography, Grid, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ImageContainer, StyledCard } from "./sharedStyles";
import { loginUser } from "../services/authService";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

interface LoginFormValues {
  email: string;
  password: string;
}

interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
  };
}

const LoginPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const formik = useFormik<LoginFormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await loginUser(values);
        console.log("Login successful:", response);
        setError(null);
        localStorage.setItem("role", response.role); // Store role in localStorage
        if (response.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      } catch (err: unknown) {
        const error = err as ErrorResponse;
        console.error("Login error:", error);
        setError(
          error.response?.data?.message || "Login failed. Please try again."
        );
      }
    },
  });

  return (
    <Grid container style={{ height: "100vh" }}>
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
            Login
          </Typography>
          {error && (
            <Alert severity="error" sx={{ marginBottom: "20px" }}>
              {error}
            </Alert>
          )}
          <form onSubmit={formik.handleSubmit} noValidate autoComplete="off">
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
            <Button fullWidth variant="contained" color="primary" type="submit">
              Login
            </Button>
            <Typography
              variant="body2"
              align="center"
              sx={{ marginTop: "15px" }}
            >
              <a href="/forgot-password" style={{ color: "#3f51b5" }}>
                Forgot Password?
              </a>
            </Typography>
            <Typography
              variant="body2"
              align="center"
              sx={{ marginTop: "10px" }}
            >
              New to this platform?{" "}
              <a href="/register-user" style={{ color: "#3f51b5" }}>
                Register as User
              </a>{" "}
              or{" "}
              <a href="/register-admin" style={{ color: "#3f51b5" }}>
                Register as Admin
              </a>
            </Typography>
          </form>
        </StyledCard>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
