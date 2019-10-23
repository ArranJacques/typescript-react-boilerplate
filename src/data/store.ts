import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import getAppReducer from 'data/app/app-reducer';
import State from 'data/state';

export default () => createStore(
    combineReducers({ app: getAppReducer() }),
    applyMiddleware(thunk as ThunkMiddleware<State>)
);
