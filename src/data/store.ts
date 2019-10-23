import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import appReducer from 'data/app/app-reducer';
import State from 'data/state';

export default () => createStore(
    combineReducers({ app: appReducer }),
    applyMiddleware(thunk as ThunkMiddleware<State>)
);
