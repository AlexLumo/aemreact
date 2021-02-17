class ComponentRegistry {
    static instance = new ComponentRegistry();

    _registry = new Map();

    mapComponentToResourceType(reactComponent, resourceType) {
        this._registry.set(resourceType, reactComponent);
    }

    getComponent(resourceType) {
        return this._registry.get(resourceType);
    }
}

export default ComponentRegistry.instance;