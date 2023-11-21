export const isAuthenticated = () => {
  // Retrieve the JWT token from localStorage
  const token = localStorage.getItem("token");

  // Check if the token is present and not expired
  if (token) {
    // Decode the token
    const decodedToken = JSON.parse(atob(token.split(".")[1]));

    // Check if the token expiration date is in the future
    const isTokenValid = decodedToken.exp * 1000 > Date.now();

    return isTokenValid;
  }

  return false;
};
