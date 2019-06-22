import React, { ReactNode } from 'react';
import BaseShell from 'view/shells/base/BaseShell';
import HelloText from 'services/app/view/composed/HelloText';

export default class AppTemplate extends React.PureComponent {

    public render(): ReactNode {

        const body = (
            <div className="app-template">
                <HelloText />
            </div>
        );

        return <BaseShell body={body} />;
    }
}
