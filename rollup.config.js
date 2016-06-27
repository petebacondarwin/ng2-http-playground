import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';

let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);

export default {
  entry: 'src/app.js',
  format: 'iife',
  plugins: [
    babel({
      exclude: 'node_modules/**'
    })
    // nodeResolve({
    //   main: true,
    //   jsnext: true,
    //   browser: true
    // }),
    // commonjs()
  ],
  external: external,
  targets: [
    {
      dest: pkg['main'],
      format: 'umd',
      moduleName: 'http-playground',
      sourceMap: true
    },
    {
      dest: pkg['jsnext:main'],
      format: 'es6',
      sourceMap: true
    }
  ]
};