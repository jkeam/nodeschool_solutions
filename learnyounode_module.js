'use strict';
// This is the module used in lesson 6. Make it modular
const fs   = require('fs');
const path = require('path');

module.exports = (dirname, extension, callback) => {
  fs.readdir(dirname, (err, list) => {
    if (err) return callback(err);
    callback(null, list.filter((item) => path.extname(item) === `.${extension}`));
  });
};
