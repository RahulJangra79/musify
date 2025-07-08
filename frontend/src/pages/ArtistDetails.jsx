import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import {
  useGetArtistDetailsQuery,
  useGetArtistTopTracksQuery,
} from "../redux/services/spotify";

const ArtistDetails = () => {
  const dispatch = useDispatch();
  const { id: artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const {
    data: artistData,
    isFetching: isFetchingArtistDetails,
    error: artistError,
  } = useGetArtistDetailsQuery(artistId);

  const {
    data: topTracksData,
    isFetching: isFetchingTopTracks,
    error: topTracksError,
  } = useGetArtistTopTracksQuery(artistId);

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    dispatch(
      setActiveSong({
        song: {
          ...song,
          title: song.name,
          subtitle: song.artists?.[0]?.name,
          images: { coverart: song.album?.images?.[0]?.url },
          hub: { actions: [{}, { uri: song.preview_url || "" }] },
        },
        data: topTracksData?.tracks,
        i,
      })
    );
    dispatch(playPause(true));
  };

  if (isFetchingArtistDetails || isFetchingTopTracks) {
    return <Loader title="Loading artist details..." />;
  }

  if (artistError || topTracksError) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} artistData={artistData} />

      <RelatedSongs
        data={topTracksData?.tracks}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
      />
    </div>
  );
};

export default ArtistDetails;
