/**
 * Create a radio field type
 */
var Radio = function(id, name, value, options, required) {
    var type = 'radio';

    Radio.baseConstructor.call(this, id, name, type, value, options, required);
}
Manager.extend(Radio, Field);

// Override default render function
Radio.prototype.render = function(parent) {
    // Create the wrapper
    var wrapper = document.createElement('p');
    wrapper.setAttribute('id', this.id + '_wrapper');

    // Create the label for the field
    var label = document.createElement('label');
    label.setAttribute('for', this.id);
    label.innerHTML = this.name;
    wrapper.appendChild(label);

    // Create the radio buttons for each option
    for (i in this.options) {
        var option_label = document.createElement('label');
        option_label.setAttribute('for', this.id);
        option_label.setAttribute('class', 'radio');

        // Create the input
        var element = document.createElement('input');
        element.setAttribute('type', this.type);
        element.setAttribute('name', this.id);
        element.setAttribute('value', this.options[i]);

        if (this.options[i] == this.value)
            element.checked = true;

        option_label.appendChild(element);

        var option_text = document.createTextNode(this.options[i]);
        option_label.appendChild(option_text);

        wrapper.appendChild(option_label);
    }

    // Create the validation wrapper
    var validation = document.createElement('span');
    validation.setAttribute('id', this.id + '_validation');
    wrapper.appendChild(validation);

    return document.getElementById(parent).appendChild(wrapper);
};

// Override the default getValue function
Radio.prototype.getValue = function() {
    var options = document.getElementsByName(this.id);
    for (var i = 0, len = options.length; i < len; i++) {
        if (options[i].checked)
            return options[i].value;
    }

    return '';
};