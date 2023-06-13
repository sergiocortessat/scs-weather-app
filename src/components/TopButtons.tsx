import React, { SetStateAction,Dispatch, useState } from 'react';
import { SiGithub } from "react-icons/si";

interface SearchProps {
  setQuery: Dispatch<SetStateAction<{ q: string}>>;
}
const TopButtons:React.FC<SearchProps> = ({setQuery}) => {
  const cities = [
    { id: 1, title: "London" },
    { id: 2, title: "New York" },
    { id: 3, title: "Gdansk" },
    { id: 4, title: "Bogota" },
    { id: 5, title: "Lisbon" },
  ];

  const handleRedirect = () => {
    window.open('https://github.com/sergiocortessat', '_blank'); // Replace with your desired URL
  };
  return (
    <>
    <div className="flex items-center justify-around my-6">
      {cities.map((city: { id: number; title: string }) => (
        <button key={city.id} className="text-white text-lg font-medium hover:scale-125 transition ease-out"
        onClick={() => setQuery({q: city.title})}>{city.title}</button>
      ))}
      <SiGithub className='text-white text-xl hover:scale-125 transition ease-out' onClick={handleRedirect}/>
    </div>
    </>
  );
};

export default TopButtons;
