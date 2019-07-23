
import del from 'del';
import gulp from 'gulp';
import path from 'path';

const srcPath = path.resolve(__dirname, '../src/fonts');
const srcGlob = path.resolve(srcPath, '**/*');
const distPath = path.resolve(__dirname, '../dist');
const distPathStatic = path.resolve(distPath, 'static/fonts');

const srcFiles = [
    srcGlob + '.eot',
    srcGlob + '.otf',
    srcGlob + '.ttf',
    srcGlob + '.woff',
    srcGlob + '.woff2',
    srcGlob + '.svg',
];

export const fonts = () => new Promise(resolve => {
    del(path.resolve(distPathStatic, '**/*')).then(() => gulp.src(srcFiles)
        .pipe(gulp.dest(distPathStatic))
        .on('end', resolve)
    );
});
