import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import * as app from 'services/app/data/actions/app-actions';
import { randomEntity } from 'services/app/domain/random-entity';
import State from 'foundation/state';

interface StateProps {
    text: string
}

interface DispatchProps {
    randomiseText: () => void
}

const mapStateToProps = (state: State): StateProps => ({
    text: state.app.hello
});

const mapDispatchToProps = (dispatch: ThunkDispatch<State, void, app.Action>): DispatchProps => ({
    randomiseText: () => {
        dispatch(app.setHello(randomEntity()));
    }
});

export default connect<StateProps, DispatchProps, {}, State>(mapStateToProps, mapDispatchToProps);
