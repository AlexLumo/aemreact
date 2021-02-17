(function (document, $) {
    $(document).on('cq-editables-update', function (event) {
        var updatedEditable = event.editables[0]
        var editableContext = updatedEditable.dom[0]
        var resourceType = updatedEditable.type
        var newEvent = new CustomEvent('react-editable-reloaded', { detail: {context: editableContext, resourceType: resourceType} });

        document.dispatchEvent(newEvent);
    })
})(document, Granite.$);