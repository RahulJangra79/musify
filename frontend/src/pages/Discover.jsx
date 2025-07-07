import { useDispatch, useSelector } from "react-redux";
import { genres } from "../assets/constants";
import {
  useGetTopTracksQuery,
  useGetRecentlyPlayedQuery,
  useGetSavedTracksQuery,
} from "../redux/services/spotify";
import { selectGenreListId } from "../redux/features/playerSlice";
import { Loader, Error, SongCard } from "../components";

const Discover = () => {
  const dispatch = useDispatch();
  const { genreListId, activeSong, isPlaying } = useSelector((state) => state.player);

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

  const genreTitle = genres.find(({ value }) => value === genreListId)?.title || "Vibes";

  if (fetchingTop || fetchingRecent || fetchingSaved)
    return <Loader title="Loading your Spotify vibes..." />;
  if (errorTop || errorRecent || errorSaved) return <Error />;

  return (
    <div className="flex flex-col gap-12">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-white text-left">Discover {genreTitle}</h2>

        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || "POP"}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      {/* 🎧 Top Tracks */}
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

      {/* 🕒 Recently Played */}
      <div>
        <h2 className="text-2xl font-semibold text-white mb-4">Recently Played</h2>
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
        <h2 className="text-2xl font-semibold text-white mb-4">Your Saved Songs</h2>
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