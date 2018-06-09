var gulp = require('gulp')
  , nodemon = require('gulp-nodemon')
 
 

gulp.task('watch', function () {
  var stream = nodemon({
    script: 'src/app.js', 
    watch: 'src'
  })
  return stream
})
