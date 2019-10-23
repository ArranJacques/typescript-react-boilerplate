import * as app from 'data/app/app-actions';
import { Record } from 'immutable';

export interface AppState {
    hello: string
}

const StateFactory = Record<AppState>({
    hello: 'World'
});

class State extends StateFactory implements AppState {
    constructor(config: Partial<AppState>) {
        super(config);
    }
}

export default (initial: {} = {}) => (state: State = new State(initial), action: app.Action) => {

    switch (action.type) {
        case app.ActionType.SetHello:
            return state.set('hello', action.payload);
    }

    return state;
}
