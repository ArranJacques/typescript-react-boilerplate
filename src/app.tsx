import 'core-js';
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import getStore from 'data/store';
import hello from 'presentation/containers/hello-container';
import ReactDom from 'react-dom';
import HomePage from 'presentation/components/5-pages/home/HomePage';
import ScrollToTop from 'support/components/ScrollToTop';

const app: HTMLElement | null = document.getElementById('app');
const ComposedHomePage = hello(HomePage);

if (app) {
    ReactDom.render((
        <Provider store={getStore()}>
            <Router>
                <ScrollToTop>
                    <Route path="/" exact component={ComposedHomePage} />
                </ScrollToTop>
            </Router>
        </Provider>
    ), app);
}
