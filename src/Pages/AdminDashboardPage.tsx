import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Alert,
  Container,
  Box,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../services/axiosConfig";
import SearchIcon from "@mui/icons-material/Search";

interface Order {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  address: string;
  city: string;
  postal_code: string;
  description: string;
  weight: number;
  created_at: string;
}

interface ShippingStatus {
  [orderId: number]: {
    isShipping: boolean;
    isDelivered: boolean;
  };
}

const AdminDashboardPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchId, setSearchId] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [success] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [shippingStatus, setShippingStatus] = useState<ShippingStatus>(() => {
    const savedStatus = localStorage.getItem("shippingStatus");
    return savedStatus ? JSON.parse(savedStatus) : {};
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/shipping/all-orders");
      setOrders(response.data.orders);
      setError(null);
    } catch (error) {
      console.error("Fetch orders error:", error);
      setError("Failed to fetch orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleShippingToggle = (orderId: number) => {
    setShippingStatus((prevStatus) => {
      const newStatus = {
        ...prevStatus,
        [orderId]: {
          isShipping: !prevStatus[orderId]?.isShipping,
          isDelivered: prevStatus[orderId]?.isDelivered || false,
        },
      };
      localStorage.setItem("shippingStatus", JSON.stringify(newStatus));
      return newStatus;
    });
  };

  const handleDeliveredToggle = (orderId: number) => {
    setShippingStatus((prevStatus) => {
      const newStatus = {
        ...prevStatus,
        [orderId]: {
          isShipping: prevStatus[orderId]?.isShipping || false,
          isDelivered: !prevStatus[orderId]?.isDelivered,
        },
      };
      localStorage.setItem("shippingStatus", JSON.stringify(newStatus));
      return newStatus;
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleSearch = async () => {
    if (!searchId) {
      setError("Please enter an order ID to search.");
      return;
    }

    setLoading(true);
    try {
      const response = await axiosInstance.get(`/shipping/search/${searchId}`);
      setOrders([response.data.order]);
      setError(null);
    } catch (error) {
      console.error("Search order error:", error);
      setError("Order not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSearchId("");
    fetchOrders();
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ py: 4, backgroundColor: "#f0f2f5", minHeight: "100vh" }}
    >
      {}
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
            Admin Dashboard
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

      {/* Alerts */}
      <Box sx={{ mb: 3 }}>
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
      </Box>

      {/* Search Section */}
      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Search Order by ID"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
              variant="outlined"
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleSearch}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ backgroundColor: "#fff" }}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSearch}
              disabled={loading}
              sx={{
                py: 1,
                backgroundColor: "#1a237e",
                "&:hover": { backgroundColor: "#0d47a1" },
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              {loading ? "Searching..." : "Search"}
            </Button>
          </Grid>
          <Grid item xs={6} md={3}>
            <Button
              fullWidth
              variant="outlined"
              onClick={handleReset}
              sx={{
                py: 1,
                borderColor: "#1a237e",
                color: "#1a237e",
                "&:hover": {
                  borderColor: "#0d47a1",
                  backgroundColor: "rgba(26, 35, 126, 0.04)",
                },
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Orders Table */}
      <Paper elevation={0} sx={{ borderRadius: 2 }}>
        <TableContainer sx={{ maxHeight: "60vh" }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    backgroundColor: "#1a237e",
                    color: "#fff",
                  }}
                >
                  Order ID
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    backgroundColor: "#1a237e",
                    color: "#fff",
                  }}
                >
                  User ID
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    backgroundColor: "#1a237e",
                    color: "#fff",
                  }}
                >
                  Name
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    backgroundColor: "#1a237e",
                    color: "#fff",
                  }}
                >
                  Address
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    backgroundColor: "#1a237e",
                    color: "#fff",
                  }}
                >
                  City
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    backgroundColor: "#1a237e",
                    color: "#fff",
                  }}
                >
                  Postal Code
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    backgroundColor: "#1a237e",
                    color: "#fff",
                  }}
                >
                  Description
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    backgroundColor: "#1a237e",
                    color: "#fff",
                  }}
                >
                  Weight
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    backgroundColor: "#1a237e",
                    color: "#fff",
                  }}
                >
                  Shipping Status
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: 600,
                    backgroundColor: "#1a237e",
                    color: "#fff",
                  }}
                >
                  Delivery Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  key={order.id}
                  sx={{
                    "&:nth-of-type(odd)": { backgroundColor: "#f5f5f5" },
                    "&:hover": { backgroundColor: "#e3f2fd" },
                    transition: "background-color 0.2s",
                  }}
                >
                  <TableCell sx={{ fontWeight: 500 }}>{order.id}</TableCell>
                  <TableCell>{order.user_id}</TableCell>
                  <TableCell>{`${order.first_name} ${order.last_name}`}</TableCell>
                  <TableCell>{order.address}</TableCell>
                  <TableCell>{order.city}</TableCell>
                  <TableCell>{order.postal_code}</TableCell>
                  <TableCell>{order.description}</TableCell>
                  <TableCell>{order.weight} kg</TableCell>
                  <TableCell>
                    <Button
                      variant={
                        shippingStatus[order.id]?.isShipping
                          ? "contained"
                          : "outlined"
                      }
                      onClick={() => handleShippingToggle(order.id)}
                      color={
                        shippingStatus[order.id]?.isShipping
                          ? "primary"
                          : "inherit"
                      }
                      sx={{ width: "120px" }}
                    >
                      {shippingStatus[order.id]?.isShipping
                        ? "On the Way"
                        : "Ready to Ship"}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant={
                        shippingStatus[order.id]?.isDelivered
                          ? "contained"
                          : "outlined"
                      }
                      onClick={() => handleDeliveredToggle(order.id)}
                      color={
                        shippingStatus[order.id]?.isDelivered
                          ? "success"
                          : "inherit"
                      }
                      disabled={!shippingStatus[order.id]?.isShipping}
                      sx={{ width: "120px" }}
                    >
                      {shippingStatus[order.id]?.isDelivered
                        ? "Delivered"
                        : "Not Delivered"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {orders.length === 0 && !loading && (
          <Box sx={{ p: 3, textAlign: "center" }}>
            <Typography sx={{ color: "#666" }}>No orders found</Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default AdminDashboardPage;
