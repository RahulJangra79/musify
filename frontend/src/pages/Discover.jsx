import { useDispatch, useSelector } from "react-redux";
import { useGetTopTracksQuery } from "../redux/services/spotify";
import { Loader, Error, SongCard } from "../components";

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const { data: topTracks, isFetching, error } = useGetTopTracksQuery();

  if (isFetching) return <Loader title="Loading your vibes..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col gap-12">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Discover Vibes</h2>
      </div>

      <div>
        <h2 className="text-2xl font-semibold text-white mb-4">Your Top Tracks</h2>
        <div className="flex flex-wrap gap-8">
          {topTracks?.items?.map((track, i) => (
            <SongCard
              key={track.id}
              song={track}
              i={i}
              data={topTracks.items}
              isPlaying={isPlaying}
              activeSong={activeSong}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Discover;