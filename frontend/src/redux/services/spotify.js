// const authEndpoint = "https://accounts.spotify.com/authorize";
// const clientId = "2da90d0faec14b62bdb4409dc5728a94";
// const redirectUri = "https://spotify-clone-kappa-black.vercel.app/";
// const scopes = ["user-library-read", "playlist-read-private"];

// export const loginEndpoint = `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(
//   redirectUri
// )}&scope=${encodeURIComponent(scopes.join(" "))}&response_type=code&show_dialog=true`;


const clientId = "2da90d0faec14b62bdb4409dc5728a94";
const redirectUri = "https://spotify-clone-kappa-black.vercel.app/";
const scopes = ["user-library-read", "playlist-read-private"];

export const loginEndpoint = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=code&redirect_uri=${encodeURIComponent(
  redirectUri
)}&scope=${encodeURIComponent(scopes.join(" "))}&show_dialog=true`;
