import React, { useState } from "react";
import { TextField, Button, Typography, Grid, Alert } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../services/authService";

const ResetPasswordPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!password.trim()) {
      setError("Please enter a valid password");
    } else {
      try {
        await resetPassword(token!, { password });
        setSuccess(true);
        setError(null);
        setTimeout(() => {
          navigate("/login");
        }, 2000); // Redirect to login page after 2 seconds
      } catch (error) {
        console.error("Reset password error:", error);
        setError("Failed to reset password. Please try again.");
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
          Reset Password
        </Typography>
        {success && (
          <Alert severity="success" sx={{ marginBottom: "20px" }}>
            Password reset successfully! Redirecting to login...
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
          Enter your new password.
        </Typography>
        <TextField
          fullWidth
          placeholder="Enter your new password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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

export default ResetPasswordPage;
