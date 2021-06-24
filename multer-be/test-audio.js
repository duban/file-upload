// var ffprobe = require('ffprobe'),
//     ffprobeStatic = require('ffprobe-static');
//
const track = './uploads/record/OCALL1_20210306-083231_351_085961440376_49664584-all.mp3'
//
// ffprobe(path, { path: ffprobeStatic.path }, function (err, info) {
//     if (err) return done(err);
//     console.log(info.streams[0].duration)
// })
// console.log('done')



const probe = require('node-ffprobe')
const ffprobeInstaller = require('@ffprobe-installer/ffprobe')

// console.log(ffprobeInstaller.path, ffprobeInstaller.version)
probe.FFPROBE_PATH = ffprobeInstaller.path
// probe.
// probe.doProbeSync(path)
// probe(track).then(probeData => {
//     console.log(probeData)
// })
var temp = probe(track)
var duration = parseFloat(temp['format']['duration'])
console.log(parseFloat(duration))
