import axios from "axios";

export const getUsers = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://localhost:3022/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};
