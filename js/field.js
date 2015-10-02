var Field = function(id, name, type, value, options, required) {
	this.id = id;
	this.name = name;
	this.type = type;
	this.value = value;
	this.options = options;
    this.required = required;
};
Field.prototype = {
	render: function(parent) {
        // Create the wrapper
        var wrapper = document.createElement('p');
        wrapper.setAttribute('id', this.id + '_wrapper');

		// Create the label for the field
		var label = document.createElement('label');
		label.setAttribute('for', this.id);
		label.innerHTML = this.name;
        wrapper.appendChild(label);

		// Create the input
		var element = document.createElement('input')
		element.setAttribute('type', this.type)
		element.setAttribute('id', this.id)
		element.setAttribute('value', this.value);
        wrapper.appendChild(element);

		// Create the validation wrapper
		var validation = document.createElement('span');
		validation.setAttribute('id', this.id + '_validation');
        wrapper.appendChild(validation);

		return document.getElementById(parent).appendChild(wrapper);
	},
	validates: function() {
		var validates = ((this.getValue() != '' && this.required == true) || this.required == false);

        if (!validates)
            document.getElementById(this.id + '_validation').innerHTML = "'" + this.name + "' is required";

        return validates;
	},
    getValue: function() {
        return document.getElementById(this.id).value;
    }
};