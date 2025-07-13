import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";

const SongCard = ({ song, isPlaying, activeSong, i, data }) => {
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = () => {
    dispatch(
      setActiveSong({
        song: {
          ...song,
          title: song.name,
          subtitle: song.artists?.[0]?.name,
          images: { coverart: song.album?.images?.[0]?.url },
          hub: { actions: [{}, { uri: song.preview_url }] },
        },
        data,
        i,
      })
    );

    dispatch(playPause(true));
  };

  const name = song?.name;
  const albumArt = song?.album?.images?.[0]?.url;
  const artistName = song?.artists?.[0]?.name;
  const artistId = song?.artists?.[0]?.id;

  return (
    <div
      className="flex flex-col w-[200px] p-3 hover:bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slideup rounded-lg cursor-pointer"
      onClick={handlePlayClick}
    >
      <div className="relative w-full group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.id === song?.id
              ? "flex bg-black bg-opacity-70"
              : "hidden"
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img
          alt="song_img"
          src={albumArt}
          className="w-full h-full object-cover rounded"
        />
      </div>

      <div className="mt-1 flex flex-col">
        <p className="font-semibold text-md text-white truncate">
          <Link to={`/songs/${song.id}`}>{name}</Link>
        </p>
        <p className="text-sm truncate text-gray-300">
          <Link to={`/artists/${artistId || "#"}`}>
            {artistName || "Unknown Artist"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SongCard;
