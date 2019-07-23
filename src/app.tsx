import 'core-js';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import getStore from 'foundation/store';
import ScrollToTop from 'support/components/ScrollToTop';
import HomePage from 'view/5-pages/home/HomePage';

const app: HTMLElement | null = document.getElementById('app');

if (app) {
    ReactDom.render((
        <Provider store={getStore()}>
            <Router>
                <ScrollToTop>
                    <Route path="/" exact component={HomePage} />
                </ScrollToTop>
            </Router>
        </Provider>
    ), app);
}
