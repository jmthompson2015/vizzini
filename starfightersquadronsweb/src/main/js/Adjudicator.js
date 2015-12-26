define([ "Maneuver", "RectanglePath" ], function(Maneuver, RectanglePath)
{
    function Adjudicator()
    {
        this.canAttack = function(attacker)
        {
            InputValidator.validateNotNull("attacker", attacker);

            // A cloaked ship cannot attack.
            return !attacker.isCloaked();
        }

        this.canBarrelRoll = function(environment, attacker, maneuver)
        {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("attacker", attacker);
            InputValidator.validateNotNull("maneuver", maneuver);

            // A ship cannot barrel roll if this would cause its base to overlap with another ship's base or an obstacle
            // token.
            var answer = false;
            var fromPosition = environment.getPositionFor(attacker);

            if (fromPosition)
            {
                var shipBase = attacker.shipBase();
                var toPolygon = Maneuver.computeToPolygon(maneuver, fromPosition, shipBase);

                if (toPolygon)
                {
                    var tokens = environment.tokens();
                    answer = true;

                    for (var i = 0; i < tokens.length; i++)
                    {
                        var token = tokens[i];

                        if (token !== attacker)
                        {
                            var myShipBase = token.shipBase();
                            var position = environment.getPositionFor(token);
                            var polygon = Maneuver.computePolygon(myShipBase, position.x(), position.y(), position
                                    .heading());
                            var collide = RectanglePath.doPolygonsCollide(polygon, toPolygon);

                            if (collide)
                            {
                                answer = false;
                                break;
                            }
                        }
                    }
                }
            }

            return answer;
        }

        this.canBoost = function(environment, attacker, maneuver)
        {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("attacker", attacker);
            InputValidator.validateNotNull("maneuver", maneuver);

            // A ship cannot boost if this would cause its base to overlap with another ship's base or an obstacle
            // token, or if the maneuver template overlaps an obstacle token.

            // FIXME: implement Adjudicator.canBoost()
            return this.canBarrelRoll(environment, attacker, maneuver);
        }

        this.canSelectShipAction = function(attacker)
        {
            InputValidator.validateNotNull("attacker", attacker);

            // Cannot select a ship action if the ship is stressed, or
            // if the ship is touching another ship.
            return !attacker.isStressed() && !attacker.activationState().isTouching();
        }

        this.determineWinner = function(environment)
        {
            var answer;

            var firstAgent = environment.firstAgent();
            var firstCount = environment.getTokenCountFor(firstAgent.team());
            var secondAgent = environment.secondAgent();
            var secondCount = environment.getTokenCountFor(secondAgent.team());

            if (firstCount == 0)
            {
                answer = secondAgent;
            }
            else if (secondCount == 0)
            {
                answer = firstAgent;
            }

            return answer;
        }

        this.isGameOver = function(environment)
        {
            var answer = false;

            var firstAgent = environment.firstAgent();
            var firstCount = environment.getTokenCountFor(firstAgent.team());

            answer = (firstCount == 0);

            if (!answer)
            {
                var secondAgent = environment.secondAgent();
                var secondCount = environment.getTokenCountFor(secondAgent.team());
                answer = (secondCount == 0);
            }

            return answer;
        }
    }

    return Adjudicator;
});
