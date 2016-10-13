define(function()
{
    "use strict";

    var Award = {
        AGATHA: "agatha",
        BARRY: "barry",
        EDGAR: "edgar",
        SHAMUS: "shamus",

        properties:
        {
            "agatha":
            {
                name: "Agatha",
                url: "http://awards.omnimystery.com/mystery-awards-agathas.html",
                url2: "http://stopyourekillingme.com/Awards/Agatha_Awards.html",
                value: "agatha",
            },
            "barry":
            {
                name: "Barry",
                url: "http://awards.omnimystery.com/mystery-awards-barrys.html",
                url2: "http://stopyourekillingme.com/Awards/Barry_Awards.html",
                value: "barry",
            },
            "edgar":
            {
                name: "Edgar",
                url: "http://awards.omnimystery.com/mystery-awards-edgars.html",
                url2: "http://stopyourekillingme.com/Awards/Edgar_Awards.html",
                value: "edgar",
            },
            "shamus":
            {
                name: "Shamus",
                url: "http://awards.omnimystery.com/mystery-awards-shamus.html",
                url2: "http://stopyourekillingme.com/Awards/Shamus_Awards.html",
                value: "shamus",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(Award.properties);
        },
    };

    Award.properties[Award.AGATHA].categories = {
        CONTEMPORARY: "contemporary",
        HISTORICAL: "historical",
        FIRST: "first",
        properties:
        {
            "contemporary":
            {
                name: "Best Contemporary Novel",
                value: "contemporary",
            },
            "historical":
            {
                name: "Best Historical Novel",
                value: "historical",
            },
            "first":
            {
                name: "Best First Novel",
                value: "first",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(Award.properties[Award.AGATHA].categories.properties);
        },
    };

    Award.properties[Award.BARRY].categories = {
        NOVEL: "novel",
        FIRST: "first",
        PAPERBACK: "paperback",
        THRILLER: "thriller",
        properties:
        {
            "novel":
            {
                name: "Best Novel",
                value: "novel",
            },
            "first":
            {
                name: "Best First Novel",
                value: "first",
            },
            "paperback":
            {
                name: "Best Paperback Original",
                value: "paperback",
            },
            "thriller":
            {
                name: "Best Thriller",
                value: "thriller",
            },
        },
    };

    Award.properties[Award.EDGAR].categories = {
        NOVEL: "novel",
        FIRST: "first",
        PAPERBACK: "paperback",
        properties:
        {
            "novel":
            {
                name: "Best Mystery Novel",
                value: "novel",
            },
            "first":
            {
                name: "Best First Novel by an American Author",
                value: "first",
            },
            "paperback":
            {
                name: "Best Paperback Original",
                value: "paperback",
            },
        },
    };

    Award.properties[Award.SHAMUS].categories = {
        FIRST: "first",
        HARDCOVER: "hardcover",
        PAPERBACK: "paperback",
        properties:
        {
            "first":
            {
                name: "Best First PI Novel",
                value: "first",
            },
            "hardcover":
            {
                name: "Best Hardcover PI Novel",
                value: "hardcover",
            },
            "paperback":
            {
                name: "Best Paperback Original PI Novel",
                value: "paperback",
            },
        },
    };

    Award.findByName = function(properties, name)
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
        Object.freeze(Award);
    }

    return Award;
});
