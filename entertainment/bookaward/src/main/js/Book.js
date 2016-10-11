define(function()
{
    "use strict";

    function Book(title, author)
    {
        InputValidator.validateNotNull("title", title);
        InputValidator.validateNotNull("author", author);

        this.title = function()
        {
            return title;
        };

        this.author = function()
        {
            return author;
        };

        this.toString = function()
        {
            return title + " by " + author;
        };
    }

    return Book;
});
