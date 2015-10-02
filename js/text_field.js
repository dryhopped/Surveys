/**
 * Create a text field type
 */
var Text = function(id, name, value, required) {
    var type = 'text';

    Text.baseConstructor.call(this, id, name, type, value, null, required);
};
Manager.extend(Text, Field);