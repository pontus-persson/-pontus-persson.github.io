import feather from 'feather-icons';
import './style.css';
import Test from './inc/test';


(function(w) {
    
    w.addEventListener('DOMContentLoaded', function() {
        var asd = 'test';
        console.log('ready');
        let t = new Test({ test: 1, asd:'asd'});
        t.Run();
        w.document.body.classList.add('loaded');
        feather.replace()
    });

})(window);