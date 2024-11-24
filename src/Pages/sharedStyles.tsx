import { styled } from "@mui/system";

export const ImageContainer = styled("div")({
  height: "100vh",
  backgroundImage: "linear-gradient(to bottom, #3f51b5, #1e88e5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#fff",
  fontSize: "2rem",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

export const StyledCard = styled("div")({
  boxShadow: "0 8px 24px rgba(0, 0, 0, 0.1)",
  borderRadius: "12px",
  padding: "30px",
  maxWidth: "400px",
  backgroundColor: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});
