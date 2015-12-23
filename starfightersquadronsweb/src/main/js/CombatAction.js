/*
 * Provides a combat action for Starfighter Squadrons.
 */
define([ "AttackDice", "DamageDealer", "DefenseDice", "Phase", "RangeRuler", "ShipDestroyedAction" ], function(
        AttackDice, DamageDealer, DefenseDice, Phase, RangeRuler, ShipDestroyedAction)
{
    function CombatAction(environment, adjudicator, attacker, attackerPosition, weapon, defender, defenderPosition,
            callback)
    {
        var attackDice;
        var defenseDice;
        var range;

        this.doIt = function()
        {
            attacker.setWeapon(weapon);

            var attackerPosition = environment.getPositionFor(attacker);
            LOGGER.trace("attackerPosition = " + attackerPosition);
            var defenderPosition = environment.getPositionFor(defender);
            LOGGER.trace("defenderPosition = " + defenderPosition);
            range = RangeRuler.getRange(attacker, attackerPosition, defender, defenderPosition);
            LOGGER.trace("range = " + range);
            attacker.setRange(range);

            if (range)
            {
                LOGGER.trace("attacker = " + attacker);
                LOGGER.trace("defender = " + defender);
                attacker.setCombatAction(this);

                // Roll attack dice.
                var attackDiceCount = attacker.computeAttackDiceCount(environment, weapon, range);
                attackDice = new AttackDice(attackDiceCount);
                attacker.setAttackDice(attackDice);
                environment.setPhase(Phase.COMBAT_ROLL_ATTACK_DICE);

                // Modify attack dice.
                var agent = attacker.getAgent();
                agent.getModifyAttackDiceAction(environment, adjudicator, attacker, attackDice, defender,
                        finishModifyAttackDice);
            }
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

        function finishModifyAttackDice(attackAction)
        {
            LOGGER.debug("attackAction = " + attackAction);

            if (attackAction)
            {
                attackAction.doIt();
            }

            environment.setPhase(Phase.COMBAT_MODIFY_ATTACK_DICE);
            LOGGER.trace("attackDice  = " + attackDice);

            // Roll defense dice.
            var defenderDiceCount = defender.computeDefenseDiceCount(weapon, range);
            defenseDice = new DefenseDice(defenderDiceCount);
            attacker.setDefenseDice(defenseDice);
            environment.setPhase(Phase.COMBAT_ROLL_DEFENSE_DICE);

            // Modify defense dice.
            var defenderAgent = defender.getAgent();
            defenderAgent.getModifyDefenseDiceAction(environment, adjudicator, attacker, attackDice, defender,
                    defenseDice, finishModifyDefenseDice);
        }

        function finishModifyDefenseDice(defenseAction)
        {
            LOGGER.debug("defenseAction = " + defenseAction);

            if (defenseAction)
            {
                defenseAction.doIt();
            }

            environment.setPhase(Phase.COMBAT_MODIFY_DEFENSE_DICE);
            LOGGER.trace("defenseDice = " + defenseDice);

            // Compare results.
            // Deal damage.
            var beforeDamage = defender.getDamageCount() + defender.getCriticalDamageCount();
            LOGGER.trace("beforeDamage = " + beforeDamage);
            var damageDealer = new DamageDealer(environment, attackDice.getHitCount(),
                    attackDice.getCriticalHitCount(), defender, defenseDice.getEvadeCount());

            var attackerAgent = attacker.getAgent();
            attackerAgent.dealDamage(environment, adjudicator, attacker, attackDice, defender, defenseDice,
                    damageDealer, function()
                    {
                        finishDealDamage(damageDealer, beforeDamage);
                    });

            var defenderAgent = defender.getAgent();
            defenderAgent.dealDamage(environment, adjudicator, attacker, attackDice, defender, defenseDice,
                    damageDealer, function()
                    {
                        finishDealDamage(damageDealer, beforeDamage);
                    });

            environment.setPhase(Phase.COMBAT_DEAL_DAMAGE);
        }

        function finishDealDamage(damageDealer, beforeDamage)
        {
            damageDealer.dealDamage();
            var afterDamage = defender.getDamageCount() + defender.getCriticalDamageCount();
            LOGGER.trace("afterDamage = " + afterDamage);
            var isDefenderHit = afterDamage > beforeDamage;
            attacker.setDefenderHit(isDefenderHit);

            if (defender.isDestroyed())
            {
                var shipDestroyedAction = new ShipDestroyedAction(environment, defender, defenderPosition);
                shipDestroyedAction.doIt();
                var delay = 1500;
                setTimeout(function()
                {
                    if (callback)
                    {
                        callback();
                    }
                }, delay);
            }
            else
            {
                if (callback)
                {
                    callback();
                }
            }
        }
    }

    return CombatAction;
});
