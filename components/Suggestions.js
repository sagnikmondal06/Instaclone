import React from "react";
import faker from "faker";
import { useState, useEffect } from "react";

function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      ...faker.helpers.contextualCard(),
      id: i,
    }));

    setSuggestions(suggestions);
  }, []);

  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="font-bold text-sm text-gray-500">Suggestions for you</h3>
        <button
          className="text-gray-600 
        font-semibold"
        >
          See all
        </button>
      </div>
      {suggestions.map((profile) => (
        <div
          key={profile.id}
          className="flex justify-between 
        items-center mt-3"
        >
          <img
            src={profile.avatar}
            alt=""
            className="h-12 w-12 rounded-full p-[2px] border"
          />
          <div className="flex-1 ml-4">
            <p className="text-sm font-semibold">{profile.username}</p>
            <p
              className="text-xs
            text-gray-400"
            >
              Works at {profile.company.name}
            </p>
          </div>

          <button className="text-blue-400 text-sm ml-2">Follow</button>
        </div>
      ))}
    </div>
  );
}

export default Suggestions;
