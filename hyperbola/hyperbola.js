var hyperbola = {
    MAX: 60,
    COLOR_FROM: 0x0000ff,
    COLOR_TO: 0xff00ff,

    init: function(canvasWidth, canvasHeight) {
        var renderer = new THREE.CanvasRenderer();
        renderer.setSize(canvasWidth, canvasHeight);

        var ratio = canvasWidth / canvasHeight;
        var camera = new THREE.OrthographicCamera(
                -this.MAX * ratio, this.MAX * ratio,
                this.MAX, -this.MAX,
                -this.MAX, this.MAX);
        var scene = new THREE.Scene();

        this.renderer = renderer;
        this.camera = camera;
        this.scene = scene;
    },

    render: function() {
        this.renderer.render(this.scene, this.camera);
    },

    color_: function(i) {
        var mask = {r: 0xff0000, g: 0x00ff00, b: 0x0000ff};
        var gradient = i / this.MAX;

        var from = {
          r: this.COLOR_FROM & mask.r,
          g: this.COLOR_FROM & mask.g,
          b: this.COLOR_FROM & mask.b
        };

        var to = {
          r: this.COLOR_TO & mask.r,
          g: this.COLOR_TO & mask.g,
          b: this.COLOR_TO & mask.b
        };

        // e.g., 1/5 of the way is 0.8*from + 0.2*to
        // somehow the '&' operator with floats does exactly what we want
        var color = {
          r: mask.r & ((1 - gradient) * from.r + gradient * to.r),
          g: mask.g & ((1 - gradient) * from.g + gradient * to.g),
          b: mask.b & ((1 - gradient) * from.b + gradient * to.b)
        };

        return color.r | color.g | color.b;
    },

    drawLines: function() {
        for (var i = 0; i < this.MAX + 1; i++) {
            var geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(0, i, 0));
            geometry.vertices.push(new THREE.Vector3(this.MAX - i, 0, 0));
            geometry.vertices.push(new THREE.Vector3(0, -i, 0));
            geometry.vertices.push(new THREE.Vector3(-(this.MAX - i), 0, 0));
            geometry.vertices.push(new THREE.Vector3(0, i, 0));

            var material = new THREE.LineBasicMaterial({
                color: this.color_(i)
            });

            this.scene.add(new THREE.Line(geometry, material));
        }
    }
};
