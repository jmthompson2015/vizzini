define(function()
{
    "use strict";
    var Scene =
    {
        SCENE_1: "scene1",
        SCENE_2: "scene2",
        SCENE_3: "scene3",

        properties:
        {
            "scene1":
            {
                name: "Gizah Pyramids",
                image: "../resources/scenes/All_Gizah_Pyramids.jpg",
                value: "scene1",
            },
            "scene2":
            {
                name: "Gallifrey 1",
                image: "../resources/scenes/gallifrey_by_arkarti.jpg",
                value: "scene2",
            },
            "scene3":
            {
                name: "Gallifrey 2",
                image: "../resources/scenes/gallifrey_from_mount_perdition_by_lupus_deus.jpg",
                value: "scene3",
            // scanner switch
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(Scene.properties);
        },
    };

    if (Object.freeze)
    {
        Object.freeze(Scene);
    }

    return Scene;
});
