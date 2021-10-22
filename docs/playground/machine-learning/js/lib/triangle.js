var Triangle = function(p1, p2, p3) {
    this.p1 = p1;
    this.p2 = p2;
    this.p3 = p3;

    this.fs = "rgb("+parseInt(255*Math.random())+","+parseInt(255*Math.random())+","+parseInt(255*Math.random())+")";

    this.update = function(p, vel) {

        // make copy so we don't modify original value
        var v = new vec2(vel.x, vel.y);
        v.normalize();

        // forward point is a bit further
        p1.x = p.x + v.x * 40;
        p1.y = p.y + v.y * 40;

        // other points are velocity vector normals
        p2.x = p.x + v.y * 15;
        p2.y = p.y + -v.x * 15;

        p3.x = p.x + -v.y * 15;
        p3.y = p.y + v.x * 15;
    },

    this.draw = function(ctx) {
        ctx.fillStyle = this.fs;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.lineTo(p1.x, p1.y);
        ctx.fill();
        ctx.lineWidth = 1;
        ctx.strokeStyle = '#000000';
        ctx.stroke();
    }
}