import React, { Component } from 'react';
import ComponentRegistry from '../../utils/component-registry'
import ComponentClassesRegistry from '../../utils/component-classes-registry'

export default class ComplexReactComponent extends Component {
    render() {
        return (
            <div>
                <p>Props from the AEM dialog: YS Component</p>
                <p>Title : {this.props.aemData.title}</p>
                <p>Subtitle : {this.props.aemData.subtitle}</p>
            </div>
        );
    }

    componentDidMount() {
        console.log('Component mounted');
    }
}

ComponentRegistry.mapComponentToResourceType(ComplexReactComponent, 'aemreact/components/ysreactcomponentforaempage');
ComponentClassesRegistry.mapClassToResourceType('.yevhen-slyva-component', 'aemreact/components/ysreactcomponentforaempage');
