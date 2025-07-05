import React from 'react';
import SongBar from './SongBar';

const RelatedSongs = ({
  data,           // Array of Spotify track objects
  artistId,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div className="flex flex-col">
    <h1 className="font-bold text-3xl text-white">Top Tracks:</h1>

    <div className="mt-6 w-full flex flex-col">
      {data?.map((track, i) => (
        <SongBar
          key={`${artistId}-${track.id}-${i}`}       // Spotify uses `id` instead of `key`
          song={track}                                // Directly pass Spotify's track object
          i={i}
          artistId={artistId}
          isPlaying={isPlaying}
          activeSong={activeSong}
          handlePauseClick={handlePauseClick}
          handlePlayClick={handlePlayClick}
        />
      ))}
    </div>
  </div>
);

export default RelatedSongs;