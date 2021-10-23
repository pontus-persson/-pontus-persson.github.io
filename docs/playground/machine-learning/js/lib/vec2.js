/**
 * Vec2 "class"
 **/
var vec2 = function(x, y) {
    this.x = x;
    this.y = y;
    this.len = function() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    },
    this.set = function(x, y) {
        this.x = x;
        this.y = y;
    },
    this.setVec = function(vec) {
        this.x = vec.x;
        this.y = vec.y;
    },
    this.add = function(a) {
        this.x += a;
        this.y += a;
    },
    this.addVec = function(vec) {
        this.x += vec.x;
        this.y += vec.y;
    },
    this.sub = function(s) {
        this.x -= s;
        this.y -= s;
    },
    this.subVec = function(vec) {
        this.x -= vec.x;
        this.y -= vec.y;
    },
    this.mul = function(m) {
        this.x *= m;
        this.y *= m;
    },
    this.mulVec = function(vec) {
        this.x *= vec.x;
        this.y *= vec.y;
    },
    this.div = function(d) {
        this.x /= d;
        this.y /= d;
    },
    this.divVec = function(vec) {
        this.x /= vec.x;
        this.y /= vec.y;
    },
    this.distanceTo = function(vec) {
        var dist = new vec2(
            vec.x - this.x,
            vec.y - this.y,
        );
        return dist.len();
    },
    this.normalize = function() {
        var l = this.len();
        if(l != 0) this.div(l);
    },
    this.limit = function(limit) {
        var l = this.len();
        if(l > limit) {
            this.normalize();
            this.mul(limit);
        }
    }
}