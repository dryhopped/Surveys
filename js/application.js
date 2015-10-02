/**
 * Core Survey Application
 */
var Application = function(options) {
    this.options = {
        creator: 'creator',
        taker: 'take',
        results: 'results'
    };
    this.options = Manager.merge(this.options, options);
    this.fieldTypes = [];
    this.fieldForm = [];

    this.changeFieldType = function(event) {
        var type = event.target.selectedOptions[0].value;

        if (type == 'Checkbox' || type == 'Radio' || type == 'Select') {
            Manager.show(app.fieldForm[3].id + '_wrapper');
            app.fieldForm[3].required = true;
        } else {
            Manager.hide(app.fieldForm[3].id + '_wrapper');
            app.fieldForm[3].required = false;
        }
    };

    this.setupSurveyCreator = function() {
        document.getElementById('fields').innerHTML = '';

        if (this.fieldForm.length == 0) {
            this.fieldForm.push(new Text('field_question', 'Question', '', true));
            this.fieldForm.push(new Select('field_type', 'Field Type', 'Select Field Type...', this.fieldTypes, true, this.changeFieldType));
            this.fieldForm.push(new Text('field_default', 'Default Value', '', false));
            this.fieldForm.push(new Textarea('field_options', 'Options (one per line)', '', false));
        }

        for (var i in this.fieldForm) {
            this.fieldForm[i].render('fields');
        }

        Manager.hide(this.fieldForm[3].id + '_wrapper');
    };

    this.createId = function(input) {
        return input.toLowerCase().split(' ').join('_').replace(/\?/g, '');
    };

    this.updateList = function() {
        var questions = document.getElementById('questions');
        questions.innerHTML = '';

        for (var i in this.survey.questions) {
            var question = document.createElement('li');
            question.setAttribute('id', 'questions_' + this.survey.questions[i].id);

            var questionName = document.createElement('span');
            questionName.setAttribute('class', 'question');
            questionName.innerHTML = this.survey.questions[i].name;
            question.appendChild(questionName);

            var questionType = document.createElement('span');
            questionType.setAttribute('class', 'type');
            questionType.innerHTML = this.survey.questions[i].type;
            question.appendChild(questionType);

            questions.appendChild(question);
        }

        Manager.show('survey_button');

        return this.setupSurveyCreator();
    };

    this.addFieldToSurvey = function() {
        // Validate the form
        var validates = true;
        for (var i in this.fieldForm) {
            if (!this.fieldForm[i].validates()) {
                validates = false;
                break;
            }
        }

        if (!validates)
            return false;

        var question = {
            id:      this.createId(this.fieldForm[0].getValue()),
            name:    this.fieldForm[0].getValue(),
            type:    this.fieldForm[1].getValue(),
            value:   this.fieldForm[2].getValue(),
            options: this.fieldForm[3].getValue().split("\n"),
        };

        this.survey.questions.push(question);

        return this.updateList();
    };

    this.registerFieldType = function(name) {
        return this.fieldTypes.push(name);
    };
};

// Add functions to handle various pages of application
Application.prototype.createSurvey = function() {
    var name = document.getElementById('survey_name').value;
    this.survey = new Survey(name);
    document.getElementById(this.options.creator + '_title').innerHTML = "'"+name+"'";

    Manager.hide('main');
    Manager.show(this.options.creator);

    return this.setupSurveyCreator();
};

Application.prototype.takeSurvey = function() {
    if (this.survey.questions.length < 1) {
        alert('There must be at least one question in the survey!');
        return false;
    }

    Manager.hide(this.options.creator);

    for (var i in this.survey.questions) {
        switch (this.survey.questions[i].type) {
            case 'Select':
                this.survey.formFields.push(new Select(
                    this.survey.questions[i].id,
                    this.survey.questions[i].name,
                    this.survey.questions[i].value,
                    this.survey.questions[i].options,
                    true,
                    null
                ));
                break;
            case 'Radio':
                this.survey.formFields.push(new Radio(
                    this.survey.questions[i].id,
                    this.survey.questions[i].name,
                    this.survey.questions[i].value,
                    this.survey.questions[i].options,
                    true
                ));
                break;
            case 'Checkbox':
                this.survey.formFields.push(new Checkbox(
                    this.survey.questions[i].id,
                    this.survey.questions[i].name,
                    this.survey.questions[i].value,
                    this.survey.questions[i].options,
                    true
                ));
                break;
            case 'Textarea':
                this.survey.formFields.push(new Textarea(
                    this.survey.questions[i].id,
                    this.survey.questions[i].name,
                    this.survey.questions[i].value,
                    true
                ));
                break;
            case 'Text':
            default:
                this.survey.formFields.push(new Text(
                    this.survey.questions[i].id,
                    this.survey.questions[i].name,
                    this.survey.questions[i].value,
                    true
                ));
                break;
        }
    };

    for (var i in this.survey.formFields) {
        this.survey.formFields[i].render('survey_fields');
    }

    document.getElementById('take_title').innerHTML = "'"+this.survey.name+"'";

    return Manager.show(this.options.taker);
};

Application.prototype.submitSurvey = function() {
    var validates = true;
    for (var i in this.survey.formFields) {
        if (!this.survey.formFields[i].validates()) {
            return false;
        }
    }

    Manager.hide(this.options.taker);

    // Render the results
    for (var i in this.survey.formFields) {
        var result = document.createElement('div');

        var question = document.createElement('h4');
        question.innerHTML = this.survey.formFields[i].name;
        result.appendChild(question);

        var answer = document.createElement('p');
        answer.innerHTML = this.survey.formFields[i].getValue();
        result.appendChild(answer);

        document.getElementById('survey_results').appendChild(result);
    }

    document.getElementById('results_title').innerHTML = "'"+this.survey.name+"'";

    return Manager.show(this.options.results);
};

// Initialize the application
var app = new Application(); // An options object could be passed in to the constructor to change the configuration

// Register available field types
app.registerFieldType('Checkbox');
app.registerFieldType('Radio');
app.registerFieldType('Select');
app.registerFieldType('Text');
app.registerFieldType('Textarea');