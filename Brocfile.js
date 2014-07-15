const pickFiles = require('broccoli-static-compiler')
// const browserify = require('broccoli-browserify')
const mergeTrees = require('broccoli-merge-trees')

const filterReact = require('broccoli-react')

var app = pickFiles('lib', {
  srcDir: '/',
  destDir: '/'
})
js = filterReact(app, {extensions: ['js']})

// const js = browserify(app, {
//   entries: ['./lib/main.js'],
//   outputFile: 'main.js',
//   // bundle: {
//     // debug: !(process.env.NODE_ENV === 'production')
//   // }
// })

module.exports = mergeTrees([js])
