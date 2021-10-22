var Engine = function(canvasid) {
    var self = this;
    this.canvas = document.getElementById(canvasid);
    this.ctx = this.canvas.getContext('2d');
    this.ctx.font = "22px sans";

    this.targets = [];
    this.enemies = [];
    this.entities = [];
    this.startTime = new Date().getTime();

    // config
    this.maxtargets = 14;
    this.maxenemies = 8;
    this.maxentities = 5;
    this.targetsize = 6;
    this.maxtime = 15000;

    this.start = function() {
        // init variables
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        for (var i = 0; i < this.maxtargets; i++) {
            this.targets.push(new Target(new vec2(Math.random() * this.canvas.width, Math.random() * this.canvas.height), this.targetsize));
        }
        for (var i = 0; i < this.maxenemies; i++) {
            this.enemies.push(new Enemy(new vec2(Math.random() * this.canvas.width, Math.random() * this.canvas.height), this.targetsize));
        }
        for (var i = 0; i < this.maxentities; i++) {
            this.entities.push(new Entity(this.canvas.width, this.canvas.height));
        }

        this.update();
    },

    this.update = function() {

        // no more targets || timelimit
        var elapsed = new Date().getTime() - this.startTime;
        if(this.targets.length == 0 || elapsed > this.maxtime) {
            
            var bestscore = 0, firstindex = -1;
            var newentities = [];

            // always one random entity
            newentities.push(new Entity(this.canvas.width, this.canvas.height));

            for (var i = 0; i < this.entities.length; i++) {
                if(this.entities[i].score > 0) {
                    if(bestscore <= this.entities[i].score) {
                        bestscore = this.entities[i].score;
                        firstindex = i;
                    }
                    var offspring = new Entity(this.canvas.width, this.canvas.height);
                    offspring.setValues(this.entities[i]);
                    newentities.push(offspring);
                }
            }

            // firstindex is the best entity if set, spawn extra children
            if(firstindex >= 0) {
                var offspring = new Entity(this.canvas.width, this.canvas.height);
                offspring.setValues(this.entities[firstindex]);
                newentities.push(offspring);
            }

            this.entities = newentities;
            for (var i = this.entities.length; i < this.maxentities; i++) {
                this.entities.push(new Entity(this.canvas.width, this.canvas.height));
            }
            // respawn targets & enemies
            this.targets = [];
            this.enemies = [];
            for (var i = 0; i < this.maxtargets; i++) {
                this.targets.push(new Target(new vec2(Math.random() * this.canvas.width, Math.random() * this.canvas.height), this.targetsize));
            }
            for (var i = 0; i < this.maxenemies; i++) {
                this.enemies.push(new Enemy(new vec2(Math.random() * this.canvas.width, Math.random() * this.canvas.height), this.targetsize));
            }

            this.startTime = new Date().getTime();
        }

        // update
        for (var i = 0; i < this.targets.length; i++) {
            this.targets[i].update();
        }
        for (var i = 0; i < this.enemies.length; i++) {
            this.enemies[i].update();
        }
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].update(this.targets, this.enemies);
        }

        this.draw();
        window.requestAnimationFrame(function() { self.update(); });
    },

    this.draw = function() {
        // draw canvas
        this.clear();
        for (var i = 0; i < this.targets.length; i++) {
            this.targets[i].draw(this.ctx);
        }
        for (var i = 0; i < this.enemies.length; i++) {
            this.enemies[i].draw(this.ctx);
        }
        for (var i = 0; i < this.entities.length; i++) {
            this.entities[i].draw(this.ctx);
        }
    },

    // clears canvas
    this.clear = function() {
        this.ctx.save();
        // Use the identity matrix while clearing the canvas
        this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // Restore the transform
        this.ctx.restore();
        this.ctx.fillStyle = "rgb(0,0,0)";
    }
}