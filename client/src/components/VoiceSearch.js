import { Button } from '@mui/material';
import React, { useState } from 'react';

function VoiceSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState('');
  const [speaking, setSpeaking] = useState(false);

  const handleSearch = async () => {
    const response = await fetch(`https://api.duckduckgo.com/?q=${searchTerm}&format=json`);
    const data = await response.json();
    setResult(data.AbstractText);

    const msg = new SpeechSynthesisUtterance(data.AbstractText);
    window.speechSynthesis.speak(msg);

    // speak(data.AbstractText);
    setSpeaking(true);
  };

  const handleStop = () => {
    speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <div className='voice'>
    < div className='voiceSearch'>
      <div><input
        type="text"
        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '100%', textAlign:"center" }}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      
      </div>
      <br></br>
      <button className='myButton'
        style={{
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          width:"200px"
        }}
        onClick={handleSearch}
      >
        Search
      </button>
      <div 
        style={{
          marginTop: '10px',
          marginBottom: '10px',
          padding: '10px',
          borderRadius: '5px',
          backgroundColor: 'rgb(204 233 255)',
          textAlign: 'center',
          width:"100%",
        }}
      >
        {result}
      </div>
      
      <button className='myButton'
        style={{
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          width:"200px"
        }}
        onClick={handleStop}
        disabled={!speaking}
      >
        Stop
      </button>
    </div>
    </div>
  );
}
export default VoiceSearch;