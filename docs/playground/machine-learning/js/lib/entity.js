var Entity = function(w ,h) {
    this.score = 0;
    this.pos = new vec2(w * Math.random(), h * Math.random());
    this.vel = new vec2(Math.random() * 3 - 1.5, Math.random() * 3 - 1.5);
    this.shape = new Triangle(new vec2(0, 0), new vec2(0, 0), new vec2(0, 0));
    this.AI = new AI(w, h);
    this.generation = 1;
    this.name = new Name();
    this.name.first = '';

    this.update = function(targets, enemies) {
        this.AI.update(this, targets, enemies);
        this.vel.addVec(this.AI.vel);

        this.pos.addVec(this.vel);
        this.shape.update(this.pos, this.vel);
    },

    this.draw = function(ctx) {
        this.shape.draw(ctx);
        
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 3, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.strokeStyle = '#330000';
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.pos.x, this.pos.y);
        ctx.lineTo(this.pos.x + this.vel.x * 30, this.pos.y + this.vel.y * 30);
        ctx.strokeStyle = 'darkblue';
        ctx.stroke();
        ctx.arc(this.pos.x + this.vel.x * 30, this.pos.y + this.vel.y * 30, 3, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'blue';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.AI.distCutoff, 0, 2 * Math.PI, false);
        ctx.strokeStyle = 'rgba(100,255,100,0.7)';
        ctx.lineWidth = 1 + (this.score * 0.4);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.AI.edistCutoff, 0, 2 * Math.PI, false);
        ctx.strokeStyle = 'rgba(255,55,55,0.8)';
        ctx.lineWidth = 1;
        ctx.stroke();

        ctx.font = "18px sans";
        ctx.fillStyle = 'white';
        // ctx.strokeStyle = 'rgba(0,0,0,1)';
        // ctx.fillText(this.score, this.pos.x - 9, this.pos.y - 15);
        // ctx.strokeText(this.generation, this.pos.x - 9, this.pos.y - 15);
        ctx.fillText(this.score, this.pos.x - 10, this.pos.y - 15);
        let nametext = this.name.first + " gen:" + this.generation
        ctx.fillText(nametext, this.pos.x - 9 - (ctx.measureText(nametext).width * 0.5), this.pos.y + 15);
        // ctx.stroke();
    },


    this.setValues = function(parent, modify = true) {

        // this.pos = new vec2(parent.pos.x, parent.pos.y);
        // this.vel = new vec2(parent.vel.x, parent.vel.y);
        
        if(modify) {
            this.generation = parent.generation + 1;
            this.AI.distWeight = parent.AI.distWeight * (1.02 - Math.random() * 0.04);
            this.AI.edistWeight = parent.AI.edistWeight * (1.02 - Math.random() * 0.04);
            this.AI.distCutoff = parent.AI.distCutoff * (1.02 - Math.random() * 0.04);
            this.AI.edistCutoff = parent.AI.edistCutoff * (1.02 - Math.random() * 0.04);
            this.AI.limit = parent.AI.limit * (1.02 - Math.random() * 0.04);
            this.AI.maxspeed = parent.AI.maxspeed * (1.02 - Math.random() * 0.04);
        } else {
            this.generation = parent.generation;
            this.name = parent.name;
            this.AI.distWeight = parent.AI.distWeight;
            this.AI.edistWeight = parent.AI.edistWeight;
            this.AI.distCutoff = parent.AI.distCutoff;
            this.AI.edistCutoff = parent.AI.edistCutoff;
            this.AI.limit = parent.AI.limit;
            this.AI.maxspeed = parent.AI.maxspeed;
        }


        this.shape.fs = parent.shape.fs;

        // console.log("New Child: distW:"+this.AI.distWeight+ " distC:"+this.AI.distCutoff+" limit:"+this.AI.limit+" maxspeed:"+this.AI.maxspeed+" score:"+parent.score);
    }

}