import { FaPauseCircle, FaPlayCircle } from "react-icons/fa";

const PlayPause = ({ isPlaying, activeSong, song, handlePause, handlePlay }) =>
  isPlaying && activeSong?.id === song.id ? (
    <FaPauseCircle size={35} className="text-gray-300" onClick={handlePause} />
  ) : (
    // <FaPlayCircle
    //   size={35}
    //   className="text-gray-300"
    //   onClick={handlePlay}
    // />
    <FaPlayCircle
      size={35}
      className="text-gray-300"
      onClick={(e) => {
        e.stopPropagation();
        handlePlay();
      }}
    />
  );

export default PlayPause;
