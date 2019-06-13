import React, { ReactElement } from 'react';
import BaseShell from 'view/shells/base/BaseShell';
import HelloText from 'services/app/view/composed/HelloText';

export default class AppTemplate extends React.PureComponent {

    public render(): ReactElement {

        const body = (
            <div className="app-template">
                <HelloText />
            </div>
        );

        return <BaseShell body={body} />;
    }
}
