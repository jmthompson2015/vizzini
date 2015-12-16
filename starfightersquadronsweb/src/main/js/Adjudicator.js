define(function()
{
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

            var firstAgent = environment.getFirstAgent();
            var firstCount = environment.getTokenCountFor(firstAgent.getTeam());
            var secondAgent = environment.getSecondAgent();
            var secondCount = environment.getTokenCountFor(secondAgent.getTeam());

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

            var firstAgent = environment.getFirstAgent();
            var firstCount = environment.getTokenCountFor(firstAgent.getTeam());

            answer = (firstCount == 0);

            if (!answer)
            {
                var secondAgent = environment.getSecondAgent();
                var secondCount = environment.getTokenCountFor(secondAgent.getTeam());
                answer = (secondCount == 0);
            }

            return answer;
        }
    }

    return Adjudicator;
});
