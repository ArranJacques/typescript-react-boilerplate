import React, { ComponentType, ReactElement } from 'react';

interface Props {
    body: ComponentType | ReactElement
}

export default class BaseShell extends React.PureComponent<Props> {
    render(): ReactElement {
        const { body } = this.props;
        return (
            <div className="base-shell">
                {body}
            </div>
        );
    }
}
