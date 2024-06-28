// const express = require('express');
// const multer = require('multer');
// const app = express();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'public/videos/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.originalname);
//   }
// });

// const upload = multer({ storage });

// app.post('/upload', upload.single('video'), (req, res) => {
//   res.send({ file: req.file });
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });


const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.static('public'));

app.post('/upload', (req, res) => {
  const chunks = [];
  req.on('data', chunk => {
    chunks.push(chunk);
  });
  req.on('end', () => {
    const fileData = Buffer.concat(chunks);
    fs.writeFile('client/public/videos/video-brane1.mp4', fileData, err => {
      if (err) {
        console.error('Error saving file:', err);
        res.status(500).send('Error saving file');
      } else {
        console.log('File saved successfully');
        res.status(200).send('File saved successfully');
      }
    });
  });
});

app.listen(5000, () => {
  console.log('Server listening on port 5000');
});
