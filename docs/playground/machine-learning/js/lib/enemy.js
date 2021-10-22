var Enemy = function(p, r) {
    this.pos = p;
    this.rad = r;

    this.update = function() {

    },

    this.draw = function(ctx) {
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.rad, 0, 2 * Math.PI, false);
        ctx.fillStyle = 'red';
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#330000';
        ctx.stroke();
    }
}