function associateObjWithEvent(a, b) {
    return function(c) {
        return c || (c = window.event), a[b](c)
    }
}

function initEyes() {
    var a = 57.2,
        b = 40.0,
        c = 73.0, //left-right
        d = 40.6, //Up-down
        e = 3.5,
        f = 3.6;
    dali = new Xeyes("face", "leftEye", a, b, e, "rightEye", c, d, f)
}

function Xeyes(a, b, c, d, e, f, g, h, i) {
    this.faceObj = document.getElementById(a), this.eye1Obj = document.getElementById(b), this.eye2Obj = document.getElementById(f), this.e1Lft = c, this.e1Top = d, this.e1Radius = e, this.e2Lft = g, this.e2Top = h, this.e2Radius = i, this.e1x, this.e1y, this.r1, this.e1xLoc, this.e1yLoc, this.e2x, this.e2y, this.r2, this.e2xLoc, this.e2yLoc, this.eyesInit(), window.onresize = associateObjWithEvent(this, "eyesInit"), document.onmousemove = associateObjWithEvent(this, "eyesMove")
}
function getPosition(a) {
    for (var b = 0, c = 0; a;) b += a.offsetLeft - a.scrollLeft + a.clientLeft, c += a.offsetTop - a.scrollTop + a.clientTop, a = a.offsetParent;
    return {
        x: b,
        y: c
    }
}
var dali, timeoutid = 0;
Xeyes.prototype.eyesInit = function(a) {
    var b = this.faceObj.offsetWidth,
        c = this.faceObj.offsetHeight;
    this.e1xLoc = .01 * this.e1Lft * b - this.eye1Obj.offsetWidth / 2, this.e1yLoc = .01 * this.e1Top * c - this.eye1Obj.offsetHeight / 2, this.e2xLoc = .01 * this.e2Lft * b - this.eye2Obj.offsetWidth / 2, this.e2yLoc = .01 * this.e2Top * c - this.eye2Obj.offsetHeight / 2, tmp = getPosition(this.faceObj), this.e1x = tmp.x + .01 * this.e1Lft * b, this.e1y = tmp.y + .01 * this.e1Top * c, this.e2x = tmp.x + .01 * this.e2Lft * b, this.e2y = tmp.y + .01 * this.e2Top * c, this.r1 = .01 * this.e1Radius * b, this.r2 = .01 * this.e2Radius * b, this.eye1Obj.style.left = this.e1xLoc + "px", this.eye1Obj.style.top = this.e1yLoc + this.r1 - 12 + "px", this.eye2Obj.style.left = this.e2xLoc + "px", this.eye2Obj.style.top = this.e2yLoc + this.r2 - 12 + "px", $(document).on("mousemove", function() {
        clearTimeout(timeoutid), timeoutid = window.setTimeout(function() {
            initEyes()
        }, 1e3)
    })
}, Xeyes.prototype.eyesMove = function(a) {
    var b, c, d, e, f, g, h, i = this;
    if (document.onmousemove = null, null == a.pageX) {
        var j = document.documentElement && null != document.documentElement.scrollLeft ? document.documentElement : document.body;
        b = a.clientX + j.scrollLeft, c = a.clientY + j.scrollTop
    } else b = a.pageX + 100, c = a.pageY;
    f = b - this.e1x, g = c - this.e1y, h = Math.sqrt(f * f + g * g), d = h < this.r1 ? f : f * this.r1 / h * 0.4, e = h < this.r1 ? g : g * this.r1 / h * .15, this.eye1Obj.style.left = d + this.e1xLoc + "px", this.eye1Obj.style.top = e + this.e1yLoc + "px", f = b - this.e2x, g = c - this.e2y, h = Math.sqrt(f * f + g * g), d = h < this.r2 ? f : f * this.r2 / h * .4, e = h < this.r2 ? g : g * this.r2 / h * .15, this.eye2Obj.style.left = d + this.e2xLoc + "px", this.eye2Obj.style.top = e + this.e2yLoc + "px", window.setTimeout(function() {
        document.onmousemove = associateObjWithEvent(i, "eyesMove")
    }, 90)
};