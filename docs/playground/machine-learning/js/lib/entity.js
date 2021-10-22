var Entity = function(w ,h) {
    this.score = 0;
    this.pos = new vec2(w * Math.random(), h * Math.random());
    this.vel = new vec2(Math.random() * 3 - 1.5, Math.random() * 3 - 1.5);
    this.shape = new Triangle(new vec2(0, 0), new vec2(0, 0), new vec2(0, 0));
    this.AI = new AI(w, h);

    this.update = function(targets, enemies) {
        this.AI.update(this, targets, enemies);
        this.vel.addVec(this.AI.vel);
        
        this.pos.addVec(this.vel);
        this.shape.update(this.pos, this.vel);
    },

    this.draw = function(ctx) {
        this.shape.draw(ctx);
        
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, 3, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#330000';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.pos.x + this.vel.x * 30, this.pos.y + this.vel.y * 30, 3, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#000033';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.AI.distCutoff, 0, 2 * Math.PI, false);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(255,255,255,0.08)';
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.AI.edistCutoff, 0, 2 * Math.PI, false);
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(255,0,0,0.8)';
        ctx.stroke();

        ctx.font = "18px sans";
        ctx.fillStyle = 'white';
        ctx.lineWidth = 1;
        // ctx.strokeStyle = 'rgba(0,0,0,1)';
        ctx.fillText(this.score, this.pos.x - 9, this.pos.y - 15);
        // ctx.strokeText(this.score, this.pos.x - 9, this.pos.y - 15);
        // ctx.stroke();
    },


    this.setValues = function(parent) {
        this.pos = new vec2(parent.pos.x, parent.pos.y);
        this.vel = new vec2(parent.vel.x, parent.vel.y);
        // this.AI = new AI(parent.AI.canvasSize.x, parent.AI.canvasSize.y);
        this.AI.distWeight = parent.AI.distWeight * (1.02 - Math.random() * 0.04);
        this.AI.edistWeight = parent.AI.edistWeight * (1.02 - Math.random() * 0.04);
        this.AI.distCutoff = parent.AI.distCutoff * (1.02 - Math.random() * 0.04);
        this.AI.edistCutoff = parent.AI.edistCutoff * (1.02 - Math.random() * 0.04);
        this.AI.limit = parent.AI.limit * (1.02 - Math.random() * 0.04);
        this.AI.maxspeed = parent.AI.maxspeed * (1.02 - Math.random() * 0.04);

        this.shape.fs = parent.shape.fs;

        console.log("New Child: distW:"+this.AI.distWeight+ " distC:"+this.AI.distCutoff+" limit:"+this.AI.limit+" maxspeed:"+this.AI.maxspeed+" score:"+parent.score);
    }

}