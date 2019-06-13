import gulp from 'gulp';
import { css } from './css';
import { devServer } from './dev-server';
import { html } from './html';
import { scripts } from './scripts';

// Build the static assets and html.
export const build = gulp.series(css, scripts, html);

// Build the static assets & html, start a development server and then watch
// then assets, reloading the server whenever they change.
export const server = gulp.series(css, scripts, html, devServer);
