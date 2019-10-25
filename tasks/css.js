import autoPrefixer from 'gulp-autoprefixer';
import del from 'del';
import gulp from 'gulp';
import gulpUtil from 'gulp-util';
import minifyCss from 'gulp-csso';
import path from 'path';
import plumber from 'gulp-plumber';
import rev from 'gulp-rev';
import runtimeConfig from './runtime-config';
import stylus from 'gulp-stylus';

const srcPath = path.resolve(__dirname, '../src');
const distPath = path.resolve(__dirname, '../dist');
const distPathStatic = path.resolve(distPath, 'static');

export const css = () => new Promise(resolve => {

    del(path.resolve(distPathStatic, 'app-*.css')).then(() => gulp
        .src(path.resolve(srcPath, 'app.styl'))
        .pipe(plumber({
            errorHandler: err => {
                gulpUtil.beep();
                gulpUtil.log(gulpUtil.colors.red(err));
            }
        }))
        .pipe(stylus({
            define: runtimeConfig,
            import: [
                path.resolve(srcPath, 'foundation/index'),
                path.resolve(srcPath, 'support/index')
            ],
            'include css': true,
        }))
        .pipe(autoPrefixer())
        .pipe(minifyCss({
            // This is necessary to keep duplicate properties, which is necessary when using
            // fallback properties values for cross browser compatibility. Looking at you
            // IE11...
            restructure: false
        }))
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
    const paths = [path.resolve(srcPath, '**/*.styl')];
    gulp.watch(paths, { interval: 100 }, gulp.series(css, ...series));
    resolve();
});
