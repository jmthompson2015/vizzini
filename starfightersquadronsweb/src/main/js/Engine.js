define([ "CombatAction", "Environment", "ManeuverAction", "Phase", "ShipAction", "TargetLock", "UpgradeCard" ],
        function(CombatAction, Environment, ManeuverAction, Phase, ShipAction, TargetLock, UpgradeCard)
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
                var firstPlanningAction;
                var secondPlanningAction;
                var activationQueue = [];
                var combatQueue = [];
                var endQueue = [];

                environment.bind(Environment.PHASE_EVENT, function(phase)
                {
                    if (adjudicator.isGameOver(environment))
                    {
                        LOGGER.debug("adjudicator.isGameOver() ? " + adjudicator.isGameOver(environment));
                        processGameOver();
                    }
                    else
                    {
                        var delay = 1000;

                        switch (phase)
                        {
                        case Phase.PLANNING_START:
                            that.performPlanningPhase();
                            break;
                        case Phase.PLANNING_END:
                            setTimeout(function()
                            {
                                environment.phase(Phase.ACTIVATION_START);
                            }, delay);
                            break;
                        case Phase.ACTIVATION_START:
                            that.performActivationPhase();
                            break;
                        case Phase.ACTIVATION_END:
                            setTimeout(function()
                            {
                                environment.phase(Phase.COMBAT_START);
                            }, delay);
                            break;
                        case Phase.COMBAT_START:
                            that.performCombatPhase();
                            break;
                        case Phase.COMBAT_END:
                            setTimeout(function()
                            {
                                environment.phase(Phase.END_START);
                            }, delay);
                            break;
                        case Phase.END_START:
                            that.performEndPhase();
                            break;
                        case Phase.END_END:
                            setTimeout(function()
                            {
                                environment.phase(Phase.PLANNING_START);
                            }, delay);
                            break;
                        }
                    }
                });

                this.firstPlanningAction = function()
                {
                    return firstPlanningAction;
                };

                this.performActivationPhase = function()
                {
                    LOGGER.trace("Engine.performActivationPhase() start");
                    activationQueue = environment.getTokensForActivation();
                    this.processActivationQueue();
                };

                this.performCombatPhase = function()
                {
                    LOGGER.trace("Engine.performCombatPhase() start");

                    combatQueue = environment.getTokensForCombat();
                    this.processCombatQueue();
                };

                this.performEndPhase = function()
                {
                    LOGGER.trace("Engine.performEndPhase() start");

                    endQueue = environment.getTokensForCombat();
                    this.processEndQueue();
                };

                this.performPlanningPhase = function()
                {
                    LOGGER.trace("Engine.performPlanningPhase() start");

                    environment.incrementRound();

                    var firstAgent = environment.firstAgent();
                    var secondAgent = environment.secondAgent();

                    // TODO: can planning be done in parallel?
                    firstAgent.getPlanningAction(environment, adjudicator, that.setPlanningAction);
                    secondAgent.getPlanningAction(environment, adjudicator, that.setPlanningAction);

                    // Wait for agents to respond.
                };

                this.processActivationQueue = function()
                {
                    LOGGER.trace("Engine.processActivationQueue() start");

                    if (activationQueue.length === 0)
                    {
                        firstPlanningAction = undefined;
                        secondPlanningAction = undefined;

                        environment.activeToken(undefined);
                        LOGGER.trace("Engine.processActivationQueue() done");
                        environment.phase(Phase.ACTIVATION_END);
                        return;
                    }

                    var token = activationQueue[0];
                    environment.activeToken(token);

                    if (token.isCloaked())
                    {
                        var agent = token.agent();
                        agent.getDecloakAction(environment, adjudicator, token, that.processActivationQueue2);

                        // Wait for agent to respond.
                    }
                    else
                    {
                        // Proceed.
                        that.processActivationQueue3();
                    }

                    LOGGER.trace("Engine.processActivationQueue() end");
                };

                this.processActivationQueue2 = function(decloakAction)
                {
                    LOGGER.trace("Engine.processActivationQueue2() start");

                    if (decloakAction)
                    {
                        decloakAction.doIt();
                        environment.activeToken().cloak().decrease();
                        setTimeout(that.processActivationQueue3, 1000);
                    }
                    else
                    {
                        // Proceed.
                        that.processActivationQueue3();
                    }

                    LOGGER.trace("Engine.processActivationQueue2() end");
                };

                this.processActivationQueue3 = function()
                {
                    LOGGER.trace("Engine.processActivationQueue3() start");

                    var token = activationQueue.shift();
                    var agent = token.agent();
                    var maneuverKey = token.pilot().shipTeam.teamKey == environment.firstTeam() ? firstPlanningAction
                            .getManeuver(token) : secondPlanningAction.getManeuver(token);

                    if (maneuverKey)
                    {
                        var fromPosition = environment.getPositionFor(token);

                        if (fromPosition)
                        {
                            var maneuverAction = new ManeuverAction(environment, token, maneuverKey);
                            maneuverAction.doIt();

                            if (adjudicator.canSelectShipAction(token))
                            {
                                agent.getShipAction(environment, adjudicator, token, that.setShipAction);

                                // Wait for agent to respond.
                            }
                            else
                            {
                                // Proceed.
                                setTimeout(that.processActivationQueue, 1000);
                            }
                        }
                    }

                    LOGGER.trace("Engine.processActivationQueue3() end");
                };

                this.processCombatQueue = function()
                {
                    LOGGER.trace("Engine.processCombatQueue() start");

                    if (combatQueue.length === 0)
                    {
                        environment.activeToken(undefined);
                        LOGGER.trace("Engine.processCombatQueue() done");
                        environment.phase(Phase.COMBAT_END);
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
                            agent
                                    .chooseWeaponAndDefender(environment, adjudicator, attacker,
                                            that.setWeaponAndDefender);

                            // Wait for agent to respond.
                        }
                        else
                        {
                            // Proceed.
                            setTimeout(that.processCombatQueue, 1000);
                        }
                    }

                    LOGGER.trace("Engine.processCombatQueue() end");
                };

                this.processEndQueue = function()
                {
                    LOGGER.trace("Engine.processEndQueue() start");

                    if (endQueue.length === 0)
                    {
                        environment.activeToken(undefined);
                        LOGGER.trace("Engine.processEndQueue() done");
                        environment.phase(Phase.END_END);
                        return;
                    }

                    var token = endQueue.shift();

                    if (token)
                    {
                        environment.activeToken(token);

                        // Perform end steps.
                        token.evade().clear();

                        if (!token.isUpgradedWith(UpgradeCard.MOLDY_CROW))
                        {
                            token.focus().clear();
                        }

                        token.weaponsDisabled().clear();
                    }

                    this.processEndQueue();
                    LOGGER.trace("Engine.processEndQueue() end");
                };

                this.secondPlanningAction = function()
                {
                    return secondPlanningAction;
                };

                this.setPlanningAction = function(planningAction)
                {
                    var team = planningAction.getTeam();

                    if (team === environment.firstTeam())
                    {
                        firstPlanningAction = planningAction;
                        LOGGER.trace("firstPlanningAction = " + firstPlanningAction);
                    }
                    else if (team === environment.secondTeam())
                    {
                        secondPlanningAction = planningAction;
                        LOGGER.trace("secondPlanningAction = " + secondPlanningAction);
                    }
                    else
                    {
                        LOGGER.error("planningAction team = " + team);
                    }

                    if (firstPlanningAction && secondPlanningAction)
                    {
                        LOGGER.trace("Engine.performPlanningPhase() end");
                        environment.phase(Phase.PLANNING_END);
                    }
                };

                this.setShipAction = function(shipAction)
                {
                    var delay = 0;

                    if (shipAction)
                    {
                        LOGGER.debug("shipAction = " + shipAction);
                        var attacker = environment.activeToken();
                        var isBarrelRoll = false;
                        var isBoost = false;
                        var maneuverKey;
                        var myShipAction = ShipAction.properties[shipAction];

                        if (myShipAction)
                        {
                            isBarrelRoll = myShipAction.value.startsWith("barrelRoll");
                            isBoost = myShipAction.value.startsWith("boost");
                            maneuverKey = myShipAction.maneuver;
                        }

                        var attackerPosition, shipBaseKey, maneuverAction;

                        if (isBarrelRoll && maneuverKey)
                        {
                            // Barrel roll.
                            maneuverAction = new ManeuverAction(environment, attacker, maneuverKey);
                            maneuverAction.doIt();
                        }
                        else if (isBoost && maneuverKey)
                        {
                            // Boost.
                            maneuverAction = new ManeuverAction(environment, attacker, maneuverKey, isBoost);
                            maneuverAction.doIt();
                        }
                        else if (shipAction === ShipAction.CLOAK)
                        {
                            attacker.cloak().increase();
                        }
                        else if (shipAction === ShipAction.EVADE)
                        {
                            attacker.evade().increase();
                        }
                        else if (shipAction === ShipAction.FOCUS)
                        {
                            attacker.focus().increase();
                        }
                        else if (shipAction.shipAction === ShipAction.SLAM)
                        {
                            maneuverAction = new ManeuverAction(environment, attacker, shipAction.maneuver);
                            maneuverAction.doIt();
                            attacker.weaponsDisabled().increase();
                        }
                        else if (shipAction.shipAction === ShipAction.TARGET_LOCK)
                        {
                            var defender = shipAction.defender;
                            var targetLock = new TargetLock(attacker, defender);
                            attacker.addAttackerTargetLock(targetLock);
                            defender.addDefenderTargetLock(targetLock);
                        }
                        else
                        {
                            LOGGER.error("ShipAction not handled: " + shipAction);
                        }

                        delay = 1000;
                    }

                    setTimeout(that.processActivationQueue, delay);
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
                            environment.phase(Phase.COMBAT_DECLARE_TARGET);
                            var defenderPosition = environment.getPositionFor(defender);

                            var combatAction = new CombatAction(environment, adjudicator, attacker, attackerPosition,
                                    weapon, defender, defenderPosition, that.processCombatQueue);
                            LOGGER.trace("combatAction = " + combatAction);
                            combatAction.doIt();
                        }
                    }
                    else
                    {
                        that.processCombatQueue();
                    }
                };

                function processGameOver()
                {
                    var winner = adjudicator.determineWinner(environment);

                    that.trigger(Engine.WINNER_EVENT, winner);

                    return winner;
                }
            }

            Engine.WINNER_EVENT = "winner";

            MicroEvent.mixin(Engine);

            return Engine;
        });
