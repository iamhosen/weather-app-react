import PropTypes from "prop-types";
import { formatDay, getWeatherIcon } from "../../utils";
import DeatilsCard from "./DetailsCard";
import ClearDayFill from "../../assets/image/ClearDayFill.svg";
import DustWind from "../../assets/image/DustWind.svg";
import RaindropFill from "../../assets/image/RaindropFill.svg";
import SunriseFill from "../../assets/image/SunriseFill.svg";
import Sunset from "../../assets/image/Sunset.svg";
import ThermometerColder from "../../assets/image/ThermometerColder.svg";
import ThermometerWarmer from "../../assets/image/ThermometerWarmer.svg";

const Details = ({ data }) => {
  return (
    <>
      <div className="flex gap-4 font-light mb-3">
        <span>
          Details for {data?.index === 0 ? "Today" : formatDay(data?.date)}
        </span>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <DeatilsCard title="Sunrise" value={data?.sunrise?.split("T")[1]}>
          <img src={SunriseFill} alt="Sunrise" />
        </DeatilsCard>
        <DeatilsCard title="Sunset" value={data?.sunset?.split("T")[1]}>
          <img src={Sunset} alt="Sunset" />
        </DeatilsCard>
        <DeatilsCard title="Highest Temperture" value={data?.max + "°"}>
          <img src={ThermometerWarmer} alt="Highest Temperture" />
        </DeatilsCard>
        <DeatilsCard title="Lowest Temperture" value={data?.min + "°"}>
          <img src={ThermometerColder} alt="Lowest Temperture" />
        </DeatilsCard>
        <DeatilsCard
          title="Precipitation Probability"
          value={data?.precipitation}
          unit="%"
        >
          <img src={RaindropFill} alt="SunrPrecipitation Probabilityise" />
        </DeatilsCard>
        <DeatilsCard title="Weather">
          <span className="text-7xl">
            {data?.weatherCode !== undefined
              ? getWeatherIcon(data?.weatherCode)
              : "..."}
          </span>
        </DeatilsCard>
        <DeatilsCard title="UV Index" value={data?.uvIndex?.toFixed(0)}>
          <img src={ClearDayFill} alt="UV Index" />
        </DeatilsCard>
        <DeatilsCard title="Wind Speed" value={data?.windSpeed} unit="Km/h">
          <img src={DustWind} alt="Wind Speed" />
        </DeatilsCard>
      </div>
    </>
  );
};

Details.propTypes = {
  data: PropTypes.object,
};

export default Details;
