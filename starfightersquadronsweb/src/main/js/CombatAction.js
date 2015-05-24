/*
 * Provides a ship destroyed action for Starfighter Squadrons.
 */
function ShipDestroyedAction(environment, token, fromPosition)
{
    this.doIt = function()
    {
        LOGGER.trace("ShipDestroyedAction.doIt() start");

        // var attackerTargetLock = token.getAttackerTargetLock();
        //
        // if (attackerTargetLock != null)
        // {
        // TargetLock.freeInstance(attackerTargetLock);
        // }
        //
        // var defenderTargetLocks = new
        // ArrayList<TargetLock>(token.getDefenderTargetLocks());
        //
        // for (final TargetLock defenderTargetLock : defenderTargetLocks)
        // {
        // TargetLock.freeInstance(defenderTargetLock);
        // }

        // Return the damage cards.
        environment.discardAllDamage(token.getDamages());
        environment.discardAllDamage(token.getCriticalDamages());

        environment.removeToken(fromPosition);
        environment.fireShipDestroyed(this);

        // return true;

        LOGGER.trace("ShipDestroyedAction.doIt() end");
    }

    this.getEnvironment = function()
    {
        return environment;
    }

    this.getFromPosition = function()
    {
        return fromPosition;
    }

    this.getToken = function()
    {
        return token;
    }
}

/*
 * Provides a damage dealer for Starfighter Squadrons.
 */
function DamageDealer(environment, hitCount, criticalHitCount, defender,
        evadeCount)
{
    this.dealDamage = function()
    {
        var hits = hitCount;
        var criticalHits = criticalHitCount;

        LOGGER.debug("hits         = " + hits);
        LOGGER.debug("criticalHits = " + criticalHits);

        var evades = evadeCount;

        LOGGER.debug("evades       = " + evades);

        if (hits > 0)
        {
            var count = Math.min(hits, evades);
            hits -= count;
            evades -= count;
        }

        if (criticalHits > 0)
        {
            var count = Math.min(criticalHits, evades);
            criticalHits -= count;
            evades -= count;
        }

        LOGGER.debug("final hits         = " + hits);
        LOGGER.debug("final criticalHits = " + criticalHits);
        LOGGER.debug("final evades       = " + evades);
        LOGGER.debug("before hits, shield                  = "
                + defender.getShieldCount());

        if (defender.getShieldCount() > 0)
        {
            var count = Math.min(hits, defender.getShieldCount());
            hits -= count;

            for (var i = 0; i < count; i++)
            {
                defender.decreaseShieldCount();
            }
        }

        LOGGER.debug("before critical hits, shield         = "
                + defender.getShieldCount());

        if (defender.getShieldCount() > 0)
        {
            var count = Math.min(criticalHits, defender.getShieldCount());
            criticalHits -= count;

            for (var i = 0; i < count; i++)
            {
                defender.decreaseShieldCount();
            }
        }

        LOGGER.debug("after both hits, shield              = "
                + defender.getShieldCount());
        LOGGER.debug("before hits, damage                  = "
                + defender.getDamageCount());

        for (var i = 0; i < hits; i++)
        {
            defender.addDamage(environment.drawDamage());
        }

        LOGGER.debug("after hits, damage                   = "
                + defender.getDamageCount());
        LOGGER.debug("before critical hits, criticalDamage = "
                + defender.getCriticalDamageCount());

        for (var i = 0; i < criticalHits; i++)
        {
            var damage = environment.drawDamage();

            // if (defender.isUpgradedWith(UpgradeCard.DETERMINATION)
            // && (damage.getTrait() == Trait.PILOT))
            // {
            // environment.discardDamage(damage);
            // }
            // else if (defender.getPilot() == Pilot.CHEWBACCA)
            // {
            // defender.addDamage(damage);
            // }
            // else
            // {
            // damage.dealEffect(environment, defender);
            defender.addCriticalDamage(damage);
            var dealEffect = DamageCard.properties[damage].dealEffect;

            if (dealEffect)
            {
                dealEffect(environment, defender);
            }
            // }
        }

        LOGGER.debug("after critical hits, criticalDamage  = "
                + defender.getCriticalDamageCount());
        LOGGER.debug("defender.isDestroyed() ? " + defender.isDestroyed());
    }
}

/*
 * Provides a combat action for Starfighter Squadrons.
 */
function CombatAction(environment, adjudicator, attacker, attackerPosition,
        weapon, defender, defenderPosition)
{
    var rangeRuler = new RangeRuler();

    this.doIt = function()
    {
        attacker.setWeapon(weapon);

        var attackerPosition = environment.getPositionFor(attacker);
        LOGGER.trace("attackerPosition = " + attackerPosition);
        var defenderPosition = environment.getPositionFor(defender);
        LOGGER.trace("defenderPosition = " + defenderPosition);
        var range = rangeRuler.getRange(attacker, attackerPosition, defender,
                defenderPosition);
        LOGGER.trace("range = " + range);
        attacker.setRange(range);

        if (range)
        {
            LOGGER.trace("attacker = " + attacker);
            LOGGER.trace("defender = " + defender);
            attacker.setCombatAction(this);

            // Roll attack dice.
            var attackDiceCount = attacker.computeAttackDiceCount(environment,
                    weapon, range);
            var attackDice = new AttackDice(attackDiceCount);
            attacker.setAttackDice(attackDice);
            environment.setPhase(Phase.COMBAT_ROLL_ATTACK_DICE);

            // Modify attack dice.
            var agent = attacker.getAgent();
            var attackAction = agent.getModifyAttackDiceAction(environment,
                    adjudicator, attacker, attackDice, defender);

            while (attackAction)
            {
                attackAction.doIt();
                attackAction = agent.getModifyAttackDiceAction(environment,
                        adjudicator, attacker, attackDice, defender);
            }

            environment.setPhase(Phase.COMBAT_MODIFY_ATTACK_DICE);
            LOGGER.trace("attackDice  = " + attackDice);

            // Roll defense dice.
            var defenderDiceCount = defender.computeDefenseDiceCount(weapon,
                    range);
            var defenseDice = new DefenseDice(defenderDiceCount);
            attacker.setDefenseDice(defenseDice);
            environment.setPhase(Phase.COMBAT_ROLL_DEFENSE_DICE);

            // Modify defense dice.
            var defenderAgent = defender.getAgent();
            var defenseAction = defenderAgent.getModifyDefenseDiceAction(
                    environment, adjudicator, attacker, attackDice, defender,
                    defenseDice);

            while (defenseAction)
            {
                defenseAction.doIt();
                defenseAction = defenderAgent.getModifyDefenseDiceAction(
                        environment, adjudicator, attacker, attackDice,
                        defender, defenseDice);
            }

            environment.setPhase(Phase.COMBAT_MODIFY_DEFENSE_DICE);
            LOGGER.trace("defenseDice = " + defenseDice);

            // Compare results.
            // Deal damage.
            var beforeDamage = defender.getDamageCount()
                    + defender.getCriticalDamageCount();
            LOGGER.trace("beforeDamage = " + beforeDamage);
            var damageDealer = new DamageDealer(environment, attackDice
                    .getHitCount(), attackDice.getCriticalHitCount(), defender,
                    defenseDice.getEvadeCount());
            damageDealer.dealDamage();
            var afterDamage = defender.getDamageCount()
                    + defender.getCriticalDamageCount();
            LOGGER.trace("afterDamage = " + afterDamage);
            var isDefenderHit = afterDamage > beforeDamage;
            attacker.setDefenderHit(isDefenderHit);
            environment.setPhase(Phase.COMBAT_DEAL_DAMAGE);

            if (defender.isDestroyed())
            {
                var shipDestroyedAction = new ShipDestroyedAction(environment,
                        defender, defenderPosition);
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
