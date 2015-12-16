/*
 * Provides a damage dealer for Starfighter Squadrons.
 */
define([ "DamageCard", "UpgradeCard" ], function(DamageCard, UpgradeCard)
{
    function DamageDealer(environment, hitCount, criticalHitCount, defender, evadeCount)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("hitCount", hitCount);
        InputValidator.validateNotNull("criticalHitCount", criticalHitCount);
        InputValidator.validateNotNull("defender", defender);
        InputValidator.validateNotNull("evadeCount", evadeCount);

        var hits = hitCount;
        var criticalHits = criticalHitCount;
        var evades = evadeCount;
        LOGGER.debug("hits = " + hits);
        LOGGER.debug("criticalHits = " + criticalHits);
        LOGGER.debug("evades = " + evades);

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

        LOGGER.debug("final hits = " + hits);
        LOGGER.debug("final criticalHits = " + criticalHits);
        LOGGER.debug("final evades = " + evades);
        LOGGER.debug("before hits, shield = " + defender.getShieldCount());

        this.getHits = function()
        {
            return hits;
        }

        this.getCriticalHits = function()
        {
            return criticalHits;
        }

        this.getRemainingEvades = function()
        {
            return evades;
        }

        this.dealDamage = function()
        {
            if (defender.getShieldCount() > 0)
            {
                var count = Math.min(hits, defender.getShieldCount());
                hits -= count;

                for (var i = 0; i < count; i++)
                {
                    defender.decreaseShieldCount();
                }
            }

            LOGGER.debug("before critical hits, shield         = " + defender.getShieldCount());

            if (defender.getShieldCount() > 0)
            {
                var count = Math.min(criticalHits, defender.getShieldCount());
                criticalHits -= count;

                for (var i = 0; i < count; i++)
                {
                    defender.decreaseShieldCount();
                }
            }

            LOGGER.debug("after both hits, shield              = " + defender.getShieldCount());
            LOGGER.debug("before hits, damage                  = " + defender.getDamageCount());

            for (var i = 0; i < hits; i++)
            {
                defender.addDamage(environment.drawDamage());
            }

            LOGGER.debug("after hits, damage                   = " + defender.getDamageCount());
            LOGGER.debug("before critical hits, criticalDamage = " + defender.getCriticalDamageCount());

            for (var i = 0; i < criticalHits; i++)
            {
                var damage = environment.drawDamage();
                var trait = DamageCard.properties[damage].trait;

                if (defender.isUpgradedWith(UpgradeCard.DETERMINATION) && (trait === DamageCard.Trait.PILOT))
                {
                    environment.discardDamage(damage);
                }
                else
                {
                    defender.addCriticalDamage(damage);
                    var dealEffect = DamageCard.properties[damage].dealEffect;

                    if (dealEffect)
                    {
                        dealEffect(environment, defender);
                    }
                }
            }

            LOGGER.debug("after critical hits, criticalDamage  = " + defender.getCriticalDamageCount());
            LOGGER.debug("defender.isDestroyed() ? " + defender.isDestroyed());
        }
    }

    return DamageDealer;
});
