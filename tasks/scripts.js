import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import del from 'del';
import gulp from 'gulp';
import hash from 'string-hash';
import path from 'path';
import runtimeConfig from './runtime-config';
import webpack, { DefinePlugin } from 'webpack';
import WebpackAssetsManifest from 'webpack-assets-manifest';

const mode = process.env.NODE_ENV || 'development';
const srcPath = path.resolve(__dirname, '../src');
const distPath = path.resolve(__dirname, '../dist');
const distPathStatic = path.resolve(distPath, 'static');

const webpackRuntimeConfig = { 'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV) } };
for (const key  in runtimeConfig) {
    if (runtimeConfig.hasOwnProperty(key)) {
        webpackRuntimeConfig[key] = JSON.stringify(runtimeConfig[key]);
    }
}

const config = {
    mode: mode,
    context: srcPath,
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
                use: {
                    loader: 'ts-loader',
                    options: { allowTsInNodeModules: true }
                },
                include: [
                    /src/,
                    // Add node_modules packages here that have typescript in...
                ]
            },
            {
                test: /\.svg$/,
                use: ({ issuer, resource }) => ({
                    loader: '@svgr/webpack',
                    options: {
                        dimensions: false,
                        svgo: true,
                        svgoConfig: {
                            plugins: [
                                { cleanupListOfValues: true },
                                { cleanupNumericValues: true },
                                { removeDesc: true },
                                { removeEmptyAttrs: true },
                                { removeEmptyContainers: true },
                                { removeEmptyText: true },
                                { removeRasterImages: true },
                                { removeTitle: true },
                                { removeUselessDefs: true },
                                { removeUnusedNS: true },
                                { cleanupIDs: { prefix: `${hash(issuer + resource)}` } }
                            ]
                        }
                    }
                })
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
        }),
        new DefinePlugin(webpackRuntimeConfig)
    ],
    resolve: {
        modules: [srcPath, 'node_modules'],
        extensions: ['.tsx', '.ts', '.js'],
        symlinks: false
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

const copyVendorFiles = () => new Promise(resolve => {

    // Remove if you ever need to copy vendor files directly into the dist
    // directory.
    return resolve();

    const vendorSrc = [
        //
    ];

    const vendorDist = path.resolve(distPathStatic, 'vendor');

    del(path.resolve(vendorDist, '**/*')).then(() => gulp.src(vendorSrc)
        .pipe(gulp.dest(vendorDist))
        .on('end', resolve)
    );
});

export const scripts = () => new Promise(resolve => webpack(config, (err, stats) => {

    if (err) {
        console.log('Webpack', err);
    }

    console.log(stats.toString());

    copyVendorFiles().then(resolve);
}));

export const watch = series => () => new Promise(resolve => {
    const paths = [path.resolve(srcPath, '**/*.ts'), path.resolve(srcPath, '**/*.tsx')];
    gulp.watch(paths, { interval: 100 }, gulp.series(scripts, ...series));
    resolve();
});
