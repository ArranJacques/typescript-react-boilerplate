import React, { ComponentType, PureComponent, ReactNode } from 'react';

interface Props {
    body: ComponentType | ReactNode
}

export default class BaseTemplate extends PureComponent<Props> {
    public render(): ReactNode {
        const { body } = this.props;
        return (
            <div className="base-tmp">
                {body}
            </div>
        );
    }
}
