import React, { SetStateAction,Dispatch } from 'react';import { CiSearch } from "react-icons/ci";
import {BiCurrentLocation} from "react-icons/bi"

interface CiSearchProps {
    query: {q: string};
    setQuery: Dispatch<SetStateAction<{ q: string}>>;
}
const Index: React.FC<CiSearchProps> = (props) => {
    const { query, setQuery } = props
  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input
          type="text"
          className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"
          placeholder="Search...."
        />
        <CiSearch size={30} className="text-white"/>
        <BiCurrentLocation size={30} className="text-white"/>
      </div>
      <div className="flex flex-row w-1/4 items-center justify-center space-x-2">
        <button name="metric" className="text-white font-light text-xl">C°</button>
        <p className="text-white text-xl mx-1">|</p>
        <button name='imperial' className="text-white font-light text-xl">F°</button>
      </div>
    </div>
  );
};

export default Index;
