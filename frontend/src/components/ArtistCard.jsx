import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ArtistCard = ({ track }) => {
  const navigate = useNavigate();

  return (
    <div
      className="flex flex-col w-[250px] p-4 hover:bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      onClick={() => navigate(`/artists/${track?.id}`)}
    >
      <img
        alt="artist_img"
        src={track?.images?.[0]?.url} 
        className="w-full h-56 rounded-lg"
      />
      <p className="mt-4 font-semibold text-lg text-white truncate">
        {/* {track?.name} */}
        <Link to={`/artists/${track?.id}`}>{track?.name}</Link>

      </p>
    </div>
  );
};

export default ArtistCard;