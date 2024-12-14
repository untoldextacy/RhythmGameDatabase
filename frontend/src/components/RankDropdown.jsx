import React from 'react';

// Array of possible ranks
const ranks = ['S', 'AAA+', 'AAA', 'AA+', 'AA', 'A', 'B', 'C', 'D', 'E'];

const RankDropdown = ({ value, onChange }) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)} // Handle rank selection
      className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500" // TailwindCSS styling
    >
      <option value="">Select Rank</option> {/* Default option */}
      {ranks.map((rank) => (
        <option key={rank} value={rank}>
          {rank}
        </option>
      ))}
    </select>
  );
};

export default RankDropdown;
