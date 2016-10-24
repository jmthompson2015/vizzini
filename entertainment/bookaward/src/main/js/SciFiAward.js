define(function()
{
    "use strict";

    var SciFiAward = {
        BRITISH_FANTASY: "britishFantasy",
        BRITISH_SF: "britishSf",
        HUGO: "hugo",
        LOCUS: "locus",
        NEBULA: "nebula",

        properties:
        {
            "britishFantasy":
            {
                name: "British Fantasy",
                url: "http://www.sfadb.com/British_Fantasy_Awards_",
                value: "britishFantasy",
            },
            "britishSf":
            {
                name: "British SF",
                url: "http://www.sfadb.com/British_SF_Association_Awards_",
                value: "britishSf",
            },
            "hugo":
            {
                name: "Hugo",
                url: "http://www.sfadb.com/Hugo_Awards_",
                value: "hugo",
            },
            "locus":
            {
                name: "Locus",
                url: "http://www.sfadb.com/Locus_Awards_",
                value: "locus",
            },
            "nebula":
            {
                name: "Nebula",
                url: "http://www.sfadb.com/Nebula_Awards_",
                value: "nebula",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(SciFiAward.properties);
        },
    };

    SciFiAward.properties[SciFiAward.BRITISH_FANTASY].categories = {
        FANTASY: "fantasy",
        HORROR: "horror",
        properties:
        {
            "fantasy":
            {
                name: "Fantasy Novel",
                value: "fantasy",
            },
            "horror":
            {
                name: "Horror Novel",
                value: "horror",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(SciFiAward.properties[SciFiAward.BRITISH_FANTASY].categories.properties);
        },
    };

    SciFiAward.properties[SciFiAward.BRITISH_SF].categories = {
        NOVEL: "novel",
        properties:
        {
            "novel":
            {
                name: "Novel",
                value: "novel",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(SciFiAward.properties[SciFiAward.BRITISH_SF].categories.properties);
        },
    };

    SciFiAward.properties[SciFiAward.HUGO].categories = {
        NOVEL: "novel",
        properties:
        {
            "novel":
            {
                name: "Novel",
                value: "novel",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(SciFiAward.properties[SciFiAward.HUGO].categories.properties);
        },
    };

    SciFiAward.properties[SciFiAward.LOCUS].categories = {
        SF: "sf",
        FANTASY: "fantasy",
        FIRST: "first",
        properties:
        {
            "sf":
            {
                name: "Sf Novel",
                value: "sf",
            },
            "fantasy":
            {
                name: "Fantasy Novel",
                value: "fantasy",
            },
            "first":
            {
                name: "First Novel",
                value: "first",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(SciFiAward.properties[SciFiAward.LOCUS].categories.properties);
        },
    };

    SciFiAward.properties[SciFiAward.NEBULA].categories = {
        NOVEL: "novel",
        properties:
        {
            "novel":
            {
                name: "Novel",
                value: "novel",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(SciFiAward.properties[SciFiAward.NEBULA].categories.properties);
        },
    };

    SciFiAward.findByName = function(properties, name)
    {
        var answer;
        var values = Object.getOwnPropertyNames(properties);

        for (var i = 0; i < values.length; i++)
        {
            var entryKey = values[i];
            var entry = properties[entryKey];

            if (entry.name === name)
            {
                answer = entry;
                break;
            }
        }

        return answer;
    };

    if (Object.freeze)
    {
        Object.freeze(SciFiAward);
    }

    return SciFiAward;
});
