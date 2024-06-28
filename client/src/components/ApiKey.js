import React, { useState } from 'react';

function ApiKey() {
  const [searchInput, setSearchInput] = useState('');
  const [answer, setAnswer] = useState('');
  const [speaking, setSpeaking] = useState(false);

  // const handleSearch = async() => {
  //   fetch(`https://api.duckduckgo.com/?q=${searchInput}&format=json`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setAnswer(data.AbstractText);
  //       const speech = new SpeechSynthesisUtterance(answer);
  //       window.speechSynthesis.speak(speech);
  //       setSpeaking(true);
  //     })
  //     .catch((error) => console.error(error));
  // };

  // const handleStop = () => {
  //   window.speechSynthesis.cancel();
  //   setSpeaking(false);
  // };

  const handleSearch = async () => {
    const response = await fetch(`https://api.duckduckgo.com/?q=${searchInput}&format=json`);
    const data = await response.json();
    setAnswer(data.AbstractText);

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
    <div className='pranav'>
      <input
        type="text"
        style={{
          padding: '10px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          width: '200px'
        }}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <br />
      <button
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
        onClick={handleSearch}
      >
        Search
      </button>
      <div
        style={{
          marginTop: '10px',
          padding: '10px',
          borderRadius: '5px',
          backgroundColor: '#f2f2f2',
          textAlign: 'center'
        }}
      >
        {answer}
      </div>
      <button
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
        onClick={handleStop}
        disabled={!speaking}
      >
        Stop
      </button>
    </div>
  );
}

export default ApiKey;
