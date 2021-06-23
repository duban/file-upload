const express = require('express');
const multer = require("multer");
const cors = require("cors");

const fs = require('fs');
const unzipper = require('unzipper');
var rimraf = require('rimraf');
const path = require('path');

const ffprobe = require('node-ffprobe')
const ffprobeInstaller = require('@ffprobe-installer/ffprobe')
ffprobe.FFPROBE_PATH = ffprobeInstaller.path

const app = express();
app.use(cors());

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["application/zip"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Incorrect file");
    error.code = "INCORRECT_FILETYPE";
    return cb(error, false)
  }
  cb(null, true);
}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({
  storage: storage,
  fileFilter,
  limits: {
    fileSize: 1000000000
  }
});

const PORT = '5000' || process.env.PORT;

app.post('/upload', upload.single('file'), (req, res) => {
  var data = {}
  var audios = []
  var durations = []
  const zipPath = './' + req.file.path
  const extractPath = zipPath.slice(0,-4)
  // console.log(req.file)
  // console.log(zipPath)
  fs.createReadStream(zipPath)
      .pipe(unzipper.Extract({ path: extractPath }));
  fs.readdirSync(extractPath).forEach(file => {
    const pathFile = extractPath + '/' + file
    var temp = ffprobe(pathFile)
    var duration = parseFloat(temp['format']['duration'])

    var file_type = temp['format']['format_name']
    var file_size = parseFloat(temp['format']['size'])
    Object.assign(data,{filename:file, file_type:file_type, file_size:file_size,duration:duration , price_usd: 0})
    // console.log(temp)
    durations.push(duration)
    audios.push(data)
  });
  const reducer = (accumulator, currentValue) => accumulator + currentValue;
  const total_duration = durations.reduce(reducer);
  const total_price = parseFloat(((total_duration / 15) * 0.006).toFixed(2));
  // const del = fs.rmdirSync('/uploads/record', { recursive: true });
  // rimraf.sync('./uploads/record');
  // rimraf.sync('./uploads/record');
  // rimraf('./uploads/record', function () { console.log("done"); });
  // console.log(path + req.file.filename)
  // fs.rmdirSync(extractPath, { recursive: false })
  // console.log(extractPath)
  // rimraf(extractPath, function () {   res.json({ original_file: {filename:req.file.filename,size:req.file.size, path:req.file.path},file_extract: {file:audios,total_file:audios.length, total_price_usd : 0} });
  // });
  console.log(req.file.path)
  res.json({ original_file: {filename:req.file.filename,size:req.file.size, path:req.file.path, total_duration:total_duration, total_price:total_price}});

  // res.json({ original_file: {filename:req.file.filename,size:req.file.size, path:req.file.path},file_extract: {file:audios,total_file:audios.length, total_price_usd : 0} });

});

app.use((err, req, res, next) => {
  if (err.code === "INCORRECT_FILETYPE") {
    res.status(422).json({ error: 'Only zip are allowed' });
    return;
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    res.status(422).json({ error: 'Allow file size is 1GB' });
    return;
  }
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));