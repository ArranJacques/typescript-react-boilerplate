import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import getStore from 'foundation/store';
import ScrollToTop from 'support/components/ScrollToTop';
import HomePage from 'view/pages/HomePage';

const app: HTMLElement | null = document.getElementById('app');

const state = window.__PRELOADED_STATE__;
delete window.__PRELOADED_STATE__;

if (app) {
    hydrate((
        <Provider store={getStore(state)}>
            <Router>
                <ScrollToTop>
                    <Route path="/" exact component={HomePage} />
                </ScrollToTop>
            </Router>
        </Provider>
    ), app);
}
