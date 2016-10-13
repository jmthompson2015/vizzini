define(function()
{
    "use strict";
    var Action = {};

    Action.ADD_BOOK = "addBook";
    Action.ADD_NOMINATION = "addNomination";

    Action.addBook = function(book)
    {
        InputValidator.validateNotNull("book", book);

        return (
        {
            type: Action.ADD_BOOK,
            book: book,
        });
    };

    Action.addNomination = function(book, nomination)
    {
        InputValidator.validateNotNull("book", book);
        InputValidator.validateNotNull("nomination", nomination);

        return (
        {
            type: Action.ADD_NOMINATION,
            book: book,
            nomination: nomination,
        });
    };

    if (Object.freeze)
    {
        Object.freeze(Action);
    }

    return Action;
});
