define([ "CombatAction", "Environment", "Maneuver", "ManeuverAction", "Phase", "ShipAction", "TargetLock",
        "UpgradeCard" ], function(CombatAction, Environment, Maneuver, ManeuverAction, Phase, ShipAction, TargetLock,
        UpgradeCard)
{
    function Engine(environment, adjudicator)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);

        this.environment = function()
        {
            return environment;
        }

        this.adjudicator = function()
        {
            return adjudicator;
        }

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
                    performPlanningPhase();
                    break;
                case Phase.PLANNING_END:
                    setTimeout(function()
                    {
                        environment.phase(Phase.ACTIVATION_START);
                    }, delay);
                    break;
                case Phase.ACTIVATION_START:
                    performActivationPhase();
                    break;
                case Phase.ACTIVATION_END:
                    setTimeout(function()
                    {
                        environment.phase(Phase.COMBAT_START);
                    }, delay);
                    break;
                case Phase.COMBAT_START:
                    performCombatPhase();
                    break;
                case Phase.COMBAT_END:
                    setTimeout(function()
                    {
                        environment.phase(Phase.END_START);
                    }, delay);
                    break;
                case Phase.END_START:
                    performEndPhase();
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
        }

        this.setShipAction = function(shipAction)
        {
            var delay = 0;

            if (shipAction)
            {
                LOGGER.debug("shipAction = " + shipAction);
                var attacker = environment.activeToken();
                var maneuver = (ShipAction.properties[shipAction] ? ShipAction.properties[shipAction].maneuver
                        : undefined);

                if (maneuver)
                {
                    // Barrel roll and Boost.
                    var attackerPosition = environment.getPositionFor(attacker);
                    var shipBase = attacker.shipBase();
                    var maneuverAction = new ManeuverAction(environment, maneuver, attackerPosition, shipBase);
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

            setTimeout(processActivationQueue, delay);
        }

        this.setWeaponAndDefender = function(weapon, defender)
        {
            var delay = 0;

            if (weapon && defender)
            {
                LOGGER.debug("weapon = " + weapon);
                LOGGER.debug("defender = " + defender);
                var attacker = environment.activeToken();
                var attackerPosition = environment.getPositionFor(attacker);
                attacker.combatState().weapon(weapon);

                if (defender)
                {
                    attacker.combatState().defender(defender);
                    environment.phase(Phase.COMBAT_DECLARE_TARGET);
                    var defenderPosition = environment.getPositionFor(defender);

                    var combatAction = new CombatAction(environment, adjudicator, attacker, attackerPosition, weapon,
                            defender, defenderPosition, processCombatQueue);
                    LOGGER.trace("combatAction = " + combatAction);
                    combatAction.doIt();
                    delay = 1000;
                }
            }
            else
            {
                setTimeout(processCombatQueue, delay);
            }
        }

        function performActivationPhase()
        {
            LOGGER.trace("Engine.performActivationPhase() start");
            activationQueue = environment.getTokensForActivation();
            processActivationQueue();
        }

        function performCombatPhase()
        {
            LOGGER.trace("Engine.performCombatPhase() start");

            combatQueue = environment.getTokensForCombat();
            processCombatQueue();
        }

        function performEndPhase()
        {
            LOGGER.trace("Engine.performEndPhase() start");

            endQueue = environment.getTokensForCombat();
            processEndQueue();
        }

        function performPlanningPhase()
        {
            LOGGER.trace("Engine.performPlanningPhase() start");

            environment.incrementRound();

            var firstAgent = environment.firstAgent();
            var secondAgent = environment.secondAgent();

            // TODO: can planning be done in parallel?
            firstAgent.getPlanningAction(environment, adjudicator, that.setPlanningAction);
            secondAgent.getPlanningAction(environment, adjudicator, that.setPlanningAction);

            // Wait for agents to respond.
        }

        function processActivationQueue()
        {
            LOGGER.trace("Engine.processActivationQueue() start");

            if (activationQueue.length == 0)
            {
                firstPlanningAction = undefined;
                secondPlanningAction = undefined;

                environment.activeToken(undefined);
                LOGGER.trace("Engine.processActivationQueue() done");
                environment.phase(Phase.ACTIVATION_END);
                return;
            }

            var token = activationQueue.shift();

            if (token)
            {
                environment.activeToken(token);
                var agent = token.agent();
                var maneuver = token.team() == environment.firstTeam() ? firstPlanningAction.getManeuver(token)
                        : secondPlanningAction.getManeuver(token);

                if (maneuver)
                {
                    var fromPosition = environment.getPositionFor(token);

                    if (fromPosition)
                    {
                        var shipBase = token.shipBase();
                        var maneuverAction = new ManeuverAction(environment, maneuver, fromPosition, shipBase);
                        maneuverAction.doIt();

                        if (adjudicator.canSelectShipAction(token))
                        {
                            agent.getShipAction(environment, adjudicator, token, that.setShipAction);

                            // Wait for agent to respond.
                        }
                        else
                        {
                            // Proceed.
                            setTimeout(processActivationQueue, 1000);
                        }
                    }
                }
            }

            LOGGER.trace("Engine.processActivationQueue() end");
        }

        function processCombatQueue()
        {
            LOGGER.trace("Engine.processCombatQueue() start");

            if (combatQueue.length == 0)
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
                    agent.chooseWeaponAndDefender(environment, adjudicator, attacker, that.setWeaponAndDefender);

                    // Wait for agent to respond.
                }
                else
                {
                    // Proceed.
                    setTimeout(processCombatQueue, 1000);
                }
            }

            LOGGER.trace("Engine.processCombatQueue() end");
        }

        function processEndQueue()
        {
            LOGGER.trace("Engine.processEndQueue() start");

            if (endQueue.length == 0)
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
            }

            setTimeout(processEndQueue, 100);
            LOGGER.trace("Engine.processEndQueue() end");
        }

        function processGameOver()
        {
            var winner = adjudicator.determineWinner(environment);

            that.trigger(Engine.WINNER_EVENT, winner);

            return winner;
        }
    };

    Engine.WINNER_EVENT = "winner";

    MicroEvent.mixin(Engine);

    return Engine;
});
