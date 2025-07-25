import { Link } from "react-router-dom";
import PlayPause from "./PlayPause";

const SongBar = ({
  song,
  i,
  artistId,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => {
  return (
    <div
      className={`w-full flex flex-row items-center hover:bg-[#4c4c4c] ${
        activeSong?.id === song?.id ? "bg-[#4c4c4c]" : "bg-transparent"
      } p-2 rounded-lg cursor-pointer mb-2`}
    >
      <div className="flex-1 flex flex-row justify-between items-center">
        <img
          className="w-20 h-20 rounded-lg"
          src={song?.album?.images?.[0]?.url}
          alt={song?.name}
        />
        <div className="flex-1 flex flex-col justify-center mx-3">
          <Link to={`/songs/${song?.id}`} onClick={(e) => e.stopPropagation()}>
            <p className="text-xl font-bold text-white">{song?.name}</p>
          </Link>

          <Link to={`/artists/${artistId || "#"}`}>
            <p className="text-base text-gray-300 mt-1">
              {song?.artists?.[0]?.name || "Unknown Artist"}
            </p>
          </Link>
        </div>
      </div>

      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={() => handlePlayClick(song, i)}
      />
    </div>
  );
};

export default SongBar;
