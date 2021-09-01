import babel from 'rollup-plugin-babel'
import bannerString from './rollup.banner'
import less from 'rollup-plugin-less';

export default {
  external: ['vue'],
  input: './src/components/Tree/index.js',
  output: {
    format: 'umd',
    file: './lib/index.js',
    name: 'VueTree',
    sourcemap: false,
    globals: {
      vue: 'Vue',
    },
    banner: bannerString.replace(/\n/, '')
  },
  plugins: [
    babel({ exclude: 'node_modules/**', runtimeHelpers: true }),
    less({output: './lib/style/index.css'})
  ]
}
