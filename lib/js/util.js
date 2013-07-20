util = this.util || {};

(function(color) {
    color.Color = function(hex) {
        var MASK = {r: 0xff0000, g: 0x00ff00, b: 0x0000ff};
        var r = hex & MASK.r;
        var g = hex & MASK.g;
        var b = hex & MASK.b;

        this.red = function() { return r >> 16; };
        this.green = function() { return g >> 8; };
        this.blue = function() { return b; };
        this.hex = hex;

        this.scale = function(coeff) {
            coeff = (coeff < 0) ? 0 : coeff;
            coeff = (coeff > 1) ? 1 : coeff;
            // luckily, somehow the '&' operator does what we want
            return new util.color.Color(MASK.r & (coeff * r) |
                                        MASK.g & (coeff * g) |
                                        MASK.b & (coeff * b));
        };
    };
}(util.color = util.color || {}));
