import './style.css';
import Test from './inc/test';


(function(w) {
    
    
    w.addEventListener('load', function() {
        var asd = 'test';
        console.log('ready');
        let t = new Test({ test: 1, asd:'asd'});
        t.Run();
    });

})(window);