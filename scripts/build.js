/*eslint no-console: "off"*/
'use strict';

const path = require('path');
const fs = require('fs-extra');
const UglifyJS = require('uglify-js');

const projectDir = path.resolve(__dirname, '..');
const httpLibDir = path.resolve(projectDir, 'node_modules', '@angular', 'http', 'bundles');
const distDir = path.resolve(projectDir, 'dist');
const srcDir = path.resolve(projectDir, 'src');

// Read in the source files
const modTemplate = fs.readFileSync(path.resolve(srcDir, 'module.js'), 'utf8');
const ng1HttpMod = fs.readFileSync(path.resolve(srcDir, 'http.js'), 'utf8');
const ng2HttpLib = fs.readFileSync(path.resolve(httpLibDir, 'http.umd.js'), 'utf8');

// Inject the source files into the placeholders
// (we use a function to replace the placeholder to prevent accidental special replacement such as `$'`)
const outputModule = modTemplate
  .replace('//[[NG1_HTTP_MODULE]]//', () => ng1HttpMod)
  .replace('//[[NG2_HTTP_LIBRARY]]//', () => ng2HttpLib);

// Write the distributable library files
console.log('writing library file to ' + distDir + '/http.js');
fs.outputFileSync(path.resolve(distDir, 'http.js'), outputModule);

console.log('writing minified library file to ' + distDir + '/http.min.js');
const result = UglifyJS.minify(outputModule, {fromString: true});
fs.outputFileSync(path.resolve(distDir, 'http.min.js'), result.code);
