define([ "DamageCard", "UpgradeCard" ], function(DamageCard, UpgradeCard)
{
    "use strict";
    function DamageDealer(environment, hitCount, criticalHitCount, defender, evadeCount)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("hitCount", hitCount);
        InputValidator.validateNotNull("criticalHitCount", criticalHitCount);
        InputValidator.validateNotNull("defender", defender);
        InputValidator.validateNotNull("evadeCount", evadeCount);

        this.environment = function()
        {
            return environment;
        };

        this.hitCount = function()
        {
            return hitCount;
        };

        this.criticalHitCount = function()
        {
            return criticalHitCount;
        };

        this.defender = function()
        {
            return defender;
        };

        this.evadeCount = function()
        {
            return evadeCount;
        };

        var hits = hitCount;
        var criticalHits = criticalHitCount;
        var evades = evadeCount;
        LOGGER.debug("hits = " + hits);
        LOGGER.debug("criticalHits = " + criticalHits);
        LOGGER.debug("evades = " + evades);
        var count;

        if (hits > 0)
        {
            count = Math.min(hits, evades);
            hits -= count;
            evades -= count;
        }

        if (criticalHits > 0)
        {
            count = Math.min(criticalHits, evades);
            criticalHits -= count;
            evades -= count;
        }

        LOGGER.debug("final hits = " + hits);
        LOGGER.debug("final criticalHits = " + criticalHits);
        LOGGER.debug("final evades = " + evades);
        LOGGER.debug("before hits, shield = " + defender.shield().count());

        this.criticalHits = function()
        {
            return criticalHits;
        };

        this.dealDamage = function()
        {
            var count, i;

            if (defender.shield().count() > 0)
            {
                count = Math.min(hits, defender.shield().count());
                hits -= count;

                for (i = 0; i < count; i++)
                {
                    defender.shield().decrease();
                }
            }

            LOGGER.debug("before critical hits, shield         = " + defender.shield().count());

            if (defender.shield().count() > 0)
            {
                count = Math.min(criticalHits, defender.shield().count());
                criticalHits -= count;

                for (i = 0; i < count; i++)
                {
                    defender.shield().decrease();
                }
            }

            LOGGER.debug("after both hits, shield              = " + defender.shield().count());
            LOGGER.debug("before hits, damage                  = " + defender.damageCount());

            for (i = 0; i < hits; i++)
            {
                defender.addDamage(environment.drawDamage());
            }

            LOGGER.debug("after hits, damage                   = " + defender.damageCount());
            LOGGER.debug("before critical hits, criticalDamage = " + defender.criticalDamageCount());

            for (i = 0; i < criticalHits; i++)
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

            LOGGER.debug("after critical hits, criticalDamage  = " + defender.criticalDamageCount());
            LOGGER.debug("defender.isDestroyed() ? " + defender.isDestroyed());
        };

        this.hits = function()
        {
            return hits;
        };

        this.remainingEvades = function()
        {
            return evades;
        };
    }

    return DamageDealer;
});
