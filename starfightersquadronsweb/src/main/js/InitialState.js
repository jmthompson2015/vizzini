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

        this.nextTargetLockId = 0;
        this.nextTokenId = 1;
        this.positionToToken = {};

        this.tokenIdToCounts = {};
        this.tokenIdToCriticalDamages = {};
        this.tokenIdToDamages = {};
        this.tokenIdToPosition = {};

        this.damageDeck = [];
        this.damageDiscardPile = [];
        this.targetLocks = [];
    }

    if (Object.freeze)
    {
        Object.freeze(InitialState);
    }

    return InitialState;
});
