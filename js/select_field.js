/**
 * Create a radio field type
 */
var Select = function(id, name, value, options, required, eventHandler) {
    var type = 'select';
    if (typeof(eventHandler) == 'undefined')
        eventHandler = null;

    Select.baseConstructor.call(this, id, name, type, value, options, required);
    this.eventHandler = eventHandler;
}
Manager.extend(Select, Field);

// Override default render function
Select.prototype.render = function(parent) {
    // Create the wrapper
    var wrapper = document.createElement('p');
    wrapper.setAttribute('id', this.id + '_wrapper');

    // Create the label for the field
    var label = document.createElement('label');
    label.setAttribute('for', this.id);
    label.innerHTML = this.name;
    wrapper.appendChild(label);

    // Create the input
    var element = document.createElement(this.type);
    element.setAttribute('id', this.id);

    var option = document.createElement('option');
    option.setAttribute('value', '');
    option.innerHTML = this.value;
    element.appendChild(option);
    element.onchange = this.eventHandler;

    // Create the radio buttons for each option
    for (i in this.options) {
        var option = document.createElement('option');
        option.setAttribute('value', this.options[i]);
        option.innerHTML = this.options[i];

        if (this.options[i] == this.value)
            option.selected = true;

        element.appendChild(option);
    }

    wrapper.appendChild(element);

    // Create the validation wrapper
    var validation = document.createElement('span');
    validation.setAttribute('id', this.id + '_validation');
    wrapper.appendChild(validation);

    return document.getElementById(parent).appendChild(wrapper);
};

// Override default getValue function
Select.prototype.getValue = function() {
    var select = document.getElementById(this.id);
    return select.options[select.selectedIndex].value;
};