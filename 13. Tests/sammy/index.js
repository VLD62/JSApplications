//Ref: https://azuredays.com/2014/05/17/single-page-apps-getting-started-with-sammyjs-routes/
var app = $.sammy(function () {

    this.element_selector = '#content';

    // routes go here

    this.route('get', '#/main', function(context) {
        context.app.swap('');
        context.$element().append('<h1>Main Page</h1>');
    });

    this.get('#/bigletters', function(context) {
        context.app.swap('');
        context.$element().append('<h1>Big Letters</h1>');
    });

    // respond to the parseme route and pass in word paramater
    this.get('#/parseme/:word', function (context) {
        context.app.swap('');
        context.$element().append('<h1>' + this.params['word'] + '</h1>');
    });

    // respond to the #/compose get verb by creating a form
    this.get('#/compose', function (context) {
        context.app.swap('');
        context.$element().append('<h1>say hello to?</h1>'
          + '<form action="#/compose" method="post">'
          + '<input type="text" name="to" />'
          + '<input type="submit" name="submit" />'
          + '</form>');
    });

    // respond to the #/compose post verb by taking the to param
    // and displaying it in a heading
    this.post('#/compose', function (context) {
        context.app.swap('');
        var to = this.params['to'];
        context.$element().append('<h1>hi ' + to + '</h1>')
        // do not actually submit the form 
        return false;
    });

    
    //respond to #by_name using RegEx:
    const nameRegExp = new RegExp( '#/by_name/(.*)' ,["i"]);
    this.get(nameRegExp, function () {
        alert(this.params['splat']);
    });

});


$(function () {
    app.run('#/main');
});