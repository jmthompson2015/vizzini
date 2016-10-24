define([ "ColorScheme", "Segment", "process/ui/Segment1UI", "process/ui/Segment2UI", "process/ui/Segment3UI",
        "process/ui/Segment4UI", "process/ui/Segment5UI", "process/ui/Segment6UI" ], function(ColorScheme, Segment,
        Segment1UI, Segment2UI, Segment3UI, Segment4UI, Segment5UI, Segment6UI)
{
    "use strict";
    function CubeUI(colorScheme)
    {
        var that = this;
        var myColorScheme = (colorScheme ? colorScheme : ColorScheme.WHITE);

        this.root = function()
        {
            return root;
        };

        this.createSegment1 = function()
        {
            var segmentUI = new Segment1UI();
            var geometry = segmentUI.geometry();
            var material = myColorScheme.material(Segment.ONE);

            var answer = new THREE.Mesh(geometry, material);

            answer.rotation.y = d2r(90);
            answer.rotation.z = d2r(-90);

            return answer;
        };

        this.createSegment2 = function()
        {
            var segmentUI = new Segment2UI();
            var geometry = segmentUI.geometry();
            var material = myColorScheme.material(Segment.TWO);

            var answer = new THREE.Mesh(geometry, material);

            answer.rotation.z = d2r(-90);

            return answer;
        };

        this.createSegment3 = function()
        {
            var segmentUI = new Segment3UI();
            var geometry = segmentUI.geometry();
            var material = myColorScheme.material(Segment.THREE);

            var answer = new THREE.Mesh(geometry, material);

            answer.rotation.x = d2r(-90);
            answer.rotation.z = d2r(-90);

            return answer;
        };

        this.createSegment4 = function()
        {
            var segmentUI = new Segment4UI();
            var geometry = segmentUI.geometry();
            var material = myColorScheme.material(Segment.FOUR);

            var answer = new THREE.Mesh(geometry, material);

            answer.rotation.y = d2r(180);

            return answer;
        };

        this.createSegment5 = function()
        {
            var segmentUI = new Segment5UI();
            var geometry = segmentUI.geometry();
            var material = myColorScheme.material(Segment.FIVE);

            var answer = new THREE.Mesh(geometry, material);

            answer.rotation.y = d2r(-90);

            return answer;
        };

        this.createSegment6 = function()
        {
            var segmentUI = new Segment6UI();
            var geometry = segmentUI.geometry();
            var material = myColorScheme.material(Segment.SIX);

            var answer = new THREE.Mesh(geometry, material);

            answer.rotation.x = d2r(90);
            answer.rotation.z = d2r(180);

            return answer;
        };

        function createRoot()
        {
            var geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
            var material = new THREE.MeshBasicMaterial(
            {
                color: 0x000000,
            });

            var answer = new THREE.Mesh(geometry, material);

            answer.add(that.createSegment1());
            answer.add(that.createSegment2());
            answer.add(that.createSegment3());
            answer.add(that.createSegment4());
            answer.add(that.createSegment5());
            answer.add(that.createSegment6());

            return answer;
        }

        function d2r(d)
        {
            return d * Math.PI / 180.0;
        }

        var root = createRoot();
    }

    if (Object.freeze)
    {
        Object.freeze(CubeUI);
    }

    return CubeUI;
});
