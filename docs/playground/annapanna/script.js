/*
 *  Annas stjärnhimmel
 */
(function() {
    var canvas, ctx, width, height, points = [], mouse, mouseDelta, numpoints = 0, drawDistance = 220;
    // Possible characters for every point
    // var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var possible = [
        "anna", "panna", "stekte", "fläsk", "1996",
        "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
    ];

    // Vec2 "class"
    function vec2(x, y) {
        this.x = x;
        this.y = y;
    }
    vec2.prototype = {
        len: function() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        },
        addVec: function(vec) {
            this.x += vec.x;
            this.y += vec.y;
        },
        subVec: function(vec) {
            this.x -= vec.x;
            this.y -= vec.y;
        },
        mul: function(m) {
            this.x *= m;
            this.y *= m;
        },
        mulVec: function(vec) {
            this.x *= vec.x;
            this.y *= vec.y;
        },
        div: function(d) {
            this.x /= d;
            this.y /= d;
        },
        divVec: function(vec) {
            this.x /= vec.x;
            this.y /= vec.y;
        },
        normalize: function() {
            var l = this.len();
            if(l != 0) this.div(l);
        },
        limit: function(limit) {
            var l = this.len();
            if(l > limit) {
                this.normalize();
                this.mul(limit);
            }
        }
    }

    // Point "class"
    function point(_pos, _tar) {
        this.pos = _pos;
        this.tar = _tar;
        this.force = new vec2(0, 0);
        this.delta = new vec2(0, 0);
        this.delaLen = 0;
        this.r = parseInt( Math.random() * 255 );
        this.g = parseInt( Math.random() * 255 );
        this.b = parseInt( Math.random() * 255 );
        // this.letter = possible.charAt(Math.floor(Math.random() * possible.length));
        this.letter = possible[(Math.floor(Math.random() * possible.length))];
    }
    point.prototype = {
        // update all values of the point
        update: function() {
            if(this.pos.x < 0) {
                this.pos.x = width-1;
            } else if(this.pos.x > width) {
                this.pos.x = 1;
            }
            if(this.pos.y < 0) {
                this.pos.y = height-1;
            } else if(this.pos.y > height) {
                this.pos.y = 1;
            }
            // if(this.pos.x < 10) {
            //     this.force.x += 0.05;
            // } else if(this.pos.x > width-10) {
            //     this.force.x -= 0.05;
            // }
            // if(this.pos.y < 10) {
            //     this.force.y += 0.05;
            // } else if(this.pos.y > height-10) {
            //     this.force.y -= 0.05;
            // }

            this.force.x += -0.1 + (0.2 * Math.random());
            this.force.y += -0.1 + (0.2 * Math.random());

            if(this.delaLen < drawDistance) {
                var mouseForce = new vec2(mouseDelta.x * ((drawDistance-this.delaLen)/drawDistance), mouseDelta.y * ((drawDistance-this.delaLen)/drawDistance));
                this.force.addVec(mouseForce);
            }

            // limit force and add to pos
            this.force.div(1.01);
            this.force.limit(4);
            this.pos.addVec(this.force);

            // calc mouse delta
            this.delta.x = this.pos.x;
            this.delta.y = this.pos.y;
            this.delta.subVec(mouse);

            if(Math.abs(this.pos.x - mouse.x) >= drawDistance || Math.abs(this.pos.y - mouse.y) >= drawDistance) {
                return false;
            }

            this.delaLen = this.delta.len();
            return true;
        },
        // draws the letter/word
        draw: function()  {

            // skip if to far away
            if(this.delaLen > drawDistance - 1) return;

            // ctx.font = "small-caps light 9px arial";
            // ctx.font = "small-caps light 9px sans";
            ctx.font = "small-caps 14px sans";
            if(this.letter.length < 2) {
                ctx.fillStyle = 'rgba(255, 255, 255, '+((drawDistance-this.delaLen)/drawDistance)+')';
            } else {
                ctx.fillStyle = 'rgba('+this.r+', '+this.g+', '+this.b+', '+((drawDistance-this.delaLen)/drawDistance)+')';
            }
            ctx.fillText(this.letter, this.pos.x, this.pos.y);
        }
    };

    // init
    $(document).ready(function() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas = document.getElementById('headerCanvas');
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');
        mouse = new vec2(parseInt(width / 2), parseInt(height / 2));
        mouseDelta = new vec2(0, 0);

        if(!('ontouchstart' in window)) {
            window.addEventListener('mousemove', mouseMove);
        }
        window.addEventListener('resize', resize);
        resize();
        update();
    });

    // update/draw everything
    function update() {
        ctx.clearRect(0,0,width,height);
        for (var i = 0; i < points.length; i++) {
            if(points[i].update()) {
                points[i].draw();
            }
        }
        mouseDelta.x = 0;
        mouseDelta.y = 0;
        requestAnimationFrame(update);
    }

    // on mouse move
    function mouseMove(e) {
        var posx = posy = 0;
        if (e.pageX || e.pageY) {
            posx = e.pageX;
            posy = e.pageY;
        }
        else if (e.clientX || e.clientY)    {
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        if(mouse.x || mouse.y) {
            mouseDelta.x = posx - mouse.x;
            mouseDelta.y = posy - mouse.y;
            mouseDelta.limit(0.1);
        }
        mouse.x = posx;
        mouse.y = posy;

        // console.log(mouseDelta);
        // console.log(mouse);
    }

    // on resize
    function resize() {
        width = $('#canvasSection').width();
        height = $('#canvasSection').height();
        canvas.width = width;
        canvas.height = height;
        initPoints();
    }

    // initiate a appropiate amount of points
    function initPoints() {
        points = [];
        numpoints = parseInt(height * width / 2500);
        for (var i = 0; i < numpoints; i++) {
            posx = parseInt(width * Math.random());
            posy = parseInt(height * Math.random());
            tarx = parseInt(width * Math.random());
            tary = parseInt(height * Math.random());
            points.push( new point(new vec2(posx, posy), new vec2(tarx, tary)) );
        }
        console.log("number of points:"+numpoints);
    }
})();
