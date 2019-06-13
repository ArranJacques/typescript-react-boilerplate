import fs from 'fs';
import gulp from 'gulp';
import gulpUtil from 'gulp-util';
import nunjucks from 'gulp-nunjucks';
import path from 'path';
import plumber from 'gulp-plumber';
import rename from 'gulp-rename';
import shell from 'gulp-shell';

const distPath = path.resolve(__dirname, '../dist');

const getCssManifest = () => JSON.parse(
    fs.readFileSync('./dist/css-manifest.json').toString()
);
const getJsManifest = () => JSON.parse(
    fs.readFileSync('./dist/js-manifest.json').toString()
);

const getData = () => {
    const cssManifest = getCssManifest();
    const jsManifest = getJsManifest();
    return {
        css: [
            cssManifest['app.css']
        ],
        js: [
            jsManifest['runtime.js'],
            jsManifest['vendors.js'],
            jsManifest['main.js']
        ]
    };
};

export const html = () => new Promise(resolve => {

    const data = getData();
    data.body = '';
    data.state = JSON.stringify({});

    gulp.src(path.resolve(__dirname, '../src/index.html'))
        .pipe(plumber({
            errorHandler: err => {
                gulpUtil.beep();
                gulpUtil.log(gulpUtil.colors.red(err));
            }
        }))
        .pipe(nunjucks.compile(data))
        .pipe(rename('index.html'))
        .pipe(gulp.dest(distPath))
        // This is to get around a bug where nunjucks won't compile the templates if the
        // data being passed has changed, but the html template file hasn't.
        // @see https://github.com/carlosl/gulp-nunjucks-render/issues/47#issuecomment-240980200
        .pipe(shell(['touch <%= file.path %>']))
        .on('end', resolve);
});
