define(function()
{
    "use strict";
    var CardType =
    {
        ATTACHMENT: "attachment",
        ALLY: "ally",
        ENEMY: "enemy",
        EVENT: "event",
        HERO: "hero",
        LOCATION: "location",
        OBJECTIVE: "objective",
        QUEST: "quest",
        TREACHERY: "treachery",

        properties:
        {
            "attachment":
            {
                name: "Attachment",
                value: "attachment",
            },
            "ally":
            {
                name: "Ally",
                value: "ally",
            },
            "enemy":
            {
                name: "Enemy",
                value: "enemy",
            },
            "event":
            {
                name: "Event",
                value: "event",
            },
            "hero":
            {
                name: "Hero",
                value: "hero",
            },
            "location":
            {
                name: "Location",
                value: "location",
            },
            "objective":
            {
                name: "Objective",
                value: "objective",
            },
            "quest":
            {
                name: "Quest",
                value: "quest",
            },
            "treachery":
            {
                name: "Treachery",
                value: "treachery",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(CardType.properties);
        },
    };

    if (Object.freeze)
    {
        Object.freeze(CardType);
    }

    return CardType;
});
