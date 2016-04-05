define(function()
{
    "use strict";
    var Trait =
    {
        ARCHER: "archer",
        ARTIFACT: "artifact",
        BEORNING: "beorning",
        CONDITION: "condition",
        CRAFTSMAN: "craftsman",
        CREATURE: "creature",
        DOL_GULDUR: "dolGuldur",
        DUNEDAIN: "dunedain",
        DWARF: "dwarf",
        ENT: "ent",
        FOREST: "forest",
        GOBLIN: "goblin",
        GONDOR: "gondor",
        INSECT: "insect",
        ISTARI: "istari",
        ITEM: "item",
        MEARAS: "mearas",
        MINSTREL: "minstrel",
        MOUNT: "mount",
        MOUNTAIN: "mountain",
        NOBLE: "noble",
        NOLDOR: "noldor",
        ORC: "orc",
        RANGER: "ranger",
        RING: "ring",
        ROHAN: "rohan",
        SCOUT: "scout",
        SILVAN: "silvan",
        SKILL: "skill",
        SONG: "song",
        SPIDER: "spider",
        STEWARD: "steward",
        STRONGHOLD: "stronghold",
        TITLE: "title",
        TRAP: "trap",
        WARRIOR: "warrior",
        WEAPON: "weapon",

        properties:
        {
            "archer":
            {
                name: "Archer",
                value: "archer",
            },
            "artifact":
            {
                name: "Artifact",
                value: "artifact",
            },
            "beorning":
            {
                name: "Beorning",
                value: "beorning",
            },
            "condition":
            {
                name: "Condition",
                value: "condition",
            },
            "craftsman":
            {
                name: "Craftsman",
                value: "craftsman",
            },
            "creature":
            {
                name: "Creature",
                value: "creature",
            },
            "dolGuldur":
            {
                name: "Dol Guldur",
                value: "dolGuldur",
            },
            "dunedain":
            {
                name: "Dúnedain",
                value: "dunedain",
            },
            "dwarf":
            {
                name: "Dwarf",
                value: "dwarf",
            },
            "ent":
            {
                name: "Ent",
                value: "ent",
            },
            "forest":
            {
                name: "Forest",
                value: "forest",
            },
            "goblin":
            {
                name: "Goblin",
                value: "goblin",
            },
            "gondor":
            {
                name: "Gondor",
                value: "gondor",
            },
            "insect":
            {
                name: "Insect",
                value: "insect",
            },
            "istari":
            {
                name: "Istari",
                value: "istari",
            },
            "item":
            {
                name: "Item",
                value: "item",
            },
            "mearas":
            {
                name: "Mearas",
                value: "mearas",
            },
            "minstrel":
            {
                name: "Minstrel",
                value: "minstrel",
            },
            "mount":
            {
                name: "Mount",
                value: "mount",
            },
            "mountain":
            {
                name: "Mountain",
                value: "mountain",
            },
            "noble":
            {
                name: "Noble",
                value: "noble",
            },
            "noldor":
            {
                name: "Noldor",
                value: "noldor",
            },
            "orc":
            {
                name: "Orc",
                value: "orc",
            },
            "ranger":
            {
                name: "Ranger",
                value: "ranger",
            },
            "ring":
            {
                name: "Ring",
                value: "ring",
            },
            "rohan":
            {
                name: "Rohan",
                value: "rohan",
            },
            "scout":
            {
                name: "Scout",
                value: "scout",
            },
            "silvan":
            {
                name: "Silvan",
                value: "silvan",
            },
            "skill":
            {
                name: "Skill",
                value: "skill",
            },
            "song":
            {
                name: "Song",
                value: "song",
            },
            "spider":
            {
                name: "Spider",
                value: "spider",
            },
            "steward":
            {
                name: "Steward",
                value: "steward",
            },
            "stronghold":
            {
                name: "Stronghold",
                value: "stronghold",
            },
            "title":
            {
                name: "Title",
                value: "title",
            },
            "trap":
            {
                name: "Trap",
                value: "trap",
            },
            "warrior":
            {
                name: "Warrior",
                value: "warrior",
            },
            "weapon":
            {
                name: "Weapon",
                value: "weapon",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(Trait.properties);
        },
    };

    if (Object.freeze)
    {
        Object.freeze(Trait);
    }

    return Trait;
});
