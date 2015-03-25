/*
 * Provides an engine for Starfighter Squadrons.
 */
function Engine(environment, adjudicator)
{
    InputValidator.validateNotNull("environment", environment);
    InputValidator.validateNotNull("adjudicator", adjudicator);

    var that = this;
    var winnerListeners = [];
    var imperialPlanningAction;
    var rebelPlanningAction;

    var activationQueue = [];
    var combatQueue = [];
    var endQueue = [];

    environment.addPhaseListener(this);

    this.addWinnerListener = function(listener)
    {
        winnerListeners[winnerListeners.length] = listener;
    }

    this.getEnvironment = function()
    {
        return environment;
    }

    this.phaseChange = function(source, oldValue, newValue)
    {
        if (adjudicator.isGameOver(environment))
        {
            LOGGER.debug("adjudicator.isGameOver() ? "
                    + adjudicator.isGameOver(environment));
            processGameOver();
        }
        else
        {
            var phase = newValue;
            var delay = 1000;

            switch (phase)
            {
            case Phase.PLANNING_START:
                performPlanningPhase();
                break;
            case Phase.PLANNING_END:
                setTimeout(function()
                {
                    environment.setPhase(Phase.ACTIVATION_START);
                }, delay);
                break;
            case Phase.ACTIVATION_START:
                performActivationPhase();
                break;
            case Phase.ACTIVATION_END:
                setTimeout(function()
                {
                    environment.setPhase(Phase.COMBAT_START);
                }, delay);
                break;
            case Phase.COMBAT_START:
                performCombatPhase();
                break;
            case Phase.COMBAT_END:
                setTimeout(function()
                {
                    environment.setPhase(Phase.END_START);
                }, delay);
                break;
            case Phase.END_START:
                performEndPhase();
                break;
            case Phase.END_END:
                setTimeout(function()
                {
                    environment.setPhase(Phase.PLANNING_START);
                }, delay);
                break;
            }
        }
    }

    this.setPlanningAction = function(planningAction)
    {
        var team = planningAction.getTeam();

        if (team === Team.IMPERIAL)
        {
            imperialPlanningAction = planningAction;
            LOGGER.trace("imperialPlanningAction = " + imperialPlanningAction);
        }
        else if (team === Team.REBEL)
        {
            rebelPlanningAction = planningAction;
            LOGGER.trace("rebelPlanningAction = " + rebelPlanningAction);
        }
        else
        {
            LOGGER.error("planningAction team = " + team);
        }

        if (imperialPlanningAction && rebelPlanningAction)
        {
            LOGGER.trace("Engine.performPlanningPhase() end");
            environment.setPhase(Phase.PLANNING_END);
        }
    }

    this.setWeaponAndDefender = function(weaponAndDefender)
    {
        var delay = 0;

        if (weaponAndDefender)
        {
            LOGGER.debug("weaponAndDefender = " + weaponAndDefender);
            var attacker = environment.getActiveToken();
            var attackerPosition = environment.getPositionFor(attacker);
            var weapon = weaponAndDefender.weapon;
            attacker.setWeapon(weapon);
            var defender = weaponAndDefender.defender;

            if (defender)
            {
                attacker.setDefender(defender);
                environment.setPhase(Phase.COMBAT_DECLARE_TARGET);
                var defenderPosition = environment.getPositionFor(defender);

                var combatAction = new CombatAction(environment, adjudicator,
                        attacker, attackerPosition, weapon, defender,
                        defenderPosition);
                LOGGER.trace("combatAction = " + combatAction);
                combatAction.doIt();
                delay = 1000;
            }
        }

        setTimeout(processCombatQueue, delay);
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

        var imperialAgent = environment.getImperialAgent();
        var rebelAgent = environment.getRebelAgent();

        // TODO: can planning be done in parallel?
        imperialAgent.getPlanningAction(environment, adjudicator,
                that.setPlanningAction);
        rebelAgent.getPlanningAction(environment, adjudicator,
                that.setPlanningAction);

        // Wait for agents to respond.
    }

    function processActivationQueue()
    {
        LOGGER.trace("Engine.processActivationQueue() start");

        if (activationQueue.length == 0)
        {
            imperialPlanningAction = undefined;
            rebelPlanningAction = undefined;

            environment.setActiveToken(undefined);
            LOGGER.trace("Engine.processActivationQueue() done");
            environment.setPhase(Phase.ACTIVATION_END);
            return;
        }

        var token = activationQueue.shift();

        if (token)
        {
            environment.setActiveToken(token);
            var agent = token.getAgent();
            var maneuver = token.getTeam() == Team.IMPERIAL ? imperialPlanningAction
                    .getManeuver(token)
                    : rebelPlanningAction.getManeuver(token);

            if (maneuver)
            {
                var fromPosition = environment.getPositionFor(token);

                if (fromPosition)
                {
                    var shipBase = token.getShipBase();
                    var maneuverAction = new ManeuverAction(environment,
                            maneuver, fromPosition, shipBase);
                    maneuverAction.doIt();

                    if (adjudicator.canSelectShipAction(token))
                    {
                        var shipAction = agent.getShipAction(environment,
                                adjudicator, token);
                        var shipActionAction;

                        if (shipActionAction != null)
                        {
                            LOGGER.debug("shipActionAction = "
                                    + shipActionAction);
                            shipActionAction.doIt();
                        }
                    }
                }
            }
        }

        setTimeout(processActivationQueue, 1000);

        LOGGER.trace("Engine.processActivationQueue() end");
    }

    function processCombatQueue()
    {
        LOGGER.trace("Engine.processCombatQueue() start");

        if (combatQueue.length == 0)
        {
            environment.setActiveToken(undefined);
            LOGGER.trace("Engine.processCombatQueue() done");
            environment.setPhase(Phase.COMBAT_END);
            return;
        }

        var attacker = combatQueue.shift();

        if (attacker)
        {
            environment.setActiveToken(attacker);

            if (adjudicator.canAttack(attacker))
            {
                // Perform combat steps.
                LOGGER.debug("attacker = " + attacker.getName());

                // Declare target.
                var agent = attacker.getAgent();
                agent.chooseWeaponAndDefender(environment, adjudicator,
                        attacker, that.setWeaponAndDefender);

                // Wait for agent to respond.
            }
        }

        LOGGER.trace("Engine.processCombatQueue() end");
    }

    function processEndQueue()
    {
        LOGGER.trace("Engine.processEndQueue() start");

        if (endQueue.length == 0)
        {
            environment.setActiveToken(undefined);
            LOGGER.trace("Engine.processEndQueue() done");
            environment.setPhase(Phase.END_END);
            return;
        }

        var token = endQueue.shift();

        if (token)
        {
            environment.setActiveToken(token);

            // Perform end steps.
            // LOGGER.info("End: " + token.getName());

            token.clearEvadeCount();

            // if (!token.isUpgradedWith(UpgradeCard.MOLDY_CROW))
            // {
            token.clearFocusCount();
            // }
        }

        setTimeout(processEndQueue, 100);
        LOGGER.trace("Engine.processEndQueue() end");
    }

    function fireWinnerChange(winner)
    {
        for (var i = 0; i < winnerListeners.length; i++)
        {
            winnerListeners[i].winnerChange(that, winner);
        }
    }

    /*
     * @return the game winner, if any.
     */
    function processGameOver()
    {
        var winner = adjudicator.determineWinner(environment);

        fireWinnerChange(winner);

        return winner;
    }
};
