define(["Phase"], function(Phase)
{
    "use strict";

    function InitialState()
    {
        this.environment = undefined;
        this.playFormatKey = undefined;
        this.round = 0;
        this.phaseKey = Phase.SETUP;
        this.eventKey = undefined;
        this.playAreaScale = 1.0;
        this.activeTokenId = undefined;
        this.userMessage = "";

        this.firstAgent = undefined;
        this.secondAgent = undefined;

        this.nextTargetLockId = 0;
        this.nextTokenId = 1;
        this.positionToTokenId = {};

        this.tokenIdToCounts = {};
        this.tokenIdToCriticalDamages = {};
        this.tokenIdToDamages = {};
        this.tokenIdToPosition = {};
        this.tokenIdToUpgrades = {};
        this.tokenIdToUpgradeEnergy = {};
        this.tokenIdToValues = {};
        this.tokenIdToUpgradePerRound = {};

        this.damageDeck = [];
        this.damageDiscardPile = [];
        this.targetLocks = [];

        this.tokens = {};
    }

    if (Object.freeze)
    {
        Object.freeze(InitialState);
    }

    return InitialState;
});
