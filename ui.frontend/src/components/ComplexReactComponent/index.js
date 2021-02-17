import React, { Component } from 'react';
import ComponentRegistry from '../../utils/component-registry'

export default class ComplexReactComponent extends Component {
    render() {
        const {name, price, count} = this.props;
        return (
            <div>
                <p>Props from the AEM dialog</p>
                <p>item name: {name}</p>
                <p>item price: {price}</p>
                <p>items count: {count}</p>
            </div>
        );
    }

    componentDidMount() {
        console.log('Component mounted');
    }
}

ComponentRegistry.mapComponentToResourceType(ComplexReactComponent, 'aemreact/components/complexreactcomponent');
