'use strict';

var test = require('tap').test;
var fs = require('fs');
var path = require('path');
var temp = require('temp');
var dirdiff = require('dirdiff');
var unzip = require('../');

test("parse entry info", function (t) {
  var archive = path.join(__dirname, '../testData/compressed-standard/archive.zip');

  var unzipParser = unzip.Parse();
  fs.createReadStream(archive).pipe(unzipParser);
  unzipParser.on('error', function(err) {
    throw err;
  });

  unzipParser.once('dir', function(info) {
    t.equal(info.path, 'dir/');
    t.equal(info.compressedSize, 0);
    t.equal(info.uncompressedSize, 0);
    t.equal(info.lastModified.valueOf(), new Date('2012-08-08T03:18:10.000Z').valueOf());
  });

  unzipParser.once('file', function(info) {
    t.equal(info.path, 'dir/fileInsideDir.txt');
    t.equal(info.compressedSize, 3);
    t.equal(info.uncompressedSize, 3);
    t.equal(info.lastModified.valueOf(), new Date('2012-08-08T03:18:10.000Z').valueOf());
  });
    
  unzipParser.on('cd.entry', function(info) {
    if (info.type === 'File') {
      unzipParser.emit('file', info);
    } else if (info.type === 'Directory') {
      unzipParser.emit('directory', info);
    } else {
      throw new Error('invalide type');
    }
  })

  unzipParser.on('entries', entries => {
    t.equal(entries.length, 3);
  });
    
  unzipParser.on('close', t.end.bind(this));
});
