
const isProduction = process.env.NODE_ENV === 'prod'

console.log('isProduction:::', isProduction)
const cdn = {
  externals: {
    'shsc-ui': 'shscUI'
  },
  css: [
    'https://uatcdnqiniu.shuhaisc.com/shsc-ui/3.5.7/index.css'
  ],
  js: [
    'https://uatcdnqiniu.shuhaisc.com/shsc-ui/3.5.7/index.umd.min.js'
  ]
}

module.exports = {
  configureWebpack: config => {
    config.externals = cdn.externals
    
  },
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].cdn = cdn
      return args
    })
  }
}