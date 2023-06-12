import React from "react";
import {
  WiSunset,
  WiThermometer,
  WiHumidity,
  WiStrongWind,
  WiDaySunny,
} from "react-icons/wi";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
import { iconUrlFromCode } from "../services/weatherService";
import { formatToLocalTime } from "../services/weatherService";

interface TemperatureAndDetailsProps {
  weather: {
    details: string;
    temp: number;
    temp_min: number;
    temp_max: number;
    sunrise: number;
    sunset: number;
    speed: string;
    humidity: number;
    feels_like: number;
    timezone: string;
    icon:number;
  };
}
const TemperatureandDetails: React.FC<TemperatureAndDetailsProps> = ({
  weather,
}) => {
  const {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
    sunrise,
    sunset,
    speed,
    humidity,
    feels_like,
    timezone,
  } = weather;
  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
        <p>{details}</p>
      </div>

      <div className="flex  flex-row items-center justify-between text-white py-3">
        <img src={iconUrlFromCode(icon)} className="w-20" alt="" />
        <p className="text-5xl">{`${temp.toFixed()}°`}</p>
        <div className="flex flex-col space-y-2">
          <div className="flex font-light text-sm items-center justify-center">
            <WiThermometer size={18} className="mr-1" />
            Real feel:
            <span className="font-medium ml-1">{`${feels_like.toFixed()}°`}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <WiHumidity size={18} className="mr-1" />
            Humidity:
            <span className="font-medium ml-1">{humidity}</span>
          </div>
          <div className="flex font-light text-sm items-center justify-center">
            <WiStrongWind size={18} className="mr-1" />
            Wind:
            <span className="font-medium ml-1">{`${speed} km/h`}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center space-x-2 text-white text-sm py-3">
        <WiDaySunny size={30} />
        <p className="font-light flex flex-row">
          Rise:{" "}
          <span className="font-medium ml-1">{`${formatToLocalTime(
            sunrise,
            timezone,
            "hh:mma"
          )}`}</span>
        </p>
        <p className="font-light">|</p>
        <WiSunset size={30} />
        <p className="font-light flex flex-row">
          Sets:{" "}
          <span className="font-medium ml-1">{`${formatToLocalTime(
            sunset,
            timezone,
            "hh:mma"
          )}`}</span>
        </p>
        <p className="font-light">|</p>
        <BsArrowUpShort size={30} />
        <p className="font-light flex flex-row">
          High:{" "}
          <span className="font-medium ml-1">{`${temp_max.toFixed()}°`}</span>
        </p>
        <p className="font-light">|</p>
        <BsArrowDownShort size={30} />
        <p className="font-light flex flex-row">
          Low:{" "}
          <span className="font-medium ml-1">{`${Math.ceil(temp_min)}°`}</span>
        </p>
      </div>
    </div>
  );
};

export default TemperatureandDetails;
