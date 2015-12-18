/*
 * Provides a medium implementation of a computer agent for Starfighter Squadrons.
 */
define([ "Maneuver", "PlanningAction", "Position", "RangeRuler", "ShipBase", "SimpleAgent" ], function(Maneuver,
        PlanningAction, Position, RangeRuler, ShipBase, SimpleAgent)
{
    function MediumAgent(name, team, squadBuilder)
    {
        InputValidator.validateNotEmpty("name", name);
        InputValidator.validateNotNull("team", team);
        InputValidator.validateNotNull("squadBuilder", squadBuilder);

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
    }

    MediumAgent.prototype = Object.create(SimpleAgent.prototype);

    /*
     * @param environment Environment.
     * 
     * @param adjudicator Adjudicator.
     * 
     * @return a new action.
     */
    MediumAgent.prototype.getPlanningAction = function(environment, adjudicator, callback)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("callback", callback);

        var team = this.getTeam();
        var tokens = environment.getTokensForTeam(team);
        var defenders = environment.getDefenders(team);
        var tokenToManeuver = {};

        tokens.forEach(function(token)
        {
            var fromPosition = environment.getPositionFor(token);
            var shipBase = token.getShipBase();
            var maneuvers = token.getManeuvers();
            LOGGER.trace("maneuvers.length = " + maneuvers.length + " for " + token);

            // Find the maneuvers which keep the ship on the battlefield.
            var validManeuvers = [];
            var closestManeuver;
            var minDistance;

            // Find the maneuvers which take the ship within range of a defender.
            var validManeuversR1 = [];
            var validManeuversR2 = [];
            var validManeuversR3 = [];

            maneuvers.forEach(function(maneuver)
            {
                var toPosition = Maneuver.computeToPosition(maneuver, fromPosition, shipBase);

                if (toPosition
                        && Position.isPathInPlayArea(Maneuver.computePolygon(shipBase, toPosition.getX(), toPosition
                                .getY(), toPosition.getHeading())))
                {
                    validManeuvers.push(maneuver);
                    var weapon = token.getPrimaryWeapon();

                    for (var i = 0; i < defenders.length; i++)
                    {
                        var defender = defenders[i];
                        var defenderPosition = environment.getPositionFor(defender);

                        // Save the maneuver which has the minimum distance.
                        var distance = toPosition.computeDistance(defenderPosition);
                        
                        if (!minDistance || distance < minDistance)
                        {
                            closestManeuver = maneuver;
                            minDistance = distance;
                        }

                        if (weapon.isDefenderTargetable(token, toPosition, defender, defenderPosition))
                        {
                            var range = RangeRuler.getRange(token, toPosition, defender, defenderPosition);

                            if (range === Range.ONE)
                            {
                                validManeuversR1.push(maneuver);
                            }
                            else if (range === Range.TWO)
                            {
                                validManeuversR2.push(maneuver);
                            }
                            else if (range === Range.THREE)
                            {
                                validManeuversR3.push(maneuver);
                            }
                        }
                    }
                }
            });

            LOGGER.trace("validManeuversR1.length = " + validManeuversR1.length + " for " + token);

            var maneuver = validManeuversR1.vizziniRandomElement();

            if (!maneuver)
            {
                LOGGER.trace("validManeuversR2.length = " + validManeuversR2.length + " for " + token);
                maneuver = validManeuversR2.vizziniRandomElement();
            }

            if (!maneuver)
            {
                LOGGER.trace("validManeuversR3.length = " + validManeuversR3.length + " for " + token);
                maneuver = validManeuversR3.vizziniRandomElement();
            }

            if (!maneuver && closestManeuver)
            {
                LOGGER.trace("closestManeuver = " + closestManeuver + " for " + token);
                maneuver = closestManeuver;
            }

            if (!maneuver)
            {
                LOGGER.trace("validManeuvers.length = " + validManeuvers.length + " for " + token);
                maneuver = validManeuvers.vizziniRandomElement();
            }

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

    MediumAgent.prototype.toString = function()
    {
        return this.getName() + ", MediumAgent, " + this.getTeam() + ", " + this.getSquadBuilder().getName();
    }

    return MediumAgent;
});
