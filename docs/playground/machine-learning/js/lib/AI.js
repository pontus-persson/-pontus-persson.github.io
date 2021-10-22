var AI = function(w, h) {

    this.canvasSize = new vec2(w, h);

    // random center spot
    this.center = new vec2(w * Math.random(), h * Math.random());

    this.distWeight = Math.random() * 2 - 1;
    this.edistWeight = Math.random() * 2 - 1;
    this.distCutoff = 50 + 300 * Math.random() * Math.random();
    this.edistCutoff = 50 + 300 * Math.random() * Math.random();
    this.limit = Math.random();
    this.maxspeed = 6 * Math.random();

    this.vel = new vec2(0, 0);

    // console.log("New AI: distW:"+this.distWeight+ " distC:"+this.distCutoff+" limit:"+this.limit+" maxspeed:"+this.maxspeed);

    this.update = function(entity, targets, enemies) {
        this.vel.x = 0;
        this.vel.y = 0;
        
        for (var i = 0; i < enemies.length; i++) {
            var edelta = new vec2(enemies[i].pos.x - entity.pos.x, enemies[i].pos.y - entity.pos.y);
            var edist = edelta.len();
            if(edist < 12) {
                entity.score--;
                enemies.splice(i, 1);
                continue;
            }

            if(edist > this.edistCutoff) {
                continue;
            }
            var eweight = this.edistCutoff / edist * this.edistWeight;

            // console.log(eweight);

            edelta.normalize();

            this.vel.x += edelta.x * eweight;
            this.vel.y += edelta.y * eweight;
        }

        for (var i = 0; i < targets.length; i++) {
            var delta = new vec2(targets[i].pos.x - entity.pos.x, targets[i].pos.y - entity.pos.y);
            var dist = delta.len();
            if(dist < 12) {
                entity.score++;
                targets.splice(i, 1);
                continue;
            }
            if(dist > this.distCutoff) {
                continue;
            }

            var weight = this.distCutoff / dist * this.distWeight;

            delta.normalize();

            // var weight = this.distCutoff - (dist / this.distWeight);
            // var weight = dist / 1200;
            // var weight = dist - dist;
            // console.log(weight);
            // var weight = (dist * this.distWeight);
            this.vel.x += delta.x * weight;
            this.vel.y += delta.y * weight;

            // console.log(dist, weight);
        }

        // fallback if no targets found, move to center
        var delta = 0;
        var dist = 0;
        if(this.vel.x == 0 && this.vel.y == 0) {
            delta = new vec2(this.center.x - entity.pos.x, this.center.y - entity.pos.y);
            dist = delta.len();
            this.vel.x += delta.x * this.distWeight;
            this.vel.y += delta.y * this.distWeight;
        }
        // set random new point if reached or just randomly
        if(dist < 30 || Math.random() < 0.01) {
            this.center.x = this.canvasSize.x * Math.random();
            this.center.y = this.canvasSize.y * Math.random();
            // console.log("new point: "+this.center.x + " " +this.center.y);
        }

        // this.vel.normalize();
        this.vel.limit(this.limit);
        entity.vel.limit(this.maxspeed);
    }
}