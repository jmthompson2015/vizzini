define(function()
{
    "use strict";

    var Award = {
        AGATHA: "agatha",
        ANTHONY: "anthony",
        BARRY: "barry",
        CRIME_AND_BEYOND: "crimeAndBeyond",
        DAGGER: "dagger",
        EDGAR: "edgar",
        // NERO: "nero",
        SHAMUS: "shamus",

        properties:
        {
            "agatha":
            {
                name: "Agatha",
                url: "http://stopyourekillingme.com/Awards/Agatha_Awards.html",
                value: "agatha",
            },
            "anthony":
            {
                name: "Anthony",
                url: "http://stopyourekillingme.com/Awards/Anthony_Awards.html",
                value: "anthony",
            },
            "barry":
            {
                name: "Barry",
                url: "http://stopyourekillingme.com/Awards/Barry_Awards.html",
                value: "barry",
            },
            "crimeAndBeyond":
            {
                name: "Crime & Beyond",
                url: "http://crimeandbeyond.wikia.com/wiki/Crime_%26_Beyond_Wiki",
                value: "crimeAndBeyond",
            },
            "dagger":
            {
                name: "Dagger",
                url: "http://stopyourekillingme.com/Awards/Dagger_Awards.html",
                value: "dagger",
            },
            "edgar":
            {
                name: "Edgar",
                url: "http://stopyourekillingme.com/Awards/Edgar_Awards.html",
                value: "edgar",
            },
            // "nero":
            // {
            //     name: "Nero",
            //     url: "http://stopyourekillingme.com/Awards/Nero_Awards.html",
            //     value: "nero",
            // },
            "shamus":
            {
                name: "Shamus",
                url: "http://stopyourekillingme.com/Awards/Shamus_Awards.html",
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
        FIRST: "first",
        HISTORICAL: "historical",
        properties:
        {
            "contemporary":
            {
                name: "Best Contemporary Novel",
                value: "contemporary",
            },
            "first":
            {
                name: "Best First Novel",
                value: "first",
            },
            "historical":
            {
                name: "Best Historical Novel",
                value: "historical",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(Award.properties[Award.AGATHA].categories.properties);
        },
    };

    Award.properties[Award.ANTHONY].categories = {
        FIRST: "first",
        MYSTERY: "mystery",
        PAPERBACK: "paperback",
        properties:
        {
            "first":
            {
                name: "Best First Mystery",
                value: "first",
            },
            "mystery":
            {
                name: "Best Mystery Novel",
                value: "mystery",
            },
            "paperback":
            {
                name: "Best Paperback Original",
                value: "paperback",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(Award.properties[Award.AGATHA].categories.properties);
        },
    };

    Award.properties[Award.BARRY].categories = {
        FIRST: "first",
        NOVEL: "novel",
        PAPERBACK: "paperback",
        THRILLER: "thriller",
        properties:
        {
            "first":
            {
                name: "Best First Novel",
                value: "first",
            },
            "novel":
            {
                name: "Best Novel",
                value: "novel",
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

    Award.properties[Award.CRIME_AND_BEYOND].categories = {
        CASE: "case",
        properties:
        {
            "case":
            {
                name: "Case File",
                value: "case",
            },
        },
    };

    Award.properties[Award.DAGGER].categories = {
        FIRST: "first",
        GOLD: "gold",
        HISTORICAL: "historical",
        INTERNATIONAL: "international",
        STEEL: "steel",
        properties:
        {
            "first":
            {
                name: "New Blood Dagger",
                value: "first",
            },
            "gold":
            {
                name: "Gold Dagger",
                value: "gold",
            },
            "historical":
            {
                name: "Historical Dagger",
                value: "historical",
            },
            "international":
            {
                name: "International Dagger",
                value: "international",
            },
            "steel":
            {
                name: "Ian Fleming Steel Dagger",
                value: "steel",
            },
        },
    };

    Award.properties[Award.EDGAR].categories = {
        FIRST: "first",
        NOVEL: "novel",
        PAPERBACK: "paperback",
        properties:
        {
            "first":
            {
                name: "Best First Novel by an American Author",
                value: "first",
            },
            "novel":
            {
                name: "Best Mystery Novel",
                value: "novel",
            },
            "paperback":
            {
                name: "Best Paperback Original",
                value: "paperback",
            },
        },
    };

    // Award.properties[Award.NERO].categories = {
    //     NERO: "nero",
    //     properties:
    //     {
    //         "nero":
    //         {
    //             name: "Nero Award",
    //             value: "nero",
    //         },
    //     },
    // };

    Award.properties[Award.SHAMUS].categories = {
        FIRST: "first",
        HARDCOVER: "hardcover",
        PAPERBACK: "paperback",
        properties:
        {
            "first":
            {
                name: "Best First P.I. Novel",
                value: "first",
            },
            "hardcover":
            {
                name: "Best P.I. Novel",
                value: "hardcover",
            },
            "paperback":
            {
                name: "Best P.I. Paperback Original",
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
