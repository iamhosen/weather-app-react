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
    selected: null
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
      this.selectDate(0);
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

  selectDate = (dateIndex) => {
    this.setState({ selected: {
      index: dateIndex,
      sunrise: this.state.weather.daily?.sunrise[dateIndex],
      sunset: this.state.weather.daily?.sunset[dateIndex],
      max: this.state.weather.daily?.temperature_2m_max[dateIndex],
      min: this.state.weather.daily?.temperature_2m_min[dateIndex],
      precipitation: this.state.weather.daily?.precipitation_probability_max[dateIndex],
      weatherCode: this.state.weather.daily?.weathercode[dateIndex],
      uvIndex: this.state.weather.daily?.uv_index_max[dateIndex],
      windSpeed: this.state.weather.daily?.wind_speed_10m_max[dateIndex],
      date: this.state.weather.daily?.time[dateIndex],
    } });
  }

  render() {
    return (
      <>
        <Sidebar
          weather={this.state.weather?.current}
          location={this.state.location}
        />
        <main className="p-4 sm:ml-[25%] bg-slate-100 min-h-screen">
          <Navbar onSelectLocation={this.selectLocation} />
          <Forcast
            selectDate={this.selectDate}
            selectedIndex={this.state.selected?.index}
            daily={this.state.weather?.daily}
            hourly={this.state.weather?.hourly}
          />
          {this.state.selected && <Details data={this.state.selected} />}
        </main>
      </>
    );
  }
}

export default App;
