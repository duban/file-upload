const fs = require('fs');
const { Parse } = require('zip-stream-parser');
const extract = require('extract-zip')
const unzipper = require('unzipper');
const mm = require('music-metadata');
var audioCtx = require('audio-context')({offline: true})
const { getAudioDurationInSeconds } = require('get-audio-duration');

const audioEncoder = require('audio-encoder');
const fileSaver    = require('file-saver');



fs.createReadStream('./uploads/record.zip')
    .pipe(unzipper.Parse())
    .on('entry', function (entry) {
        // console.log(entry.props.pathBuffer)
        const audioBuffer = entry.props.pathBuffer
        const fileName = entry.path;
        const filePath = './uploads/' + fileName
        // console.log(fileName.slice(-4));
        // var outputfile = "out"+".jpg";
        // const bfr = new Buffer.from(image, "base64");
        // fs.writeFileSync(filePath);
        // From a local path...
        // getAudioDurationInSeconds('./uploads/audio.mp3').then((duration) => {
        //     console.log(duration);
        // });
        // const buff = Buffer.from(fileName, 'base64');
        // fs.writeFileSync('test2.mp3', buff);
        // console.log(buff)
        // console.log("===============")

        // console.log(imgBuffer)
        const type = entry.type; // 'Directory' or 'File'
        const size = entry.vars.uncompressedSize; // There is also compressedSize;
        // const stream = fs.createReadStream(fileName);
        // getAudioDurationInSeconds(stream).then((duration) => {
        //     console.log(duration);
        // });
        // const metadata = mm.parseBuffer(imgBuffer, 'audio/mpeg');
        // metadata.then(function(result){
        //     console.log(JSON.stringify(result))
        // })
        // convert as mp3 and save file using file-saver
        // const audioContext = new AudioContext();
        // const length = 44100; // one second @ 44.1KHz
        // const audioB = audioCtx.createBuffer(1, length, 44100);
        // const channelData = audioBuffer.getChannelData(0);
        //
        // // fill some audio
        // for (let i = 0; i < length; i++) {
        //     channelData[i] = Math.sin(i * 0.03);
        // }
        // audioEncoder(audioB, 128, null, function onComplete(blob) {
        //     fileSaver.saveAs(blob, './uploads/sound.mp3');
        // });
        console.log(audioCtx)
        if (fileName === "this IS the file I'm looking for") {
            entry.pipe(fs.createWriteStream('output/path'));
        } else {
            entry.autodrain();
        }
    });

// const zip = fs.createReadStream('./uploads/record.zip').pipe(unzipper.Parse({forceStream: true}));
// for await (const entry of zip) {
//     const fileName = entry.path;
//     const type = entry.type; // 'Directory' or 'File'
//     const size = entry.vars.uncompressedSize; // There is also compressedSize;
//     if (fileName === "this IS the file I'm looking for") {
//         entry.pipe(fs.createWriteStream('output/path'));
//     } else {
//         entry.autodrain();
//     }
// }
// console.log(zip)
// for (const entry of zip) {
//     console.log(entry)
//     const fileName = entry.path;
//     const type = entry.type; // 'Directory' or 'File'
//     const size = entry.vars.uncompressedSize; // There is also compressedSize;
//     if (fileName === "this IS the file I'm looking for") {
//         entry.pipe(fs.createWriteStream('output/path'));
//     } else {
//         entry.autodrain();
//     }
// }

fs.createReadStream('./uploads/record.zip')
    .pipe(unzipper.Extract({ path: './uploads/record' }));


// var data = {}
// async function main () {
//     try {
//         const resp =  await extract('./uploads/record.zip', { dir: './uploads/record' })
//         console.log(resp)
//         return resp
//     } catch (err) {
//         // handle any errors
//     }
// }
//
// const resp = main()
// console.log(resp)

// fs.createReadStream('./uploads/record.zip')
//     .pipe(Parse())
//     .on('entry', function (entry) {
//         // const stream = fs.createReadStream(entry.path);
//         // getAudioDurationInSeconds(stream).then((duration) => {
//         //     console.log(duration);
//         // });
//         var fileName = entry.path;
//         var type = entry.type; // 'Directory' or 'File'
//         var size = entry.size;
//         Object.assign(data, {name:entry.path,size:entry.size})
//         console.log(JSON.stringify(entry))
//         entry.pipe(fs.createWriteStream('./uploads/record'));
//         if (fileName === "this IS the file I'm looking for") {
//             entry.pipe(fs.createWriteStream('output/path'));
//         } else {
//             entry.autodrain();
//         }
//     });