import gulp from 'gulp';
import path from 'path';
import webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const srcPath = path.resolve(__dirname, '../src');
const serverSrcPath = path.resolve(__dirname, '../server');
const distPath = path.resolve(__dirname, '../dist');

const config = {
    mode: 'none',
    context: serverSrcPath,
    target: 'node',
    devtool : 'none',
    entry: { main: ['./server.tsx'] },
    output: {
        filename: 'server.js',
        path: distPath
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: [/node_modules/]
            },
            {
                test: /\.svg$/,
                use: [
                    { loader: 'babel-loader' },
                    {
                        loader: 'react-svg-loader',
                        options: { jsx: true }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['./server.js']
        })
    ],
    resolve: {
        modules: [srcPath, 'node_modules'],
        extensions: ['.tsx', '.ts', '.js']
    },
};

export const prodServer = () => new Promise(resolve => {

    const build = () => webpack(config, (err) => {
        if (err) {
            console.log('Webpack', err);
        }
        resolve();
    });

    gulp.src(path.resolve(srcPath, 'index.html'))
        .pipe(gulp.dest(distPath))
        .on('end', build);
});
