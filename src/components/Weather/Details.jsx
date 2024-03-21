import { Component } from "react";
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

export default class Details extends Component {
  render() {
    return (
      <>
        <div className="flex gap-4 font-light mb-3">
          <span>
            Details for{" "}
            {this.props.data?.index === 0
              ? "Today"
              : formatDay(this.props.data?.date)}
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <DeatilsCard
            title="Sunrise"
            value={this.props.data?.sunrise?.split("T")[1]}
          >
            <img src={SunriseFill} alt="Sunrise" />
          </DeatilsCard>
          <DeatilsCard
            title="Sunset"
            value={this.props.data?.sunset?.split("T")[1]}
          >
            <img src={Sunset} alt="Sunset" />
          </DeatilsCard>
          <DeatilsCard
            title="Highest Temperture"
            value={this.props.data?.max + "°"}
          >
            <img src={ThermometerWarmer} alt="Highest Temperture" />
          </DeatilsCard>
          <DeatilsCard
            title="Lowest Temperture"
            value={this.props.data?.min + "°"}
          >
            <img src={ThermometerColder} alt="Lowest Temperture" />
          </DeatilsCard>
          <DeatilsCard
            title="Precipitation Probability"
            value={this.props.data?.precipitation}
            unit="%"
          >
            <img src={RaindropFill} alt="SunrPrecipitation Probabilityise" />
          </DeatilsCard>
          <DeatilsCard title="Weather">
            <span className="text-7xl">
              {this.props.data?.weatherCode !== undefined
                ? getWeatherIcon(this.props.data?.weatherCode)
                : "..."}
            </span>
          </DeatilsCard>
          <DeatilsCard
            title="UV Index"
            value={this.props.data?.uvIndex?.toFixed(0)}
          >
            <img src={ClearDayFill} alt="UV Index" />
          </DeatilsCard>
          <DeatilsCard
            title="Wind Speed"
            value={this.props.data?.windSpeed}
            unit="Km/h"
          >
            <img src={DustWind} alt="Wind Speed" />
          </DeatilsCard>
        </div>
      </>
    );
  }
}

Details.propTypes = {
  data: PropTypes.object,
};
