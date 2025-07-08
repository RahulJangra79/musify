import { useSelector } from "react-redux";
import { useGetRecentlyPlayedQuery } from "../redux/services/spotify";
import { Loader, Error, SongCard } from "../components";

const RecentlyPlayed = () => {
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetRecentlyPlayedQuery();

  if (isFetching) return <Loader title="Loading Recently Played..." />;
  if (error) return <Error />;

  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-bold text-white mb-6">Recently Played</h2>
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

export default RecentlyPlayed;