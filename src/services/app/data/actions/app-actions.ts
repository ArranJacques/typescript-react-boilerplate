import { ThunkAction } from 'redux-thunk';
import State from 'foundation/state';

export enum ActionType {
    SetHello = 'SET_HELLO'
}

interface SetHello {
    type: ActionType.SetHello
    payload: string
}

export type Action = SetHello

export function setHello(text: string): ThunkAction<Promise<void>, State, void, Action> {
    return dispatch => new Promise(resolve => {
        dispatch({ type: ActionType.SetHello, payload: text });
        resolve();
    });
}
