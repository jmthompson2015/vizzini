define(function()
{
    "use strict";

    function Nomination(award, category, year)
    {
        InputValidator.validateNotNull("award", award);
        InputValidator.validateNotNull("category", category);
        InputValidator.validateNotNull("year", year);

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

        this.toString = function()
        {
            return year + " " + award.name + " " + category.name;
        };
    }

    return Nomination;
});
