import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';

export default {
  input: 'dist-transpiled/index.js',
  output: [
    {
      file: 'dist/index.esm.js',
      format: 'es'
    },
    {
      file: 'dist/index.js',
      format: 'commonjs'
    }
  ],
  external: [
    '@apollo/client',
    '@haulmont/jmix-rest',
    'graphql',
    'mobx',
    'dayjs',
    'dayjs/plugin/customParseFormat',
    'dayjs/plugin/advancedFormat',
    'dayjs/plugin/weekday',
    'dayjs/plugin/localeData',
    'dayjs/plugin/weekOfYear',
    'dayjs/plugin/weekYear',
    'mobx-react',
    'react',
    'react-dom',
    'react-router',
    'react-router-dom',
    'react-testing-library',
  ],
  plugins: [
    resolve(),
    commonjs({
      namedExports: {
        'invariant': ['default'],
      }
    }),
    json()
  ]
};
