import { iconUrlFromCode } from "../services/weatherService";

interface ForecastIProps {
  title: string;
  items: {
    icon: number;
    temp: number;
    title: string;
  }[];
}


const Forecast: React.FC<ForecastIProps> = ({title,items}) => {
  console.log(items);
  console.log(title);
  return (
    <div>
      <div className="flex items-center justify-start my-6">
        <p className="text-white font-medium uppercase">{title}</p>
      </div>
      <hr className="my-2" />
      <div className="flex flex-row items-center justify-between text-white">
        {items &&
          items.map((data) => (
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
