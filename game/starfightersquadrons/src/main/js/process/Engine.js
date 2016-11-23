define(["process/ActivationAction", "process/CombatAction", "Phase", "Pilot", "process/PlanningAction", "RangeRuler", "Team", "UpgradeCard", "process/Action"],
    function(ActivationAction, CombatAction, Phase, Pilot, PlanningAction, RangeRuler, Team, UpgradeCard, Action)
    {
        "use strict";

        function Engine(environment, adjudicator)
        {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("adjudicator", adjudicator);

            this.environment = function()
            {
                return environment;
            };

            this.adjudicator = function()
            {
                return adjudicator;
            };

            var that = this;
            var firstTokenToManeuver, secondTokenToManeuver;
            var activationQueue = [];
            var combatQueue = [];
            var endQueue = [];
            var delay = 1000;
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

                    for (var tokenId in store.getState().tokens)
                    {
                        var token = store.getState().tokens[tokenId];
                        token.activationState().clear();
                    }

                    // FIXME: Perform start of activation phase actions.

                    // Perform decloak action for all ships.
                    decloakCount = 0;
                    var tokens = environment.getTokensForActivation(true);

                    tokens.forEach(function(token)
                    {
                        if (token.isCloaked && token.isCloaked())
                        {
                            LOGGER.info("checking decloak for " + token);
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

            this.performCombatPhase = function()
            {
                if (!isGameOver())
                {
                    LOGGER.trace("Engine.performCombatPhase() start");
                    environment.phase(Phase.COMBAT_START);
                    var store = environment.store();

                    for (var tokenId in store.getState().tokens)
                    {
                        var token = store.getState().tokens[tokenId];
                        token.combatState().clear();
                    }

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
            };

            this.performEndPhase = function()
            {
                if (!isGameOver())
                {
                    LOGGER.trace("Engine.performEndPhase() start");
                    environment.phase(Phase.END_START);

                    endQueue = environment.getTokensForCombat();
                    this.processEndQueue();
                }
            };

            this.performPlanningPhase = function()
            {
                if (!isGameOver())
                {
                    LOGGER.trace("Engine.performPlanningPhase() start");

                    environment.phase(Phase.PLANNING_START);
                    environment.incrementRound();

                    var firstAgent = environment.firstAgent();
                    var firstPlanningAction = new PlanningAction(environment, adjudicator, firstAgent,
                        that.setTokenToManeuver);
                    firstPlanningAction.doIt();

                    var secondAgent = environment.secondAgent();
                    var secondPlanningAction = new PlanningAction(environment, adjudicator, secondAgent,
                        that.setTokenToManeuver);
                    secondPlanningAction.doIt();

                    // Wait for agents to respond.
                }
            };

            this.processActivationQueue = function()
            {
                LOGGER.trace("Engine.processActivationQueue() start");

                if (activationQueue.length === 0)
                {
                    firstTokenToManeuver = undefined;
                    secondTokenToManeuver = undefined;

                    environment.activeToken(undefined);
                    var store = environment.store();
                    store.dispatch(Action.setUserMessage(""));
                    LOGGER.trace("Engine.processActivationQueue() done");
                    environment.phase(Phase.ACTIVATION_END);
                    setTimeout(function()
                    {
                        that.performCombatPhase();
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

                var activationAction = new ActivationAction(environment, adjudicator, token, maneuverKey,
                    this.processActivationQueue.bind(this));

                setTimeout(function()
                {
                    activationAction.doIt();
                }, 500);

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
                        that.performEndPhase();
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
                        that.performPlanningPhase();
                    }, delay);
                    return;
                }

                var token = endQueue.shift();

                if (token)
                {
                    environment.activeToken(token);

                    // Perform end steps.
                    store.dispatch(Action.setEvadeCount(token));

                    if (!token.isUpgradedWith(UpgradeCard.MOLDY_CROW))
                    {
                        store.dispatch(Action.setFocusCount(token));
                    }

                    store.dispatch(Action.setReinforceCount(token));
                    store.dispatch(Action.setTractorBeamCount(token));
                    store.dispatch(Action.setWeaponsDisabledCount(token));

                    token.upgradeKeys().forEach(function(upgradeKey)
                    {
                        store.dispatch(Action.setTokenUpgradePerRound(token.id(), upgradeKey));
                    });
                }

                this.processEndQueue();
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

                LOGGER.info("token = " + token + " decloakAction = " + decloakAction);

                var delay = 0;

                if (decloakAction !== undefined)
                {
                    decloakAction.doIt();
                    var store = this.environment().store();
                    store.dispatch(Action.addCloakCount(token, -1));
                    LOGGER.info("token.isCloaked() ? " + token.isCloaked());
                    LOGGER.info("token.cloakCount() = " + token.cloakCount());
                    delay = 1000;
                }

                decloakCount++;

                if (decloakCount === this.environment().tokens().length)
                {
                    activationQueue = environment.getTokensForActivation(true);
                    setTimeout(this.processActivationQueue.bind(this), delay);
                }

                LOGGER.trace("Engine.setDecloakAction() end");
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
                        that.performActivationPhase();
                    }, delay);
                }
            };

            this.setWeaponAndDefender = function(weapon, defender)
            {
                if (weapon && defender)
                {
                    LOGGER.debug("weapon = " + weapon);
                    LOGGER.debug("defender = " + defender);
                    var attacker = environment.activeToken();
                    var attackerPosition = environment.getPositionFor(attacker);

                    if (defender)
                    {
                        // environment.phase(Phase.COMBAT_DECLARE_TARGET);
                        var defenderPosition = environment.getPositionFor(defender);
                        var store = environment.store();
                        store.dispatch(Action.setUserMessage(attacker + " fires upon " + defender));

                        var combatAction = new CombatAction(environment, adjudicator, attacker, attackerPosition, weapon,
                            defender, defenderPosition, that.processCombatQueue);
                        LOGGER.trace("combatAction = " + combatAction);

                        setTimeout(function()
                        {
                            combatAction.doIt();
                        }, 500);
                    }
                }
                else
                {
                    that.processCombatQueue();
                }
            };

            function isGameOver()
            {
                var answer = adjudicator.isGameOver(environment);

                if (answer)
                {
                    LOGGER.debug("adjudicator.isGameOver() ? " + adjudicator.isGameOver(environment));
                    processGameOver();
                }

                return answer;
            }

            function processGameOver()
            {
                var winner = adjudicator.determineWinner(environment);

                var message;

                if (winner === "")
                {
                    message = "Game is a draw.";
                }
                else
                {
                    message = winner.name() + " won! ";
                }

                var store = environment.store();
                store.dispatch(Action.setUserMessage(message));

                return winner;
            }
        }

        return Engine;
    });
