define(function()
{
    "use strict";

    var Library = {
        AL: "al",
        DPL: "dpl",
        DCL: "dcl",

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
                url: "https://www.denverlibrary.org",
                searchPrefix: "https://catalog.denverlibrary.org/search/searchresults.aspx?ctx=1.1033.0.0.6&type=Keyword&term=",
                searchSuffix: "&by=KW&sort=RELEVANCE&limit=TOM=*&query=&page=0",
                value: "dpl",
            },
            "dcl":
            {
                name: "Douglas County Libraries",
                shortName: "DCL",
                image: "../resources/DouglasCountyLibraries18.jpg",
                url: "http://douglascountylibraries.org",
                searchPrefix: "http://catalog.douglascountylibraries.org/Union/Search?basicType=Keyword&lookfor=",
                searchSuffix: "&submit.x=0&submit.y=0&submit=Go&shard%5B%5D=Main+Catalog&shard%5B%5D=eContent",
                value: "dcl",
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
