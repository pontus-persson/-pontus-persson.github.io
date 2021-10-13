import './style.css';
import Test from './inc/test';


(function(w) {
    
    
    w.addEventListener('DOMContentLoaded', function() {
        var asd = 'test';
        console.log('ready');
        let t = new Test({ test: 1, asd:'asd'});
        t.Run();

        // w.document.body.style = '';
        // w.document.body.classList.add('opacity-100');
        w.document.body.classList.add('loaded');
        // w.document.body.classList.remove('opacity-0');
        // w.document.body.classList.remove('hidden');
    });

})(window);