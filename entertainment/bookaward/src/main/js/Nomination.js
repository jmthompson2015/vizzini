define(function()
{
    "use strict";

    function Nomination(award, category, year, isWinnerIn)
    {
        InputValidator.validateNotNull("award", award);
        InputValidator.validateNotNull("category", category);
        InputValidator.validateNotNull("year", year);

        var isWinner = (isWinnerIn !== undefined ? isWinnerIn : false);

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

        this.isWinner = function()
        {
            return isWinner;
        };

        this.toString = function()
        {
            return year + " " + award.name + " " + category.name;
        };
    }

    return Nomination;
});
