import React, { useState } from 'react';
import axios from 'axios';

const UploadScore = () => {
  const [level, setLevel] = useState('');
  const [score, setScore] = useState('');
  const [rank, setRank] = useState('');
  const [song, setSong] = useState('');
  const [error, setError] = useState('');

  const songs = [
    { name: 'ARISE', artist: 'Juggernaut' },
    { name: 'Innocent Azure', artist: 'kuro' },
    { name: 'DATAERR0R', artist: 'Cosmograph' },
    { name: 'ALTONA', artist: 'SOUND HOLIC Vs. SWING HOLIC' },
    { name: 'GIGA BABA(brz_style)', artist: 'brz1128' },
    { name: 'Blossom', artist: 'Synthion' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!level || !score || !rank || !song) {
      setError('Please fill out all fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/scores/submit-score', {
        level,
        score,
        rank,
        song,
      },{
        withCredentials: true,
      });
      
      console.log('Response', response);

      if (response.status === 201) {
        alert('Score submitted successfully!');
        setLevel('');
        setScore('');
        setRank('');
        setSong('');
        setError('');
      }
    } catch (err) {
      console.error('Failed to submit score:', err);
      setError('Failed to submit score.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 to-blue-500 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-gray-800"
      >
        <h2 className="text-2xl font-bold mb-4">Submit Your Score</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Level Input */}
        <label className="block mb-2 font-semibold">Level</label>
        <input
          type="number"
          min="1"
          max="20"
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 mb-4"
          placeholder="Enter level (1-20)"
        />

        {/* Score Input */}
        <label className="block mb-2 font-semibold">Score</label>
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 mb-4"
          placeholder="Enter your score"
        />

        {/* Rank Dropdown */}
        <label className="block mb-2 font-semibold">Rank</label>
        <select
          value={rank}
          onChange={(e) => setRank(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 mb-4"
        >
          <option value="" disabled>
            Select your rank
          </option>
          <option value="S">S</option>
          <option value="AAA+">AAA+</option>
          <option value="AAA">AAA</option>
          <option value="AA+">AA+</option>
          <option value="AA">AA</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
        </select>

        {/* Song Dropdown */}
        <label className="block mb-2 font-semibold">Song</label>
        <select
          value={song}
          onChange={(e) => setSong(e.target.value)}
          className="w-full border border-gray-300 rounded p-2 mb-4"
        >
          <option value="">Select a song</option>
          {songs.map((songOption, index) => (
            <option key={index} value={`${songOption.name} by ${songOption.artist}`}>
              {songOption.name} by {songOption.artist}
            </option>
          ))}
        </select>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-purple-600 text-white font-semibold py-2 rounded hover:bg-purple-700 transition"
        >
          Submit Score
        </button>
      </form>
    </div>
  );
};

export default UploadScore;
