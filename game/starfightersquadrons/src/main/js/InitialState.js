"use strict";

define(["Phase"], function(Phase)
{
   function InitialState()
   {
      this.adjudicator = undefined;
      this.environment = undefined;
      this.eventData = undefined;
      this.eventQueue = Immutable.List();
      this.isGameOver = false;
      this.nextTargetLockId = 0;
      this.phaseData = undefined;
      this.phaseKey = Phase.SETUP;
      this.phaseQueue = Immutable.List();
      this.userMessage = "";
      this.winner = undefined;

      this.tokenIdToActivationAction = {};
      this.tokenIdToAttackDice = {};
      this.tokenIdToCombatAction = {};
      this.tokenIdToDamageDealer = {};
      this.tokenIdToDefenseDice = {};
      this.tokenIdToIsDefenderHit = {};
      this.tokenIdToIsInFiringArc = {};
      this.tokenIdToManeuver = {};
      this.tokenIdToManeuverAction = {};
      this.tokenIdToRange = {};

      // Environment.
      this.activeTokenId = undefined;
      this.damageDeck = [];
      this.damageDiscardPile = [];
      this.firstAgent = undefined;
      this.firstSquad = undefined;
      this.playAreaScale = 1.0;
      this.playFormatKey = undefined;
      this.positionToTokenId = {};
      this.round = 0;
      this.secondAgent = undefined;
      this.secondSquad = undefined;
      this.tokenIdToIsTouching = {};
      this.tokenIdToPosition = {};
      this.tokens = Immutable.Map();

      // Target lock.
      this.targetLocks = Immutable.List();

      // Token.
      this.nextTokenId = 1;
      this.tokenIdToCounts = Immutable.Map();
      this.tokenIdToCriticalDamages = Immutable.Map();
      this.tokenIdToDamages = Immutable.Map();
      this.tokenIdToPrimaryWeapon = Immutable.Map();
      this.tokenIdToSecondaryWeapons = Immutable.Map();
      this.tokenIdToUpgradeEnergy = Immutable.Map();
      this.tokenIdToUpgrades = Immutable.Map();
      this.tokenIdToUsedAbilities = Immutable.Map();
      this.tokenIdToUsedPerRoundAbilities = Immutable.Map();
   }

   if (Object.freeze)
   {
      Object.freeze(InitialState);
   }

   return InitialState;
});
