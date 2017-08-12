define(["Phase", "UpgradeCard", "process/Action", "process/DamageAbility4", "process/PilotAbility4", "process/UpgradeAbility4"],
   function(Phase, UpgradeCard, Action, DamageAbility4, PilotAbility4, UpgradeAbility4)
   {
      function EndPhaseAction(environment, token, callback)
      {
         InputValidator.validateNotNull("environment", environment);
         InputValidator.validateNotNull("token", token);
         InputValidator.validateNotNull("callback", callback);

         this.environment = function()
         {
            return environment;
         };

         this.token = function()
         {
            return token;
         };

         this.callback = function()
         {
            return callback;
         };
      }

      EndPhaseAction.prototype.doIt = function()
      {
         LOGGER.trace("EndPhaseAction.doIt() start");

         this.cleanUp();

         LOGGER.trace("EndPhaseAction.doIt() end");
      };

      EndPhaseAction.prototype.cleanUp = function()
      {
         LOGGER.trace("EndPhaseAction.cleanUp() start");

         var token = this.token();

         this.environment().phase(Phase.END_CLEAN_UP, token);

         var store = token.store();

         store.dispatch(Action.setEvadeCount(token));
         store.dispatch(Action.setReinforceCount(token));
         store.dispatch(Action.setTractorBeamCount(token));
         store.dispatch(Action.setWeaponsDisabledCount(token));

         if (!token.isUpgradedWith(UpgradeCard.MOLDY_CROW))
         {
            store.dispatch(Action.setFocusCount(token));
         }

         this.roundEnd();

         LOGGER.trace("EndPhaseAction.cleanUp() end");
      };

      EndPhaseAction.prototype.roundEnd = function()
      {
         LOGGER.trace("EndPhaseAction.roundEnd() start");

         var token = this.token();
         this.environment().phase(Phase.END_ROUND_END, token);
         this.finishRoundEnd();

         LOGGER.trace("EndPhaseAction.roundEnd() end");
      };

      EndPhaseAction.prototype.finishRoundEnd = function(ability, isAccepted)
      {
         LOGGER.trace("EndPhaseAction.finishRoundEnd() start");
         LOGGER.debug("EndPhaseAction.finishRoundEnd() ability = " + ability + " isAccepted ? " + isAccepted);

         var token = this.token();
         var store = token.store();

         store.dispatch(Action.setTokenActivationAction(token.id()));
         store.dispatch(Action.setTokenAttackDice(token.id()));
         store.dispatch(Action.setTokenCombatAction(token));
         store.dispatch(Action.setTokenDamageDealer(token));
         store.dispatch(Action.setTokenDefenseDice(token.id()));
         store.dispatch(Action.setTokenDefenderHit(token, false));
         store.dispatch(Action.setTokenInFiringArc(token, false));
         store.dispatch(Action.setTokenManeuverAction(token.id()));
         store.dispatch(Action.setTokenRange(token));
         store.dispatch(Action.setTokenTouching(token, false));
         store.dispatch(Action.clearAttackerUsedDamages(token));
         store.dispatch(Action.clearAttackerUsedPilots(token));
         store.dispatch(Action.clearAttackerUsedUpgrades(token));
         store.dispatch(Action.clearDefenderUsedDamages(token));
         store.dispatch(Action.clearDefenderUsedPilots(token));
         store.dispatch(Action.clearDefenderUsedUpgrades(token));
         store.dispatch(Action.clearTokenUsedDamages(token));
         store.dispatch(Action.clearTokenUsedPilots(token));
         store.dispatch(Action.clearTokenUsedShipActions(token));
         store.dispatch(Action.clearTokenUsedUpgrades(token));

         store.dispatch(Action.setTokenPilotPerRound(token, token.pilotKey()));

         token.upgradeKeys().forEach(function(upgradeKey)
         {
            store.dispatch(Action.setTokenUpgradePerRound(token, upgradeKey));
         });

         // FIXME: force a recompute.
         store.dispatch(Action.setEvadeCount(token));

         this.finishIt();

         LOGGER.trace("EndPhaseAction.finishRoundEnd() end");
      };

      EndPhaseAction.prototype.finishIt = function()
      {
         LOGGER.trace("EndPhaseAction.finishIt() start");

         var callback = this.callback();
         callback();

         LOGGER.trace("EndPhaseAction.finishIt() end");
      };

      return EndPhaseAction;
   });
