import feather from 'feather-icons';
import 'winbox';
import './style.css';

(function(w) {
    
    w.addEventListener('DOMContentLoaded', function() {
        w.document.body.classList.add('loaded');
        feather.replace()

        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        // console.log(Math.min(windowWidth, windowHeight));

        let useWbox = Math.min(windowWidth, windowHeight) > 800;
        // console.log(useWbox);
        
        let setWinboxOff = w.document.getElementById('setWinboxOff');
        let setWinboxOn = w.document.getElementById('setWinboxOn');

        let setWboxButtons = () => {
            if(useWbox) {
                setWinboxOff.classList.remove('bg-blue-700');
                setWinboxOff.classList.add('bg-gray-400')
                setWinboxOn.classList.remove('bg-gray-400');
                setWinboxOn.classList.add('bg-blue-700');
            } else {
                setWinboxOff.classList.remove('bg-gray-400')
                setWinboxOff.classList.add('bg-blue-700');
                setWinboxOn.classList.remove('bg-blue-700');
                setWinboxOn.classList.add('bg-gray-400');
            }
        };

        setWboxButtons();

        setWinboxOff.addEventListener('click', function() {
            useWbox = false;
            setWboxButtons();
        });

        setWinboxOn.addEventListener('click', function() {
            useWbox = true;
            setWboxButtons();
        });

        let rows = w.document.getElementsByClassName('open-winbox');
        let boxes = [];

        for (let i = 0; i < rows.length; i++) {
            const element = rows[i];

            let titles = element.getElementsByClassName('title');
            let links = element.getElementsByTagName('a');
            let options = {
                width: windowWidth/2,
                height: windowHeight/2,
                class: 'bg-purple-700',
                border: 3
            };

            if(titles) {
                options.title = titles[0].innerHTML;
            }
            if(links) {
                let link =  links[0];
                options.url = link.getAttribute('href');
                link.addEventListener('click', function(e) {
                    if(useWbox) {
                        e.preventDefault();
                        boxes.push(WinBox.new(options));
                    }
                    return true;
                });
            }
        }

    });

})(window);