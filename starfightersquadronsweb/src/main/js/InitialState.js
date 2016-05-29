define([ "Phase" ], function(Phase)
{
    "use strict";
    function InitialState()
    {
        this.playFormatKey = undefined;
        this.round = 0;
        this.phaseKey = Phase.SETUP;
        this.activeTokenId = undefined;

        this.firstAgent = undefined;
        this.secondAgent = undefined;

        this.positionToToken = {};
        this.tokenIdToPosition = {};

        this.damageDeck = [];
        this.damageDiscardPile = [];
    }

    if (Object.freeze)
    {
        Object.freeze(InitialState);
    }

    return InitialState;
});
