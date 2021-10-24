// IIFE - Immediately Invoked Function Expression
(function(machinelearning) {
    // The global jQuery object is passed as a parameter
    machinelearning(window.jQuery, window, document);

}(function($, window, document) {

    // The $ is now locally scoped 

    // Listen for the jQuery ready event on the document
    $(function() {
        // The DOM is ready!

        // globals
        window.minimumValues = {
            distWeight: 0,
            edistWeight: 0,
            distCutoff: 40,
            edistCutoff: 40,
            turnlimit: 0.0,
            maxspeed: 0.4,
        }

        window.maximumValues = {
            distWeight: 1,
            edistWeight: 1,
            distCutoff: 500,
            edistCutoff: 500,
            turnlimit: 0.2,
            maxspeed: 6,
        }

        
        var engine = new Engine('canvas');
        engine.start();
    });
    // The rest of the code goes here!
}));