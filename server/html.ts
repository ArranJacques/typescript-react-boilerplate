import fs from 'fs';
import nunjucks from 'nunjucks';

const getCssManifest = () => JSON.parse(
    fs.readFileSync('./css-manifest.json').toString()
);
const getJsManifest = () => JSON.parse(
    fs.readFileSync('./js-manifest.json').toString()
);

const getData = () => {
    const cssManifest = getCssManifest();
    const jsManifest = getJsManifest();
    return {
        css: [
            cssManifest['app.css'] || ''
        ],
        js: [
            jsManifest['runtime.js'] || '',
            jsManifest['vendors.js'] || '',
            jsManifest['main.js'] || ''
        ]
    };
};

const html = fs.readFileSync('./index.html').toString();

export default (body: string, state: {}) => nunjucks.renderString(html, {
    ...getData(),
    body: body,
    state: JSON.stringify(state).replace(/</g, '\\u003c')
});
