define(function()
{
    "use strict";

    var Library = {
        AL: "al",
        DPL: "dpl",
        DCL: "dcl",
        JCPL: "jcpl",

        properties:
        {
            "al":
            {
                name: "Arapahoe Libraries",
                shortName: "AL",
                image: "../resources/ArapahoeLibraries18.jpg",
                url: "http://arapahoelibraries.org",
                searchPrefix: "https://arapahoelibraries.bibliocommons.com/search?&t=smart&search_category=keyword&q=",
                searchSuffix: "",
                value: "al",
            },
            "dpl":
            {
                name: "Denver Public Library",
                shortName: "DPL",
                image: "../resources/DenverPublicLibrary18.png",
                url: "http://www.denverlibrary.org",
                searchPrefix: "http://catalog.denverlibrary.org/search/searchresults.aspx?ctx=1.1033.0.0.6&type=Keyword&term=",
                searchSuffix: "&by=KW&sort=RELEVANCE&limit=TOM=*&query=&page=0",
                value: "dpl",
            },
            "dcl":
            {
                name: "Douglas County Libraries",
                shortName: "DCL",
                image: "../resources/DouglasCountyLibraries18.jpg",
                url: "http://www.douglascountylibraries.org",
                searchPrefix: "http://dcl.bibliocommons.com/search?utf8=✓&q=",
                searchSuffix: "&t=smart&search_category=keyword",
                value: "dcl",
            },
            "jcpl":
            {
                name: "Jefferson County Public Library",
                shortName: "JCPL",
                image: "../resources/JeffersonCountyPublicLibrary18.png",
                url: "http://jeffcolibrary.org",
                searchPrefix: "http://encore.jefferson.lib.co.us/iii/encore/search/C__S",
                searchSuffix: "__Orightresult__U",
                value: "jcpl",
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(Library.properties);
        },
    };

    if (Object.freeze)
    {
        Object.freeze(Library);
    }

    return Library;
});
