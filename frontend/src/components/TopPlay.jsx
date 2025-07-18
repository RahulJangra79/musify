import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";

import PlayPause from "./PlayPause";
import { playPause, setActiveSong } from "../redux/features/playerSlice";
import {
  useGetTopTracksQuery,
  useGetTopArtistsQuery,
} from "../redux/services/spotify";

import "swiper/css";
import "swiper/css/free-mode";

const TopChartCard = ({
  song,
  i,
  isPlaying,
  activeSong,
  handlePauseClick,
  handlePlayClick,
}) => (
  <div
    className={`w-full flex flex-row items-center hover:bg-[#4c4c4c] ${
      activeSong?.name === song?.name ? "bg-[#4c4c4c]" : "bg-transparent"
    } p-2 rounded-lg cursor-pointer`}
  >
    <div className="flex-1 flex flex-row justify-between items-center">
      <img
        className="w-16 h-16 rounded-lg"
        src={song?.album?.images?.[0]?.url}
        alt={song?.name}
      />
      <div className="flex-1 flex flex-col justify-center mx-3">
        <Link to={`/songs/${song.id}`}>
          <p className="text-lg sm:text-md font-bold text-white">
            {song?.name}
          </p>
        </Link>
        <Link to={`/artists/${song?.artists[0]?.id}`}>
          <p className="text-base text-gray-300 mt-1">
            {song?.artists?.[0]?.name}
          </p>
        </Link>
      </div>
    </div>
      <PlayPause
        isPlaying={isPlaying}
        activeSong={activeSong}
        song={song}
        handlePause={handlePauseClick}
        handlePlay={() => handlePlayClick(song, i)}
      />
  </div>
);

const TopPlay = () => {
  const dispatch = useDispatch();
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data } = useGetTopTracksQuery();
  const divRef = useRef(null);

  useEffect(() => {
    divRef.current.scrollIntoView({ behavior: "smooth" });
  });

  const { data: topTracks } = useGetTopTracksQuery();
  const { data: topArtists } = useGetTopArtistsQuery();

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
          hub: { actions: [{}, { uri: song.preview_url }] },
        },
        data,
        i,
      })
    );
    dispatch(playPause(true));
  };

  return (
    <div
      ref={divRef}
      className="xl:ml-6 ml-0 xl:mb-0 mb-6 flex-1 xl:max-w-[400px] max-w-full flex flex-col"
    >
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl sm:text-xl">
            Top Charts
          </h2>
          <Link to="/top-charts">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          {topTracks?.items?.slice(0, 5).map((song, i) => (
            <TopChartCard
              key={song?.id || `${i}-${song?.name}`}
              song={song}
              i={i}
              isPlaying={isPlaying}
              activeSong={activeSong}
              handlePauseClick={handlePauseClick}
              handlePlayClick={handlePlayClick}
            />
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col mt-8 mb-8">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-white font-bold text-2xl sm:text-xl">
            Top Artists
          </h2>
          <Link to="/top-artists">
            <p className="text-gray-300 text-base cursor-pointer">See more</p>
          </Link>
        </div>

        <Swiper
          slidesPerView="auto"
          spaceBetween={15}
          freeMode
          centeredSlides
          centeredSlidesBounds
          modules={[FreeMode]}
          className="mt-4"
        >
          {topArtists?.items?.slice(0, 10).map((artist) => (
            <SwiperSlide
              key={artist?.id}
              style={{ width: "25%", height: "auto" }}
              className="rounded-full animate-slideright"
            >
              <Link to={`/artists/${artist.id}`}>
                <img
                  src={artist?.images?.[0]?.url}
                  alt={artist?.name}
                  className="rounded-full w-[100px] h-[100px] mx-auto object-cover"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default TopPlay;
