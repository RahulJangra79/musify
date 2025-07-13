// import { useDispatch, useSelector } from "react-redux";
// import { useGetTopTracksQuery } from "../redux/services/spotify";
// import { Loader, Error, SongCard } from "../components";

// import { selectGenreListId } from '../redux/features/playerSlice';
// import { useGetGenreTracksQuery } from "../redux/spotifyApi";
// import { genres } from '../assets/constants';

// const Discover = () => {
//   const dispatch = useDispatch();
//   const { activeSong, isPlaying } = useSelector((state) => state.player);

//   const { data: topTracks, isFetching, error } = useGetTopTracksQuery();

//   if (isFetching) return <Loader title="Loading your vibes..." />;
//   if (error) return <Error />;

//   const genreTitle = genres.find(({ value }) => value === genreListId)?.title;

//   return (
//     <div className="flex flex-col gap-12">
//       <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
//         <h2 className="font-bold text-3xl text-white text-left">
//           Discover {genreTitle}
//         </h2>
//         <select
//           onChange={(e) => dispatch(selectGenreListId(e.target.value))}
//           value={genreListId || "pop"}
//           className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
//         >
//           {genres.map((genre) => (
//             <option key={genre.value} value={genre.value}>
//               {genre.title}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <h2 className="text-2xl font-semibold text-white mb-4">
//           Your Top Tracks
//         </h2>
//         <div className="flex flex-wrap">
//           {topTracks?.items?.map((track, i) => (
//             <SongCard
//               key={track.id}
//               song={track}
//               i={i}
//               data={topTracks.items}
//               isPlaying={isPlaying}
//               activeSong={activeSong}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Discover;

import { useDispatch, useSelector } from "react-redux";
import {
  useGetTopTracksQuery,
  useGetGenreTracksQuery,
} from "../redux/services/spotify";
import { Loader, Error, SongCard } from "../components";
import { genres } from "../assets/constants";
import { selectGenreListId } from "../redux/features/playerSlice";

const Discover = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player
  );

  const {
    data: topTracks,
    isFetching: isFetchingTop,
    error: errorTop,
  } = useGetTopTracksQuery();

  const {
    data: genreTracks,
    isFetching: isFetchingGenre,
    error: errorGenre,
  } = useGetGenreTracksQuery(genreListId, {
    skip: !genreListId,
  });

  const genreTitle =
    genres.find(({ value }) => value === genreListId)?.title || "";

  // 🔍 Debug genre selection and query triggering
  console.log("🎧 Selected Genre ID:", genreListId);

  const token = localStorage.getItem("spotify_access_token");
  console.log("🛡️ Stored access token (first 10 chars):", token?.slice(0, 10));

  console.log("🔄 Genre tracks fetching:", isFetchingGenre);
  console.log("❌ Genre track error:", errorGenre);
  console.log("🎵 Genre track response:", genreTracks);
  
  return (
    <div className="flex flex-col gap-12">
      <div className="flex justify-between mt-8">
        <h2 className="text-2xl font-bold text-white mb-4">
          Discover by Genre
        </h2>
        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || ""}
          className="bg-black text-gray-300 p-3 text-sm rounded-lg outline-none"
        >
          <option value="" disabled>
            Select your vibe
          </option>
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      {genreListId && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-white mb-4">
            Recommended {genreTitle} Tracks
          </h2>
          {isFetchingGenre ? (
            <Loader title={`Loading ${genreTitle} tracks...`} />
          ) : errorGenre ? (
            <Error />
          ) : (
            <div className="flex flex-wrap gap-6">
              {genreTracks?.tracks?.map((track, i) => (
                <SongCard
                  key={track.id}
                  song={track}
                  i={i}
                  data={genreTracks.items}
                  isPlaying={isPlaying}
                  activeSong={activeSong}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Your Top Tracks</h2>
        {isFetchingTop ? (
          <Loader title="Loading your vibes..." />
        ) : errorTop ? (
          <Error />
        ) : (
          <div className="flex flex-wrap">
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
        )}
      </div>
    </div>
  );
};

export default Discover;
