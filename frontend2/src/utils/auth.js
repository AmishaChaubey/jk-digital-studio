export const isAdminLoggedIn = () => {
  return !!localStorage.getItem("token");
};