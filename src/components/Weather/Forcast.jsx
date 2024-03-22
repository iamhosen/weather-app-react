import { useState } from "react";
import PropTypes from "prop-types";
import ForcastCard from "./ForcastCard";

const Forcast = ({ daily = [], hourly = [], selectDate, selectedIndex }) => {
  const [activeTab, setActiveTab] = useState("daily");

  return (
    <div className="mb-4">
      <div className="flex gap-4 font-light mb-3">
        <span
          onClick={() => setActiveTab("daily")}
          className={`cursor-pointer ${
            activeTab !== "daily" && "text-gray-500"
          }`}
        >
          Daily Forcast
        </span>
        <span
          onClick={() => setActiveTab("hourly")}
          className={`cursor-pointer ${
            activeTab !== "hourly" && "text-gray-500"
          }`}
        >
          Hourly Forcast
        </span>
      </div>

      <div className="flex gap-4 overflow-x-auto w-full no-scrollbar">
        {activeTab === "daily"
          ? daily?.time &&
            daily?.time.map((time, i) => (
              <ForcastCard
                onClick={() => selectDate(i)}
                key={i}
                date={daily?.time[i]}
                min={daily?.temperature_2m_min[i]}
                max={daily?.temperature_2m_max[i]}
                weatherCode={daily?.weathercode[i]}
                selected={selectedIndex === i}
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
};

Forcast.propTypes = {
  daily: PropTypes.object,
  hourly: PropTypes.object,
  selectDate: PropTypes.func,
  selectedIndex: PropTypes.number,
};

export default Forcast;
