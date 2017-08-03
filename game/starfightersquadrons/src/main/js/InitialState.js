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
         eventShipActionAction: undefined,
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

      this.tokenIdToActivationAction = {};
      this.tokenIdToAttackDice = {};
      this.tokenIdToAttackerUsedDamages = {};
      this.tokenIdToAttackerUsedPilots = {};
      this.tokenIdToAttackerUsedUpgrades = {};
      this.tokenIdToCombatAction = {};
      this.tokenIdToCounts = {};
      this.tokenIdToCriticalDamages = {};
      this.tokenIdToDamageDealer = {};
      this.tokenIdToDamages = {};
      this.tokenIdToDefenderUsedDamages = {};
      this.tokenIdToDefenderUsedPilots = {};
      this.tokenIdToDefenderUsedUpgrades = {};
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
      this.tokenIdToUpgradePerRound = {};
      this.tokenIdToUsedDamages = {};
      this.tokenIdToUsedPilots = {};
      this.tokenIdToUsedUpgrades = {};

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
