import React, { useEffect, useState } from "react";
import "./App.css";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocations from "./components/TimeAndLocations";
import TemperatureandDetails from "./components/TemperatureandDetails";
import Forecast from "./components/Forecast";
import getFormatedWeatherData from "./services/weatherService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [query, setQuery] = useState<null | {}>(null);
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState<null | OpenWeatherFormattedProps>(null);
  const [isLoading, setIsLoading] = useState(false); // State for loading status

  useEffect(() => {
    if (query) {
      const fetchWeather = async () => {
        toast.info(Object.keys(query).length === 2 ? "Fetching location" : "Fetching weather");
        setIsLoading(true);
        try {
          const data = await getFormatedWeatherData({ ...query, units });
          setWeather(data);
          toast.success('Weather data fetched successfully');
        } catch (error) {
          console.error(error);
          toast.error('Failed to fetch weather data');
        } finally {
          setIsLoading(false);
        }
      };
      fetchWeather();
    }
  }, [units, query]);

  const formatBackground = () => {
    if (!weather) return 'from-cyan-700 to-blue-700';
    const threshold = units === 'metric' ? 20:60;
    if (weather.temp <= threshold) return 'from-cyan-700 to-blue-700';
    return 'from-yellow-700 to-orange-700'
  }

  return (
    <div className="pb-4">
    <div className={`mx-auto max-w-screen-md mt-4 py-6 px-32 bg-gradient-to-br ${formatBackground()} h-fit shadow-xl shadow-gray-400 rounded-lg`}>
      <TopButtons setQuery={setQuery} />
      <Inputs units={units} setQuery={setQuery} setUnits={setUnits} />
      {isLoading ? ( // Render spinner when isLoading is true
        <div className="spinner">
          <div className="spinner-inner" />
        </div>
      ) : weather ? (
        <>
          <TimeAndLocations weather={weather} />
          <TemperatureandDetails weather={weather} />
          <Forecast title="hourly forecast" items={weather.hourly} />
          <Forecast title="daily forecast" items={weather.daily} />
        </>
      ) : (
        <div className="flex justify-center p-7"><h1 className="text-white text-xl">Please select a city or allow location access</h1></div>
      )}
    </div>
    <ToastContainer autoClose={1000} theme='colored' newestOnTop={true}/>
    </div>
  );
}

export default App;
