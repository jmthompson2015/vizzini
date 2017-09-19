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
      this.positionToTokenId = {};

      this.tokenIdToActivationAction = {};
      this.tokenIdToAttackDice = {};
      this.tokenIdToCombatAction = {};
      this.tokenIdToDamageDealer = {};
      this.tokenIdToDefenseDice = {};
      this.tokenIdToIsDefenderHit = {};
      this.tokenIdToIsInFiringArc = {};
      this.tokenIdToIsTouching = {};
      this.tokenIdToManeuver = {};
      this.tokenIdToManeuverAction = {};
      this.tokenIdToPosition = {};
      this.tokenIdToRange = {};

      this.damageDeck = [];
      this.damageDiscardPile = [];
      this.targetLocks = Immutable.List();

      this.isGameOver = false;
      this.winner = undefined;

      // Token.
      this.nextTokenId = 1;
      this.tokenIdToCounts = Immutable.Map();
      this.tokenIdToCriticalDamages = {};
      this.tokenIdToDamages = {};
      this.tokenIdToPrimaryWeapon = Immutable.Map();
      this.tokenIdToSecondaryWeapons = Immutable.Map();
      this.tokenIdToUpgradeEnergy = Immutable.Map();
      this.tokenIdToUpgrades = Immutable.Map();
      this.tokenIdToUsedAbilities = {};
      this.tokenIdToUsedPerRoundAbilities = {};
      this.tokens = Immutable.Map();
   }

   if (Object.freeze)
   {
      Object.freeze(InitialState);
   }

   return InitialState;
});
