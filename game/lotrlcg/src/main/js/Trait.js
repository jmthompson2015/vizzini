define(function()
{
    "use strict";
    var Trait =
    {
        ARCHER: "archer",
        ARMOR: "armor",
        ARTIFACT: "artifact",
        BEORNING: "beorning",
        BOON: "boon",
        BURGLAR: "burglar",
        CLUE: "clue",
        CONDITION: "condition",
        CRAFTSMAN: "craftsman",
        CREATURE: "creature",
        DALE: "dale",
        DISASTER: "disaster",
        DOL_GULDUR: "dolGuldur",
        DUNEDAIN: "dunedain",
        DWARF: "dwarf",
        EAGLE: "eagle",
        ENT: "ent",
        ESGAROTH: "esgaroth",
        FOREST: "forest",
        GOBLIN: "goblin",
        GONDOR: "gondor",
        GOSSIP: "gossip",
        HEALER: "healer",
        HOBBIT: "hobbit",
        INSECT: "insect",
        ISENGARD: "isengard",
        ISTARI: "istari",
        ITEM: "item",
        MARSHLAND: "marshland",
        MATHOM: "mathom",
        MEARAS: "mearas",
        MINSTREL: "minstrel",
        MORDOR: "mordor",
        MOUNT: "mount",
        MOUNTAIN: "mountain",
        NOBLE: "noble",
        NOLDOR: "noldor",
        ORC: "orc",
        OUTLANDS: "outlands",
        RANGER: "ranger",
        RECORD: "record",
        RING: "ring",
        RIVERLAND: "riverland",
        ROHAN: "rohan",
        SCOUT: "scout",
        SIGNAL: "signal",
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
        WOODMAN: "woodman",

        properties:
        {
            "archer":
            {
                name: "Archer",
                value: "archer",
            },
            "armor":
            {
                name: "Armor",
                value: "armor",
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
            "boon":
            {
                name: "Boon",
                value: "boon",
            },
            "burglar":
            {
                name: "Burglar",
                value: "burglar",
            },
            "clue":
            {
                name: "Clue",
                value: "clue",
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
            "dale":
            {
                name: "Dale",
                value: "dale",
            },
            "disaster":
            {
                name: "Disaster",
                value: "disaster",
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
            "eagle":
            {
                name: "Eagle",
                value: "eagle",
            },
            "ent":
            {
                name: "Ent",
                value: "ent",
            },
            "esgaroth":
            {
                name: "Esgaroth",
                value: "esgaroth",
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
            "gossip":
            {
                name: "Gossip",
                value: "gossip",
            },
            "healer":
            {
                name: "Healer",
                value: "healer",
            },
            "hobbit":
            {
                name: "Hobbit",
                value: "hobbit",
            },
            "insect":
            {
                name: "Insect",
                value: "insect",
            },
            "isengard":
            {
                name: "Isengard",
                value: "isengard",
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
            "marshland":
            {
                name: "Marshland",
                value: "marshland",
            },
            "mathom":
            {
                name: "Mathom",
                value: "mathom",
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
            "mordor":
            {
                name: "Mordor",
                value: "mordor",
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
            "outlands":
            {
                name: "Outlands",
                value: "outlands",
            },
            "ranger":
            {
                name: "Ranger",
                value: "ranger",
            },
            "record":
            {
                name: "Record",
                value: "record",
            },
            "ring":
            {
                name: "Ring",
                value: "ring",
            },
            "riverland":
            {
                name: "Riverland",
                value: "riverland",
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
            "signal":
            {
                name: "Signal",
                value: "signal",
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
            "woodman":
            {
                name: "Woodman",
                value: "woodman",
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
