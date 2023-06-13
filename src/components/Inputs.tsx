import React, { SetStateAction,Dispatch, useState, useRef } from 'react';
import { CiSearch } from "react-icons/ci";
import {BiCurrentLocation} from "react-icons/bi"
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface CiSearchProps {
    setQuery: Dispatch<SetStateAction<{q: string} | {lon: number, lat:number}>>;
    units: string;
    setUnits: Dispatch<SetStateAction<string>>;
}
const Index: React.FC<CiSearchProps> = (props) => {
    const { setQuery, setUnits, units } = props
    const [input, setInput] = useState("")

    const isMounted = useRef(false)

    function getLocation() {
      if (navigator.geolocation) {
        navigator.permissions.query({name:'geolocation'}).then(permissionStatus => {
          if (permissionStatus.state === 'denied') {
            toast.error('Please allow location access');;
            window.location.href = "app-settings:location";
            // setQuery({q: 'New York'});
          } else {
            navigator.geolocation.getCurrentPosition((position) => {
              let lat = position.coords.latitude
              let lon = position.coords.longitude
              setQuery(
                {lat,
                lon,}
              )
            })
          }
        });
      } else {
        toast.error('Geolocation is not supported in your browser.');
      }
    }

    if (!isMounted.current) {
      getLocation();
      isMounted.current = true;
    }
    const handleSearchClick = () => {
      if (input !== "") {
       setQuery({q: input})
      setInput('')
      }
      else {
        toast.error('Please provide a city');
      }
    }

    const handleLocationClick = () => {
      getLocation()
    }

    const handleUnitsChange = (event: React.MouseEvent<HTMLButtonElement>) => {
      const selectedUnit = event.currentTarget.name
      if (units !== selectedUnit) setUnits(selectedUnit)
    }
  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          type="text"
          className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
          placeholder="Search...."
          value={input}
          onChange={(e) =>setInput(e.currentTarget.value)}
        />
        <CiSearch size={30} className="text-white cursor-pointer hover:scale-125 transition ease-out" onClick={handleSearchClick}/>
        <BiCurrentLocation size={30} className="text-white hover:scale-125 transition ease-out" onClick={handleLocationClick}/>
      </div>
      <div className="flex flex-row w-1/4 items-center justify-center space-x-2">
        <button name="metric" className="text-white font-light text-lg hover:scale-125 transition ease-out" onClick={(e) => handleUnitsChange(e)}>C°</button>
        <p className="text-white text-xl mx-1">|</p>
        <button name='imperial' className="text-white font-light text-xl hover:scale-125 transition ease-out" onClick={(e) => handleUnitsChange(e)}>F°</button>
      </div>
    </div>
  );
};

export default Index;
