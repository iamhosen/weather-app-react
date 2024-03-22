import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Forcast from "./Weather/Forcast";
import Details from "./Weather/Details";
2;
const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState(() => ({
    id: 112931,
    name: "Tehran",
    latitude: 35.69439,
    longitude: 51.42151,
    country_code: "IR",
    timezone: "Asia/Tehran",
    country: "Iran",
  }));
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);

      try {
        const { latitude, longitude, timezone } = location;

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

        setWeather(() => weatherData);
        selectDate(0);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  useEffect(() => {
    if (Object.keys(weather).length > 0) {
      selectDate(0);
    }
  }, [weather]);

  const selectDate = (dateIndex) => {
    setSelected({
      index: dateIndex,
      sunrise: weather.daily?.sunrise[dateIndex],
      sunset: weather.daily?.sunset[dateIndex],
      max: weather.daily?.temperature_2m_max[dateIndex],
      min: weather.daily?.temperature_2m_min[dateIndex],
      precipitation: weather.daily?.precipitation_probability_max[dateIndex],
      weatherCode: weather.daily?.weathercode[dateIndex],
      uvIndex: weather.daily?.uv_index_max[dateIndex],
      windSpeed: weather.daily?.wind_speed_10m_max[dateIndex],
      date: weather.daily?.time[dateIndex],
    });
  };

  return (
    <>
      <Sidebar weather={weather?.current} location={location} />
      <main className="p-4 sm:ml-[25%] bg-slate-100 min-h-screen">
        <Navbar onSelectLocation={(loc) => setLocation(loc)} />
        <Forcast
          selectDate={selectDate}
          selectedIndex={selected?.index}
          daily={weather?.daily}
          hourly={weather?.hourly}
        />
        {selected && <Details data={selected} />}
      </main>
    </>
  );
};

export default App;
