import React, { useEffect, useState } from "react";
import "./App.css";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocations from "./components/TimeAndLocations";
import TemperatureandDetails from "./components/TemperatureandDetails";
import Forecast from "./components/Forecast";
import getFormatedWeatherData from "./services/weatherService";

export type OpenWeatherFormattedProps = {
  lon: string;
  lat: string;
  temp: number;
  humidity: number;
  temp_min: number;
  temp_max: number;
  feels_like: number;
  name: string;
  dt: number; // Change type to string
  country: string;
  sunrise: number;
  sunset: number;
  speed: string;
  details: string;
  icon: number;
  timezone: string;
  hourly: {
    title: string;
    temp: number;
    icon: number;
  }[];
  daily: {
    title: string;
    temp: number;
    icon: number;
  }[];
}

function App() {
  const [query, setQuery] = useState({ q: "bruges" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState<null | OpenWeatherFormattedProps>(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getFormatedWeatherData({ ...query, units });
      setWeather(data);
    };
    fetchWeather();
  }, [units, query]);

  console.log(weather);
  return (
    <div className="mx-auto md:max-w-screen-md mt-4 py-5 px-32 bg-gradient-to-br from-cyan-700 to-blue-700 h-fit shadow-xl shadow-gray-400">
      <TopButtons />
      <Inputs query={query} setQuery={setQuery} />
      {weather && (
        <>
          <TimeAndLocations weather={weather} />
          <TemperatureandDetails weather={weather} />
          <Forecast title="hourly forecast" items={weather.hourly}/>
          <Forecast title="daily forecast" items={weather.daily}/>
        </>
      )}
    </div>
  );
}

export default App;
