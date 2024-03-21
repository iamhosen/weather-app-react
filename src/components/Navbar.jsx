import { Component } from "react";
import { FiSearch } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";
import SearchSuggestion from "./SearchSuggestion";
import Spinner from "./Base/Spinner";
import PropTypes from "prop-types";

export default class Navbar extends Component {
  state = {
    isLoading: false,
    isSuggestionsOpen: false,
    search: "",
    locations: [],
  };

  setLocation = (e) => this.setState({ search: e.target.value });

  fetchLocations = async () => {
    this.setState({ locations: [] });
    this.setState({ isLoading: true });

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.search}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results) {
        throw new Error("Location Not Found!");
      }

      this.setState({ locations: geoData.results });
      this.setState({ isSuggestionsOpen: true });
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  selectItem = (item) => {
    this.props.onSelectLocation(item);
    this.setState({ isSuggestionsOpen: false });
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.search !== this.state.search &&
      this.state.search.length > 2
    ) {
      this.fetchLocations();
    }
  }

  render() {
    return (
      <nav className="flex items-center justify-between mb-4">
        <div className="relative flex items-center rounded px-2 py-1 gap-2 bg-white">
          {this.state.isLoading ? (
            <Spinner />
          ) : (
            <FiSearch className="text-gray-500" />
          )}

          <input
            className="focus:outline-none"
            type="text"
            value={this.state.search}
            onChange={this.setLocation}
            placeholder="Search for location..."
          />

          {this.state.isSuggestionsOpen && (
            <SearchSuggestion
              items={this.state.locations}
              onClickItem={this.selectItem}
            />
          )}
        </div>
        <a href="https://github.com/iamhosen/" target="_blank">
          <FaGithub className="w-6 h-6" />
        </a>
      </nav>
    );
  }
}

Navbar.propTypes = {
  onSelectLocation: PropTypes.func,
};
