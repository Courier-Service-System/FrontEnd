import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  Alert,
  Container,
  Box,
  Paper,
  Chip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosConfig";
import { AxiosError } from "axios";

interface Order {
  id: number;
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  postal_code: string;
  description: string;
  weight: number;
  created_at: string;
}

interface ApiError {
  message: string;
  success: boolean;
}

interface ShippingStatus {
  [orderId: number]: {
    isShipping: boolean;
    isDelivered: boolean;
  };
}

const UserDashboardPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [shippingStatus, setShippingStatus] = useState<ShippingStatus>({});
  const [formValues, setFormValues] = useState({
    first_name: "",
    last_name: "",
    address: "",
    city: "",
    postal_code: "",
    description: "",
    weight: "",
  });
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      const response = await axiosInstance.get("/shipping/my-orders");
      setOrders(response.data.shippings);
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      setError(err.response?.data?.message || "Failed to fetch orders");
      if (err.response?.status === 401) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Add status check effect
  useEffect(() => {
    const checkStatus = () => {
      const savedStatus = localStorage.getItem("shippingStatus");
      if (savedStatus) {
        setShippingStatus(JSON.parse(savedStatus));
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 5000); // Check every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const formDataToSend = {
        ...formValues,
        weight: parseFloat(formValues.weight),
      };

      const response = await axiosInstance.post(
        "/shipping/create",
        formDataToSend
      );

      if (response.data.success) {
        setSuccess("Order placed successfully!");
        setFormValues({
          first_name: "",
          last_name: "",
          address: "",
          city: "",
          postal_code: "",
          description: "",
          weight: "",
        });
        await fetchOrders();
      }
    } catch (error) {
      const err = error as AxiosError<ApiError>;
      setError(err.response?.data?.message || "Failed to place order");
      if (err.response?.status === 401) {
        navigate("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 4, backgroundColor: "#f0f2f5", minHeight: "100vh" }}
    >
      <Paper
        elevation={0}
        sx={{
          backgroundColor: "#fff",
          borderRadius: 2,
          p: 3,
          mb: 4,
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
        }}
      >
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography
            variant="h4"
            sx={{
              color: "#1a237e",
              fontWeight: 700,
              letterSpacing: "-0.5px",
            }}
          >
            User Dashboard
          </Typography>
          <Button
            variant="contained"
            onClick={handleLogout}
            sx={{
              backgroundColor: "#f44336",
              "&:hover": { backgroundColor: "#d32f2f" },
              px: 4,
              py: 1,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Logout
          </Button>
        </Grid>
      </Paper>

      <Grid container spacing={4}>
        {/* Orders List Section */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{ p: 3, backgroundColor: "#fff", borderRadius: 2 }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#1a237e",
                fontWeight: 700,
                mb: 3,
                letterSpacing: "-0.5px",
              }}
            >
              Your Orders
            </Typography>
            {orders.length === 0 ? (
              <Box
                sx={{
                  p: 3,
                  backgroundColor: "#f5f5f5",
                  borderRadius: 2,
                  textAlign: "center",
                }}
              >
                <Typography sx={{ color: "#666" }}>
                  No orders found. Place your first order now!
                </Typography>
              </Box>
            ) : (
              <Box sx={{ maxHeight: "70vh", overflow: "auto", pr: 1 }}>
                {orders.map((order) => (
                  <Card
                    key={order.id}
                    sx={{
                      mb: 2,
                      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                      "&:hover": {
                        boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
                        transform: "translateY(-2px)",
                      },
                      transition: "all 0.3s ease",
                      border: "1px solid #e0e0e0",
                      borderRadius: 2,
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{ borderBottom: "1px solid #eee", pb: 2, mb: 2 }}
                      >
                        <Typography
                          sx={{
                            color: "#1a237e",
                            fontWeight: 600,
                            fontSize: "1.1rem",
                          }}
                        >
                          Order #{order.id}
                        </Typography>
                        <Typography sx={{ color: "#666", fontSize: "0.9rem" }}>
                          {new Date(order.created_at).toLocaleString()}
                        </Typography>
                      </Box>

                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Typography sx={{ color: "#666", mb: 1 }}>
                            <strong>Name:</strong> {order.first_name}{" "}
                            {order.last_name}
                          </Typography>
                          <Typography sx={{ color: "#666", mb: 1 }}>
                            <strong>Address:</strong> {order.address}
                          </Typography>
                          <Typography sx={{ color: "#666", mb: 1 }}>
                            <strong>City:</strong> {order.city}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Typography sx={{ color: "#666", mb: 1 }}>
                            <strong>Postal Code:</strong> {order.postal_code}
                          </Typography>
                          <Typography sx={{ color: "#666", mb: 1 }}>
                            <strong>Weight:</strong> {order.weight} kg
                          </Typography>
                        </Grid>
                      </Grid>

                      <Box
                        sx={{
                          mt: 2,
                          p: 2,
                          backgroundColor: "#f5f5f5",
                          borderRadius: 1,
                        }}
                      >
                        <Typography sx={{ color: "#666" }}>
                          <strong>Description:</strong>
                          <br />
                          {order.description}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          mt: 2,
                          display: "flex",
                          gap: 2,
                          justifyContent: "flex-end",
                        }}
                      >
                        <Chip
                          label={
                            shippingStatus[order.id]?.isShipping
                              ? "On the Way"
                              : "Ready to Ship"
                          }
                          color={
                            shippingStatus[order.id]?.isShipping
                              ? "primary"
                              : "default"
                          }
                          sx={{ minWidth: 110 }}
                        />
                        <Chip
                          label={
                            shippingStatus[order.id]?.isDelivered
                              ? "Delivered"
                              : "Not Delivered"
                          }
                          color={
                            shippingStatus[order.id]?.isDelivered
                              ? "success"
                              : "default"
                          }
                          sx={{ minWidth: 110 }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>

        {/* New Order Form Section */}
        <Grid item xs={12} md={6}>
          <Paper
            elevation={0}
            sx={{ p: 3, backgroundColor: "#fff", borderRadius: 2 }}
          >
            <Typography
              variant="h5"
              sx={{
                color: "#1a237e",
                fontWeight: 700,
                mb: 3,
                letterSpacing: "-0.5px",
              }}
            >
              Place a New Order
            </Typography>

            {success && (
              <Alert severity="success" sx={{ mb: 3 }}>
                {success}
              </Alert>
            )}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    name="first_name"
                    value={formValues.first_name}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                    required
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    name="last_name"
                    value={formValues.last_name}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                    required
                    sx={{ mb: 2 }}
                  />
                </Grid>
              </Grid>

              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formValues.address}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                required
                sx={{ mb: 2 }}
              />

              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="City"
                    name="city"
                    value={formValues.city}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                    required
                    sx={{ mb: 2 }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Postal Code"
                    name="postal_code"
                    value={formValues.postal_code}
                    onChange={handleInputChange}
                    variant="outlined"
                    size="small"
                    required
                    sx={{ mb: 2 }}
                  />
                </Grid>
              </Grid>

              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formValues.description}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                multiline
                rows={3}
                required
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                label="Weight (kg)"
                name="weight"
                type="number"
                value={formValues.weight}
                onChange={handleInputChange}
                variant="outlined"
                size="small"
                required
                sx={{ mb: 3 }}
              />

              <Button
                fullWidth
                variant="contained"
                type="submit"
                disabled={loading}
                sx={{
                  py: 1.5,
                  backgroundColor: "#1a237e",
                  "&:hover": { backgroundColor: "#0d47a1" },
                  textTransform: "none",
                  fontWeight: 600,
                  fontSize: "1rem",
                }}
              >
                {loading ? "Placing Order..." : "Place Order"}
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserDashboardPage;
