var hyperbola = {
    MAX: 60,
    COLOR_FROM: new util.color.Color(0x0000ff),
    COLOR_TO: new util.color.Color(0xff00ff),

    init: function(canvasWidth, canvasHeight) {
        var renderer = new THREE.WebGLRenderer();
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

    drawLines: function() {
        for (var i = 0; i < this.MAX + 1; i++) {
            var geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(0, i, 0));
            geometry.vertices.push(new THREE.Vector3(this.MAX - i, 0, 0));
            geometry.vertices.push(new THREE.Vector3(0, -i, 0));
            geometry.vertices.push(new THREE.Vector3(-(this.MAX - i), 0, 0));
            geometry.vertices.push(new THREE.Vector3(0, i, 0));

            var gradient = i / this.MAX;
            var material = new THREE.LineBasicMaterial({
                color: this.COLOR_FROM.scale(1 - gradient).hex() +
                       this.COLOR_TO.scale(gradient).hex(),
            });

            this.scene.add(new THREE.Line(geometry, material));
        }
    }
};
