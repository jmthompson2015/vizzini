define(["Maneuver", "Phase", "Pilot", "RangeRuler", "Team", "UpgradeCard", "process/Action", "process/ActivationAction", "process/CombatAction", "process/EndPhaseAction", "process/PlanningAction"],
   function(Maneuver, Phase, Pilot, RangeRuler, Team, UpgradeCard, Action, ActivationAction, CombatAction, EndPhaseAction, PlanningAction)
   {
      "use strict";

      function Engine(environment, adjudicator, delayIn)
      {
         InputValidator.validateNotNull("environment", environment);
         InputValidator.validateNotNull("adjudicator", adjudicator);
         // delayIn optional.

         this.environment = function()
         {
            return environment;
         };

         this.adjudicator = function()
         {
            return adjudicator;
         };

         var delay = (delayIn !== undefined ? delayIn : 1000);
         var store = environment.store();

         var firstTokenToManeuver;
         var secondTokenToManeuver;

         var activationQueue = [];
         var combatQueue = [];
         var endQueue = [];
         var decloakCount = 0;

         var planningPhaseCallback = this.performActivationPhase.bind(this);
         var activationPhaseCallback = this.performCombatPhase.bind(this);
         var combatPhaseCallback = this.performEndPhase.bind(this);
         var endPhaseCallback = this.performPlanningPhase.bind(this);

         //////////////////////////////////////////////////////////////////////////
         // Accessor methods.

         this.delay = function()
         {
            return delay;
         };

         this.store = function()
         {
            return store;
         };

         //////////////////////////////////////////////////////////////////////////
         // Mutator methods.

         this.activationPhaseCallback = function(callback)
         {
            if (callback !== undefined)
            {
               activationPhaseCallback = callback;
            }

            return activationPhaseCallback;
         };

         this.activationQueue = function(queue)
         {
            if (queue !== undefined)
            {
               activationQueue = queue;
            }

            return activationQueue;
         };

         this.clearFirstTokenToManeuver = function()
         {
            firstTokenToManeuver = undefined;
         };

         this.clearSecondTokenToManeuver = function()
         {
            secondTokenToManeuver = undefined;
         };

         this.combatPhaseCallback = function(callback)
         {
            if (callback !== undefined)
            {
               combatPhaseCallback = callback;
            }

            return combatPhaseCallback;
         };

         this.combatQueue = function(queue)
         {
            if (queue !== undefined)
            {
               combatQueue = queue;
            }

            return combatQueue;
         };

         this.decloakCount = function(count)
         {
            if (count !== undefined)
            {
               decloakCount = count;
            }

            return decloakCount;
         };

         this.endPhaseCallback = function(callback)
         {
            if (callback !== undefined)
            {
               endPhaseCallback = callback;
            }

            return endPhaseCallback;
         };

         this.endQueue = function(queue)
         {
            if (queue !== undefined)
            {
               endQueue = queue;
            }

            return endQueue;
         };

         this.firstTokenToManeuver = function(tokenToManeuver)
         {
            if (tokenToManeuver !== undefined)
            {
               firstTokenToManeuver = tokenToManeuver;
            }

            return firstTokenToManeuver;
         };

         this.planningPhaseCallback = function(callback)
         {
            if (callback !== undefined)
            {
               planningPhaseCallback = callback;
            }

            return planningPhaseCallback;
         };

         this.secondTokenToManeuver = function(tokenToManeuver)
         {
            if (tokenToManeuver !== undefined)
            {
               secondTokenToManeuver = tokenToManeuver;
            }

            return secondTokenToManeuver;
         };
      }

      //////////////////////////////////////////////////////////////////////////
      // Behavior methods.

      Engine.prototype.performPlanningPhase = function(planningCallback, activationCallback)
      {
         // planningCallback optional.
         // activationCallback optional.

         if (planningCallback !== undefined)
         {
            this.planningPhaseCallback(planningCallback);
         }

         if (activationCallback !== undefined)
         {
            this.activationPhaseCallback(activationCallback);
         }

         if (!this.isGameOver())
         {
            LOGGER.trace("Engine.performPlanningPhase() start");

            var store = this.store();
            store.dispatch(Action.enqueuePhase(Phase.PLANNING_START));
            var environment = this.environment();
            environment.incrementRound();
            var adjudicator = this.adjudicator();

            var firstAgent = environment.firstAgent();
            var firstPlanningAction = new PlanningAction(environment, adjudicator, firstAgent, this.setTokenToManeuver.bind(this));
            firstPlanningAction.doIt();

            var secondAgent = environment.secondAgent();
            var secondPlanningAction = new PlanningAction(environment, adjudicator, secondAgent, this.setTokenToManeuver.bind(this));
            secondPlanningAction.doIt();

            // Wait for agents to respond.
         }
         else
         {
            this.planningPhaseCallback()();
         }
      };

      Engine.prototype.setTokenToManeuver = function(agent, tokenToManeuver)
      {
         var environment = this.environment();

         if (agent === environment.firstAgent())
         {
            this.firstTokenToManeuver(tokenToManeuver);
         }
         else if (agent === environment.secondAgent())
         {
            this.secondTokenToManeuver(tokenToManeuver);
         }
         else
         {
            LOGGER.error("planningAction agent = " + agent);
         }

         if (this.firstTokenToManeuver() && this.secondTokenToManeuver())
         {
            LOGGER.trace("Engine.performPlanningPhase() end");
            var store = this.store();
            store.dispatch(Action.enqueuePhase(Phase.PLANNING_END));
            var planningPhaseCallback = this.planningPhaseCallback();
            setTimeout(function()
            {
               planningPhaseCallback();
            }, this.delay());
         }
      };

      Engine.prototype.performActivationPhase = function()
      {
         if (!this.isGameOver())
         {
            LOGGER.trace("Engine.performActivationPhase() start");
            var store = this.store();
            store.dispatch(Action.enqueuePhase(Phase.ACTIVATION_START));

            // FIXME: Perform start of activation phase actions.

            // Perform decloak action for all ships.
            this.decloakCount(0);
            var environment = this.environment();
            var tokens = environment.getTokensForActivation(true);

            tokens.forEach(function(token)
            {
               if (token.isCloaked && token.isCloaked())
               {
                  LOGGER.debug("checking decloak for " + token);
                  var agent = token.agent();
                  var adjudicator = this.adjudicator();
                  agent.getDecloakAction(environment, adjudicator, token, this.setDecloakAction.bind(this));

                  // Wait for agent to respond.
               }
               else
               {
                  this.setDecloakAction(token);
               }
            }, this);
         }
      };

      Engine.prototype.setDecloakAction = function(token, decloakAbility)
      {
         LOGGER.trace("Engine.setDecloakAction() start");

         InputValidator.validateNotNull("token", token);

         LOGGER.debug("token = " + token + " decloakAbility = " + decloakAbility);

         if (decloakAbility !== undefined)
         {
            var consequent = decloakAbility.consequent();
            var store = this.store();
            consequent(store, token, this.finishDecloakAction.bind(this), decloakAbility.context());
            LOGGER.debug("token.isCloaked() ? " + token.isCloaked());
            LOGGER.debug("token.cloakCount() = " + token.cloakCount());
         }
         else
         {
            this.finishDecloakAction();
         }

         LOGGER.trace("Engine.setDecloakAction() end");
      };

      Engine.prototype.finishDecloakAction = function()
      {
         LOGGER.trace("Engine.finishDecloakAction() start");

         this.decloakCount(this.decloakCount() + 1);
         var environment = this.environment();

         LOGGER.debug("this.decloakCount() = " + this.decloakCount());

         if (this.decloakCount() === environment.tokens().length)
         {
            this.activationQueue(environment.getTokensForActivation(true));
            var function0 = this.processActivationQueue.bind(this);
            setTimeout(function0, this.delay());
            // setTimeout(this.processActivationQueue.bind(this), this.delay());
         }

         LOGGER.trace("Engine.finishDecloakAction() end");
      };

      Engine.prototype.processActivationQueue = function()
      {
         LOGGER.trace("Engine.processActivationQueue() start");

         var store = this.store();
         var environment = this.environment();

         LOGGER.debug("this.activationQueue().length = " + this.activationQueue().length);

         if (this.activationQueue().length === 0)
         {
            this.clearFirstTokenToManeuver();
            this.clearSecondTokenToManeuver();

            environment.activeToken(undefined);
            store.dispatch(Action.setUserMessage(""));
            LOGGER.trace("Engine.processActivationQueue() done");
            store.dispatch(Action.enqueuePhase(Phase.ACTIVATION_END));
            var activationPhaseCallback = this.activationPhaseCallback();
            setTimeout(function()
            {
               activationPhaseCallback();
            }, this.delay());
            return;
         }

         var token = this.activationQueue().shift();
         environment.activeToken(token);
         var factionKey = token.pilot().shipTeam.teamKey;
         var myToken = token;

         if (token.parent && token.pilot().value.endsWith("fore"))
         {
            myToken = token.parent;
         }

         var maneuverKey;

         if (Team.isFriendly(factionKey, environment.firstTeam()))
         {
            maneuverKey = this.firstTokenToManeuver()[myToken];
         }
         else
         {
            maneuverKey = this.secondTokenToManeuver()[myToken];
         }

         var activationAction = new ActivationAction(store, token.id(), this.processActivationQueue.bind(this), this.delay());
         var maneuver = Maneuver.properties[maneuverKey];
         store.dispatch(Action.setTokenManeuver(token, maneuver));

         setTimeout(function()
         {
            activationAction.doIt();
         }, this.delay());

         LOGGER.trace("Engine.processActivationQueue() end");
      };

      Engine.prototype.performCombatPhase = function(callback)
      {
         // callback optional.
         if (callback !== undefined)
         {
            this.combatPhaseCallback(callback);
         }

         var environment = this.environment();

         if (!this.isGameOver())
         {
            LOGGER.trace("Engine.performCombatPhase() start");
            var store = this.store();
            store.dispatch(Action.enqueuePhase(Phase.COMBAT_START));

            // FIXME: Perform start of combat phase actions.

            // Search for Epsilon Leader.
            var tokens = environment.getTokensForCombat().filter(function(token)
            {
               return token.pilotKey() === Pilot.EPSILON_LEADER;
            });

            if (tokens.length > 0)
            {
               var epsilonLeader = tokens[0];
               var friendlies = environment.getFriendlyTokensAtRange(epsilonLeader, RangeRuler.ONE);

               friendlies.forEach(function(token)
               {
                  token.removeStress();
               });
            }

            // Search for a ship upgraded with Ysanne Isard.
            tokens = environment.getTokensForCombat().filter(function(token)
            {
               return token.isUpgradedWith(UpgradeCard.YSANNE_ISARD);
            });

            if (tokens.length > 0)
            {
               var ysanneIsard = tokens[0];

               if (ysanneIsard.shieldCount() === 0 &&
                  (ysanneIsard.damageCount() > 0 || ysanneIsard.criticalDamageCount() > 0))
               {
                  store.dispatch(Action.addEvadeCount(ysanneIsard));
               }
            }

            this.combatQueue(environment.getTokensForCombat());
            this.processCombatQueue();
         }
         else
         {
            this.combatPhaseCallback()();
         }
      };

      Engine.prototype.processCombatQueue = function()
      {
         LOGGER.trace("Engine.processCombatQueue() start");

         var store = this.store();
         var environment = this.environment();
         var adjudicator = this.adjudicator();

         if (this.combatQueue().length === 0)
         {
            // Search for a ship upgraded with R5-P9.
            var tokens = environment.getTokensForCombat().filter(function(token)
            {
               return token.isUpgradedWith(UpgradeCard.R5_P9);
            });

            if (tokens.length > 0)
            {
               var r5p9 = tokens[0];

               if (r5p9.focusCount() > 0 && r5p9.shieldCount() < r5p9.shieldValue())
               {
                  store.dispatch(Action.addFocusCount(token, -1));
                  r5p9.recoverShield();
               }
            }

            environment.activeToken(undefined);
            store.dispatch(Action.setUserMessage(""));
            LOGGER.trace("Engine.processCombatQueue() done");
            store.dispatch(Action.enqueuePhase(Phase.COMBAT_END));
            var combatPhaseCallback = this.combatPhaseCallback();
            setTimeout(function()
            {
               combatPhaseCallback();
            }, this.delay());
            return;
         }

         var attacker = this.combatQueue().shift();

         if (attacker)
         {
            environment.activeToken(attacker);

            if (adjudicator.canAttack(attacker))
            {
               // Perform combat steps.
               LOGGER.debug("attacker = " + attacker.name());

               // Declare target.
               var agent = attacker.agent();
               agent.chooseWeaponAndDefender(environment, adjudicator, attacker, this.setWeaponAndDefender.bind(this));

               // Wait for agent to respond.
            }
            else
            {
               // Proceed.
               setTimeout(this.processCombatQueue.bind(this), this.delay());
            }
         }

         LOGGER.trace("Engine.processCombatQueue() end");
      };

      Engine.prototype.setWeaponAndDefender = function(weapon, defender)
      {
         if (weapon && defender)
         {
            var environment = this.environment();
            var attacker = environment.activeToken();

            if (defender)
            {
               var store = this.store();
               store.dispatch(Action.setUserMessage(attacker + " fires upon " + defender));

               var combatAction = new CombatAction(store, attacker, weapon, defender, this.processCombatQueue.bind(this), this.delay());

               setTimeout(function()
               {
                  combatAction.doIt();
               }, this.delay());
            }
         }
         else
         {
            this.processCombatQueue();
         }
      };

      Engine.prototype.performEndPhase = function(callback)
      {
         // callback optional.
         if (callback !== undefined)
         {
            this.endPhaseCallback(callback);
         }

         if (!this.isGameOver())
         {
            LOGGER.trace("Engine.performEndPhase() start");
            var store = this.store();
            store.dispatch(Action.enqueuePhase(Phase.END_START));

            var environment = this.environment();
            this.endQueue(environment.getTokensForCombat());
            this.processEndQueue();
         }
         else
         {
            this.endPhaseCallback()();
         }
      };

      Engine.prototype.processEndQueue = function()
      {
         LOGGER.trace("Engine.processEndQueue() start");

         var store = this.store();
         var environment = this.environment();

         if (this.endQueue().length === 0)
         {
            environment.activeToken(undefined);
            store.dispatch(Action.setUserMessage(""));
            LOGGER.trace("Engine.processEndQueue() done");
            store.dispatch(Action.enqueuePhase(Phase.END_END));
            var endPhaseCallback = this.endPhaseCallback();
            setTimeout(function()
            {
               endPhaseCallback();
            }, this.delay());
            return;
         }

         var token = this.endQueue().shift();

         if (token)
         {
            environment.activeToken(token);

            var action = new EndPhaseAction(environment, token, this.processEndQueue.bind(this));
            action.doIt();
         }
         else
         {
            this.processEndQueue();
         }

         LOGGER.trace("Engine.processEndQueue() end");
      };

      //////////////////////////////////////////////////////////////////////////
      // Utility methods.

      Engine.prototype.isGameOver = function()
      {
         var store = this.store();
         var answer = store.getState().isGameOver;

         if (!answer)
         {
            var environment = this.environment();
            var adjudicator = this.adjudicator();
            answer = adjudicator.isGameOver(environment);

            if (answer)
            {
               LOGGER.debug("adjudicator.isGameOver() ? " + adjudicator.isGameOver(environment));
               var winner = adjudicator.determineWinner(environment);
               store.dispatch(Action.setGameOver(winner));

               var message = (winner === undefined ? "Game is a draw." : winner.name() + " won! ");
               store.dispatch(Action.setUserMessage(message));
            }
         }

         return answer;
      };

      return Engine;
   });
