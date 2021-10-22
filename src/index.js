import feather from 'feather-icons';
import './style.css';

(function(w) {
    
    w.addEventListener('DOMContentLoaded', function() {
        w.document.body.classList.add('loaded');
        feather.replace()
    });

})(window);