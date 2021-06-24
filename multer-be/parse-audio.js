const fs = require('fs');
const { Parse } = require('zip-stream-parser');
const extract = require('extract-zip')
const unzipper = require('unzipper');
const { getAudioDurationInSeconds } = require('get-audio-duration');

const ffprobe = require('node-ffprobe')
const ffprobeInstaller = require('@ffprobe-installer/ffprobe')

ffprobe.FFPROBE_PATH = ffprobeInstaller.path

const zipPath = './uploads/record.zip'
const extractPath = zipPath.slice(0,-4)

var data = {}
var audios = []

const calculatePrice = (duration) => {
    console.log(duration)
    return duration
}


const calculateDuration = (file) => {
    // getAudioDurationInSeconds(file).then((duration) => {
    //     calculatePrice(duration)
    // })

    // return dr.then(function(result) {
    //     // console.log(result) // "Some User token"
    //     return result
    // })
    // return getAudioDurationInSeconds(file).then((duration) => {return duration})
}


fs.createReadStream(zipPath)
    .pipe(unzipper.Extract({ path: extractPath }));

fs.readdirSync(extractPath).forEach(file => {
    const pathFile = extractPath + '/' + file
    var temp = ffprobe(pathFile)
    var duration = parseFloat(temp['format']['duration'])
    const price = calculatePrice(duration)
    Object.assign(data,{filename:file, duration:duration})
    audios.push(data)
    // console.log(data)
    // ffprobe(pathFile, { path: ffprobeStatic.path }, function (err, info) {
    //     if (err) return done(err);
    //     console.log(info);
    // console.log(pathFile)
    // getAudioDurationInSeconds(pathFile).then((duration) => {
    // //     Object.assign(data,{filename:file, duration:duration})
    // //     audios.push(data)
    //     console.log(duration)
    // });
    // console.log(audios);
});
console.log(audios);


// fs.readdirSync(extractPath, { withFileTypes: true },(err, files) => {
//     files.map(file => {
        // const pathFile = extractPath + '/' + file
        // console.log(file);
        // let audioDuration = getAudioDurationInSeconds(pathFile).then((duration) => {
        //     return audioDuration
        // });
        // console.log(audios)

        // getAudioDurationInSeconds(pathFile).then((duration) => {
        //     Object.assign(data,{filename:file, duration:duration})
        //     audios.push(data)
        //     // console.log(audios)
        //     // return dur
        // });
        // calculateDuration(pathFile)



    // });
    // console.log(calculateDuration(pathFile))
    // console.log('done')

// });

// fs.rmSync(extractPath, { recursive: true });
// console.log('done');
// fs.rmdir(extractPath,
//     { recursive: true, force: true }, (err) => {
//         if (err) {
//             return console.log("error occurred in deleting directory", err);
//         }
//         console.log("Directory deleted successfully");
//     });
