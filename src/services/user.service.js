import apiClient from "@/lib/apiClient";

// Frontend user service matching backend endpoints
export const userService = {
  async getProfile() {
    const { data } = await apiClient.get("/user/profile");
    return data; // user object
  },

  async updateProfile(payload) {
    const { data } = await apiClient.patch("/user/profile", payload);
    return data; // { user, message }
  },

  async changePassword({ currentPassword, newPassword }) {
    const { data } = await apiClient.post("/user/password/change", {
      currentPassword,
      newPassword,
    });
    return data; // { message }
  },
};
