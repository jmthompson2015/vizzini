package org.vizzini.starfightersquadrons;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.vizzini.core.InputValidator;
import org.vizzini.starfightersquadrons.Maneuver.Difficulty;
import org.vizzini.starfightersquadrons.RangeRuler.Range;

/**
 * Provides an enumeration of damage cards.
 */
public class DamageCard implements GameStepReactor, ShipState
{
    /**
     * Provides an enumeration of traits.
     */
    public enum Trait
    {
        /** Trait. */
        PILOT,
        /** Trait. */
        SHIP;
    }

    /**
     * Effect implemented elsewhere.
     * 
     * @see SSToken#computeAttackDiceCount(SSEnvironment, Weapon, Range)
     */
    public static final DamageCard BLINDED_PILOT = new DamageCard("Blinded Pilot", Trait.PILOT,
            "The next time you attack, do not roll any attack dice. Then flip this card facedown.");

    /** Damage card. */
    @SuppressWarnings("synthetic-access")
    public static final DamageCard CONSOLE_FIRE = new DamageCard("Console Fire", Trait.SHIP,
            "At the start of each Combat phase, roll 1 attack die. On a hit result, suffer 1 damage.",
            ImmutableShipState.ZERO, true, "Flip this card facedown.", ImmutableShipState.ZERO)
    {
        @Override
        public void doAction(final SSEnvironment environment, final SSToken defender)
        {
            super.doAction(environment, defender);
            flipThisCardFacedown(environment, defender);
        }

        @Override
        public void phaseEffect(final SSEnvironment environment, final SSToken token, final Phase phase)
        {
            super.phaseEffect(environment, token, phase);
            if (phase == Phase.COMBAT_START)
            {
                addDamageUponHitRoll(environment, token);
            }
        }
    };

    /**
     * Effect implemented elsewhere.
     * 
     * @see SSToken#getPilotSkillValue()
     */
    public static final DamageCard DAMAGED_COCKPIT = new DamageCard("Damaged Cockpit", Trait.PILOT,
            "After the round in which you receive this card, treat your pilot skill value as \"0.\"");

    /**
     * Effect implemented elsewhere.
     * 
     * @see SSToken#getManeuvers()
     */
    public static final DamageCard DAMAGED_ENGINE = new DamageCard("Damaged Engine", Trait.SHIP,
            "Treat all turn maneuvers (left turn or right turn) as red maneuvers.");

    /** Damage card. */
    @SuppressWarnings("synthetic-access")
    public static final DamageCard DAMAGED_SENSOR_ARRAY = new DamageCard("Damaged Sensor Array", Trait.SHIP,
            "You cannot perform the actions listed in your action bar.", ImmutableShipState.ZERO, true,
            "Roll 1 attack die. On a hit result, flip this card facedown.", ImmutableShipState.ZERO)
    {
        @Override
        public void doAction(final SSEnvironment environment, final SSToken defender)
        {
            super.doAction(environment, defender);
            flipFacedownUponHitRoll(environment, defender);
        }
    };

    /**
     * Effect implemented elsewhere.
     * 
     * @see SSToken#getHullValue()
     */
    public static final DamageCard DIRECT_HIT = new DamageCard("Direct Hit!", Trait.SHIP,
            "This card counts as 2 damage against your hull.", new ImmutableShipState(0, 0, 0, -1, 0), false, null,
            null);

    /**
     * Effect implemented elsewhere.
     * 
     * @see SSToken#getPilotSkillValue()
     */
    public static final DamageCard INJURED_PILOT = new DamageCard("Injured Pilot", Trait.PILOT,
            "All players must ignore your pilot ability and all of your Elite Upgrade cards.");

    /** Damage card. */
    @SuppressWarnings("synthetic-access")
    public static final DamageCard MINOR_EXPLOSION = new DamageCard("Minor Explosion", Trait.SHIP,
            "Immediately roll 1 attack die. On a hit result, suffer 1 damage. Then flip this card facedown.")
    {
        @Override
        public void dealEffect(final SSEnvironment environment, final SSToken defender)
        {
            super.dealEffect(environment, defender);
            addDamageUponHitRoll(environment, defender);
            flipThisCardFacedown(environment, defender);
        }
    };

    /** Damage card. */
    @SuppressWarnings("synthetic-access")
    public static final DamageCard MINOR_HULL_BREACH = new DamageCard("Minor Hull Breach", Trait.SHIP,
            "After executing a red maneuver, roll 1 attack die. On a hit result, suffer 1 damage.")
    {
        @Override
        public void phaseEffect(final SSEnvironment environment, final SSToken token, final Phase phase)
        {
            super.phaseEffect(environment, token, phase);
            if ((phase == Phase.ACTIVATION_EXECUTE_MANEUVER) && (token == environment.getActiveToken()))
            {
                final ManeuverAction maneuverAction = token.getManeuverAction();
                if (maneuverAction != null)
                {
                    final Maneuver maneuver = maneuverAction.getManeuver();
                    if (maneuver.getDifficulty() == Difficulty.HARD)
                    {
                        addDamageUponHitRoll(environment, token);
                    }
                }
            }
        }
    };

    /** Damage card. */
    @SuppressWarnings("synthetic-access")
    public static final DamageCard MUNITIONS_FAILURE = new DamageCard("Munitions Failure", Trait.SHIP,
            "Immediately choose 1 of your secondary weapon Upgrade cards and discard it. Then flip this Damage card facedown.")
    {
        @Override
        public void dealEffect(final SSEnvironment environment, final SSToken defender)
        {
            super.dealEffect(environment, defender);
            final UpgradeCardList secondaryWeapons = defender.getSecondaryWeaponUpgrades();
            if (!secondaryWeapons.isEmpty())
            {
                UpgradeCard upgrade = null;
                if (secondaryWeapons.size() == 1)
                {
                    upgrade = secondaryWeapons.get(0);
                }
                else
                {
                    int minCost = Integer.MAX_VALUE;
                    for (final UpgradeCard u : secondaryWeapons)
                    {
                        if (u.getSquadPointCost() < minCost)
                        {
                            minCost = u.getSquadPointCost();
                            upgrade = u;
                        }
                    }
                }
                defender.removeUpgrade(upgrade);
            }
            flipThisCardFacedown(environment, defender);
        }
    };

    /** Damage card. */
    @SuppressWarnings("synthetic-access")
    public static final DamageCard STRUCTURAL_DAMAGE = new DamageCard("Structural Damage", Trait.SHIP,
            "Reduce your agility value by 1 (to a minimum of \"0\").", new ImmutableShipState(0, 0, -1, 0, 0), true,
            "Roll 1 attack die. On a hit result, flip this card facedown.", ImmutableShipState.ZERO)
    {
        @Override
        public void doAction(final SSEnvironment environment, final SSToken defender)
        {
            super.doAction(environment, defender);
            flipFacedownUponHitRoll(environment, defender);
        }
    };

    /** Damage card. */
    @SuppressWarnings("synthetic-access")
    public static final DamageCard STUNNED_PILOT = new DamageCard("Stunned Pilot", Trait.PILOT,
            "After you execute a maneuver that causes you to overlap either another ship or an obstacle token, suffer 1 damage.")
    {
        // TODO: implement damage card
    };

    /** Damage card. */
    @SuppressWarnings("synthetic-access")
    public static final DamageCard THRUST_CONTROL_FIRE = new DamageCard("Thrust Control Fire", Trait.SHIP,
            "Immediately receive 1 stress token. Then flip this card facedown.")
    {
        @Override
        public void dealEffect(final SSEnvironment environment, final SSToken defender)
        {
            super.dealEffect(environment, defender);
            defender.increaseStressCount();
            flipThisCardFacedown(environment, defender);
        }
    };

    /**
     * Effect implemented elsewhere.
     * 
     * @see SSToken#getPrimaryWeaponValue()
     */
    public static final DamageCard WEAPON_MALFUNCTION = new DamageCard("Weapon Malfunction", Trait.SHIP,
            "Reduce your primary weapon value by 1 (to a minimum of \"0\").", new ImmutableShipState(0, -1, 0, 0, 0),
            true, "Roll 1 attack die. On a hit or critical hit result, flip this card facedown.",
            ImmutableShipState.ZERO);

    /** Logger. */
    private static final Logger LOGGER = LogManager.getLogger();

    /** Values. */
    private static List<DamageCard> VALUES;

    /**
     * @return a new deck of damage cards.
     */
    public static List<DamageCard> createDeck()
    {
        final List<DamageCard> answer = new ArrayList<DamageCard>();

        // There are two of each, except seven of Direct Hit!
        for (final DamageCard damage : values())
        {
            answer.add(damage);
            answer.add(damage);
        }

        for (int i = 0; i < 5; i++)
        {
            answer.add(DIRECT_HIT);
        }

        Collections.shuffle(answer);

        return answer;
    }

    /**
     * @return the values.
     */
    public static DamageCard[] values()
    {
        return VALUES.toArray(new DamageCard[VALUES.size()]);
    }

    /**
     * @param trait Trait.
     * 
     * @return damage cards with the given trait.
     */
    public static DamageCard[] valuesByTrait(final Trait trait)
    {
        final List<DamageCard> answer = new ArrayList<DamageCard>();

        for (final DamageCard damage : values())
        {
            if (damage.getTrait() == trait)
            {
                answer.add(damage);
            }
        }

        return answer.toArray(new DamageCard[answer.size()]);
    }

    /** Action description. */
    private final String actionDescription;

    /** Ship state delegate. */
    private final ShipState actionShipState;

    /** Description. */
    private final String description;

    /** Flag indicating this has an action. */
    private final boolean hasAction;

    /** Name. */
    private final String name;

    /** Ship state delegate. */
    private final ShipState shipState;

    /** Trait. */
    private final Trait trait;

    /**
     * Construct this object.
     * 
     * @param name Name.
     * @param trait Trait.
     * @param description Description.
     */
    @SuppressWarnings("hiding")
    private DamageCard(final String name, final Trait trait, final String description)
    {
        this(name, trait, description, ImmutableShipState.ZERO, false, null, null);
    }

    /**
     * Construct this object.
     * 
     * @param name Name.
     * @param trait Trait.
     * @param description Description.
     * @param shipState Ship state.
     * @param hasAction Flag indicating this has an action.
     * @param actionDescription Action description. (optional)
     * @param actionShipState Action ship state. (optional)
     */
    @SuppressWarnings("hiding")
    private DamageCard(final String name, final Trait trait, final String description, final ShipState shipState,
            final boolean hasAction, final String actionDescription, final ShipState actionShipState)
    {
        InputValidator.validateNotEmpty("name", name);
        InputValidator.validateNotNull("trait", trait);
        InputValidator.validateNotEmpty("description", description);
        InputValidator.validateNotNull("shipState", shipState);

        if (hasAction)
        {
            InputValidator.validateNotEmpty("actionDescription", actionDescription);
            InputValidator.validateNotNull("actionShipState", actionShipState);
        }

        this.name = name;
        this.trait = trait;
        this.description = description;
        this.shipState = shipState;
        this.hasAction = hasAction;
        this.actionDescription = actionDescription;
        this.actionShipState = actionShipState;

        if (VALUES == null)
        {
            VALUES = new ArrayList<DamageCard>();
        }

        VALUES.add(this);
    }

    /**
     * @param environment Environment.
     * @param token Token.
     */
    public void dealEffect(final SSEnvironment environment, final SSToken token)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("token", token);

        if (LOGGER.isTraceEnabled())
        {
            LOGGER.trace(getName());
        }

        token.addCriticalDamage(this);
    }

    /**
     * @param environment Environment.
     * @param token Token.
     */
    public void doAction(final SSEnvironment environment, final SSToken token)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("token", token);

        if (LOGGER.isTraceEnabled())
        {
            LOGGER.trace(getName());
        }
    }

    /**
     * @param environment Environment.
     * @param defender Defender.
     */
    public void flipThisCardFacedown(final SSEnvironment environment, final SSToken defender)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("defender", defender);

        // Flip this card facedown.
        defender.removeCriticalDamage(this);
        defender.addDamage(this);
    }

    /**
     * @return the actionDescription
     */
    public String getActionDescription()
    {
        return actionDescription;
    }

    /**
     * @return the actionShipState
     */
    public ShipState getActionShipState()
    {
        return actionShipState;
    }

    @Override
    public int getAgilityValue()
    {
        return shipState.getAgilityValue();
    }

    /**
     * @return the description
     */
    public String getDescription()
    {
        return description;
    }

    @Override
    public int getHullValue()
    {
        return shipState.getHullValue();
    }

    /**
     * @return the name
     */
    public String getName()
    {
        return name;
    }

    @Override
    public int getPilotSkillValue()
    {
        return shipState.getPilotSkillValue();
    }

    @Override
    public int getPrimaryWeaponValue()
    {
        return shipState.getPrimaryWeaponValue();
    }

    @Override
    public int getShieldValue()
    {
        return shipState.getShieldValue();
    }

    /**
     * @return the shipState
     */
    public ShipState getShipState()
    {
        return shipState;
    }

    /**
     * @return the trait
     */
    public Trait getTrait()
    {
        return trait;
    }

    @Override
    public boolean hasAction()
    {
        return hasAction;
    }

    @Override
    public void phaseEffect(final SSEnvironment environment, final SSToken token, final Phase phase)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("token", token);
        InputValidator.validateNotNull("phase", phase);

        if (LOGGER.isTraceEnabled())
        {
            LOGGER.trace(getName());
        }
    }

    @Override
    public String toString()
    {
        return getName();
    }

    /**
     * @param environment Environment.
     * @param defender Defender.
     */
    protected void addDamageUponHitRoll(final SSEnvironment environment, final SSToken defender)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("defender", defender);

        final AttackDice attackDice = new AttackDice(1);

        if (attackDice.getHitCount() == 1)
        {
            defender.addDamage(environment.drawDamage());
        }
    }

    /**
     * @param environment Environment.
     * @param defender Defender.
     */
    protected void flipFacedownUponHitOrCriticalHitRoll(final SSEnvironment environment, final SSToken defender)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("defender", defender);

        final AttackDice attackDice = new AttackDice(1);

        if ((attackDice.getHitCount() == 1) || (attackDice.getCriticalHitCount() == 1))
        {
            flipThisCardFacedown(environment, defender);
        }
    }

    /**
     * @param environment Environment.
     * @param defender Defender.
     */
    protected void flipFacedownUponHitRoll(final SSEnvironment environment, final SSToken defender)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("defender", defender);

        final AttackDice attackDice = new AttackDice(1);

        if (attackDice.getHitCount() == 1)
        {
            flipThisCardFacedown(environment, defender);
        }
    }
}
