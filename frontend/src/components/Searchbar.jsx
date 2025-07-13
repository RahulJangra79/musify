// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FiSearch } from 'react-icons/fi';

// const Searchbar = () => {
//   const navigate = useNavigate();
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const trimmed = searchTerm.trim();
//     if (trimmed) {
//       navigate(`/search/${encodeURIComponent(trimmed)}`);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       autoComplete="off"
//       className="p-2 text-gray-400 focus-within:text-gray-600"
//     >
//       <label htmlFor="search-field" className="sr-only">
//         Search tracks on Spotify
//       </label>
//       <div className="flex flex-row justify-start items-center">
//         <FiSearch aria-hidden="true" className="w-5 h-5 ml-4" />
//         <input
//           name="search-field"
//           autoComplete="off"
//           id="search-field"
//           className="flex-1 bg-transparent border-none placeholder-gray-500 outline-none text-base text-white p-4"
//           placeholder="What do you want to play?"
//           type="search"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>
//     </form>
//   );
// };

// export default Searchbar;






import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

const Searchbar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchTerm.trim();
    if (trimmed) {
      navigate(`/search/${encodeURIComponent(trimmed)}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      autoComplete="off"
      className="bg-[#1e1e1e] rounded-full flex items-center px-4 py-2 w-full max-w-lg mx-auto text-gray-400 focus-within:text-white transition-colors duration-200"
    >
      <label htmlFor="search-field" className="sr-only">
        Search tracks on Spotify
      </label>

      <FiSearch aria-hidden="true" className="w-5 h-5 mr-3" />

      <input
        name="search-field"
        autoComplete="off"
        id="search-field"
        type="search"
        placeholder="What do you want to play?"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 bg-transparent border-none placeholder-gray-500 outline-none text-base text-white"
      />
    </form>
  );
};

export default Searchbar;