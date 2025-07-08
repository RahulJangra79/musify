import { useSelector } from 'react-redux';
import { Route, Routes, useLocation } from 'react-router-dom';

import { Searchbar, Sidebar, MusicPlayer, TopPlay } from './components';
import {
  ArtistDetails,
  TopArtists,
  AroundYou,
  Discover,
  Search,
  SongDetails,
  TopCharts,
} from './pages';
import Login from './components/auth/Login';
import Callback from './components/auth/callback';
import SavedSongs from './pages/SavedSongs';
import RecentlyPlayed from './pages/RecentlyPlayed';

const App = () => {
  const { activeSong } = useSelector((state) => state.player);
  const location = useLocation();

  const token = localStorage.getItem("spotify_access_token");

  if (!token && location.pathname !== "/callback") {
    return <Login />;
  }

  return (
    <div className="relative flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-black to-[#121286]">
        <Searchbar />

        <div className="px-6 h-[calc(100vh-72px)] overflow-y-scroll hide-scrollbar flex xl:flex-row flex-col-reverse">
          <div className="flex-1 h-fit pb-40">
            <Routes>
              <Route path="/callback" element={<Callback />} />
              <Route path="/" element={<Discover />} />
              <Route path="/top-artists" element={<TopArtists />} />
              <Route path="/top-charts" element={<TopCharts />} />
              <Route path="/around-you" element={<AroundYou />} />
              <Route path="/saved" element={<SavedSongs />} />
              <Route path="/recently-played" element={<RecentlyPlayed />} />
              <Route path="/artists/:id" element={<ArtistDetails />} />
              <Route path="/songs/:songid" element={<SongDetails />} />
              <Route path="/search/:searchTerm" element={<Search />} />
            </Routes>
          </div>
          <div className="xl:sticky relative top-0 h-fit">
            <TopPlay />
          </div>
        </div>
      </div>

      {(activeSong?.name || activeSong?.title) && (
        <div className="absolute h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-[#2a2a80] backdrop-blur-lg rounded-t-3xl z-50">
          <MusicPlayer />
        </div>
      )}
    </div>
  );
};

export default App;
