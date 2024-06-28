// import React, { useState } from 'react';

// function VideoPlayer() {
//   const [videoSource, setVideoSource] = useState(null);

//   const handleFileSelect = (event) => {
//     const file = event.target.files[0];
//     const reader = new FileReader();

//     reader.onload = (event) => {
//       const fileData = event.target.result;
//       const blob = new Blob([fileData], { type: file.type });
//       const fileURL = URL.createObjectURL(blob);
//       setVideoSource(fileURL);
//     };

//     reader.readAsArrayBuffer(file);
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileSelect} />
//       {videoSource ? (
//         <video controls src={videoSource} width={640} height={360}/>
//       ) : (
//         <p>No video selected</p>
//       )}
//     </div>
//   );
// }

// export default VideoPlayer;

import React, { useState } from 'react';

function VideoPlayer() {
  const [videoSource, setVideoSource] = useState(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const fileData = event.target.result;
      const blob = new Blob([fileData], { type: file.type });
      const fileURL = URL.createObjectURL(blob);
      setVideoSource(fileURL);
    };

    reader.readAsArrayBuffer(file);
  };

  const handleFileUpload = async () => {
    if (videoSource) {
      const response = await fetch('/upload', {
        method: 'POST',
        body: videoSource,
      });

      if (response.ok) {
        console.log('File uploaded successfully');
      } else {
        console.error('File upload failed');
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileSelect} />
      <button onClick={handleFileUpload}>Upload</button>
      {videoSource ? (
        <video controls src={videoSource} width={640} height={360} />
      ) : (
        <p>No video selected</p>
      )}
    </div>
  );
}

export default VideoPlayer;


