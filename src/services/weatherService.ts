import { DateTime } from "luxon";

const API_key = "6bec4de18a94a1ec6fd65b14fff7ae04";
const BASE_URL = "https://api.openweathermap.org/data/2.5";

type MainProps = {
  temp: string;
  feels_like: string;
  temp_min: number;
  temp_max: number;
  humidity: number;
};

type CoordinatesProps = {
  lon: string;
  lat: string;
};

type SysProps = {
  country: string;
  sunrise: string;
  sunset: string;
};

type WindProps = {
  speed: string;
};

type WeatherProps = {
  main: { details: string };
  icon: string;
};

type DailyWeatherProps = {
  dt: number;
  temp: {
    day: string;
  };
  weather: {
    icon: string;
  }[];
};

type HourlyWeatherProps = {
  dt: number;
  temp: {
    day: string;
  };
  weather: {
    icon: string;
  }[];
};

export interface ForecastWeatherProps {
  timezone: string;
  daily: DailyWeatherProps[];
  hourly: HourlyWeatherProps[];
}
export interface OpenWeatherFormatIProps {
  coord: CoordinatesProps;
  main: MainProps;
  sys: SysProps;
  name: string;
  dt: number;
  wind: WindProps;
  weather: WeatherProps[];
}

// export interface OpenWeatherFormattedProps {
//     lon: string;
//     lat: string;
//     temp: string;
//     humidity: number;
//     temp_min: number;
//     temp_max: number;
//     feels_like: string;
//     name: string;
//     dt: string;
//     country: string;
//     sunrise: string;
//     sunset: string;
//     speed: string;
//     details: {details:string};
//     icon: string;
//     timezone: string;
//     hourly: {
//       title: string;
//       icon: string;
//     }[];
//     daily: {
//       title: string;
//       temp: string;
//       icon: string;
//     }[];
//   }

// https://api.openweathermap.org/data/2.5/weather?q=tokyo&appid=6bec4de18a94a1ec6fd65b14fff7ae04
const getWeatherData = (
  infoType: string,
  searchParams: { [key: string]: string }
) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({
    ...searchParams,
    appid: API_key,
  }).toString();
  console.log(url);
  return fetch(url).then((response) => response.json());
};

const formatCurrentWeather = (data: OpenWeatherFormatIProps) => {
  const {
    coord: { lon, lat },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];
  return {
    lon,
    lat,
    temp,
    humidity,
    temp_min,
    temp_max,
    feels_like,
    name,
    dt,
    country,
    sunrise,
    sunset,
    speed,
    details,
    icon,
  };
};

const formatForecastWeather = (data: ForecastWeatherProps) => {
  let { timezone, daily, hourly } = data;
  const tempDaily = daily.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "ccc"),
      temp: d.temp.day,
      icon: d.weather[0].icon,
    };
  });
  const tempHourly = hourly.slice(1, 6).map((d) => {
    return {
      title: formatToLocalTime(d.dt, timezone, "hh:mm a"),
      temp: d.temp,
      icon: d.weather[0].icon,
    };
  });

  return { timezone, hourly: tempHourly, daily: tempDaily };
};

const formatToLocalTime = (
  secs: number,
  zone: string,
  format = "ccc, dd LLL yy' | Local time: 'hh:mm a'"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code: number) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

const getFormatedWeatherData = async (searchParams: {
    [key: string]: string;
  }) => {
    const formatedCurrentWeather = await getWeatherData(
      "weather",
      searchParams
    ).then(formatCurrentWeather);
    const { lat, lon } = formatedCurrentWeather;
  
    const formatedForecastWeather = await getWeatherData("onecall", {
      lat,
      lon,
      exclude: "current,minutely,alerts",
      units: searchParams.units,
    }).then(formatForecastWeather);
    return { ...formatedCurrentWeather, ...formatedForecastWeather };
  };
  export default getFormatedWeatherData
  export { formatToLocalTime, iconUrlFromCode };

