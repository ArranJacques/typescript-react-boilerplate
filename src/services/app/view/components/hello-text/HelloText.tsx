import React, { ReactElement } from 'react';

interface Props {
    randomiseText: () => void
    text: string
}

export default class HelloText extends React.PureComponent<Props> {

    public componentDidMount(): void {
        const { randomiseText } = this.props;
        setInterval(randomiseText, 3000);
    }

    public render(): ReactElement {

        const { text } = this.props;

        return (
            <div className="hello-text">
                Hello {text}!
            </div>
        );
    }
}
