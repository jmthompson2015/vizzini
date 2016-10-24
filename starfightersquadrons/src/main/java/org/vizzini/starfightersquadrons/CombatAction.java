package org.vizzini.starfightersquadrons;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.vizzini.core.InputValidator;
import org.vizzini.core.game.Action;
import org.vizzini.starfightersquadrons.DamageCard.Trait;
import org.vizzini.starfightersquadrons.RangeRuler.Range;

/**
 * Provides a combat action for Starfighter Squadrons.
 */
public final class CombatAction implements Action
{
    /**
     * Provides a damage dealer for Starfighter Squadrons.
     */
    public static final class DamageDealer
    {
        /** Attacker critical hit count. */
        private final int criticalHitCount;

        /** Defender token. */
        private final SSToken defender;

        /** Environment. */
        private final SSEnvironment environment;

        /** Defender evade count. */
        private final int evadeCount;

        /** Attacker hit count. */
        private final int hitCount;

        /**
         * Construct this object.
         *
         * @param environment Environment.
         * @param hitCount Attacker hit count.
         * @param criticalHitCount Attacker critical hit count.
         * @param defender Defender token.
         * @param evadeCount Defender evade count.
         */
        @SuppressWarnings("hiding")
        public DamageDealer(final SSEnvironment environment, final int hitCount, final int criticalHitCount,
                final SSToken defender, final int evadeCount)
        {
            InputValidator.validateNotNull("environment", environment);

            this.environment = environment;
            this.hitCount = hitCount;
            this.criticalHitCount = criticalHitCount;
            this.defender = defender;
            this.evadeCount = evadeCount;
        }

        /**
         * Deal damage.
         */
        @SuppressWarnings("synthetic-access")
        public void dealDamage()
        {
            int hits = hitCount;
            int criticalHits = criticalHitCount;

            LOGGER.debug("hits         = " + hits);
            LOGGER.debug("criticalHits = " + criticalHits);

            int evades = evadeCount;

            LOGGER.debug("evades       = " + evades);

            if (hits > 0)
            {
                final int count = Math.min(hits, evades);
                hits -= count;
                evades -= count;
            }

            if (criticalHits > 0)
            {
                final int count = Math.min(criticalHits, evades);
                criticalHits -= count;
                evades -= count;
            }

            LOGGER.debug("final hits         = " + hits);
            LOGGER.debug("final criticalHits = " + criticalHits);
            LOGGER.debug("final evades       = " + evades);
            LOGGER.debug("before hits, shield                  = " + defender.getShieldCount());

            if (defender.getShieldCount() > 0)
            {
                final int count = Math.min(hits, defender.getShieldCount());
                hits -= count;

                for (int i = 0; i < count; i++)
                {
                    defender.decreaseShieldCount();
                }
            }

            LOGGER.debug("before critical hits, shield         = " + defender.getShieldCount());

            if (defender.getShieldCount() > 0)
            {
                final int count = Math.min(criticalHits, defender.getShieldCount());
                criticalHits -= count;

                for (int i = 0; i < count; i++)
                {
                    defender.decreaseShieldCount();
                }
            }

            LOGGER.debug("after both hits, shield              = " + defender.getShieldCount());
            LOGGER.debug("before hits, damage                  = " + defender.getDamageCount());

            for (int i = 0; i < hits; i++)
            {
                defender.addDamage(environment.drawDamage());
            }

            LOGGER.debug("after hits, damage                   = " + defender.getDamageCount());
            LOGGER.debug("before critical hits, criticalDamage = " + defender.getCriticalDamageCount());

            for (int i = 0; i < criticalHits; i++)
            {
                final DamageCard damage = environment.drawDamage();

                if (defender.isUpgradedWith(UpgradeCard.DETERMINATION) && (damage.getTrait() == Trait.PILOT))
                {
                    environment.discardDamage(damage);
                }
                else if (defender.getPilot() == Pilot.CHEWBACCA)
                {
                    defender.addDamage(damage);
                }
                else
                {
                    damage.dealEffect(environment, defender);
                }
            }

            LOGGER.debug("after critical hits, criticalDamage  = " + defender.getCriticalDamageCount());
            LOGGER.debug("defender.isDestroyed() ? " + defender.isDestroyed());
        }
    }

    /** Logger. */
    private static final Logger LOGGER = LogManager.getLogger();

    /** Adjudicator. */
    private final SSAdjudicator adjudicator;

    /** Attacker. */
    private final SSToken attacker;

    /** Defender. */
    private final SSToken defender;

    /** Environment. */
    private final SSEnvironment environment;

    /** Range ruler. */
    private final RangeRuler rangeRuler = new RangeRuler();

    /** Weapon. */
    private final Weapon weapon;

    /**
     * Construct this object.
     *
     * @param environment Environment.
     * @param adjudicator Adjudicator.
     * @param attacker Attacking token.
     * @param weapon Weapon.
     * @param defender Defending token.
     */
    @SuppressWarnings("hiding")
    public CombatAction(final SSEnvironment environment, final SSAdjudicator adjudicator,
            final SSToken attacker, final Weapon weapon, final SSToken defender)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("weapon", weapon);
        InputValidator.validateNotNull("defender", defender);

        this.environment = environment;
        this.adjudicator = adjudicator;
        this.attacker = attacker;
        this.weapon = weapon;
        this.defender = defender;
    }

    @Override
    public boolean doIt()
    {
        attacker.setWeapon(weapon);

        final SSPosition attackerPosition = environment.getPositionFor(attacker);
        final SSPosition defenderPosition = environment.getPositionFor(defender);
        final Range range = rangeRuler.getRange(attacker, attackerPosition, defender, defenderPosition);
        LOGGER.trace("range = " + range);
        attacker.setRange(range);

        if (range != null)
        {
            LOGGER.trace("attacker = " + attacker);
            LOGGER.trace("defender = " + defender);
            attacker.setCombatAction(this);

            // Roll attack dice.
            final int attackDiceCount = attacker.computeAttackDiceCount(environment, weapon, range);
            final AttackDice attackDice = new AttackDice(attackDiceCount);
            attacker.setAttackDice(attackDice);
            environment.setPhase(Phase.COMBAT_ROLL_ATTACK_DICE);

            // Modify attack dice.
            final SSAgent agent = getAgent();
            ModifyAttackDiceAction attackAction = agent.getModifyAttackDiceAction(environment, adjudicator, attacker,
                    attackDice, defender);

            while (attackAction != null)
            {
                attackAction.doIt();
                attackAction = agent
                        .getModifyAttackDiceAction(environment, adjudicator, attacker, attackDice, defender);
            }

            environment.setPhase(Phase.COMBAT_MODIFY_ATTACK_DICE);
            LOGGER.trace("attackDice  = " + attackDice);

            // Roll defense dice.
            final int defenderDiceCount = defender.computeDefenseDiceCount(weapon, range);
            final DefenseDice defenseDice = new DefenseDice(defenderDiceCount);
            attacker.setDefenseDice(defenseDice);
            environment.setPhase(Phase.COMBAT_ROLL_DEFENSE_DICE);

            // Modify defense dice.
            final SSAgent defenderAgent = defender.getAgent();
            ModifyDefenseDiceAction defenseAction = defenderAgent.getModifyDefenseDiceAction(environment, adjudicator,
                    attacker, attackDice, defender, defenseDice);

            while (defenseAction != null)
            {
                defenseAction.doIt();
                defenseAction = defenderAgent.getModifyDefenseDiceAction(environment, adjudicator, attacker,
                        attackDice, defender, defenseDice);
            }

            environment.setPhase(Phase.COMBAT_MODIFY_DEFENSE_DICE);
            LOGGER.trace("defenseDice = " + defenseDice);

            // Compare results.
            // Deal damage.
            final int beforeDamage = defender.getDamageCount() + defender.getCriticalDamageCount();
            LOGGER.trace("beforeDamage = " + beforeDamage);
            final DamageDealer damageDealer = new DamageDealer(environment, attackDice.getHitCount(),
                    attackDice.getCriticalHitCount(), defender, defenseDice.getEvadeCount());
            damageDealer.dealDamage();
            final int afterDamage = defender.getDamageCount() + defender.getCriticalDamageCount();
            LOGGER.trace("afterDamage = " + afterDamage);
            final boolean isDefenderHit = afterDamage > beforeDamage;
            attacker.setDefenderHit(isDefenderHit);
            environment.setPhase(Phase.COMBAT_DEAL_DAMAGE);

            if (defender.isDestroyed())
            {
                final ShipDestroyedAction shipDestroyedAction = new ShipDestroyedAction(environment, defender,
                        defenderPosition);
                shipDestroyedAction.doIt();
            }
        }

        return false;
    }

    /**
     * @return the adjudicator
     */
    public SSAdjudicator getAdjudicator()
    {
        return adjudicator;
    }

    @Override
    public SSAgent getAgent()
    {
        return attacker.getAgent();
    }

    /**
     * @return the attacker
     */
    public SSToken getAttacker()
    {
        return attacker;
    }

    /**
     * @return the defender
     */
    public SSToken getDefender()
    {
        return defender;
    }

    @Override
    public SSEnvironment getEnvironment()
    {
        return environment;
    }

    /**
     * @return the weapon
     */
    public Weapon getWeapon()
    {
        return weapon;
    }

    @Override
    public String toString()
    {
        final ToStringBuilder builder = new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE);

        builder.append("attacker", attacker);
        builder.append("defender", defender);

        return builder.toString();
    }

    @Override
    public boolean undoIt()
    {
        throw new RuntimeException("method not used");
    }
}
