var hyperbola = (function(THREE, util) {
    var exported = {};
    exported.drawLines = function(scene, color_from, color_to, size) {
        for (var i = 0; i < size + 1; i++) {
            var geometry = new THREE.Geometry();
            geometry.vertices.push(new THREE.Vector3(0, i, 0));
            geometry.vertices.push(new THREE.Vector3(size - i, 0, 0));
            geometry.vertices.push(new THREE.Vector3(0, -i, 0));
            geometry.vertices.push(new THREE.Vector3(-(size - i), 0, 0));
            geometry.vertices.push(new THREE.Vector3(0, i, 0));

            var gradient = i / size;
            var material = new THREE.LineBasicMaterial({
                color: color_from.scale(1 - gradient).hex() +
                       color_to.scale(gradient).hex(),
            });

            scene.add(new THREE.Line(geometry, material));
        }
    };
    return exported;
}(THREE, util));
