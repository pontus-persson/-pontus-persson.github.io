/**
 * Ideas:
 *  - Make setting AI values of own entity affect all values like the ranomization of them
 *  - a way to reduce chance of "orbiting"
 *  - make AI values more dynamic, like a class for each value where we can set min max and controller for a slider etc
 *  - something to block or remove moving to far outside of canvas
 *  
 * Maybe ideas for more values:
 *  - Pickup distance, distance to get targets and enemies
 *  - Time to change movement? if random movement should be a thing
 *  - A value to add velocity to move towards the center of remaining food??
 */
var Engine = function(canvasid) {
    var self = this;
    this.canvas = document.getElementById(canvasid);
    this.ctx = this.canvas.getContext('2d');
    this.ctx.font = "22px sans";

    this.slideContainer = document.getElementById('slidecontainer');

    this.ownEntity = null;
    this.targets = [];
    this.enemies = [];
    this.entities = [];
    this.startTime = new Date().getTime();
    this.spawnExtraTargetsTime = 4000;

    // config
    this.maxtargets = 14;
    this.maxenemies = 14;
    this.maxentities = 5;
    this.targetsize = 6;
    this.maxtime = 30000;

    this.sliders = [];

    for (const [key, value] of Object.entries(minimumValues)) {
        var input = document.getElementById(key);
        if(input) {
            this.sliders.push(input)
            input.value = value;
            input.setAttribute('min', value);
            input.setAttribute('max', maximumValues[key]);
            input.addEventListener('change', function(e) {
                console.log(e.target.value);
                $(this).prev().html(key+': '+Math.round(e.target.value * 100) / 100);
                var oldValue = self.ownEntity.AI[key];
                console.log(oldValue / e.target.value);
                self.ownEntity.AI[key] = e.target.value;
            });
        }
    }

    this.start = function() {

        // init variables
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.maxtargets = (this.canvas.width + this.canvas.height) / 50;
        this.maxenemies = (this.canvas.width + this.canvas.height) / 100;

        this.ownEntity = new Entity(this.canvas.width, this.canvas.height);
        this.ownEntity.name.first = "You!";
        this.setSliders();
        
        window.addEventListener('resize', (e) => {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            this.maxtargets = (this.canvas.width + this.canvas.height) / 50;
            this.maxenemies = (this.canvas.width + this.canvas.height) / 100;
        });

        this.update();
    },

    this.update = function() {

        // no more targets || timelimit
        var elapsed = new Date().getTime() - this.startTime;

        if(elapsed > this.spawnExtraTargetsTime) {
            this.spawnTarget();
            this.spawnExtraTargetsTime += 1000;
        }       

        if(this.targets.length == 0 || elapsed > this.maxtime) {
            
            var bestscore = 0, firstindex = -1, secondindex = -1;
            var newentities = [];
            this.spawnExtraTargetsTime = 4000;
            this.ownEntity.score = 0;

            for (var i = 0; i < this.entities.length; i++) {
                if(this.entities[i].score > 0 && this.entities[i] !== this.ownEntity) {
                    if(bestscore < this.entities[i].score) {
                        bestscore = this.entities[i].score;
                        secondindex = firstindex;
                        firstindex = i;
                    }
                }
            }

            // always add own entitie
            newentities.push(this.ownEntity);

            // firstindex is the best entity if set, spawn extra children
            if(firstindex >= 0) {
                var offspring = new Entity(this.canvas.width, this.canvas.height);
                offspring.setValues(this.entities[firstindex], false); // keep one original
                newentities.push(offspring);
                offspring = new Entity(this.canvas.width, this.canvas.height);
                offspring.setValues(this.entities[firstindex]);
                newentities.push(offspring);
            }
            // second best also lives on
            if(secondindex >= 0) {
                var offspring = new Entity(this.canvas.width, this.canvas.height);
                offspring.setValues(this.entities[secondindex]);
                newentities.push(offspring);
            }

            while(newentities.length < this.maxentities) {
                newentities.push(new Entity(this.canvas.width, this.canvas.height));
            }

            this.entities = newentities;
    
            // respawn targets & enemies
            this.respawnStimulus();

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
        this.ctx.fillText("Time left: " + Math.round(this.maxtime - elapsed) / 1000, 4, 22);
        this.ctx.fillText("Food left: " + this.targets.length, 4, 42);
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

    this.respawnStimulus = function() {
        this.targets = [];
        this.enemies = [];
        for (var i = 0; i < this.maxtargets; i++) {
            this.spawnTarget();
        }
        for (var i = 0; i < this.maxenemies; i++) {
            this.spawnEnemy();
        }
    }

    this.spawnTarget = function() {
        var spawn = 500;
        while(--spawn > 0) {
            var spawnPos = new vec2(Math.random() * this.canvas.width, Math.random() * this.canvas.height);
            var minDist = 99999;
            for (var target = 0; target < this.targets.length; target++) {
                var element = this.targets[target];
                var dist = element.pos.distanceTo(spawnPos);
                if(dist < minDist) minDist = dist;
            }
            if(minDist > 100) {
                spawn = 0;
            }
        }
        this.targets.push(new Target(spawnPos, this.targetsize));
    }

    this.spawnEnemy = function() {
        var spawn = 500;
        while(--spawn > 0) {
            var spawnPos = new vec2(Math.random() * this.canvas.width, Math.random() * this.canvas.height);
            var minDist = 99999;
            for (var enemy = 0; enemy < this.enemies.length; enemy++) {
                var element = this.enemies[enemy];
                var dist = element.pos.distanceTo(spawnPos);
                if(dist < minDist) minDist = dist;
            }
            if(minDist > 100) {
                spawn = 0;
            }
        }
        this.enemies.push(new Enemy(spawnPos, this.targetsize));
    }

    this.setSliders = function() {

        for (let i = 0; i < this.sliders.length; i++) {
            const element = this.sliders[i];
            const id = element.getAttribute('id');
            element.value = this.ownEntity.AI[id];
            $(element).prev().html(id+': '+Math.round(element.value * 100) / 100);

        }
    //     let sum = values.reduce(function(a, b) { return a + b; }, 0);

    //     for (let i = 0; i < values.length; i++) {
    //         values[i] = values[i] / sum; // set values to a percentage according to its random value
    //     }
    //     let sum2 = values.reduce(function(a, b) { return a + b; }, 0);
        
    //     if(Math.round(sum2) !== 1) {
    //         throw("Error in setValues, values sum not equal to 1");
    //     }
        
    //     if (!parent) {
    //         this.distWeight = (values[0] * (maximumValues.distWeight - minimumValues.distWeight)) + minimumValues.distWeight;
    //         this.edistWeight = (values[1] * (maximumValues.edistWeight - minimumValues.edistWeight)) + minimumValues.edistWeight;
    //         this.distCutoff = (values[2] * (maximumValues.distCutoff - minimumValues.distCutoff)) + minimumValues.distCutoff;
    //         this.edistCutoff = (values[3] * (maximumValues.edistCutoff - minimumValues.edistCutoff)) + minimumValues.edistCutoff;
    //         this.turnlimit = (values[4] * (maximumValues.turnlimit - minimumValues.turnlimit)) + minimumValues.turnlimit;
    //         this.maxspeed = (values[5] * (maximumValues.maxspeed - minimumValues.maxspeed)) + minimumValues.maxspeed;
    //     }
    }
}