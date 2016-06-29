'use strict';

const path = require('path');
const fs = require('fs-extra');
const UglifyJS = require("uglify-js");

const projectDir = path.resolve(__dirname, '..');
const httpLibDir = path.resolve(projectDir, 'node_modules', '@angular', 'http', 'bundles');
const distDir = path.resolve(projectDir, 'dist');
const srcDir = path.resolve(projectDir, 'src');

const modTemplate = fs.readFileSync(path.resolve(srcDir, 'module.js'), 'utf8');
const shims = fs.readFileSync(path.resolve(srcDir, 'a2-shims.js'), 'utf8');
const ng1HttpMod = fs.readFileSync(path.resolve(srcDir, 'http.js'), 'utf8');
const ng2HttpLib = fs.readFileSync(path.resolve(httpLibDir, 'http.umd.js'), 'utf8');

const outputModule = modTemplate
  .replace('//[[SHIM]]//', shims)
  .replace('//[[NG1_HTTP_MODULE]]//', ng1HttpMod)
  .replace('//[[NG2_HTTP_LIBRARY]]//', ng2HttpLib);

console.log('writing build file to ' + distDir + '/http.js');
fs.outputFileSync(path.resolve(distDir, 'http.js'), outputModule);

const result = UglifyJS.minify(outputModule, {fromString: true});
fs.outputFileSync(path.resolve(distDir, 'http.min.js'), result.code);
