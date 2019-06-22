import React, { ComponentType, ReactNode } from 'react';

interface Props {
    body: ComponentType | ReactNode
}

export default class BaseShell extends React.PureComponent<Props> {
    render(): ReactNode {
        const { body } = this.props;
        return (
            <div className="base-shell">
                {body}
            </div>
        );
    }
}
