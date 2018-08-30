import babel from 'rollup-plugin-babel'

export default {
  input: 'src/main.js',
  treeshake: true,
  output: {
    file: 'rollup.bundle.js',
    format: 'cjs',
    name: 'rollupTest'
  },
  plugins: [
    babel()
  ]
};