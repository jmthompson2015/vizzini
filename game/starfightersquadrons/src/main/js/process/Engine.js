define(["Maneuver", "Phase", "Pilot", "RangeRuler", "Team", "UpgradeCard", "process/Action", "process/ActivationAction", "process/CombatAction", "process/EndPhaseAction", "process/PlanningAction"],
   function(Maneuver, Phase, Pilot, RangeRuler, Team, UpgradeCard, Action, ActivationAction, CombatAction, EndPhaseAction, PlanningAction)
   {
      "use strict";

      function Engine(environment, adjudicator, delayIn)
      {
         InputValidator.validateNotNull("environment", environment);
         InputValidator.validateNotNull("adjudicator", adjudicator);
         // delayIn optional.

         var delay = (delayIn !== undefined ? delayIn : 1000);

         this.environment = function()
         {
            return environment;
         };

         this.adjudicator = function()
         {
            return adjudicator;
         };

         this.delay = function()
         {
            return delay;
         };

         var that = this;
         var firstTokenToManeuver, secondTokenToManeuver;
         var activationQueue = [];
         var combatQueue = [];
         var endQueue = [];
         var decloakCount = 0;

         this.firstTokenToManeuver = function()
         {
            return firstTokenToManeuver;
         };

         this.performActivationPhase = function()
         {
            if (!isGameOver())
            {
               LOGGER.trace("Engine.performActivationPhase() start");
               environment.phase(Phase.ACTIVATION_START);
               var store = environment.store();

               // FIXME: Perform start of activation phase actions.

               // Perform decloak action for all ships.
               decloakCount = 0;
               var tokens = environment.getTokensForActivation(true);

               tokens.forEach(function(token)
               {
                  if (token.isCloaked && token.isCloaked())
                  {
                     LOGGER.debug("checking decloak for " + token);
                     var agent = token.agent();
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

         this.performCombatPhase = function(callback)
         {
            // callback optional.
            if (callback)
            {
               combatPhaseCallback = callback;
            }

            if (!isGameOver())
            {
               LOGGER.trace("Engine.performCombatPhase() start");
               environment.phase(Phase.COMBAT_START);
               var store = environment.store();

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

               combatQueue = environment.getTokensForCombat();
               this.processCombatQueue();
            }
            else
            {
               combatPhaseCallback();
            }
         };

         this.performEndPhase = function(callback)
         {
            // callback optional.
            if (callback)
            {
               endPhaseCallback = callback;
            }

            if (!isGameOver())
            {
               LOGGER.trace("Engine.performEndPhase() start");
               environment.phase(Phase.END_START);

               endQueue = environment.getTokensForCombat();
               this.processEndQueue();
            }
            else
            {
               endPhaseCallback();
            }
         };

         this.performPlanningPhase = function(planningCallback, activationCallback)
         {
            // planningCallback optional.
            // activationCallback optional.

            if (planningCallback)
            {
               planningPhaseCallback = planningCallback;
            }

            if (activationCallback)
            {
               activationPhaseCallback = activationCallback;
            }

            if (!isGameOver())
            {
               LOGGER.trace("Engine.performPlanningPhase() start");

               environment.phase(Phase.PLANNING_START);
               environment.incrementRound();

               var firstAgent = environment.firstAgent();
               var firstPlanningAction = new PlanningAction(environment, adjudicator, firstAgent, that.setTokenToManeuver);
               firstPlanningAction.doIt();

               var secondAgent = environment.secondAgent();
               var secondPlanningAction = new PlanningAction(environment, adjudicator, secondAgent, that.setTokenToManeuver);
               secondPlanningAction.doIt();

               // Wait for agents to respond.
            }
            else
            {
               planningPhaseCallback();
            }
         };

         this.processActivationQueue = function()
         {
            LOGGER.trace("Engine.processActivationQueue() start");

            var store = environment.store();

            if (activationQueue.length === 0)
            {
               firstTokenToManeuver = undefined;
               secondTokenToManeuver = undefined;

               environment.activeToken(undefined);
               store.dispatch(Action.setUserMessage(""));
               LOGGER.trace("Engine.processActivationQueue() done");
               environment.phase(Phase.ACTIVATION_END);
               setTimeout(function()
               {
                  activationPhaseCallback();
               }, delay);
               return;
            }

            var token = activationQueue.shift();
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
               maneuverKey = firstTokenToManeuver[myToken];
            }
            else
            {
               maneuverKey = secondTokenToManeuver[myToken];
            }

            var activationAction = new ActivationAction(store, token.id(), this.processActivationQueue.bind(this), delay);
            var maneuver = Maneuver.properties[maneuverKey];
            store.dispatch(Action.setTokenManeuver(token, maneuver));

            setTimeout(function()
            {
               activationAction.doIt();
            }, delay);

            LOGGER.trace("Engine.processActivationQueue() end");
         };

         this.processCombatQueue = function()
         {
            LOGGER.trace("Engine.processCombatQueue() start");

            var store = environment.store();

            if (combatQueue.length === 0)
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
               environment.phase(Phase.COMBAT_END);
               setTimeout(function()
               {
                  combatPhaseCallback();
               }, delay);
               return;
            }

            var attacker = combatQueue.shift();

            if (attacker)
            {
               environment.activeToken(attacker);

               if (adjudicator.canAttack(attacker))
               {
                  // Perform combat steps.
                  LOGGER.debug("attacker = " + attacker.name());

                  // Declare target.
                  var agent = attacker.agent();
                  agent.chooseWeaponAndDefender(environment, adjudicator, attacker, that.setWeaponAndDefender);

                  // Wait for agent to respond.
               }
               else
               {
                  // Proceed.
                  setTimeout(that.processCombatQueue, delay);
               }
            }

            LOGGER.trace("Engine.processCombatQueue() end");
         };

         this.processEndQueue = function()
         {
            LOGGER.trace("Engine.processEndQueue() start");

            var store = environment.store();

            if (endQueue.length === 0)
            {
               environment.activeToken(undefined);
               store.dispatch(Action.setUserMessage(""));
               LOGGER.trace("Engine.processEndQueue() done");
               environment.phase(Phase.END_END);
               setTimeout(function()
               {
                  endPhaseCallback();
               }, delay);
               return;
            }

            var token = endQueue.shift();

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

         this.secondTokenToManeuver = function()
         {
            return secondTokenToManeuver;
         };

         this.setDecloakAction = function(token, decloakAction)
         {
            LOGGER.trace("Engine.setDecloakAction() start");

            InputValidator.validateNotNull("token", token);

            LOGGER.debug("token = " + token + " decloakAction = " + decloakAction);

            if (decloakAction !== undefined)
            {
               decloakAction.doIt(this.finishDecloakAction.bind(this));
               LOGGER.debug("token.isCloaked() ? " + token.isCloaked());
               LOGGER.debug("token.cloakCount() = " + token.cloakCount());
            }
            else
            {
               this.finishDecloakAction();
            }

            LOGGER.trace("Engine.setDecloakAction() end");
         };

         this.finishDecloakAction = function()
         {
            LOGGER.info("Engine.finishDecloakAction() start");

            decloakCount++;

            if (decloakCount === environment.tokens().length)
            {
               activationQueue = environment.getTokensForActivation(true);
               setTimeout(this.processActivationQueue.bind(this), delay);
            }

            LOGGER.trace("Engine.finishDecloakAction() end");
         };

         this.setTokenToManeuver = function(agent, tokenToManeuver)
         {
            if (agent === environment.firstAgent())
            {
               firstTokenToManeuver = tokenToManeuver;
               LOGGER.trace("firstTokenToManeuver = " + firstTokenToManeuver);
            }
            else if (agent === environment.secondAgent())
            {
               secondTokenToManeuver = tokenToManeuver;
               LOGGER.trace("secondTokenToManeuver = " + secondTokenToManeuver);
            }
            else
            {
               LOGGER.error("planningAction agent = " + agent);
            }

            if (firstTokenToManeuver && secondTokenToManeuver)
            {
               LOGGER.trace("Engine.performPlanningPhase() end");
               environment.phase(Phase.PLANNING_END);
               setTimeout(function()
               {
                  planningPhaseCallback();
               }, delay);
            }
         };

         this.setWeaponAndDefender = function(weapon, defender)
         {
            if (weapon && defender)
            {
               var attacker = environment.activeToken();

               if (defender)
               {
                  var store = environment.store();
                  store.dispatch(Action.setUserMessage(attacker + " fires upon " + defender));

                  var combatAction = new CombatAction(store, attacker, weapon, defender, that.processCombatQueue, delay);

                  setTimeout(function()
                  {
                     combatAction.doIt();
                  }, delay);
               }
            }
            else
            {
               that.processCombatQueue();
            }
         };

         var planningPhaseCallback = this.performActivationPhase.bind(this);
         var activationPhaseCallback = this.performCombatPhase.bind(this);
         var combatPhaseCallback = this.performEndPhase.bind(this);
         var endPhaseCallback = this.performPlanningPhase.bind(this);

         function isGameOver()
         {
            var store = environment.store();
            var answer = store.getState().isGameOver;

            if (!answer)
            {
               answer = adjudicator.isGameOver(environment);

               if (answer)
               {
                  LOGGER.debug("adjudicator.isGameOver() ? " + adjudicator.isGameOver(environment));
                  processGameOver();
               }
            }

            return answer;
         }

         function processGameOver()
         {
            var winner = adjudicator.determineWinner(environment);
            var store = environment.store();
            store.dispatch(Action.setGameOver(winner));

            var message = (winner === undefined ? "Game is a draw." : winner.name() + " won! ");
            store.dispatch(Action.setUserMessage(message));
         }
      }

      return Engine;
   });
