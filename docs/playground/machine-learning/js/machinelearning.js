// IIFE - Immediately Invoked Function Expression
(function(machinelearning) {
    // The global jQuery object is passed as a parameter
    machinelearning(window.jQuery, window, document);

}(function($, window, document) {

    // The $ is now locally scoped 

    // Listen for the jQuery ready event on the document
    $(function() {
        // The DOM is ready!
        var engine = new Engine('canvas');
        engine.start();
    });
    // The rest of the code goes here!
}));