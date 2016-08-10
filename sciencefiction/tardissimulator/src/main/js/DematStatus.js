define(function()
{
    "use strict";
    var DematStatus =
    {
        MATERIALISED: "materialised",
        DEMATERIALISING: "dematerialising",
        DEMATERIALISED: "dematerialised",
        MATERIALISING: "materialising",

        properties:
        {
            "materialised":
            {
                name: "Materialised",
                value: "materialised",
            },
            "dematerialising":
            {
                name: "Dematerialising",
                value: "dematerialising",
            },
            "dematerialised":
            {
                name: "Dematerialised",
                value: "dematerialised",
            },
            "materialising":
            {
                name: "Materialising",
                value: "materialising",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(DematStatus.properties);
        },
    };

    if (Object.freeze)
    {
        Object.freeze(DematStatus);
    }

    return DematStatus;
});
