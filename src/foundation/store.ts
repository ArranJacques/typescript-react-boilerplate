import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import getAppReducer from 'services/app/data/reducers/app-reducer';
import State from 'foundation/state';

export default (initialState: { [key: string]: any }) => createStore(
    combineReducers({ app: getAppReducer(initialState.app) }),
    applyMiddleware(thunk as ThunkMiddleware<State>)
);
