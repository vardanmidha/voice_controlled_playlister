import React, { useContext, useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import { GlobalStoreContext } from '../store';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import PauseIcon from '@mui/icons-material/Pause';

export const VideoPlayer = (props) => {
  const { store } = useContext(GlobalStoreContext);
  const theme = useTheme();
  const [player, setPlayer] = useState(null);
  const [list, setList] = useState(null);
  const { selection } = props;
  const playerOptions = {
    height: '100%',
    width: '100%',
    borderRadius: '10px',
    playerVars: {
      mute: 0,
      controls: 0,
      host: 'https://www.youtube.com',
      origin: 'https://localhost:3000',
    },
  };

  const inputField = document.createElement('textarea');
  const synth = window.speechSynthesis;

const speak = (text) => {
  const utterance = new SpeechSynthesisUtterance(text);
  synth.speak(utterance);
};
  const [isClicked] = useState(false);
  useEffect(() => {
    if (player && player.h) loadCurrentSong(player);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store.currentList, store.playIndex]);

  let addListen = () => {
    if (store.currentList !== list && store.currentList.published) {
      store.AddListen(store.currentList._id);
    }
  };

  let onPlayerReady = (event) => {
    setPlayer(event.target);
    loadCurrentSong(event.target);
  };

  let loadCurrentSong = (player) => {
    if (store.currentList && store.currentList.songs[store.playIndex]) {
      player.loadVideoById(
        store.currentList.songs[store.playIndex]
          ? store.currentList.songs[store.playIndex].youTubeId
          : ''
      );
    }
  };

  let play = () => {
    if (player && player.h) {
      player.playVideo();
    }
  };

  let pause = () => {
    if (player && player.h) player.pauseVideo();
  };
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.continuous = true;

  recognition.onresult = function (event) {
    const transcript = event.results[event.resultIndex][0].transcript;

    console.log(transcript);
//     if (transcript.toLowerCase().includes(inputField.value.toLowerCase()))
//     {
//       setTimeout(() => {
//         // Your code to be executed after 1 milliseconds
     
//       if (player && player.h) {
//         player.pauseVideo();
//         setTimeout(() => {
//           // Your code to be executed after 5 seconds
//           if (transcript.toLowerCase().includes(inputField.value.toLowerCase() + " stop"))
//           {
//             setTimeout(() => {
//               // Your code to be executed after 1 milliseconds
           
//             if (player && player.h) {
//               player.pauseVideo();
              
//           }
//         }, 1);
//         }
//         else{
      
//           player.playVideo();}
//         }, 5000);
      
        
//     }
//   }, 1);
//   }

    if (
      transcript
        .toLowerCase()
        .includes(inputField.value.toLowerCase() + ' start')
    ) {
      // console.log("Started");
      setTimeout(() => {
        // Your code to be executed after 1 milliseconds

        if (player && player.h) {
          player.playVideo();
        }
      }, 1);
    }

    if (
      transcript
        .toLowerCase()
        .includes(inputField.value.toLowerCase() + ' stop')
    ) {
      setTimeout(() => {
        // Your code to be executed after 1 milliseconds

        if (player && player.h) {
          player.pauseVideo();
        }
      }, 1);
    }


    const numbers = [];
    for (let i = 1; i <= 100; i++) {
      numbers.push(i);
    }
    const num=["one","two","three","four","five","six"]
    for (let i = 0; i < numbers.length + 1; i++) {
      if(transcript
        .toLowerCase()
        .includes(inputField.value.toLowerCase() + ' ' + 'to')){
          event.stopPropagation();
          store.setPlay(1);
          break;
        }
      if (
        transcript
          .toLowerCase()
          .includes(inputField.value.toLowerCase() + ' ' + numbers[i]) ||
          transcript
          .toLowerCase()
          .includes(inputField.value.toLowerCase() + ' ' + num[i])
      ) {
        event.stopPropagation();
        store.setPlay(i);
        console.log(transcript.toLowerCase());
        break;
      }
    }

    if (
      transcript
        .toLowerCase()
        .includes(inputField.value.toLowerCase() + ' next')
    ) {
      setTimeout(() => {
        // Your code to be executed after 1 milliseconds
        if (store.playIndex < store.currentList.songs.length - 1) {
          store.setPlay(store.playIndex + 1);
        } else {
          store.setPlay(0);
        }
      }, 1);
    }
    
    if (
      transcript
        .toLowerCase()
        .includes(inputField.value.toLowerCase() + ' back')
    ) {
      setTimeout(() => {
        // Your code to be executed after 1 milliseconds

        if (store.playIndex === 0) {
          if (store.currentList && store.currentList.songs.length - 1 > 0)
            store.setPlay(store.currentList.songs.length - 1);
        } else {
          store.setPlay(store.playIndex - 1);
        }
      }, 1);
    }
  };

  recognition.start();

  let prev = () => {
    if (store.playIndex === 0) {
      if (store.currentList && store.currentList.songs.length - 1 > 0)
        store.setPlay(store.currentList.songs.length - 1);
    } else {
      store.setPlay(store.playIndex - 1);
    }
  };

  let next = () => {
    if (store.playIndex < store.currentList.songs.length - 1) {
      store.setPlay(store.playIndex + 1);
    } else {
      store.setPlay(0);
    }
  };

  function onPlayerStateChange(event) {
    let playerStatus = event.data;
    if (playerStatus === -1) {
      console.log('-1 Video unstarted');
    } else if (playerStatus === 0) {
      next();
      console.log('0 Video ended');
    } else if (playerStatus === 1) {
      addListen();
      setList(store.currentList);
      console.log('1 Video played');
    } else if (playerStatus === 2) {
      console.log('2 Video paused');
    } else if (playerStatus === 3) {
      console.log('3 Video buffering');
    } else if (playerStatus === 5) {
      console.log('5 Video cued');
      event.target.playVideo();
    }
  }

  /// Null checks
  let videoInfo = (
    <CardContent className="video-info">
      <Typography style={{ fontFamily: 'Gummy', color: 'black', top:"20px"}} component="div" variant="h4">
        Now Playing
      </Typography>
    </CardContent>
  );

  if (store.currentList) {
    if (store.currentList.songs) {
      videoInfo = (
        <CardContent className="video-info" style={{ padding: '1% 0 0 3%' }}>
          <Typography
            component="div"
            style={{
              justifyContent: 'center',
              fontFamily: 'Gummy',
              color: 'black',
            }}
            variant="h4"
          >
            Now Playing
          </Typography>
          <Typography
            style={{ fontFamily: 'Gummy', color: 'black' }}
            component="div"
            variant="h6"
          >
            Playlist: {store.currentList.name}
          </Typography>
          <Typography
            style={{ fontFamily: 'Gummy', color: 'black' }}
            component="div"
            variant="h6"
          >
            Song Number:{store.playIndex + 1}
          </Typography>
          <Typography
            style={{ fontFamily: 'Gummy', color: 'black', marginBottom: '8%' }}
            component="div"
            variant="h6"
          >
            Title:{' '}
            {store.currentList.songs[store.playIndex]
              ? store.currentList.songs[store.playIndex].title
              : ''}
          </Typography>
          <Typography
            style={{ fontFamily: 'Gummy' }}
            component="div"
            variant="h6"
          >
            
          </Typography>
        </CardContent>
      );
    }
  }

  return (
    <div
      style={{
        opacity: selection === 'contained' ? '1' : '0',
        pointerEvents: selection === 'contained' ? 'auto' : 'none',
      }}
      className="video-player"
    >
      {store.currentList ? (
        <YouTube
          disabled={selection !== 'contained'}
          className="video-area"
          onReady={onPlayerReady}
          videoId={
            store.currentList.songs[store.playIndex]
              ? store.currentList.songs[store.playIndex].youTubeId
              : ''
          }
          opts={playerOptions}
          onStateChange={onPlayerStateChange}
        />
      ) : (
        <Box className="video-area" />
      )}

      <div className="video-actions">
        {videoInfo}
        <Box
          className="video-buttons"
          style={{ top: '7%', position: 'relative' }}
        >
          <IconButton onClick={prev} aria-label="previous">
            {theme.direction === 'rtl' ? (
              <SkipNextIcon />
            ) : (
              <SkipPreviousIcon />
            )}
          </IconButton>

          <IconButton onClick={pause} aria-label="play">
            <PauseIcon sx={{ height: 38, width: 38 }} />
          </IconButton>

          <IconButton onClick={play} aria-label="play">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>

          <IconButton onClick={next} aria-label="next">
            {theme.direction === 'rtl' ? (
              <SkipPreviousIcon />
            ) : (
              <SkipNextIcon />
            )}
          </IconButton>
          <button
            className="myButton"
            onClick={prev}
            aria-label="previous"
            style={{ fontFamily: 'Gummy',
            width: '180px',
            height: '3em',
            color: '#00334d',
            backgroundColor: '#f2f2f2',
            fontWeight:'bold',
          marginLeft:"15px",
        borderRadius:"5px"}}
            
          >
            {isClicked ? (
              <SkipPreviousIcon />
            ) : (
              'Unable to get it Watch previous video'
            )}
          </button>
        </Box>
        
      </div>
      <a href="http://localhost:2000/"><button style={{
            marginTop: '10px',
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
             marginLeft:"600px" ,
          }} >Challenges</button></a>
    </div>
  );
};
// const searchInput = document.querySelector("#searchInput");
// const searchButton = document.querySelector("#searchButton");
// const answerContainer = document.querySelector("#answerContainer");

// searchButton.addEventListener("click", function() {
//   fetch(`https://api.duckduckgo.com/?q=${searchInput.value}&format=json`)
//     .then(response => response.json())
//     .then(data => {
//       answerContainer.innerHTML = data.AbstractText;
//     })
//     .catch(error => console.error(error));
// });
// Create the input field and search button elements
// const searchInput = document.createElement("input");
// const searchButton = document.createElement("button");

// // Create the answer container element
// const answerContainer = document.createElement("div");

// // Set the input field's id, type and placeholder attributes
// searchInput.setAttribute("id", "searchInput");
// searchInput.setAttribute("type", "text");
// searchInput.setAttribute("placeholder", "Enter your search query");

// // Set the search button's text content
// searchButton.innerHTML = "Search";

// // Add an event listener to the search button
// searchButton.addEventListener("click", function() {
//   // Make a fetch request to the DuckDuckGo API using the search input value
// fetch(`https://api.duckduckgo.com/?q=${searchInput.value}&format=json`)
//   .then(response => response.json())
//   .then(data => {
//       // Set the answer container's inner HTML to the AbstractText of the API response
//       answerContainer.innerHTML = data.AbstractText;
//     })
//     .catch(error => console.error(error));
// });

// // Add the input field, search button and answer container elements to the document body
// document.body.appendChild(searchInput);
// document.body.appendChild(searchButton);
// document.body.appendChild(answerContainer);
// const searchInput = document.createElement("input");
// const searchButton = document.createElement("button");
// const answerContainer = document.createElement("div");

// searchButton.innerHTML = "Search";

// searchButton.addEventListener("click", function() {
//   fetch(`https://api.duckduckgo.com/?q=${searchInput.value}&format=json`)
//     .then(response => response.json())
//     .then(data => {
// answerContainer.innerHTML = data.AbstractText;
// const speech = new SpeechSynthesisUtterance();
// speech.text = data.AbstractText;
// speech.lang = "en-US";
// speech.volume = 1;
// speech.rate = 1;
// speech.pitch = 1;
// speechSynthesis.speak(speech);
// })
// .catch(error => console.error(error));
// });

// document.body.appendChild(searchInput);
// document.body.appendChild(searchButton);
// document.body.appendChild(answerContainer);

// const searchInput = document.createElement('input');
// searchInput.type = 'text';
// searchInput.style.padding = "10px";
// searchInput.style.borderRadius = "5px";
// searchInput.style.border = "1px solid #ccc";
// searchInput.style.width = "200px";


// const searchButton = document.createElement('button');
// searchButton.innerHTML = 'Search';
// searchButton.style.padding = '10px 20px';
// searchButton.style.backgroundColor = '#4CAF50';
// searchButton.style.color = 'white';
// searchButton.style.border = 'none';
// searchButton.style.borderRadius = '5px';
// searchButton.style.cursor = 'pointer';

// const answerContainer = document.createElement('div');
// answerContainer.style.marginTop = '10px';
// answerContainer.style.padding = '10px';
// answerContainer.style.borderRadius = '5px';
// answerContainer.style.backgroundColor = '#f2f2f2';
// answerContainer.style.textAlign = 'center';

// const stopButton = document.createElement('button');
// stopButton.innerHTML = 'Stop';
// stopButton.style.marginTop = '10px';
// stopButton.style.padding = '10px 20px';
// stopButton.style.backgroundColor = '#4CAF50';
// stopButton.style.color = 'white';
// stopButton.style.border = 'none';
// stopButton.style.borderRadius = '5px';
// stopButton.style.cursor = 'pointer';


// searchButton.addEventListener('click', function () {
//   fetch(`https://api.duckduckgo.com/?q=${searchInput.value}&format=json`)
//     .then((response) => response.json())
//     .then((data) => {
//       answerContainer.innerHTML = data.AbstractText;
//       const speech = new SpeechSynthesisUtterance(answerContainer.innerHTML);
//       speechSynthesis.speak(speech);
//     })
//     .catch((error) => console.error(error));
// });

// stopButton.addEventListener('click', function () {
//   speechSynthesis.cancel();
// });

// document.body.appendChild(searchInput);
// document.body.appendChild(searchButton);
// document.body.appendChild(answerContainer);
// document.body.appendChild(stopButton);


// let words = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape", "honeydew", "kiwi", "dog", "cat", "tree", "sun", "moon", "book", "door", "window", "pencil", "desk","lemon", "mango", "nectarine", "orange", "peach", "quince", "raspberry", "strawberry", "tangerine", "ugly", "watermelon"];

// let button = document.createElement("button");
// button.innerHTML = "Read Aloud and Guess";
// document.body.appendChild(button);
// button.addEventListener("click", function() {
//   let randomIndex = Math.floor(Math.random() * words.length);
//   let randomWord = words[randomIndex];
//   let msg = new SpeechSynthesisUtterance(randomWord);
//   window.speechSynthesis.speak(msg);
//   let input = document.createElement("input");
//   input.type = "text";
//   document.body.appendChild(input);
//   let submit = document.createElement("button");
//   submit.innerHTML = "Submit";
//   document.body.appendChild(submit);
//   submit.addEventListener("click", function() {
//     let result = document.createElement("div");
//     if (input.value.toLowerCase() === randomWord) {
//       let k = "correct";
//       msg = new SpeechSynthesisUtterance(k);
//       window.speechSynthesis.speak(msg);
//       alert("correct");
//     } else {
//       let k = "incorrect";
//       msg = new SpeechSynthesisUtterance(k);
//       window.speechSynthesis.speak(msg);
//       alert("Incorrect");
//     }
//   });
//   button.style.display = "none";
//   let tryAnother = document.createElement("button");
//   tryAnother.innerHTML = "Try Another";
//   document.body.appendChild(tryAnother);
//   tryAnother.addEventListener("click", function() {
//     randomIndex = Math.floor(Math.random() * words.length);
//     randomWord = words[randomIndex];
//     msg = new SpeechSynthesisUtterance(randomWord);
//     window.speechSynthesis.speak(msg);
//     input.value="";
//   });
// });
// const fullName = greeting+`${inputField.value}`;

export default IconButton;
