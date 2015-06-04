/*
 * Provides a simple implementation of a computer agent for Starfighter Squadrons.
 */
function SimpleAgent(name, team, squadBuilder)
{
    InputValidator.validateNotEmpty("name", name);
    InputValidator.validateNotNull("team", team);
    InputValidator.validateNotNull("squadBuilder", squadBuilder);

    this.buildSquad = function()
    {
        return squadBuilder.buildSquad(this);
    }

    this.chooseWeaponAndDefender = function(environment, adjudicator, attacker,
            callback)
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

            for (var i = 0; i < Range.values.length; i++)
            {
                var range = Range.values[i];
                var rangeDefenders = environment.getTargetableDefendersAtRange(
                        attacker, attackerPosition, myWeapon, range);

                if (rangeDefenders.length > 0)
                {
                    var myDefender = ArrayUtilities
                            .randomElement(rangeDefenders);

                    if (myDefender)
                    {
                        var defenderPosition = environment
                                .getPositionFor(defender);

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

    this.getName = function()
    {
        return name;
    }

    this.getSquadBuilder = function()
    {
        return squadBuilder;
    }

    this.getTeam = function()
    {
        return team;
    }

    /*
     * @param environment Environment. @param adjudicator Adjudicator.
     * 
     * @return a new action.
     */
    this.getPlanningAction = function(environment, adjudicator, callback)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("callback", callback);

        var tokens = environment.getTokensForTeam(team);
        var tokenToManeuver = {};

        for (i = 0; i < tokens.length; i++)
        {
            var token = tokens[i];
            var fromPosition = environment.getPositionFor(token);
            var shipBase = token.getShipBase();
            var maneuvers = token.getManeuvers();

            // Find a maneuver which keeps the ship on the battlefield.
            var maneuver;
            ArrayUtilities.shuffle(maneuvers);

            for (var j = 0; j < maneuvers.length; j++)
            {
                var candidate = ArrayUtilities.randomElement(maneuvers);
                var toPosition = Maneuver.computeToPosition(candidate,
                        fromPosition, shipBase);
                if (toPosition)
                {
                    if (Position.isInPlayArea(toPosition.getX(), toPosition
                            .getY()))
                    {
                        LOGGER.trace("toPosition = " + toPosition + " for "
                                + token);
                        maneuver = candidate;
                        break;
                    }
                }
            }

            LOGGER.trace("0 maneuver = " + maneuver + " for " + token);

            if (!maneuver)
            {
                maneuver = ArrayUtilities.randomElement(maneuvers);
                LOGGER.trace("1 maneuver = " + maneuver + " for " + token);
            }

            if (maneuver)
            {
                tokenToManeuver[token] = maneuver;
            }
        }

        var answer = new PlanningAction(environment, this, tokenToManeuver);

        callback(answer);
    }

    this.getModifyAttackDiceAction = function(environment, adjudicator,
            attacker, attackDice, defender)
    {
    // FIXME
    }

    this.getModifyDefenseDiceAction = function(environment, adjudicator,
            attacker, attackDice, defender, defenseDice)
    {
    // FIXME
    }
}

SimpleAgent.prototype.getShipAction = function(environment, adjudicator, token,
        callback)
{
    InputValidator.validateNotNull("environment", environment);
    InputValidator.validateNotNull("adjudicator", adjudicator);
    InputValidator.validateNotNull("token", token);

    var shipActions = token.getShipActions();
    var answer;

    if (shipActions.length > 0)
    {
        answer = ArrayUtilities.randomElement(shipActions);
    }

    callback(answer);
}

SimpleAgent.prototype.toString = function()
{
    return this.getName() + ", SimpleAgent, " + this.getTeam() + ", "
            + this.getSquadBuilder().getName();
}
