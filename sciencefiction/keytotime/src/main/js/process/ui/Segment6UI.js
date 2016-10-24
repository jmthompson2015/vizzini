define([ "Segment" ], function(Segment)
{
    function Segment6UI()
    {
        this.createGeometry = function()
        {
            var geometry = new THREE.Geometry();

            geometry.vertices.push(new THREE.Vector3(0, 0, 0)); // 0
            geometry.vertices.push(new THREE.Vector3(0, 3, 0)); // 1
            geometry.vertices.push(new THREE.Vector3(3, 3, 0)); // 2
            geometry.vertices.push(new THREE.Vector3(0, 0, -3)); // 3
            geometry.vertices.push(new THREE.Vector3(-3, 3, -3)); // 4
            geometry.vertices.push(new THREE.Vector3(3, 3, -3));// 5
            geometry.vertices.push(new THREE.Vector3(3, -3, -3)); // 6
            geometry.vertices.push(new THREE.Vector3(0, -3, -3)); // 7

            geometry.faces.push(new THREE.Face3(0, 1, 4));
            geometry.faces.push(new THREE.Face3(0, 2, 1));
            geometry.faces.push(new THREE.Face3(0, 3, 7));
            geometry.faces.push(new THREE.Face3(0, 4, 3));
            geometry.faces.push(new THREE.Face3(0, 5, 2));
            geometry.faces.push(new THREE.Face3(0, 6, 5));
            geometry.faces.push(new THREE.Face3(0, 7, 6));
            geometry.faces.push(new THREE.Face3(1, 2, 5));
            geometry.faces.push(new THREE.Face3(1, 5, 4));
            geometry.faces.push(new THREE.Face3(3, 4, 5));
            geometry.faces.push(new THREE.Face3(3, 5, 6));
            geometry.faces.push(new THREE.Face3(3, 6, 7));

            geometry.computeFaceNormals();
            geometry.computeVertexNormals();

            return geometry;
        };

        var geometry = this.createGeometry();

        this.geometry = function()
        {
            return geometry;
        };

        this.segmentKey = function()
        {
            return Segment.SIX;
        };
    }

    if (Object.freeze)
    {
        Object.freeze(Segment6UI);
    }

    return Segment6UI;
});
