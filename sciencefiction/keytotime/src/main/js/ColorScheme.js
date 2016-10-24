define([ "Segment" ], function(Segment)
{
    "use strict";
    var ColorScheme =
    {
        CLEAR: "clear",
        COLORS: "colors",
        WHITE: "white",

        properties:
        {
            "clear":
            {
                name: "Clear",
                material: function(segmentKey)
                {
                    return new THREE.MeshStandardMaterial(
                    {
                        color: 0xFFFFFF,
                        metalness: 0.3,
                        opacity: 0.5,
                        transparent: true,
                    });
                },
            },
            "colors":
            {
                name: "Colors",
                material: function(segmentKey)
                {
                    var color;

                    switch (segmentKey)
                    {
                    case Segment.ONE:
                        color = 0xFF0000;
                        break;
                    case Segment.TWO:
                        color = 0x00FF00;
                        break;
                    case Segment.THREE:
                        color = 0x0000FF;
                        break;
                    case Segment.FOUR:
                        color = 0xFFFF00;
                        break;
                    case Segment.FIVE:
                        color = 0xFF00FF;
                        break;
                    case Segment.SIX:
                        color = 0x00FFFF;
                        break;
                    }

                    return new THREE.MeshStandardMaterial(
                    {
                        color: color,
                        metalness: 0.3,
                        shading: THREE.FlatShading,
                    });
                },
            },
            "white":
            {
                name: "White",
                material: function(segmentKey)
                {
                    return new THREE.MeshStandardMaterial(
                    {
                        color: 0xFFFFFF,
                        metalness: 0.3,
                        shading: THREE.FlatShading,
                    });
                },
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(ColorScheme.properties);
        },
    }

    if (Object.freeze)
    {
        Object.freeze(ColorScheme);
    }

    return ColorScheme;
});
