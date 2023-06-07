import { iconUrlFromCode } from "../services/weatherService";

interface ForecastIProps {
  title: string;
  weather: {[key:string]: {icon: string,temp: string, title: string}[]};
  type: string;
}

const Forecast: React.FC<ForecastIProps> = ({ title, weather, type }) => {
  const forecast = weather[type];
  console.log(type, forecast);
  return (
    <div>
      <div className="flex items-center justify-start my-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />
      <div className="flex flex-row items-center justify-between text-white">
        {forecast &&
          forecast.map((data: any) => (
            <div key={`${data.icon}${data.temp}${data.title}`} className="flex flex-col items-center justify-center">
              <p className="font-light text-sm">{data.title}</p>
              <img
                src={iconUrlFromCode(data.icon)}
                className="w-12 my-1"
                alt=""
              />
              <p className="font-medium">{`${data.temp.toFixed()}°`}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Forecast;
