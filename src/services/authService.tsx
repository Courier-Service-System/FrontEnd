import axiosInstance from "./axiosConfig";

interface UserData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  address: string;
  telephone_number: string;
  role: string;
  nic?: string;
}

export const registerUser = async (userData: UserData) => {
  const endpoint =
    userData.role === "admin" ? "/register-admin" : "/register-user";
  const response = await axiosInstance.post(endpoint, userData);
  return response.data;
};

export const loginUser = async (userData: {
  email: string;
  password: string;
}) => {
  const response = await axiosInstance.post("/login", userData);
  return response.data;
};

export const forgotPassword = async (userData: { email: string }) => {
  const response = await axiosInstance.post("/forgot-password", userData);
  return response.data;
};

export const resetPassword = async (
  token: string,
  userData: { password: string }
) => {
  const response = await axiosInstance.post(
    `/reset-password/${token}`,
    userData
  );
  return response.data;
};
