export const getUserData = async (token) => {
  try {
    // Decode the token
    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    // Access the user ID
    const userId = decodedToken.userId;
    // Make a fetch request using the user ID
    const response = await fetch(`http://localhost:5000/api/users/${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};
