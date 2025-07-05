import { Link } from 'react-router-dom';

const DetailsHeader = ({ artistId, artistData, trackData }) => (
  <div className="relative w-full flex flex-col">
    <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />

    <div className="absolute inset-0 flex items-center">
      <img
        alt="profile"
        src={
          artistId
            ? artistData?.images?.[0]?.url  // Spotify artist image
            : trackData?.album?.images?.[0]?.url // Track's album cover
        }
        className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
      />

      <div className="ml-5">
        <p className="font-bold sm:text-3xl text-xl text-white">
          {artistId ? artistData?.name : trackData?.name}
        </p>

        {!artistId && (
          <Link to={`/artists/${trackData?.artists?.[0]?.id}`}>
            <p className="text-base text-gray-400 mt-2">{trackData?.artists?.[0]?.name}</p>
          </Link>
        )}

        <p className="text-base text-gray-400 mt-2">
          {artistId
            ? artistData?.genres?.[0]  // Spotify returns an array of genres
            : trackData?.album?.release_date?.split('-')[0]} {/* Fallback to release year */}
        </p>
      </div>
    </div>

    <div className="w-full sm:h-44 h-24" />
  </div>
);

export default DetailsHeader;