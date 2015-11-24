// require("AttackDice");
// require("DamageDealer");
// require("DefenseDice");
// require("Logger");
// require("Phase");
// require("RangeRuler");
// require("ShipDestroyedAction");

/*
 * Provides a combat action for Starfighter Squadrons.
 */
function CombatAction(environment, adjudicator, attacker, attackerPosition, weapon, defender, defenderPosition)
{
    var rangeRuler = new RangeRuler();

    this.doIt = function()
    {
        attacker.setWeapon(weapon);

        var attackerPosition = environment.getPositionFor(attacker);
        LOGGER.trace("attackerPosition = " + attackerPosition);
        var defenderPosition = environment.getPositionFor(defender);
        LOGGER.trace("defenderPosition = " + defenderPosition);
        var range = rangeRuler.getRange(attacker, attackerPosition, defender, defenderPosition);
        LOGGER.trace("range = " + range);
        attacker.setRange(range);

        if (range)
        {
            LOGGER.trace("attacker = " + attacker);
            LOGGER.trace("defender = " + defender);
            attacker.setCombatAction(this);

            // Roll attack dice.
            var attackDiceCount = attacker.computeAttackDiceCount(environment, weapon, range);
            var attackDice = new AttackDice(attackDiceCount);
            attacker.setAttackDice(attackDice);
            environment.setPhase(Phase.COMBAT_ROLL_ATTACK_DICE);

            // Modify attack dice.
            var agent = attacker.getAgent();
            var attackAction = agent
                    .getModifyAttackDiceAction(environment, adjudicator, attacker, attackDice, defender);

            while (attackAction)
            {
                attackAction.doIt();
                attackAction = agent
                        .getModifyAttackDiceAction(environment, adjudicator, attacker, attackDice, defender);
            }

            environment.setPhase(Phase.COMBAT_MODIFY_ATTACK_DICE);
            LOGGER.trace("attackDice  = " + attackDice);

            // Roll defense dice.
            var defenderDiceCount = defender.computeDefenseDiceCount(weapon, range);
            var defenseDice = new DefenseDice(defenderDiceCount);
            attacker.setDefenseDice(defenseDice);
            environment.setPhase(Phase.COMBAT_ROLL_DEFENSE_DICE);

            // Modify defense dice.
            var defenderAgent = defender.getAgent();
            var defenseAction = defenderAgent.getModifyDefenseDiceAction(environment, adjudicator, attacker,
                    attackDice, defender, defenseDice);

            while (defenseAction)
            {
                defenseAction.doIt();
                defenseAction = defenderAgent.getModifyDefenseDiceAction(environment, adjudicator, attacker,
                        attackDice, defender, defenseDice);
            }

            environment.setPhase(Phase.COMBAT_MODIFY_DEFENSE_DICE);
            LOGGER.trace("defenseDice = " + defenseDice);

            // Compare results.
            // Deal damage.
            var beforeDamage = defender.getDamageCount() + defender.getCriticalDamageCount();
            LOGGER.trace("beforeDamage = " + beforeDamage);
            var damageDealer = new DamageDealer(environment, attackDice.getHitCount(),
                    attackDice.getCriticalHitCount(), defender, defenseDice.getEvadeCount());
            damageDealer.dealDamage();
            var afterDamage = defender.getDamageCount() + defender.getCriticalDamageCount();
            LOGGER.trace("afterDamage = " + afterDamage);
            var isDefenderHit = afterDamage > beforeDamage;
            attacker.setDefenderHit(isDefenderHit);
            environment.setPhase(Phase.COMBAT_DEAL_DAMAGE);

            if (defender.isDestroyed())
            {
                var shipDestroyedAction = new ShipDestroyedAction(environment, defender, defenderPosition);
                shipDestroyedAction.doIt();
            }
        }

        // return false;
    }

    this.getAttacker = function()
    {
        return attacker;
    }

    this.getAttackerPosition = function()
    {
        return attackerPosition;
    }

    this.getDefender = function()
    {
        return defender;
    }

    this.getDefenderPosition = function()
    {
        return defenderPosition;
    }

    this.getEnvironment = function()
    {
        return environment;
    }

    this.getWeapon = function()
    {
        return weapon;
    }
}
