import sass from 'rollup-plugin-sass';
import typescript from 'rollup-plugin-typescript2';
import copy from 'rollup-plugin-copy';

import pkg from './package.json';

export default {
  input: 'src/index.tsx',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false
    }
  ],
  plugins: [
    sass({ output: 'dist/index.css', outputStyle: 'compressed' }),
    typescript({ objectHashIgnoreUnknownHack: true }),
    copy({
      targets: [{ src: 'src/styles/breakpoints.scss', dest: 'dist' }]
    })
  ],
  external: ['react', 'react-dom']
};
