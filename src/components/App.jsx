import { Component } from "react";
import { countryCodeToFlag, formatDay, getWeatherIcon } from "../utils";
import Navbar from "./Navbar";

class App extends Component {
  state = {
    location: "tehran",
    isLoading: false,
    displayLocation: "",
    weather: {},
  };

  fetchWeather = async () => {
    this.setState({ isLoading: true });

    try {
      // fethc location
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${this.state.location}`
      );
      const geoData = await geoRes.json();

      if (!geoData.results) {
        throw new Error("Location Not Found!");
      }

      const { latitude, longitude, timezone, country_code, name } =
        geoData.results[0];

      this.setState({
        displayLocation: `Weather of 
        ${name?.toUpperCase()} 
        ${countryCodeToFlag(country_code)}`,
      });

      // API Queries
      const current = [
        "temperature_2m",
        "relative_humidity_2m",
        "apparent_temperature",
        "wind_speed_10m",
      ];
      const daily = [
        "weathercode",
        "temperature_2m_max",
        "temperature_2m_min",
        "sunrise",
        "sunset",
        "precipitation_probability_max",
        "uv_index_max",
        "wind_speed_10m_max",
      ];
      const hourly = [
        "temperature_2m",
        "precipitation_probability",
        "weather_code",
      ];

      // fetch weather
      const weatherRes = await fetch(
        // prettier-ignore
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&hourly=${hourly.join(',')}&daily=${daily.join(',')}&current=${current.join(',')}`
      );
      const weatherData = await weatherRes.json();

      this.setState({
        weather: {
          time: weatherData.daily.time,
          weatherCode: weatherData.daily.weathercode,
          min: weatherData.daily.temperature_2m_min,
          max: weatherData.daily.temperature_2m_max,
        },
      });
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  setLocation = (e) => this.setState({ location: e.target.value });

  componentDidMount() {
    this.fetchWeather();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.location !== prevState.location) {
      this.fetchWeather();
    }
  }

  render() {
    return (
      <>
        <Navbar />
        <h1 className="text-lg">Weather App</h1>
        <div>
          <input
            type="text"
            value={this.state.location}
            onChange={this.setLocation}
          />
        </div>
        {this.state.isLoading && "Loading..."}

        <span className="text-lg font-bold">{this.state.displayLocation}</span>
        {this.state.weather.weatherCode && (
          <ul>
            {this.state.weather.time.map((time, i) => (
              <li key={i}>
                <span>
                  {i} - {formatDay(time)} -
                </span>
                <span>max: {this.state.weather.max[i]} -</span>
                <span>min: {this.state.weather.min[i]} -</span>
                <span>
                  weatherCode:{" "}
                  {getWeatherIcon(this.state.weather.weatherCode[i])}
                </span>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}

export default App;
