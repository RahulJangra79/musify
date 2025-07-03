import { useDispatch, useSelector } from "react-redux";
import { useGetTopTracksQuery, useGetRecentlyPlayedQuery, useGetSavedTracksQuery } from "../redux/services/spotify";
import { Loader, Error, SongCard } from "../components";

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const {
    data: topTracks,
    isFetching: fetchingTop,
    error: errorTop,
  } = useGetTopTracksQuery();

  const {
    data: recent,
    isFetching: fetchingRecent,
    error: errorRecent,
  } = useGetRecentlyPlayedQuery();

  const {
    data: saved,
    isFetching: fetchingSaved,
    error: errorSaved,
  } = useGetSavedTracksQuery();

  if (fetchingTop || fetchingRecent || fetchingSaved) return <Loader title="Loading your Spotify vibes..." />;
  if (errorTop || errorRecent || errorSaved) return <Error />;

  return (
    <div className="flex flex-col gap-12">

      {/* 🎧 Top Tracks */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">Your Top Tracks</h2>
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

      {/* 🕒 Recently Played */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">Recently Played</h2>
        <div className="flex flex-wrap gap-8">
          {recent?.items?.map(({ track }, i) => (
            <SongCard
              key={track.id}
              song={track}
              i={i}
              data={recent.items.map(item => item.track)}
              isPlaying={isPlaying}
              activeSong={activeSong}
            />
          ))}
        </div>
      </div>

      {/* 💾 Saved Songs */}
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">Your Saved Songs</h2>
        <div className="flex flex-wrap gap-8">
          {saved?.items?.map(({ track }, i) => (
            <SongCard
              key={track.id}
              song={track}
              i={i}
              data={saved.items.map(item => item.track)}
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