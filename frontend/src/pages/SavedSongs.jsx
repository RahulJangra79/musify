import { useSelector } from "react-redux";
import { useGetSavedTracksQuery } from "../redux/services/spotify";
import { Loader, Error, SongCard } from "../components";

const SavedSongs = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSavedTracksQuery();

  if (isFetching) return <Loader title="Loading Saved Songs..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-white mb-6">Your Saved Songs</h2>
      <div className="flex flex-wrap gap-8">
        {data?.items?.map(({ track }, i) => (
          <SongCard
            key={track.id}
            song={track}
            i={i}
            data={data.items.map(item => item.track)}
            isPlaying={isPlaying}
            activeSong={activeSong}
          />
        ))}
      </div>
    </div>
  );
};

export default SavedSongs;