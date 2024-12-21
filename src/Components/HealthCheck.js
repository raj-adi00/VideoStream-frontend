import axios from "axios";
// const BACKEND_URL = "http://localhost:8000";
const BACKEND_URL = "https://videostream-production-3c23.up.railway.app";
const checkBackendHealth = async (retries = 15, interval = 3000) => {
  while (retries > 0) {
    try {
      console.log(`Checking backend readiness... (${10 - retries + 1})`);
      if (retries == 10) interval = 4000;
      if (retries == 5) interval = 5000;
      const response = await axios.get(`${BACKEND_URL}/health`);
      if (response.status === 200) {
        console.log("Backend is ready!");
        return true; // Backend is ready
      }
    } catch (error) {
      console.error("Backend not ready yet:", error.message);
    }
    retries--;
    if (retries > 0)
      await new Promise((resolve) => setTimeout(resolve, interval));
  }

  console.error("Backend is not ready after retries.");
  return false; // Backend is not ready
};

export default checkBackendHealth;
