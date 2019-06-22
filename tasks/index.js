import gulp from 'gulp';
import { css } from './css';
import { devServer } from './dev-server';
import { fonts } from './fonts';
import { html } from './html';
import { images } from './images';
import { prodServer } from './prod-server';
import { scripts } from './scripts';

const mode = process.env.NODE_ENV || 'development';
const tasks = [css, scripts, images, fonts];
tasks.push(mode === 'production' ? prodServer : html);

// Build the static assets and html.
export const build = gulp.series(...tasks);

// Build the static assets & html, start a development server and then watch
// then assets, reloading the server whenever they change.
export const server = gulp.series(...tasks.concat([devServer]));
