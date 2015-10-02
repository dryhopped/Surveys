var Survey = function(name) {
    // Default options
    this.name = name;
    this.questions = [];
    this.formFields = [];
    this.answers = [];

    // Event handlers
    this.createElement = function(name, value, options) {
        for (i in questions) {
            this.render('created_questions', questions[i]);
        }
    };
};
Survey.prototype = {
    addQuestion: function(question) {
        return this.options.questions.push(question);
    }
};