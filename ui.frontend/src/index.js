/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2020 Adobe Systems Incorporated
 ~
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~ you may not use this file except in compliance with the License.
 ~ You may obtain a copy of the License at
 ~
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ Unless required by applicable law or agreed to in writing, software
 ~ distributed under the License is distributed on an "AS IS" BASIS,
 ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~ See the License for the specific language governing permissions and
 ~ limitations under the License.
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/

// Use polyfills for modern language features
// The imports and dependencies can be removed if only modern browsers should be
// supported
import 'react-app-polyfill/stable';
import 'react-app-polyfill/ie9';
import 'custom-event-polyfill';

import { Constants, ModelManager } from '@adobe/aem-spa-page-model-manager';
import { createBrowserHistory } from 'history';
import React from 'react';
import { render } from 'react-dom';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import App from './App';
import ComponentRegistry from './utils/component-registry';
import ComponentClassesRegistry from './utils/component-classes-registry';
import './components/import-components';
import './index.css';

document.addEventListener('DOMContentLoaded', () => {
  ModelManager.initialize().then(pageModel => {
    const history = createBrowserHistory();
    render(
      <Router history={history}>
        <App
          history={history}
          cqChildren={pageModel[Constants.CHILDREN_PROP]}
          cqItems={pageModel[Constants.ITEMS_PROP]}
          cqItemsOrder={pageModel[Constants.ITEMS_ORDER_PROP]}
          cqPath={pageModel[Constants.PATH_PROP]}
          locationPathname={window.location.pathname}
        />
      </Router>,
      document.getElementById('spa-root')
    );
  });

  document.querySelectorAll('.react-content-spot').forEach((reactAnchor) => {
     const cqPath = reactAnchor.getAttribute('cqPath');
     if (!cqPath) {
         return;
     }
     fetch(`${cqPath}.json`).then(res => res.json()).then((config) => {
         const resourceType = config['sling:resourceType'];
         if (!resourceType) {
             return;
         }
         const Component = ComponentRegistry.getComponent(resourceType);
         if (!Component) {
             return;
         }
         render(<Component {...config} />, reactAnchor);
     })
  });

    const resourceTypes = ComponentClassesRegistry.getResourceTypes();
    console.log(resourceTypes)
    for (let resType of resourceTypes) {
        console.log(resType)
        renderComponent(resType, document)
    }
});

function collectReactAttributesForAemComponent(element) {
    let componentProps = {}
    for (let i = 0; i < element.attributes.length; i++) {
        if (element.attributes[i].name.startsWith('data-react-attribute-')) {
            componentProps[element.attributes[i].name.replace('data-react-attribute-', '')] = element.attributes[i].value;
        }
    }
    return componentProps;
}

function renderComponent(resourceType, componentContext) {
    if (!ComponentRegistry.getComponent(resourceType)) {
        return
    }
    const Component = ComponentRegistry.getComponent(resourceType)
    Array.prototype.slice.call(componentContext.querySelectorAll(ComponentClassesRegistry.getComponentClass(resourceType))).map(function (element) {
        ReactDOM.render(<Component
            aemData={collectReactAttributesForAemComponent(element)}
        />, element);
    });
}

window.parent.document.addEventListener('react-editable-reloaded', function (event) {
    var updateDom = event.detail.context;
    var resourceType = event.detail.resourceType;
    renderComponent(resourceType, updateDom)
})