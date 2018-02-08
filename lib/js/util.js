util = this.util || {};

(function(canvas) {
    var FOV = 75;

    var _createDefaultCamera = function(width, height) {
        var camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        camera.position.set(0, 0, 50);
        return camera;
    };

    canvas.Canvas = function(width, height, optCamera) {
        console.log("initializing canvas with width ", width,
            "/ height ", height);
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);
        var camera = optCamera || _createDefaultCamera(width, height);
        var scene = new THREE.Scene();

        var exported = {};
        exported.render = function() {
            renderer.render(scene, camera);
        };
        exported.scene = function() {
            return scene;
        };
        exported.domElement = function() {
            return renderer.domElement;
        };
        return exported;
    };
}(util.canvas = util.canvas || {}));

(function(color) {
    color.Color = function(hex) {
        var MASK = {r: 0xff0000, g: 0x00ff00, b: 0x0000ff};
        var r = hex & MASK.r;
        var g = hex & MASK.g;
        var b = hex & MASK.b;

        var exported = {};
        // Accessors
        exported.red = function() { return r >> 16; };
        exported.green = function() { return g >> 8; };
        exported.blue = function() { return b; };
        exported.hex = function() { return hex; };
        // Get a new color scaled down by coeff, i.e.,
        // - if coeff = 0, return black;
        // - if coeff = 1, return copy of itself.
        exported.scale = function(coeff) {
            coeff = (coeff < 0) ? 0 : coeff;
            coeff = (coeff > 1) ? 1 : coeff;
            return new util.color.Color(MASK.r & (coeff * r) |
                                        MASK.g & (coeff * g) |
                                        MASK.b & (coeff * b));
        };
        return exported;
    };
}(util.color = util.color || {}));
