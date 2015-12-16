/*
 * Provides a simple implementation of a computer agent for Starfighter Squadrons.
 */
define([ "Maneuver", "ModifyAttackDiceAction", "ModifyDefenseDiceAction", "PlanningAction", "Position", "Range",
        "ShipBase", "Weapon" ], function(Maneuver, ModifyAttackDiceAction, ModifyDefenseDiceAction, PlanningAction,
        Position, Range, ShipBase, Weapon)
{
    function SimpleAgent(name, team, squadBuilder)
    {
        InputValidator.validateNotEmpty("name", name);
        InputValidator.validateNotNull("team", team);
        InputValidator.validateNotNull("squadBuilder", squadBuilder);

        this.getName = function()
        {
            return name;
        }

        this.getTeam = function()
        {
            return team;
        }

        this.getSquadBuilder = function()
        {
            return squadBuilder;
        }
    }

    SimpleAgent.prototype.buildSquad = function()
    {
        return this.getSquadBuilder().buildSquad(this);
    }

    SimpleAgent.prototype.chooseWeaponAndDefender = function(environment, adjudicator, attacker, callback)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("callback", callback);

        var weapon;
        var defender;

        var attackerPosition = environment.getPositionFor(attacker);

        if (attackerPosition)
        {
            var myWeapon = attacker.getPrimaryWeapon();
            var values = Range.values();

            for (var i = 0; i < values.length; i++)
            {
                var range = values[i];
                var rangeDefenders = environment.getTargetableDefendersAtRange(attacker, attackerPosition, myWeapon,
                        range);
                LOGGER.trace("range = " + range + " rangeDefenders.length = " + rangeDefenders.length);

                if (rangeDefenders.length > 0)
                {
                    var myDefender = rangeDefenders.vizziniRandomElement();

                    if (myDefender)
                    {
                        var defenderPosition = environment.getPositionFor(myDefender);

                        if (defenderPosition)
                        {
                            weapon = myWeapon;
                            defender = myDefender;
                            break;
                        }
                    }
                }
            }
        }

        callback(weapon, defender);
    }

    SimpleAgent.prototype.getModifyAttackDiceAction = function(environment, adjudicator, attacker, attackDice,
            defender, callback)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackDice", attackDice);
        InputValidator.validateNotNull("defender", defender);
        InputValidator.validateNotNull("callback", callback);

        var modifications = [ null ];

        // TODO: implement Target Lock

        if (attacker.getFocusCount() > 0)
        {
            modifications.push(ModifyAttackDiceAction.Modification.SPEND_FOCUS);
        }

        var modification = modifications.vizziniRandomElement();
        var answer;

        if (modification)
        {
            answer = new ModifyAttackDiceAction(environment, attacker, attackDice, modification);
        }

        callback(answer);
    }

    SimpleAgent.prototype.getModifyDefenseDiceAction = function(environment, adjudicator, attacker, attackDice,
            defender, defenseDice, callback)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackDice", attackDice);
        InputValidator.validateNotNull("defender", defender);
        InputValidator.validateNotNull("defenseDice", defenseDice);
        InputValidator.validateNotNull("callback", callback);

        var modifications = [ null ];

        if (defender.getEvadeCount() > 0)
        {
            modifications.push(ModifyDefenseDiceAction.Modification.SPEND_EVADE);
        }

        if (defender.getFocusCount() > 0)
        {
            modifications.push(ModifyDefenseDiceAction.Modification.SPEND_FOCUS);
        }

        var modification = modifications.vizziniRandomElement();
        var answer;

        if (modification)
        {
            answer = new ModifyDefenseDiceAction(environment, defender, defenseDice, modification);
        }

        callback(answer);
    }

    /*
     * @param environment Environment.
     * 
     * @param adjudicator Adjudicator.
     * 
     * @return a new action.
     */
    SimpleAgent.prototype.getPlanningAction = function(environment, adjudicator, callback)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("callback", callback);

        var team = this.getTeam();
        var tokens = environment.getTokensForTeam(team);
        var tokenToManeuver = {};

        tokens.forEach(function(token)
        {
            var fromPosition = environment.getPositionFor(token);
            var shipBase = token.getShipBase();
            var maneuvers = token.getManeuvers();
            LOGGER.trace("maneuvers.length = " + maneuvers.length + " for " + token);

            // Find the maneuvers which keep the ship on the battlefield.
            var validManeuvers = maneuvers.filter(function(maneuver)
            {
                var toPosition = Maneuver.computeToPosition(maneuver, fromPosition, shipBase);

                return (toPosition && Position.isPathInPlayArea(ShipBase.computePolygon(shipBase, toPosition.getX(),
                        toPosition.getY(), toPosition.getHeading())));
            });

            LOGGER.trace("validManeuvers.length = " + validManeuvers.length + " for " + token);
            var maneuver = validManeuvers.vizziniRandomElement();

            LOGGER.trace("0 maneuver = " + maneuver + " for " + token);

            if (!maneuver)
            {
                // Ship fled the battlefield.
                maneuver = maneuvers.vizziniRandomElement();
                LOGGER.trace("1 maneuver = " + maneuver + " for " + token);
            }

            tokenToManeuver[token] = maneuver;
        });

        var answer = new PlanningAction(environment, this, tokenToManeuver);

        callback(answer);
    }

    SimpleAgent.prototype.getShipAction = function(environment, adjudicator, token, callback)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("token", token);

        var shipActions = token.getShipActions();
        var answer;

        if (shipActions.length > 0)
        {
            answer = shipActions.vizziniRandomElement();
        }

        callback(answer);
    }

    SimpleAgent.prototype.toString = function()
    {
        return this.getName() + ", SimpleAgent, " + this.getTeam() + ", " + this.getSquadBuilder().getName();
    }

    return SimpleAgent;
});
