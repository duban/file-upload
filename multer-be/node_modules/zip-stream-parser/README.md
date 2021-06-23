# zip-stream-parser

This project is forked from [EvanOxfeld/node-unzip](https://github.com/EvanOxfeld/node-unzip), for parsing the correct
file headers from [Central Directory](https://users.cs.jmu.edu/buchhofp/forensics/formats/pkzip.html#centraldirectory)
which is placed at the end of a zip file, and is ignored in `unzip`.

Only use this if you are interested in reading the entry information only from a zip file stream, except the file content
or extracting them.

## Install

```bash
npm install zip-stream-parser
```

## Usage

```javascript
const fs = require('fs');
const { Parse } = require('zip-stream-parser');

fs.createReadStream().pipe(Parse())
.on('entry', entry => {
  entry.autodran();
})
.on('cd.entry', info => {
  // entry information from central directory record
  console.log(info);
  // => {
  //   path: <string>,
  //   compressedSize: <number>,
  //   uncompressedSize: <number>,
  //   lastModified: <date>,
  // }
})
.on('cd.entries', entries => {
  // emit all entries after stream is finished
  console.log(entries);
  // output list of entries
})
```

## TODOs

* [ ] Support more entry information
* [ ] Support Zip64 file size

----
# unzip

Streaming cross-platform unzip tool written in node.js.

Unzip provides simple APIs similar to [node-tar](https://github.com/isaacs/node-tar) for parsing and extracting zip files.
There are no added compiled dependencies - inflation is handled by node.js's built in zlib support.  Unzip is also an
example use case of [node-pullstream](https://github.com/EvanOxfeld/node-pullstream).

## Installation

```bash
$ npm install unzip
```

## Quick Examples

### Extract to a directory
```javascript
fs.createReadStream('path/to/archive.zip').pipe(unzip.Extract({ path: 'output/path' }));
```

Extract emits the 'close' event once the zip's contents have been fully extracted to disk.

### Parse zip file contents

Process each zip file entry or pipe entries to another stream.

__Important__: If you do not intend to consume an entry stream's raw data, call autodrain() to dispose of the entry's
contents. Otherwise you risk running out of memory.

```javascript
fs.createReadStream('path/to/archive.zip')
  .pipe(unzip.Parse())
  .on('entry', function (entry) {
    var fileName = entry.path;
    var type = entry.type; // 'Directory' or 'File'
    var size = entry.size;
    if (fileName === "this IS the file I'm looking for") {
      entry.pipe(fs.createWriteStream('output/path'));
    } else {
      entry.autodrain();
    }
  });
```

Or pipe the output of unzip.Parse() to fstream

```javascript
var readStream = fs.createReadStream('path/to/archive.zip');
var writeStream = fstream.Writer('output/path');

readStream
  .pipe(unzip.Parse())
  .pipe(writeStream)
```

## License

(The MIT License)

Copyright (c) 2012 - 2013 Near Infinity Corporation

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
