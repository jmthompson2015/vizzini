package org.vizzini.starfightersquadrons;

import java.util.HashSet;
import java.util.Set;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.vizzini.core.InputValidator;

/**
 * Provides an enumeration of ship actions for Starfighter Squadrons.
 */
public class ShipAction implements Comparable<ShipAction>
{
    /**
     * Provides a ship action for a damage card.
     */
    public static class DamageCardShipAction extends ShipAction
    {
        /** Damage card. */
        private final DamageCard damage;

        /**
         * Construct this object.
         *
         * @param damage Damage card.
         */
        @SuppressWarnings({ "synthetic-access", "hiding" })
        public DamageCardShipAction(final DamageCard damage)
        {
            super("Critical Damage: " + damage.getName());

            this.damage = damage;
        }

        @Override
        public void doAction(final SSEnvironment environment, final SSToken attacker, final SSToken defender,
                final ManeuverAction maneuverAction)
        {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("attacker", attacker);
            super.doAction(environment, attacker, defender, maneuverAction);
            damage.doAction(environment, attacker);
        }

        /**
         * @return the damage
         */
        public DamageCard getDamage()
        {
            return damage;
        }
    }

    /**
     * Provides a ship action for an upgrade card.
     */
    public static class UpgradeCardShipAction extends ShipAction
    {
        /** Upgrade card. */
        private final UpgradeCard upgrade;

        /**
         * Construct this object.
         *
         * @param upgrade Upgrade card.
         */
        @SuppressWarnings({ "synthetic-access", "hiding" })
        public UpgradeCardShipAction(final UpgradeCard upgrade)
        {
            super("Upgrade: " + upgrade.getName());

            this.upgrade = upgrade;
        }

        @Override
        public void doAction(final SSEnvironment environment, final SSToken attacker, final SSToken defender,
                final ManeuverAction maneuverAction)
        {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("attacker", attacker);
            super.doAction(environment, attacker, defender, maneuverAction);
            upgrade.doAction(environment, attacker);
        }

        /**
         * @return the upgrade
         */
        public UpgradeCard getUpgrade()
        {
            return upgrade;
        }
    }

    /**
     * @param shipActions Ship actions.
     *
     * @return a new set.
     */
    private static Set<ShipAction> createSet(final ShipAction... shipActions)
    {
        final Set<ShipAction> answer = new HashSet<ShipAction>();

        for (final ShipAction shipAction : shipActions)
        {
            answer.add(shipAction);
        }

        return answer;
    }

    /** Ship action. */
    @SuppressWarnings("synthetic-access")
    public static final ShipAction BARREL_ROLL = new ShipAction("Barrel Roll")
    {
        @Override
        public void doAction(final SSEnvironment environment, final SSToken attacker, final SSToken defender,
                final ManeuverAction maneuverAction)
        {
            InputValidator.validateNotNull("maneuverAction", maneuverAction);
            super.doAction(environment, attacker, defender, maneuverAction);
            maneuverAction.doIt();
            attacker.setManeuverAction(maneuverAction);
        }
    };

    /** Ship action. */
    @SuppressWarnings("synthetic-access")
    public static final ShipAction BOOST = new ShipAction("Boost")
    {
        @Override
        public void doAction(final SSEnvironment environment, final SSToken attacker, final SSToken defender,
                final ManeuverAction maneuverAction)
        {
            InputValidator.validateNotNull("maneuverAction", maneuverAction);
            super.doAction(environment, attacker, defender, maneuverAction);
            maneuverAction.doIt();
            attacker.setManeuverAction(maneuverAction);
        }
    };

    /** Ship action. */
    @SuppressWarnings("synthetic-access")
    public static final ShipAction CLOAK = new ShipAction("Cloak")
    {
        @Override
        public void doAction(final SSEnvironment environment, final SSToken attacker, final SSToken defender,
                final ManeuverAction maneuverAction)
        {
            InputValidator.validateNotNull("attacker", attacker);
            super.doAction(environment, attacker, defender, maneuverAction);
            attacker.increaseCloakCount();
        }
    };

    /** Ship action. */
    @SuppressWarnings("synthetic-access")
    public static final ShipAction EVADE = new ShipAction("Evade")
    {
        @Override
        public void doAction(final SSEnvironment environment, final SSToken attacker, final SSToken defender,
                final ManeuverAction maneuverAction)
        {
            InputValidator.validateNotNull("attacker", attacker);
            super.doAction(environment, attacker, defender, maneuverAction);
            attacker.increaseEvadeCount();
        }
    };

    /** Ship action. */
    @SuppressWarnings("synthetic-access")
    public static final ShipAction FOCUS = new ShipAction("Focus")
    {
        @Override
        public void doAction(final SSEnvironment environment, final SSToken attacker, final SSToken defender,
                final ManeuverAction maneuverAction)
        {
            InputValidator.validateNotNull("attacker", attacker);
            super.doAction(environment, attacker, defender, maneuverAction);
            attacker.increaseFocusCount();
        }
    };

    /** Ship action. */
    @SuppressWarnings("synthetic-access")
    public static final ShipAction TARGET_LOCK = new ShipAction("Target Lock")
    {
        @Override
        public void doAction(final SSEnvironment environment, final SSToken attacker, final SSToken defender,
                final ManeuverAction maneuverAction)
        {
            InputValidator.validateNotNull("attacker", attacker);
            InputValidator.validateNotNull("defender", defender);
            super.doAction(environment, attacker, defender, maneuverAction);
            TargetLock.getInstance(attacker, defender);
        }
    };

    /** Ship actions. */
    public static final Set<ShipAction> A_WING_ACTIONS = createSet(FOCUS, TARGET_LOCK, BOOST, EVADE);

    /** Ship actions. */
    public static final Set<ShipAction> B_WING_ACTIONS = createSet(FOCUS, TARGET_LOCK, BARREL_ROLL);

    /** Ship actions. */
    public static final Set<ShipAction> E_WING_ACTIONS = createSet(FOCUS, TARGET_LOCK, BARREL_ROLL, EVADE);

    /** Ship actions. */
    public static final Set<ShipAction> FIRESPRAY_31_ACTIONS = createSet(FOCUS, TARGET_LOCK, EVADE);

    /** Ship actions. */
    public static final Set<ShipAction> HWK_290_ACTIONS = createSet(FOCUS, TARGET_LOCK);

    /** Ship actions. */
    public static final Set<ShipAction> LAMBDA_CLASS_SHUTTLE_ACTIONS = createSet(FOCUS, TARGET_LOCK);

    /** Ship actions. */
    public static final Set<ShipAction> TIE_ADVANCED_ACTIONS = createSet(FOCUS, TARGET_LOCK, BARREL_ROLL, EVADE);

    /** Ship actions. */
    public static final Set<ShipAction> TIE_BOMBER_ACTIONS = createSet(FOCUS, TARGET_LOCK, BARREL_ROLL);

    /** Ship actions. */
    public static final Set<ShipAction> TIE_DEFENDER_ACTIONS = createSet(FOCUS, TARGET_LOCK, BARREL_ROLL);

    /** Ship actions. */
    public static final Set<ShipAction> TIE_FIGHTER_ACTIONS = createSet(FOCUS, BARREL_ROLL, EVADE);

    /** Ship actions. */
    public static final Set<ShipAction> TIE_INTERCEPTOR_ACTIONS = createSet(FOCUS, BARREL_ROLL, BOOST, EVADE);

    /** Ship actions. */
    public static final Set<ShipAction> TIE_PHANTOM_ACTIONS = createSet(FOCUS, BARREL_ROLL, EVADE, CLOAK);

    /** Ship actions. */
    public static final Set<ShipAction> X_WING_ACTIONS = createSet(FOCUS, TARGET_LOCK);

    /** Ship actions. */
    public static final Set<ShipAction> Y_WING_ACTIONS = createSet(FOCUS, TARGET_LOCK);

    /** Ship actions. */
    public static final Set<ShipAction> YT_1300_ACTIONS = createSet(FOCUS, TARGET_LOCK);

    /** Ship actions. */
    public static final Set<ShipAction> Z_95_HEADHUNTER_ACTIONS = createSet(FOCUS, TARGET_LOCK);

    /** Logger. */
    private static final Logger LOGGER = LogManager.getLogger();

    /** Name. */
    private final String name;

    /**
     * Construct this object.
     *
     * @param name Name.
     */
    @SuppressWarnings("hiding")
    private ShipAction(final String name)
    {
        InputValidator.validateNotEmpty("name", name);

        this.name = name;
    }

    @Override
    public int compareTo(final ShipAction another)
    {
        return name.compareTo(another.name);
    }

    /**
     * @param environment Environment.
     * @param attacker Attacker.
     * @param defender Defender.
     * @param maneuverAction Maneuver action.
     */
    public void doAction(final SSEnvironment environment, final SSToken attacker, final SSToken defender,
            final ManeuverAction maneuverAction)
    {
        LOGGER.trace(getName() + ".doAction()");
    }

    /**
     * @return the name
     */
    public String getName()
    {
        return name;
    }

    @Override
    public String toString()
    {
        return name;
    }
}
