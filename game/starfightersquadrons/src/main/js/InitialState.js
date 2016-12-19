define(["Phase"], function(Phase)
{
    "use strict";

    function InitialState()
    {
        this.environment = undefined;
        this.adjudicator = undefined;
        this.playFormatKey = undefined;
        this.round = 0;
        this.phaseKey = Phase.SETUP;
        this.eventData = {
            eventKey: undefined,
            eventToken: undefined,
            eventCallback: undefined,
        };
        this.playAreaScale = 1.0;
        this.activeTokenId = undefined;
        this.userMessage = "";

        this.firstAgent = undefined;
        this.secondAgent = undefined;

        this.nextTargetLockId = 0;
        this.nextTokenId = 1;
        this.positionToTokenId = {};

        this.tokenIdToActivationState = {};
        this.tokenIdToCombatState = {};
        this.tokenIdToCounts = {};
        this.tokenIdToCriticalDamages = {};
        this.tokenIdToDamages = {};
        this.tokenIdToManeuver = {};
        this.tokenIdToPosition = {};
        this.tokenIdToUpgrades = {};
        this.tokenIdToUpgradeEnergy = {};
        this.tokenIdToValues = {};
        this.tokenIdToPilotPerRound = {};
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
