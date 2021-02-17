class ComponentClassesRegistry {
    static instance = new ComponentClassesRegistry();

    _registry = new Map();

    mapClassToResourceType(componentRootClass, resourceType) {
        this._registry.set(resourceType, componentRootClass);
    }

    getComponentClass(resourceType) {
        return this._registry.get(resourceType);
    }

    getClassNames() {
        const classNames = []
        for (let [key, value] of this._registry) {
            classNames.push(value)
        }
        return classNames
    }

    getResourceTypes() {
        const resourceTypes = []
        for (let [key, value] of this._registry) {
            resourceTypes.push(key)
        }
        return resourceTypes
    }
}

export default ComponentClassesRegistry.instance;