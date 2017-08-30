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
      this.eventData = undefined;
      this.eventQueue = Immutable.List();
      this.phaseData = undefined;
      this.phaseQueue = Immutable.List();
      this.playAreaScale = 1.0;
      this.activeTokenId = undefined;
      this.userMessage = "";

      this.firstAgent = undefined;
      this.secondAgent = undefined;

      this.nextTargetLockId = 0;
      this.nextTokenId = 1;
      this.positionToTokenId = {};

      this.tokenIdToActivationAction = {};
      this.tokenIdToAttackDice = {};
      this.tokenIdToCombatAction = {};
      this.tokenIdToCounts = {};
      this.tokenIdToCriticalDamages = {};
      this.tokenIdToDamageDealer = {};
      this.tokenIdToDamages = {};
      this.tokenIdToDefenseDice = {};
      this.tokenIdToIsDefenderHit = {};
      this.tokenIdToIsInFiringArc = {};
      this.tokenIdToIsTouching = {};
      this.tokenIdToManeuver = {};
      this.tokenIdToManeuverAction = {};
      this.tokenIdToPosition = {};
      this.tokenIdToUpgrades = {};
      this.tokenIdToUpgradeEnergy = {};
      this.tokenIdToValues = {};
      this.tokenIdToPilotPerRound = {};
      this.tokenIdToRange = {};
      this.tokenIdToUsedAbilities = {};
      this.tokenIdToUsedPerRoundAbilities = {};

      this.damageDeck = [];
      this.damageDiscardPile = [];
      this.targetLocks = Immutable.List();

      this.tokens = {};

      this.isGameOver = false;
      this.winner = undefined;
   }

   if (Object.freeze)
   {
      Object.freeze(InitialState);
   }

   return InitialState;
});
