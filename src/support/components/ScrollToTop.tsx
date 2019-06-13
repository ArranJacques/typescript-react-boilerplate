import React, { ReactNode } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

class ScrollToTop extends React.Component<RouteComponentProps> {

    public componentDidUpdate(prevProps: RouteComponentProps): void {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            window.scrollTo(0, 0);
        }
    }

    public render(): ReactNode {
        return this.props.children;
    }
}

export default withRouter(ScrollToTop);
