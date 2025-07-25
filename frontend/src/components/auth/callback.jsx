import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Callback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");

    if (code) {
      fetch("https://musify-vmr4.onrender.com/api/get-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.access_token) {
            const expiresAt = Date.now() + 3600 * 1000; // 1 hour from now
            localStorage.setItem("spotify_access_token", data.access_token);
            localStorage.setItem("spotify_expires_at", expiresAt.toString());

            navigate("/");
          } else {
            console.error("No access token returned:", data);
          }
        })
        .catch((err) => {
          console.error("Token fetch failed", err);
        });
    }
  }, []);


  return <div className="text-white">Authenticating with Spotify...</div>;
};

export default Callback;
