import Browser from 'browser-sync';
import gulp from 'gulp';
import { watch as watchCss } from './css';
import { html } from './html';
import { watch as watchJs } from './scripts';

const browserConfig = {
    open: false,
    server: 'dist',
    index: 'index.html'
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

    gulp.series(watchCss(series), watchJs(series), startServer)();
});
