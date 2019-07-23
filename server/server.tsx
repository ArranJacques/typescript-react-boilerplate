import React from 'react';
import express from 'express';
import { renderToString } from 'react-dom/server';
import html from './html';
import getStore from '../src/foundation/store';
import { Provider } from 'react-redux';
import HomePage from '../src/view/5-pages/home/HomePage';

const PORT = process.env.PORT || 3000;
const app = express();

app.use('/static', express.static('static'));

app.get('/', ({}, response) => {
    const store = getStore({});
    const body = renderToString(
        <Provider store={store}>
            <HomePage />
        </Provider>
    );
    response.send(html(body, store.getState()));
});

app.use(({}, res) => {
    res.status(404).send('404');
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}!`));
