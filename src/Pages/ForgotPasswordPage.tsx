import React, { useState } from "react";
import { TextField, Button, Typography, Grid, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../services/authService";

const ForgotPasswordPage: React.FC = () => {
  const [input, setInput] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!input.trim()) {
      setError("Please enter a valid email or username");
    } else {
      try {
        await forgotPassword({ email: input });
        setSuccess(true);
        setError(null);
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Redirect to login page after 2 seconds
      } catch (error) {
        console.error("Forgot password error:", error);
        setError("Failed to send reset instructions. Please try again.");
        setSuccess(false);
      }
    }
  };

  return (
    <Grid
      container
      style={{ height: "100vh" }}
      alignItems="center"
      justifyContent="center"
      sx={{ backgroundColor: "linear-gradient(135deg, #e3f2fd, #90caf9)" }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          padding: "30px",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: "bold",
            color: "#1976d2",
            marginBottom: "20px",
          }}
        >
          Forgot Password
        </Typography>
        {success && (
          <Alert severity="success" sx={{ marginBottom: "20px" }}>
            Password reset instructions sent! Redirecting to login...
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ marginBottom: "20px" }}>
            {error}
          </Alert>
        )}
        <Typography
          variant="body2"
          sx={{
            color: "#666666",
            marginBottom: "20px",
          }}
        >
          Enter your email or username to reset your password.
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter your email or username"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          error={!!error}
          helperText={error}
          variant="outlined"
          size="small"
          sx={{
            marginBottom: "20px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          sx={{
            textTransform: "none",
            fontWeight: "bold",
            padding: "10px",
            borderRadius: "8px",
            marginBottom: "10px",
          }}
        >
          Submit
        </Button>
        <Typography variant="body2">
          <a
            href="/login"
            style={{
              textDecoration: "none",
              color: "#1976d2",
              fontWeight: "bold",
            }}
          >
            Back to Login
          </a>
        </Typography>
      </div>
    </Grid>
  );
};

export default ForgotPasswordPage;
