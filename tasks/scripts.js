import gulp from 'gulp';
import path from 'path';
import webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import WebpackAssetsManifest from 'webpack-assets-manifest';

const mode = process.env.NODE_ENV || 'development';
const distPath = path.resolve(__dirname, '../dist');
const distPathStatic = path.resolve(distPath, 'static');

const config = {
    mode: mode,
    context: path.resolve(__dirname, '../src'),
    devtool: mode === 'development' ? 'inline-source-maps' : 'source-maps',
    entry: { main: ['./app.tsx'] },
    output: {
        filename: '[name]-[contenthash:8].js',
        path: distPathStatic
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: [/node_modules/]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*-*.js', '**/*-*.js.map']
        }),
        new WebpackAssetsManifest({
            output: path.resolve(distPath, 'js-manifest.json'),
            merge: true
        })
    ],
    resolve: {
        modules: [
            path.resolve(__dirname, '../src'),
            'node_modules'
        ],
        extensions: ['.tsx', '.ts', '.js']
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    }
};

config.plugins.push(mode === 'development'
    ? new webpack.NamedModulesPlugin()
    : new webpack.HashedModuleIdsPlugin()
);

export const scripts = () => new Promise(resolve => webpack(config, (err, stats) => {
    if (err) {
        console.log('Webpack', err);
    }
    console.log(stats.toString({ /* stats options */ }));
    resolve();
}));

export const watch = series => () => new Promise(resolve => {

    const paths = [
        path.resolve(__dirname, '../src/**/*.ts'),
        path.resolve(__dirname, '../src/**/*.tsx')
    ];

    gulp.watch(paths, { interval: 100 }, gulp.series(scripts, ...series));

    resolve();
});
