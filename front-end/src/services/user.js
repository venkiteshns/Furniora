import api from "./api.js";

const handleLogin = async (data) => {
  try {
    const response = await api.post("/user/login", data);
    return response.data;
  } catch (error) {
    console.log("Error", error.response?.data || error.message);
  }
};

const handleSignup = async (data) => {
  try {
    const response = await api.post("/user/signup", data);
    return response.data;
  } catch (error) {
    console.log("Error", error.response?.data || error.message);
  }
};

const handleLogoutProfile = async () => {
  try {
    const response = await api.post("/user/logout");
  } catch (error) {
    console.log("Error", error.response?.data || error.message);
  }
};

export { handleLogin, handleSignup, handleLogoutProfile };
