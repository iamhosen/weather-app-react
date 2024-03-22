import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FiSearch } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import SearchSuggestion from "./SearchSuggestion";
import Spinner from "./Base/Spinner";

const Navbar = ({ onSelectLocation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      setLocations([]);
      setIsLoading(true);

      try {
        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${search}`
        );
        const geoData = await geoRes.json();

        if (!geoData.results) {
          throw new Error("Location Not Found!");
        }

        setLocations(geoData.results);
        setIsSuggestionsOpen(true);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (search.length > 2) {
      fetchLocations();
    }
  }, [search]);

  const selectItem = (item) => {
    onSelectLocation(item);
    setIsSuggestionsOpen(false);
  };

  return (
    <nav className="flex items-center justify-between mb-4">
      <div className="relative flex items-center rounded px-2 py-1 gap-2 bg-white">
        {isLoading ? <Spinner /> : <FiSearch className="text-gray-500" />}

        <input
          className="focus:outline-none"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for location..."
        />

        {isSuggestionsOpen && (
          <SearchSuggestion items={locations} onClickItem={selectItem} />
        )}
      </div>
      <a
        href="https://github.com/iamhosen/"
        target="_blank"
        className="flex items-center gap-2 bg-gradient-to-tl to-slate-700 from-slate-600 hover:to-slate-800 transition-all duration-300 py-1 px-1.5 rounded-md text-white"
      >
        <FaGithub className="w-6 h-6" />
        <span>@iamhosen</span>
      </a>
    </nav>
  );
};

Navbar.propTypes = {
  onSelectLocation: PropTypes.func,
};

export default Navbar;
