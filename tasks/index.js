import gulp from 'gulp';
import { css } from './css';
import { devServer } from './dev-server';
import { fonts } from './fonts';
import { html } from './html';
import { images } from './images';
import { scripts } from './scripts';

const buildTasks = [css, scripts, images, fonts, html];

// Build the static assets and html.
export const build = gulp.series(...buildTasks);

// Build the static assets & html, start a development server and then watch
// then assets, reloading the server whenever they change.
export const server = gulp.series(...buildTasks, devServer);
