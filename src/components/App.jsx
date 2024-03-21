import { Component } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Forcast from "./Weather/Forcast";
import Details from "./Weather/Details";

class App extends Component {
  state = {
    isLoading: false,
    displayLocation: "",
    weather: {},
    location: {
      id: 112931,
      name: "Tehran",
      latitude: 35.69439,
      longitude: 51.42151,
      country_code: "IR",
      timezone: "Asia/Tehran",
      country: "Iran",
    },
  };

  fetchWeather = async () => {
    this.setState({ isLoading: true });

    try {
      const { latitude, longitude, timezone } = this.state.location;

      // API Queries
      const current = [
        "temperature_2m",
        "relative_humidity_2m",
        "apparent_temperature",
        "wind_speed_10m",
        "weather_code",
        "cloudcover",
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

      this.setState({ weather: weatherData });
    } catch (err) {
      console.error(err);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidUpdate(_, prevState) {
    if (prevState.location !== this.state.location) {
      this.fetchWeather();
    }
  }

  componentDidMount() {
    this.fetchWeather();
  }

  selectLocation = (location) => {
    this.setState({ location });
  };

  render() {
    return (
      <>
        <Sidebar
          weather={this.state.weather?.current}
          location={this.state.location}
        />
        <main className="p-4 ml-[25%] bg-slate-100 min-h-screen">
          <Navbar onSelectLocation={this.selectLocation} />
          <Forcast
            daily={this.state.weather?.daily}
            hourly={this.state.weather?.hourly}
          />
          <Details />
        </main>
      </>
    );
  }
}

export default App;
