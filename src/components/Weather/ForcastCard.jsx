import { Component } from "react";
import PropTypes from "prop-types";
import { getWeatherIcon, formatDay } from "../../utils";

export default class ForcastCard extends Component {
  render() {
    const {
      date,
      min,
      max,
      weatherCode,
      temp,
      isDaily = true,
      selected = false,
    } = this.props;

    return (
      <div
        onClick={isDaily ? this.props.onClick : () => {}}
        className={`flex flex-col items-center rounded-xl p-2 flex-grow flex-shrink basis-0 bg-gradient-to-tl ${selected ? "from-slate-200 to-slate-300" : "from-slate-100 to-slate-200"}`}
      >
        <h3 className="-mb-px">
          {isDaily ? formatDay(date) : date.split("T")[1]}
        </h3>
        <span className="font-light text-xs text-center text-gray-400 mb-2">
          {isDaily ? date : formatDay(date)}
        </span>
        <span className="text-5xl h-14 mb-2">
          {weatherCode !== undefined ? getWeatherIcon(weatherCode) : "..."}
        </span>
        {isDaily ? (
          <div className="flex gap-2 text-lg">
            <span>{min?.toFixed(0)}&deg;</span>
            <span className="font-bold">{max?.toFixed(0)}&deg;</span>
          </div>
        ) : (
          <span>{temp?.toFixed(0)}&deg;</span>
        )}
      </div>
    );
  }
}

ForcastCard.propTypes = {
  date: PropTypes.string,
  temp: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  weatherCode: PropTypes.number,
  isDaily: PropTypes.bool,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
};
