import Browser from 'browser-sync';
import gulp from 'gulp';
import { html, watch as watchHtml } from './html';
import { watch as watchCss } from './css';
import { watch as watchImages } from './images';
import { watch as watchJs } from './scripts';

const browserConfig = {
    index: 'index.html',
    notify: false,
    open: false,
    server: 'dist',
    single: true
};

export const devServer = () => new Promise(resolve => {

    const browser = Browser.create();

    const startServer = done => browser.init(browserConfig, () => {
        done();
        resolve();
    });

    const reloadServer = done => {
        browser.reload();
        done();
    };

    const series = [html, reloadServer];

    gulp.series(
        watchCss(series),
        watchJs(series),
        watchImages(series),
        watchHtml([reloadServer]),
        startServer
    )();
});
