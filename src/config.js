// Configuration for your local API
const API_URL = 'https://localhost:7119/'; // Base URL for your local API

// Endpoints
const MENU_BASE_URL = `${API_URL}/with-menus`; // Endpoint for the "Menu" path

// Example of other endpoints if needed in the future
// const USERS_BASE_URL = `${API_URL}api/Users`;

// Placeholder for future authentication if applicable
const API_KEY = process.env.REACT_APP_API_KEY; // Only if your API uses keys

// Exported constants
export {
  MENU_BASE_URL,
  API_URL,
  API_KEY,
};
