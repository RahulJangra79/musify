const express = require("express");
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// app.use(cors());
app.use(cors({ origin: "https://musify-rahul-jangra.vercel.app" }));
app.use(bodyParser.json());

app.post("/api/get-token", async (req, res) => {
  const code = req.body.code;

  try {
    const params = new URLSearchParams();
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", process.env.REDIRECT_URI);

    const authHeader = Buffer.from(
      `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
    ).toString("base64");

    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      params,
      {
        headers: {
          Authorization: `Basic ${authHeader}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Token Error:", error.response.data);
    res.status(400).json({ error: "Failed to get token" });
  }
});

app.get("/api/top-tracks", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  console.log("Token received :", token);

  if (!token) return res.status(401).json({ error: "Missing access token" });

  try {
    const response = await axios.get(
      "https://api.spotify.com/v1/me/top/tracks",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Spotify API error:", error.response?.data || error.message);
    res.status(400).json({ error: "Failed to fetch top tracks" });
  }
});

app.get("/api/recently-played", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/player/recently-played?limit=20",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.json(data);
  } catch (error) {
    console.error(
      "Recently played error:",
      error.response?.data || error.message
    );
    res.status(400).json({ error: "Failed to fetch recently played tracks" });
  }
});

app.get("/api/saved-tracks", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/tracks?limit=20",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.json(data);
  } catch (error) {
    console.error("Saved tracks error:", error.response?.data || error.message);
    res.status(400).json({ error: "Failed to fetch saved tracks" });
  }
});

app.get("/api/top-artists", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  try {
    const { data } = await axios.get(
      "https://api.spotify.com/v1/me/top/artists?limit=10",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    res.json(data);
  } catch (error) {
    console.error("Top artists error:", error.response?.data || error.message);
    res
      .status(error.response?.status || 400)
      .json({ error: "Failed to fetch top artists" });
  }
});

app.get("/api/tracks/:id", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const { id } = req.params;

  try {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/tracks/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    res.json(data);
  } catch (error) {
    console.error(
      "Track details error:",
      error.response?.data || error.message
    );
    res
      .status(error.response?.status || 400)
      .json({ error: "Failed to fetch track details" });
  }
});

app.get("/api/genre-tracks", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const genre = req.query.genre;

  console.log("🛡️ Token received:", token?.slice(0, 10));
  console.log("🎧 Genre received:", genre);

  if (!token || !genre) {
    return res.status(400).json({ error: "Missing token or genre parameter" });
  }

  try {
    const endpoint = `https://api.spotify.com/v1/recommendations`;
    const params = new URLSearchParams({
      seed_genres: genre,
      market: "IN",
      limit: "20",
    });

    console.log("🌍 Final Spotify URL:", `${endpoint}?${params.toString()}`);

    const response = await axios.get(`${endpoint}?${params.toString()}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    res.json(response.data);
  } catch (error) {
    console.error(
      "Genre-based recommendation error:",
      error.response?.data || error.message
    );
    res.status(error.response?.status || 500).json({
      error: "Failed to fetch genre-based recommendations",
      details: error.response?.data || error.message,
    });
  }
});

app.get("/api/artists/:id", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const { id } = req.params;

  if (!token) return res.status(401).json({ error: "Missing access token" });

  try {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/artists/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    res.json(data);
  } catch (error) {
    console.error(
      "Artist details error:",
      error.response?.data || error.message
    );
    res
      .status(error.response?.status || 400)
      .json({ error: "Failed to fetch artist details" });
  }
});

app.get("/api/artists/:id/top-tracks", async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  const { id } = req.params;
  const market = req.query.market || "IN"; // Default to India

  if (!token) return res.status(401).json({ error: "Missing access token" });

  try {
    const { data } = await axios.get(
      `https://api.spotify.com/v1/artists/${id}/top-tracks?market=${market}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    res.json(data);
  } catch (error) {
    console.error(
      "Artist top tracks error:",
      error.response?.data || error.message
    );
    res
      .status(error.response?.status || 400)
      .json({ error: "Failed to fetch artist's top tracks" });
  }
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
