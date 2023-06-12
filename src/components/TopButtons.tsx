import React, { SetStateAction,Dispatch, useState } from 'react';

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
  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((city: { id: number; title: string }) => (
        <button key={city.id} className="text-white text-lg font-medium"
        onClick={() => setQuery({q: city.title})}>{city.title}</button>
      ))}
    </div>
  );
};

export default TopButtons;
