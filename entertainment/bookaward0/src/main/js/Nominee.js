define(function()
{
    "use strict";

    function Nominee(title, author, award, category, year)
    {
        InputValidator.validateNotNull("title", title);
        InputValidator.validateNotNull("author", author);
        InputValidator.validateNotNull("award", award);
        InputValidator.validateNotNull("category", category);
        InputValidator.validateNotNull("year", year);

        this.title = function()
        {
            return title;
        };

        this.author = function()
        {
            return author;
        };

        this.award = function()
        {
            return award;
        };

        this.category = function()
        {
            return category;
        };

        this.year = function()
        {
            return year;
        };
    }

    return Nominee;
});
