import fs from 'fs';
import gulp from 'gulp';
import gulpNunjucks from 'gulp-nunjucks';
import gulpUtil from 'gulp-util';
import nunjucks from 'nunjucks';
import path from 'path';
import plumber from 'gulp-plumber';
import shell from 'gulp-shell';

const srcPath = path.resolve(__dirname, '../src');
const distPath = path.resolve(__dirname, '../dist');

const getCssManifest = () => JSON.parse(
    fs.readFileSync('./dist/css-manifest.json').toString()
);
const getJsManifest = () => JSON.parse(
    fs.readFileSync('./dist/js-manifest.json').toString()
);

const getAssets = () => {

    const cssManifest = getCssManifest();
    const jsManifest = getJsManifest();

    const css = [];
    if (cssManifest['app.css']) {
        css.push(cssManifest['app.css']);
    }

    const js = [];
    if (jsManifest['runtime.js']) {
        js.push(jsManifest['runtime.js']);
    }
    if (jsManifest['vendors.js']) {
        js.push(jsManifest['vendors.js']);
    }
    if (jsManifest['main.js']) {
        js.push(jsManifest['main.js']);
    }

    return { css, js };
};

export const html = () => new Promise(resolve => {

    gulp.src(path.resolve(srcPath, 'index.html'))
        .pipe(plumber({
            errorHandler: err => {
                gulpUtil.beep();
                gulpUtil.log(gulpUtil.colors.red(err));
            }
        }))
        .pipe(gulpNunjucks.compile(getAssets(), {
            env: new nunjucks.Environment(new nunjucks.FileSystemLoader(srcPath))
        }))
        .pipe(gulp.dest(distPath))
        // This is to get around a bug where nunjucks won't compile the templates if the
        // data being passed has changed, but the html template file hasn't.
        // @see https://github.com/carlosl/gulp-nunjucks-render/issues/47#issuecomment-240980200
        .pipe(shell(['touch <%= file.path %>']))
        .on('end', resolve);
});

export const watch = series => () => new Promise(resolve =>  {
    const paths = path.resolve(srcPath, '**/*.html');
    gulp.watch(paths, { interval: 100 }, gulp.series(html, ...series));
    resolve();
});
