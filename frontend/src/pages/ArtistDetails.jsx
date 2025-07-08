import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import {
  useGetArtistDetailsQuery,
  useGetArtistTopTracksQuery,
} from "../redux/services/spotify";

const ArtistDetails = () => {
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

  if (isFetchingArtistDetails || isFetchingTopTracks) {
    return <Loader title="Loading artist details..." />;
  }

  if (artistError || topTracksError) {
    return <Error />;
  }

  return (
    <div className="flex flex-col">
      <DetailsHeader 
      artistId={artistId} 
      artistData={artistData} 
      />

      <RelatedSongs
        data={topTracksData?.tracks}
        artistId={artistId}
        isPlaying={isPlaying}
        activeSong={activeSong}
      />
    </div>
  );
};

export default ArtistDetails;
