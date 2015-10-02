/**
 * Create a text field type
 */
var Textarea = function(id, name, value, required) {
    var type = 'textarea';

    Textarea.baseConstructor.call(this, id, name, type, value, null, required);
};
Manager.extend(Textarea, Field);

// Override default render function
Textarea.prototype.render = function(parent) {
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
    element.innerHTML = this.value;
    wrapper.appendChild(element);

    // Create the validation wrapper
    var validation = document.createElement('span');
    validation.setAttribute('id', this.id + '_validation');
    wrapper.appendChild(validation);

    return document.getElementById(parent).appendChild(wrapper);
};