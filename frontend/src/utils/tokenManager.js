import axios from "axios";

const TOKEN_KEY = "spotify_access_token";
const REFRESH_KEY = "refresh_token";
const TIMESTAMP_KEY = "token_timestamp";
const EXPIRY_TIME = 3600 * 1000; // 1 hour

export const getToken = async () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const refreshToken = localStorage.getItem(REFRESH_KEY);
  const timestamp = localStorage.getItem(TIMESTAMP_KEY);

  const hasExpired = Date.now() - timestamp > EXPIRY_TIME;

  if (hasExpired && refreshToken) {
    try {
      const res = await axios.post(
        "https://musify-vmr4.onrender.com/api/refresh-token",
        {
          refresh_token: refreshToken,
        }
      );

      localStorage.setItem(TOKEN_KEY, res.data.access_token);
      localStorage.setItem(TIMESTAMP_KEY, Date.now());

      return res.data.access_token;
    } catch (err) {
      console.error("❌ Token refresh failed:", err);
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(REFRESH_KEY);
      localStorage.removeItem(TIMESTAMP_KEY);
      window.location.href = "/";

      return null;
    }
  }

  return token;
};
