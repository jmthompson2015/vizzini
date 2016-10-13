define(function()
{
    "use strict";

    var Library = {
        ALD: "ald",
        DCL: "dcl",
        DPL: "dpl",

        properties:
        {
            "ald":
            {
                name: "Arapahoe Library District",
                shortName: "ALD",
                url: "http://arapahoelibraries.org",
                searchPrefix: "https://arapahoelibraries.bibliocommons.com/search?&t=smart&search_category=keyword&q=",
                searchSuffix: "",
                value: "ald",
            },
            "dcl":
            {
                name: "Douglas County Libraries",
                shortName: "DCL",
                url: "http://douglascountylibraries.org",
                searchPrefix: "http://catalog.douglascountylibraries.org/Union/Search?basicType=Keyword&lookfor=",
                searchSuffix: "&submit.x=0&submit.y=0&submit=Go&shard%5B%5D=Main+Catalog&shard%5B%5D=eContent",
                value: "dcl",
            },
            "dpl":
            {
                name: "Denver Public Library",
                shortName: "DPL",
                url: "https://www.denverlibrary.org",
                // https://catalog.denverlibrary.org/search/searchresults.aspx?ctx=1.1033.0.0.6&type=Keyword&term=long%20upon%20the%20land%20by%20margaret%20maron&by=KW&sort=RELEVANCE&limit=TOM=*&query=&page=0&searchid=2
                searchPrefix: "https://catalog.denverlibrary.org/search/searchresults.aspx?ctx=1.1033.0.0.6&type=Keyword&term=",
                searchSuffix: "&by=KW&sort=RELEVANCE&limit=TOM=*&query=&page=0",
                value: "dpl",
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
