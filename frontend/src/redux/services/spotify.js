const clientId = "2da90d0faec14b62bdb4409dc5728a94";
const redirectUri = "https://musify-rahul-jangra.vercel.app/callback";
const scopes = ["user-library-read", "playlist-read-private"];

export const loginEndpoint = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
  redirectUri
)}&scope=${encodeURIComponent(scopes.join(" "))}&show_dialog=true`;
