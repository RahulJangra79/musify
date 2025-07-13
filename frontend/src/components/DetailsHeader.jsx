import { Link } from "react-router-dom";

const DetailsHeader = ({ artistId, artistData, songData }) => {
  const profileImage = artistId
    ? artistData?.images?.[0]?.url
    : songData?.album?.images?.[0]?.url;

  const displayName = artistId ? artistData?.name : songData?.name;

  const genreOrYear = artistId
    ? artistData?.genres?.[0]
    : songData?.album?.release_date?.split("-")[0];

  const followers = artistData?.followers?.total?.toLocaleString();
  return (
    <div className="relative w-full flex flex-col">
      <div className="w-full bg-gradient-to-l from-transparent to-black sm:h-48 h-28" />

      {/* <div className="absolute inset-0 items-center">
        <img
          alt="profile"
          src={profileImage}
          // className="sm:w-48 w-28 sm:h-48 h-28 rounded-full object-cover border-2 shadow-xl shadow-black"
          className="w-full sm:h-48 h-56 object-cover border-2 shadow-xl shadow-black"
        />

        <div className="ml-5">
          <p className="font-bold sm:text-3xl text-xl text-white">
            {displayName}
          </p>

          {!artistId && (
            <Link to={`/artists/${songData?.artists?.[0]?.id}`}>
              <p className="text-base text-gray-400 mt-2">
                {songData?.artists?.[0]?.name}
              </p>
            </Link>
          )}

          <p className="text-base text-gray-400 mt-2">{genreOrYear}</p>

          {artistId && (
            <p className="text-sm text-gray-300 mt-1">
              Followers:{" "}
              <span className="font-semibold text-white">{followers}</span>
            </p>
          )}
        </div>
      </div> */}

      <div className="relative w-full flex flex-col">
        {/* Full-width banner image */}
        <img
          alt="profile"
          src={profileImage}
          className="w-full h-[50vh] object-cover shadow-xl shadow-black"
        />

        {/* Info container under image */}
        <div className="mt-6 px-6">
          <p className="font-extrabold text-4xl text-white">{displayName}</p>

          {!artistId && (
            <Link to={`/artists/${songData?.artists?.[0]?.id}`}>
              <p className="text-lg text-gray-400 mt-2">
                {songData?.artists?.[0]?.name}
              </p>
            </Link>
          )}

          <p className="text-lg text-gray-400 mt-2">{genreOrYear}</p>

          {artistId && (
            <p className="text-lg text-gray-300 mt-2">
              Followers:{" "}
              <span className="text-white font-semibold text-xl">
                {followers}
              </span>
            </p>
          )}
        </div>
      </div>

      <div className="w-full sm:h-44 h-24" />
    </div>
  );
};

export default DetailsHeader;
