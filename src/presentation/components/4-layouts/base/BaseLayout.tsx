import React, { PureComponent } from 'react';

interface Props {
    className?: string
}

export default class extends PureComponent<Props> {

    public render(): JSX.Element {

        const { children, className } = this.props;

        return (
            <div className={`lyt-base${className ? ' ' + className : ''}`}>
                {children}
            </div>
        );
    }
}
