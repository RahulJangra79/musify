import React from 'react';
import { loginEndpoint } from '../../redux/services/spotify';

const Login = () => {

  const redirectUri =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000/callback"
    : "https://spotify-clone-kappa-black.vercel.app/callback";

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-black to-gray-900 p-4">
      <div className="bg-white/10 backdrop-blur-md p-10 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl text-white font-bold mb-6">Welcome to My Spotify App</h1>
        <p className="text-gray-300 mb-8">
          Connect your Spotify account to explore, play, and manage your favorite music.
        </p>
        <a
          href={loginEndpoint}
          className="inline-block bg-green-500 hover:bg-green-400 transition-colors text-white text-lg font-semibold py-3 px-6 rounded-full"
        >
          Log in 
        </a>
      </div>
    </div>
  );
};

export default Login;