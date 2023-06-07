import React from "react";
const TopButtons = () => {
  const cities = [
    { id: 1, title: "London" },
    { id: 2, title: "NewYork" },
    { id: 3, title: "Gdanks" },
    { id: 4, title: "Bogota" },
    { id: 5, title: "Lisbon" },
  ];
  return (
    <div className="flex items-center justify-around my-6">
      {cities.map((city: { id: number; title: string }) => (
        <button key={city.id} className="text-white text-lg font-medium">{city.title}</button>
      ))}
    </div>
  );
};

export default TopButtons;
