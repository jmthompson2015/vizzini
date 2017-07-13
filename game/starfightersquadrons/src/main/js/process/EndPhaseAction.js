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

         this.environment().phase(Phase.END_CLEAN_UP);

         var token = this.token();
         var store = token.store();

         store.dispatch(Action.setEvadeCount(token));
         store.dispatch(Action.setReinforceCount(token));
         store.dispatch(Action.setTractorBeamCount(token));
         store.dispatch(Action.setWeaponsDisabledCount(token));

         if (!token.isUpgradedWith(UpgradeCard.MOLDY_CROW))
         {
            store.dispatch(Action.setFocusCount(token));
         }

         this.cleanUp2();

         LOGGER.trace("EndPhaseAction.cleanUp() end");
      };

      EndPhaseAction.prototype.cleanUp2 = function()
      {
         LOGGER.trace("EndPhaseAction.cleanUp2() start");

         this.chooseAbility(this.finishCleanUp.bind(this));

         LOGGER.trace("EndPhaseAction.cleanUp2() end");
      };

      EndPhaseAction.prototype.finishCleanUp = function(ability, isAccepted)
      {
         LOGGER.trace("EndPhaseAction.finishCleanUp() start");
         LOGGER.debug("EndPhaseAction.finishCleanUp() ability = " + ability + " isAccepted ? " + isAccepted);

         this.finish(ability, isAccepted, this.cleanUp2.bind(this), this.roundEnd.bind(this));

         LOGGER.trace("EndPhaseAction.finishCleanUp() end");
      };

      EndPhaseAction.prototype.roundEnd = function()
      {
         LOGGER.trace("EndPhaseAction.roundEnd() start");

         this.environment().phase(Phase.END_ROUND_END);
         this.chooseAbility(this.finishRoundEnd.bind(this));

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
         store.dispatch(Action.clearTokenUsedUpgrades(token));

         store.dispatch(Action.setTokenPilotPerRound(token, token.pilotKey()));

         token.upgradeKeys().forEach(function(upgradeKey)
         {
            store.dispatch(Action.setTokenUpgradePerRound(token, upgradeKey));
         });

         // FIXME: force a recompute.
         store.dispatch(Action.setEvadeCount(token));

         this.finish(ability, isAccepted, this.roundEnd.bind(this), this.finishIt.bind(this));

         LOGGER.trace("EndPhaseAction.finishRoundEnd() end");
      };

      EndPhaseAction.prototype.finishIt = function()
      {
         LOGGER.trace("EndPhaseAction.finishIt() start");

         var callback = this.callback();
         callback();

         LOGGER.trace("EndPhaseAction.finishIt() end");
      };

      ////////////////////////////////////////////////////////////////////////
      EndPhaseAction.prototype.chooseAbility = function(callback)
      {
         InputValidator.validateNotNull("callback", callback);

         var token = this.token();
         var agent = token.agent();
         var environment = this.environment();
         var phaseKey = this.environment().phase();
         var damageAbilities = token.usableDamageAbilities(DamageAbility4, phaseKey);
         var pilotAbilities = token.usablePilotAbilities(PilotAbility4, phaseKey);
         var upgradeAbilities = token.usableUpgradeAbilities(UpgradeAbility4, phaseKey);
         agent.chooseAbility(environment, damageAbilities, pilotAbilities, upgradeAbilities, callback);

         // Wait for agent to respond.
      };

      EndPhaseAction.prototype.finish = function(ability, isAccepted, backFunction, forwardFunction)
      {
         InputValidator.validateNotNull("backFunction", backFunction);
         InputValidator.validateNotNull("forwardFunction", forwardFunction);

         if (ability && isAccepted)
         {
            var store = this.environment().store();
            var token = this.token();
            ability.usedAbilities(token).push(ability.sourceKey());
            var consequent = ability.consequent();
            consequent(store, token, backFunction);
         }
         else
         {
            forwardFunction();
         }
      };

      return EndPhaseAction;
   });
