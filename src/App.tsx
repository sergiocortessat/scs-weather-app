import React, { useEffect, useState } from "react";
import "./App.css";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocations from "./components/TimeAndLocations";
import TemperatureandDetails from "./components/TemperatureandDetails";
import Forecast from "./components/Forecast";
import getFormatedWeatherData from "./services/weatherService";

interface OpenWeatherFormattedProps {
  lon: string;
  lat: string;
  temp: string;
  humidity: number;
  temp_min: number;
  temp_max: number;
  feels_like: string;
  name: string;
  dt: number; // Change type to string
  country: string;
  sunrise: string;
  sunset: string;
  speed: string;
  details: string;
  icon: string;
  timezone: string;
  hourly: {
    title: string;
    temp: {
      day: string;
    };
    icon: string;
  }[];
  daily: {
    title: string;
    temp: string;
    icon: string;
  }[];
}

function App() {
  const [query, setQuery] = useState({ q: "lisbon" });
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
          <Forecast title="hourly forecast" weather={weather} type='hourly' />
          <Forecast title="daily forecast" weather={weather} type='daily'/>
        </>
      )}
    </div>
  );
}

export default App;
