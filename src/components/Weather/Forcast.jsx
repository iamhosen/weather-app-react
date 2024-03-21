import { Component } from "react";
import PropTypes from "prop-types";
import ForcastCard from "./ForcastCard";

export default class Forcast extends Component {
  state = {
    activeTab: "daily",
  };

  changeTab = (tab) => {
    this.setState({ activeTab: tab });
  };

  render() {
    const { daily = [], hourly = [] } = this.props;

    return (
      <div className="mb-4">
       

        <div className="flex gap-4 font-light mb-3">
          <span
            onClick={() => this.changeTab("daily")}
            className={`cursor-pointer ${
              this.state.activeTab !== "daily" && "text-gray-500"
            }`}
          >
            Daily Forcast
          </span>
          <span
            onClick={() => this.changeTab("hourly")}
            className={`cursor-pointer ${
              this.state.activeTab !== "hourly" && "text-gray-500"
            }`}
          >
            Hourly Forcast
          </span>
        </div>

        <div className="flex gap-4 overflow-x-auto w-full no-scrollbar">
          {this.state.activeTab === "daily"
            ? daily?.time &&
              daily?.time.map((time, i) => (
                <ForcastCard
                  onClick={() => this.props.selectDate(i)}
                  key={i}
                  date={daily?.time[i]}
                  min={daily?.temperature_2m_min[i]}
                  max={daily?.temperature_2m_max[i]}
                  weatherCode={daily?.weathercode[i]}
                  selected={this.props.selectedIndex === i}
                />
              ))
            : hourly?.time &&
              hourly?.time.map((time, i) => (
                <ForcastCard
                  key={i}
                  date={hourly?.time[i]}
                  temp={hourly?.temperature_2m[i]}
                  weatherCode={hourly?.weather_code[i]}
                  isDaily={false}
                />
              ))}
        </div>
      </div>
    );
  }
}

Forcast.propTypes = {
  daily: PropTypes.object,
  hourly: PropTypes.object,
  selectDate: PropTypes.func,
  selectedIndex: PropTypes.number,
};
