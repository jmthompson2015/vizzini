function Adjudicator()
{
    /*
     * @param attacker Attacker.
     * 
     * @return true if the attacker can attack.
     */
    this.canAttack = function(attacker)
    {
        // InputValidator.validateNotNull("attacker", attacker);

        // A cloaked ship cannot attack.
        return !attacker.isCloaked();
    }

    /*
     * @param attacker Attacker.
     * 
     * @return true if the attacker can select a ship action.
     */
    this.canSelectShipAction = function(attacker)
    {
        InputValidator.validateNotNull("attacker", attacker);

        // Cannot select a ship action if the ship is stressed, or
        // if the ship is touching another ship.
        return !attacker.isStressed() && !attacker.isTouching();
    }

    this.determineWinner = function(environment)
    {
        var answer;

        // final Environment xEnvironment = (Environment)environment;
        var imperialCount = environment.getTokenCountFor(Team.IMPERIAL);
        var rebelCount = environment.getTokenCountFor(Team.REBEL);
        // LOGGER.debug("imperialCount / rebelCount = " + imperialCount + " / "
        // + rebelCount);

        if (imperialCount == 0)
        {
            answer = environment.getRebelAgent();
        }
        else if (rebelCount == 0)
        {
            answer = environment.getImperialAgent();
        }

        return answer;
    }

    this.isGameOver = function(environment)
    {
        // return environment.getRound() > 11;
        var answer = false;

        // var xEnvironment = (Environment)environment;

        var imperialCount = environment.getTokenCountFor(Team.IMPERIAL);
        // LOGGER.debug("imperialCount = " + imperialCount);

        answer = (imperialCount == 0);

        if (!answer)
        {
            var rebelCount = environment.getTokenCountFor(Team.REBEL);
            // LOGGER.debug("rebelCount = " + rebelCount);
            answer = (rebelCount == 0);
        }

        return answer;
    }
}
