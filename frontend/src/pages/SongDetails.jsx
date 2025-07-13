import React from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";

import { setActiveSong, playPause } from "../redux/features/playerSlice";

import {
  useGetTrackDetailsQuery,
  useGetRecommendationsQuery,
} from "../redux/services/spotify";

const SongDetails = () => {
  const dispatch = useDispatch();
  const { songid, artistId } = useParams();
  const { activeSong, isPlaying } = useSelector((state) => state.player);

  const {
    data: songData,
    isFetching: isFetchingSongDetails,
    error,
  } = useGetTrackDetailsQuery(songid, {
    skip: !songid,
  });

  const { data: relatedData, isFetching: isFetchingRelatedSongs } =
    useGetRecommendationsQuery(songid, {
      skip: !songid,
    });

  if (isFetchingSongDetails || isFetchingRelatedSongs) {
    return <Loader title="Searching song details" />;
  }

  if (error) return <Error />;

  const handlePauseClick = () => {
    dispatch(playPause(false));
  };

  const handlePlayClick = (song, i) => {
    const playable = song?.preview_url;
    if (!playable) return;

    dispatch(
      setActiveSong(
        {
          ...song,
          title: song.name,
          subtitle: song.artists?.[0]?.name,
          images: { coverart: song.album?.images?.[0]?.url },
          hub: { actions: [{}, { uri: playable }] },
        },
        relatedData?.tracks || [],
        i
      )
    );

    dispatch(playPause(true));
  };

  return (
    <div className="flex flex-col">
      <DetailsHeader artistId={artistId} songData={songData} />

      <div className="mb-10">
        <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
        <p className="text-base text-gray-400 mt-2">
          Sorry, Lyrics not available.
        </p>
      </div>
    </div>
  );
};

export default SongDetails;
