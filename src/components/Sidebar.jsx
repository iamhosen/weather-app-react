import { Component } from "react";
import PropTypes from "prop-types";
import { countryCodeToFlag, getWeatherIcon } from "../utils";
import { PiTShirt, PiDrop, PiCloud, PiWind } from "react-icons/pi";

export default class Sidebar extends Component {
  render() {
    const { weather, location } = this.props;

    return (
      <aside className="flex flex-col items-center p-4 sm:fixed sm:w-1/4 sm:h-screen">
        <div className="sm:mb-16 flex sm:flex-col items-center justify-center max-sm:gap-2 max-sm:mb-4">
          <h1 className="text-xl">{location?.name}</h1>
          <span className="text-center">
            {location?.country} {countryCodeToFlag(location?.country_code)}
          </span>
        </div>
        <div className="mb-6 sm:mb-auto flex sm:flex-col items-center gap-4">
          <span className="text-6xl sm:text-9xl sm:mb-16">
            {weather?.weather_code !== undefined
              ? getWeatherIcon(weather?.weather_code)
              : "..."}
          </span>
          <div className="sm:text-center">
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-thin max-sm:-mb-1">
              {weather?.temperature_2m}&deg;
            </h2>
            <span className="text-sm text-gray-400">
              {weather?.time.split("T")[0]} - {weather?.time.split("T")[1]}
            </span>
          </div>
        </div>

        <section className="grid grid-cols-2 gap-4 w-full sm:grid-cols-1 lg:grid-cols-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-100 flex items-center justify-center rounded-full">
              <PiTShirt className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 -mb-1">Feels Like</p>
              <p className="text-lg">{weather?.apparent_temperature}&deg;</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-100 flex items-center justify-center rounded-full">
              <PiWind className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 -mb-1">Wind Speed</p>
              <p className="text-lg">
                {weather?.wind_speed_10m} <span className="text-sm">km/h</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-100 flex items-center justify-center rounded-full">
              <PiCloud className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 -mb-1">Cloud Cover</p>
              <p className="text-lg">{weather?.cloudcover}%</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gray-100 flex items-center justify-center rounded-full">
              <PiDrop className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-gray-500 -mb-1">Humidity</p>
              <p className="text-lg">{weather?.relative_humidity_2m}%</p>
            </div>
          </div>
        </section>
      </aside>
    );
  }
}

Sidebar.propTypes = {
  weather: PropTypes.object,
  location: PropTypes.object,
};
