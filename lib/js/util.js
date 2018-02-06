util = this.util || {};

(function(color) {
    color.Color = function(hex) {
        var MASK = {r: 0xff0000, g: 0x00ff00, b: 0x0000ff};
        var r = hex & MASK.r;
        var g = hex & MASK.g;
        var b = hex & MASK.b;

        var publicObj = {};
        // Accessors
        publicObj.red = function() { return r >> 16; };
        publicObj.green = function() { return g >> 8; };
        publicObj.blue = function() { return b; };
        publicObj.hex = function() { return hex; };
        // Get a new color scaled down by coeff, i.e.,
        // - if coeff = 0, return black;
        // - if coeff = 1, return copy of itself.
        publicObj.scale = function(coeff) {
            coeff = (coeff < 0) ? 0 : coeff;
            coeff = (coeff > 1) ? 1 : coeff;
            return new util.color.Color(MASK.r & (coeff * r) |
                                        MASK.g & (coeff * g) |
                                        MASK.b & (coeff * b));
        };
        return publicObj;
    };
}(util.color = util.color || {}));
