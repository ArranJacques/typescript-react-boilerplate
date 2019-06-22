import del from 'del';
import gulp from 'gulp';
import imageMin from 'gulp-imagemin';
import path from 'path';

const srcPath = path.resolve(__dirname, '../src/images');
const srcGlob = path.resolve(srcPath, '**/*');
const distPath = path.resolve(__dirname, '../dist');
const distPathStatic = path.resolve(distPath, 'static/images');

const srcFiles = [
    srcGlob + '.gif',
    srcGlob + '.jpeg',
    srcGlob + '.jpg',
    srcGlob + '.png',
    srcGlob + '.svg',
];

export const images = () => new Promise(resolve => {
    del(path.resolve(distPathStatic + '**/*')).then(() => gulp.src(srcFiles)
        .pipe(imageMin())
        .pipe(gulp.dest(distPathStatic))
        .on('end', resolve)
    );
});

export const watch = series => () => new Promise(resolve => {
    gulp.watch(srcFiles, { interval: 100 }, gulp.series(images, ...series));
    resolve();
});
