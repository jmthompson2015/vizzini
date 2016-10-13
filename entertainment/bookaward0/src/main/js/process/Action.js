define(function()
{
    "use strict";
    var Action = {};

    // Action.ADD_BOOK = "addBook";
    Action.ADD_NOMINEE = "addNominee";

    // Action.addBook = function(book)
    // {
    //     return (
    //     {
    //         type: Action.ADD_BOOK,
    //         book: book,
    //     });
    // };

    Action.addNominee = function(nominee)
    {
        return (
        {
            type: Action.ADD_NOMINEE,
            nominee: nominee,
        });
    };

    if (Object.freeze)
    {
        Object.freeze(Action);
    }

    return Action;
});
