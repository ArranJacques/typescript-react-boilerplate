import autoPrefixer from 'gulp-autoprefixer';
import del from 'del';
import gulp from 'gulp';
import gulpUtil from 'gulp-util';
import minifyCss from 'gulp-csso';
import path from 'path';
import plumber from 'gulp-plumber';
import rev from 'gulp-rev';
import stylus from 'gulp-stylus';

const distPath = path.resolve(__dirname, '../dist');
const distPathStatic = path.resolve(distPath, 'static');

export const css = () => new Promise(resolve => {

    del(distPath + '/app-*.css').then(() => gulp
        .src(path.resolve(__dirname, '../src/app.styl'))
        .pipe(plumber({
            errorHandler: err => {
                gulpUtil.beep();
                gulpUtil.log(gulpUtil.colors.red(err));
            }
        }))
        .pipe(stylus({ 'include css': true }))
        .pipe(autoPrefixer('last 5 version', '> 1%'))
        .pipe(minifyCss())
        .pipe(rev())
        .pipe(gulp.dest(distPathStatic))
        .pipe(rev.manifest(path.resolve(distPath, 'css-manifest.json'), {
            base: distPath,
            merge: true
        }))
        .pipe(gulp.dest(distPath))
        .on('end', resolve)
    );
});

export const watch = series => () => new Promise(resolve => {
    const paths = [path.resolve(__dirname, '../src/**/*.styl')];
    gulp.watch(paths, { interval: 100 }, gulp.series(css, ...series));
    resolve();
});
