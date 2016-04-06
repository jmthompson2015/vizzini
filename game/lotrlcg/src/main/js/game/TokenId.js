define(function()
{
    "use strict";
    var TokenId = {};

    TokenId.nextIdValue = 1;

    TokenId.nextId = function()
    {
        return TokenId.nextIdValue++;
    };

    TokenId.resetNextId = function()
    {
        TokenId.nextIdValue = 1;
    };

    return TokenId;
});
