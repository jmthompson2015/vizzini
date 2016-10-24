define([ "Segment" ], function(Segment)
{
    function Segment1UI()
    {
        this.createGeometry = function()
        {
            var geometry = new THREE.Geometry();

            geometry.vertices.push(new THREE.Vector3(0, 0, 0)); // 0
            geometry.vertices.push(new THREE.Vector3(3, 0, 0)); // 1
            geometry.vertices.push(new THREE.Vector3(0, 3, 0)); // 2
            geometry.vertices.push(new THREE.Vector3(0, 0, -3)); // 3
            geometry.vertices.push(new THREE.Vector3(-3, 3, -3));// 4
            geometry.vertices.push(new THREE.Vector3(0, 3, -3)); // 5
            geometry.vertices.push(new THREE.Vector3(3, 3, -3)); // 6
            geometry.vertices.push(new THREE.Vector3(3, -3, -3)); // 7
            geometry.vertices.push(new THREE.Vector3(-3, -3, -3)); // 8

            geometry.faces.push(new THREE.Face3(0, 1, 6));
            geometry.faces.push(new THREE.Face3(0, 2, 5));
            geometry.faces.push(new THREE.Face3(0, 3, 7));
            geometry.faces.push(new THREE.Face3(0, 4, 8));
            geometry.faces.push(new THREE.Face3(0, 5, 4));
            geometry.faces.push(new THREE.Face3(0, 6, 2));
            geometry.faces.push(new THREE.Face3(0, 7, 1));
            geometry.faces.push(new THREE.Face3(0, 8, 3));
            geometry.faces.push(new THREE.Face3(1, 7, 6));
            geometry.faces.push(new THREE.Face3(2, 6, 5));
            geometry.faces.push(new THREE.Face3(3, 6, 7));
            geometry.faces.push(new THREE.Face3(4, 6, 8));

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
            return Segment.ONE;
        };
    }

    if (Object.freeze)
    {
        Object.freeze(Segment1UI);
    }

    return Segment1UI;
});
