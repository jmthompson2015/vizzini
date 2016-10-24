define([ "Segment" ], function(Segment)
{
    function Segment4UI()
    {
        this.createGeometry = function()
        {
            var geometry = new THREE.Geometry();

            geometry.vertices.push(new THREE.Vector3(0, 0, 0)); // 0
            geometry.vertices.push(new THREE.Vector3(3, 0, 0)); // 1
            geometry.vertices.push(new THREE.Vector3(0, 3, 0)); // 2
            geometry.vertices.push(new THREE.Vector3(-3, 3, -3)); // 3
            geometry.vertices.push(new THREE.Vector3(0, 3, -3));// 4
            geometry.vertices.push(new THREE.Vector3(3, 3, -3));// 5
            geometry.vertices.push(new THREE.Vector3(3, -3, -3)); // 6

            geometry.faces.push(new THREE.Face3(0, 1, 5));
            geometry.faces.push(new THREE.Face3(0, 2, 3));
            geometry.faces.push(new THREE.Face3(0, 3, 6));
            geometry.faces.push(new THREE.Face3(0, 4, 2));
            geometry.faces.push(new THREE.Face3(0, 5, 4));
            geometry.faces.push(new THREE.Face3(0, 6, 1));
            geometry.faces.push(new THREE.Face3(1, 6, 5));
            geometry.faces.push(new THREE.Face3(2, 4, 3));
            geometry.faces.push(new THREE.Face3(3, 5, 6));

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
            return Segment.FOUR;
        };
    }

    if (Object.freeze)
    {
        Object.freeze(Segment4UI);
    }

    return Segment4UI;
});
