import React, { PureComponent, ReactNode } from 'react';

interface Props {
    randomiseText: () => void
    text: string
}

export default class HelloText extends PureComponent<Props> {

    public componentDidMount(): void {
        const { randomiseText } = this.props;
        setInterval(randomiseText, 3000);
    }

    public render(): ReactNode {

        const { text } = this.props;

        return (
            <div className="hello-text">
                Hello {text}!
            </div>
        );
    }
}
