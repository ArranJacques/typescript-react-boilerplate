import React, { PureComponent, ReactNode } from 'react';
import BaseShell from 'view/4-templates/base/BaseTemplate';
import HelloText from 'services/app/view/composed/HelloText';

export default class AppTemplate extends PureComponent {

    public render(): ReactNode {

        const body = (
            <div className="app-tmp">
                <HelloText />
            </div>
        );

        return <BaseShell body={body} />;
    }
}
