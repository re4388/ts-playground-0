var pumpify = require('pumpify')
var tar = require('tar-fs')
var zlib = require('zlib')
var fs = require('fs')

var untar = pumpify(zlib.createGunzip(), tar.extract('output-folder'))
// you can also pass an array instead
// var untar = pumpify([zlib.createGunzip(), tar.extract('output-folder')])

fs.createReadStream('some-gzipped-tarball.tgz').pipe(untar)