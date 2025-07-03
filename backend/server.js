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

    const authHeader = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString("base64");

    const response = await axios.post("https://accounts.spotify.com/api/token", params, {
      headers: {
        Authorization: `Basic ${authHeader}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error("Token Error:", error.response.data);
    res.status(400).json({ error: "Failed to get token" });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});