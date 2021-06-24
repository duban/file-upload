var ffmpeg = require('fluent-ffmpeg');

const track = './uploads/record/OCALL1_20210306-083231_351_085961440376_49664584-all.mp3'

ffmpeg.ffprobe(track,function(err, metadata) {
    console.log(require('util').inspect(metadata, false, null));
});
// var command = ffmpeg(track).duration();
// console.log(command)
// ffmpeg('/path/to/file1.avi')
//     .input(track)
//     .ffprobe(1, function(err, data) {
//         console.log('file1 metadata:');
//         console.dir(data);
//     });