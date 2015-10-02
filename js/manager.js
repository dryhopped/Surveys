var Manager = {};

Manager.extend = function(subClass, baseClass) {
	function inheritance() {}

    inheritance.prototype = baseClass.prototype;
	subClass.prototype = new inheritance();
	subClass.prototype.constructor = subClass;
	subClass.baseConstructor = baseClass;
	subClass.superClass = baseClass.prototype;
};

Manager.merge = function(object1, object2) {
    var newObject = {};

    for (var attrName in object1) {
        newObject[attrName] = object1[attrName];
    }
    for (var attrName in object2) {
        newObject[attrName] = object2[attrName];
    }

    return newObject;
};

Manager.show = function(element) {
    return document.getElementById(element).style.display = 'block';
};

Manager.hide = function(element) {
    return document.getElementById(element).style.display = 'none';
};