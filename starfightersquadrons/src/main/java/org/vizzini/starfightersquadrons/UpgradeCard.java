package org.vizzini.starfightersquadrons;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.vizzini.core.InputValidator;
import org.vizzini.starfightersquadrons.DamageCard.Trait;
import org.vizzini.starfightersquadrons.Maneuver.Difficulty;
import org.vizzini.starfightersquadrons.RangeRuler.Range;

/**
 * Provides a pseudo-enumeration of upgrade cards.
 */
public class UpgradeCard implements GameStepReactor, ShipState
{
    /**
     * Provides a secondary weapon upgrade card.
     */
    public static class SecondaryWeaponUpgradeCard extends UpgradeCard implements Weapon
    {
        /** Upgrade card. */
        @SuppressWarnings("synthetic-access")
        public static final UpgradeCard ADVANCED_PROTON_TORPEDOES = new SecondaryWeaponUpgradeCard(
                "Advanced Proton Torpedoes",
                UpgradeType.TORPEDO,
                UpgradeHeader.ATTACK_TARGET_LOCK,
                "Spend your target lock and discard this card to perform this attack. You may change up to 3 of your blank results to Focus results.",
                6, Wave.THREE, 5, Range.ONE)
        {
            @Override
            public void phaseEffect(final SSEnvironment environment, final SSToken attacker, final Phase phase)
            {
                if ((phase == Phase.COMBAT_ROLL_ATTACK_DICE) && (attacker.getWeapon() == this))
                {
                    final TargetLock targetLock = attacker.getAttackerTargetLock();
                    final SSToken defender = attacker.getDefender();
                    if ((targetLock != null) && (targetLock.getDefender() == defender))
                    {
                        super.phaseEffect(environment, attacker, phase);
                        final AttackDice attackDice = attacker.getAttackDice();
                        attackDice.changeFirstToValue(AttackDice.Value.BLANK, AttackDice.Value.FOCUS);
                        attackDice.changeFirstToValue(AttackDice.Value.BLANK, AttackDice.Value.FOCUS);
                        attackDice.changeFirstToValue(AttackDice.Value.BLANK, AttackDice.Value.FOCUS);
                        TargetLock.freeInstance(targetLock);
                        attacker.removeUpgrade(this);
                    }
                }
            }
        };

        /** Upgrade card. */
        public static final UpgradeCard ASSAULT_MISSILES = new SecondaryWeaponUpgradeCard(
                "Assault Missiles",
                UpgradeType.MISSILE,
                UpgradeHeader.ATTACK_TARGET_LOCK,
                "Spend your target lock and discard this card to perform this attack. If this attack hits, each other ship at Range 1 of the defender suffers 1 damage.",
                5, Wave.TWO, 4, Range.TWO, Range.THREE);

        /** Upgrade card. */
        public static final UpgradeCard AUTOBLASTER = new SecondaryWeaponUpgradeCard(
                "Autoblaster",
                UpgradeType.CANNON,
                UpgradeHeader.ATTACK,
                "Attack 1 ship. Your hit results cannot be canceled by defense dice. The token may cancel critical hit results before hit results.",
                5, Wave.THREE, 3, Range.ONE);

        /** Upgrade card. */
        public static final UpgradeCard BLASTER_TURRET = new SecondaryWeaponUpgradeCard("Blaster Turret",
                UpgradeType.TURRET, UpgradeHeader.ATTACK_FOCUS,
                "Spend 1 focus token to perform this attack against 1 ship (even a ship outside your firing arc).", 4,
                Wave.THREE, 3, Range.ONE, Range.TWO);

        /** Upgrade card. */
        public static final UpgradeCard CLUSTER_MISSILES = new SecondaryWeaponUpgradeCard("Cluster Missiles",
                UpgradeType.MISSILE, UpgradeHeader.ATTACK_TARGET_LOCK,
                "Spend your target lock and discard this card to perform this attack twice.", 4, Wave.ONE, 3,
                Range.ONE, Range.TWO);

        /** Upgrade card. */
        @SuppressWarnings("synthetic-access")
        public static final UpgradeCard CONCUSSION_MISSILES = new SecondaryWeaponUpgradeCard(
                "Concussion Missiles",
                UpgradeType.MISSILE,
                UpgradeHeader.ATTACK_TARGET_LOCK,
                "Spend your target lock and discard this card to perform this attack. You may change 1 of your blank results to a Hit result.",
                4, Wave.ONE, 4, Range.TWO, Range.THREE)
        {
            @Override
            public void phaseEffect(final SSEnvironment environment, final SSToken attacker, final Phase phase)
            {
                if ((phase == Phase.COMBAT_ROLL_ATTACK_DICE) && (attacker.getWeapon() == this))
                {
                    final TargetLock targetLock = attacker.getAttackerTargetLock();
                    final SSToken defender = attacker.getDefender();
                    if ((targetLock != null) && (targetLock.getDefender() == defender))
                    {
                        super.phaseEffect(environment, attacker, phase);
                        final AttackDice attackDice = attacker.getAttackDice();
                        attackDice.changeFirstToValue(AttackDice.Value.BLANK, AttackDice.Value.HIT);
                        TargetLock.freeInstance(targetLock);
                        attacker.removeUpgrade(this);
                    }
                }
            }
        };

        /** Upgrade card. */
        public static final UpgradeCard FLECHETTE_TORPEDOES = new SecondaryWeaponUpgradeCard(
                "Flechette Torpedoes",
                UpgradeType.TORPEDO,
                UpgradeHeader.ATTACK_TARGET_LOCK,
                "Discard this card and spend your target lock to perform this attack. After you perform this attack, the defender receives 1 stress token if its hull value is \"4\" or lower.",
                2, Wave.FOUR, 3, Range.TWO, Range.THREE);

        /** Upgrade card. */
        public static final UpgradeCard HEAVY_LASER_CANNON = new SecondaryWeaponUpgradeCard(
                "Heavy Laser Cannon",
                UpgradeType.CANNON,
                UpgradeHeader.ATTACK,
                "Attack 1 ship. Immediately after rolling your attack dice, you must change all of your critical hit results to hit results.",
                7, Wave.TWO, 4, Range.TWO, Range.THREE);

        /** Upgrade card. */
        public static final UpgradeCard HOMING_MISSILES = new SecondaryWeaponUpgradeCard("Homing Missiles",
                UpgradeType.MISSILE, UpgradeHeader.ATTACK_TARGET_LOCK,
                "Discard this card to perform this attack. The defender cannot spend evade tokens during this attack.",
                5, Wave.TWO, 4, Range.TWO, Range.THREE);

        /** Upgrade card. */
        public static final UpgradeCard ION_CANNON = new SecondaryWeaponUpgradeCard(
                "Ion Cannon",
                UpgradeType.CANNON,
                UpgradeHeader.ATTACK,
                "Attack 1 ship. If this attack hits, the defender suffers 1 damage and receives 1 ion token. Then cancel all dice results.",
                3, Wave.TWO, 3, Range.ONE, Range.TWO, Range.THREE);

        /** Upgrade card. */
        public static final UpgradeCard ION_CANNON_TURRET = new SecondaryWeaponUpgradeCard(
                "Ion Cannon Turret",
                UpgradeType.TURRET,
                UpgradeHeader.ATTACK,
                "Attack 1 ship (even a ship outside your firing arc). If this attack hits the target ship, the ship suffers 1 damage and receives 1 ion token. Then cancel all dice results.",
                5, Wave.ONE, 3, Range.ONE, Range.TWO);

        /** Upgrade card. */
        public static final UpgradeCard ION_PULSE_MISSILES = new SecondaryWeaponUpgradeCard(
                "Ion Pulse Missiles",
                UpgradeType.MISSILE,
                UpgradeHeader.ATTACK_TARGET_LOCK,
                "Spend your target lock and discard this card to perform this attack. If this attack hits, the defender suffers 1 damage and receives 2 ion tokens. Then cancel all dice results.",
                3, Wave.FOUR, 3, Range.TWO, Range.THREE);

        /** Upgrade card. */
        @SuppressWarnings("synthetic-access")
        public static final UpgradeCard PROTON_TORPEDOES = new SecondaryWeaponUpgradeCard(
                "Proton Torpedoes",
                UpgradeType.TORPEDO,
                UpgradeHeader.ATTACK_TARGET_LOCK,
                "Spend your target lock and discard this card to perform this attack. You may change 1 of your Focus results to a Critical Hit result.",
                4, Wave.CORE, 4, Range.TWO, Range.THREE)
        {
            @Override
            public void phaseEffect(final SSEnvironment environment, final SSToken attacker, final Phase phase)
            {
                if ((phase == Phase.COMBAT_ROLL_ATTACK_DICE) && (attacker.getWeapon() == this))
                {
                    final TargetLock targetLock = attacker.getAttackerTargetLock();
                    LOGGER.trace("targetLock = " + targetLock);
                    final SSToken defender = attacker.getDefender();
                    if ((targetLock != null) && (targetLock.getDefender() == defender))
                    {
                        super.phaseEffect(environment, attacker, phase);
                        final AttackDice attackDice = attacker.getAttackDice();
                        LOGGER.trace("before attackDice = " + attackDice);
                        if (attackDice.getFocusCount() > 0)
                        {
                            attackDice.changeFirstToValue(AttackDice.Value.FOCUS, AttackDice.Value.CRITICAL_HIT);
                            LOGGER.trace("after  attackDice = " + attackDice);
                            LOGGER.info(getName() + " changed one focus result to a critical hit result.");
                        }
                        TargetLock.freeInstance(targetLock);
                        attacker.removeUpgrade(this);
                        LOGGER.info(getName() + " performed attack and removed itself as a upgrade.");
                    }
                }
            }
        };

        /**
         * @return the values.
         */
        @SuppressWarnings("synthetic-access")
        public static UpgradeCard[] values()
        {
            return VALUES.toArray(new UpgradeCard[VALUES.size()]);
        }

        /** Weapon delegate. */
        private final Weapon delegate;

        /**
         * Construct this object.
         * 
         * @param name Name.
         * @param type Type.
         * @param header Header. (required)
         * @param description Description.
         * @param squadPointCost Squad point cost.
         * @param wave Wave.
         * @param weaponValue Weapon value. (required > 0)
         * @param ranges Secondary weapon ranges. (required one or more)
         */
        @SuppressWarnings("synthetic-access")
        private SecondaryWeaponUpgradeCard(final String name, final UpgradeType type, final UpgradeHeader header,
                final String description, final int squadPointCost, final Wave wave, final int weaponValue,
                final Range... ranges)
        {
            super(false, name, type, _NO_RESTRICTIONS, header, description, ImmutableShipState.ZERO, squadPointCost,
                    wave);

            InputValidator.validateNotNull("header", header);
            InputValidator.validatePositive("weaponValue", weaponValue);
            InputValidator.validateNotEmpty("ranges", ranges);

            this.delegate = new DefaultWeapon(name, false, weaponValue, ranges);
        }

        @Override
        public Set<Range> getRanges()
        {
            return delegate.getRanges();
        }

        @Override
        public int getWeaponValue()
        {
            return delegate.getWeaponValue();
        }

        /**
         * @return the hasAttack
         */
        public boolean hasAttack()
        {
            return true;
        }

        @Override
        public boolean isDefenderInRange(final SSToken attacker, final SSPosition attackerPosition,
                final SSToken defender, final SSPosition defenderPosition)
        {
            return delegate.isDefenderInRange(attacker, attackerPosition, defender, defenderPosition);
        }

        @Override
        public boolean isDefenderTargetable(final SSToken attacker, final SSPosition attackerPosition,
                final SSToken defender, final SSPosition defenderPosition)
        {
            return isDefenderInRange(attacker, attackerPosition, defender, defenderPosition)
                    && isDefenderVulnerable(attacker, attackerPosition, defender, defenderPosition);
        }

        /**
         * @param attacker Attacker.
         * @param attackerPosition Attacker position.
         * @param defender Defender.
         * @param defenderPosition Defender position.
         * 
         * @return true if the defender is vulnerable to this weapon.
         */
        @Override
        public boolean isDefenderVulnerable(final SSToken attacker, final SSPosition attackerPosition,
                final SSToken defender, final SSPosition defenderPosition)
        {
            boolean answer = false;

            final UpgradeHeader header = getHeader();

            switch (header)
            {
            case ATTACK:
                answer = delegate.isDefenderVulnerable(attacker, attackerPosition, defender, defenderPosition);
                break;
            case ATTACK_FOCUS:
                answer = (attacker.getFocusCount() > 0)
                        && delegate.isDefenderVulnerable(attacker, attackerPosition, defender, defenderPosition);
                break;
            case ATTACK_TARGET_LOCK:
                answer = (attacker.getAttackerTargetLock() != null)
                        && (attacker.getAttackerTargetLock().getDefender() == defender)
                        && delegate.isDefenderVulnerable(attacker, attackerPosition, defender, defenderPosition);
                break;
            case ACTION:
            case ATTACK_ENERGY:
            case ENERGY:
                throw new RuntimeException("Unhandled secondary weapon header: " + header);
            default:
                throw new RuntimeException("Unknown secondary weapon header: " + header);
            }

            return answer;
        }

        @Override
        public boolean isPrimary()
        {
            return delegate.isPrimary();
        }
    }

    /** Provides an enumeration of headers. */
    public enum UpgradeHeader
    {
        /** Header. */
        ACTION("Action:"),
        /** Header. */
        ATTACK("Attack:"),
        /** Header. */
        ATTACK_ENERGY("Attack [Energy]:"),
        /** Header. */
        ATTACK_FOCUS("Attack [Focus]:"),
        /** Header. */
        ATTACK_TARGET_LOCK("Attack [Target Lock]:"),
        /** Header. */
        ENERGY("Energy:");

        /** Display name. */
        private final String displayName;

        /**
         * Construct this object.
         * 
         * @param displayName Display name.
         */
        @SuppressWarnings("hiding")
        private UpgradeHeader(final String displayName)
        {
            InputValidator.validateNotEmpty("displayName", displayName);

            this.displayName = displayName;
        }

        /**
         * @return the displayName
         */
        public String getDisplayName()
        {
            return displayName;
        }
    }

    /** Provides an enumeration of restrictions. */
    public enum UpgradeRestriction
    {
        /** Restriction. */
        CR90_FORE_SECTION_ONLY("CR90 Fore Section only."),
        /** Restriction. */
        FIRESPRAY_31_ONLY("Firespray-31 only.", Ship.FIRESPRAY_31),
        /** Restriction. */
        GR_75_ONLY("GR-75 only."),
        /** Restriction. */
        HUGE_SHIP_ONLY("Huge Ship only.", ShipBase.HUGE1),
        /** Restriction. */
        HWK_290_ONLY("HWK-290 only.", Ship.HWK_290),
        /** Restriction. */
        IMPERIAL_ONLY("Imperial only.", SSTeam.IMPERIAL),
        /** Restriction. */
        LAMBDA_CLASS_SHUTTLE_ONLY("Lambda-class Shuttle only.", Ship.LAMBDA_CLASS_SHUTTLE),
        /** Restriction. */
        LARGE_SHIP_ONLY("Large Ship only.", ShipBase.LARGE),
        /** Restriction. */
        LIMITED("Limited."),
        /** Restriction. */
        MODIFICATION("Modification."),
        /** Restriction. */
        REBEL_ONLY("Rebel only.", SSTeam.REBEL),
        /** Restriction. */
        TIE_INTERCEPTOR_ONLY("TIE Interceptor only.", Ship.TIE_INTERCEPTOR),
        /** Restriction. */
        TIE_PHANTOM_ONLY("TIE Phantom only.", Ship.TIE_PHANTOM),
        /** Restriction. */
        TITLE("Title."),
        /** Restriction. */
        YT_1300_ONLY("YT-1300 only.", Ship.YT_1300);

        /** Display name. */
        private final String displayName;

        /** Ship. */
        private final Ship ship;

        /** Ship base. */
        private final ShipBase shipBase;

        /** Team. */
        private final SSTeam team;

        /**
         * Construct this object.
         * 
         * @param displayName Display name.
         */
        @SuppressWarnings("hiding")
        private UpgradeRestriction(final String displayName)
        {
            InputValidator.validateNotEmpty("displayName", displayName);

            this.displayName = displayName;
            this.team = null;
            this.ship = null;
            this.shipBase = null;
        }

        /**
         * Construct this object.
         * 
         * @param displayName Display name.
         * @param ship Ship.
         */
        @SuppressWarnings("hiding")
        private UpgradeRestriction(final String displayName, final Ship ship)
        {
            this(displayName, null, ship, null);
        }

        /**
         * Construct this object.
         * 
         * @param displayName Display name.
         * @param shipBase Ship base.
         */
        @SuppressWarnings("hiding")
        private UpgradeRestriction(final String displayName, final ShipBase shipBase)
        {
            this(displayName, null, null, shipBase);
        }

        /**
         * Construct this object.
         * 
         * @param displayName Display name.
         * @param team Team.
         */
        @SuppressWarnings("hiding")
        private UpgradeRestriction(final String displayName, final SSTeam team)
        {
            this(displayName, team, null, null);
        }

        /**
         * Construct this object.
         * 
         * @param displayName Display name.
         * @param team Team.
         * @param ship Ship.
         * @param shipBase Ship base.
         */
        @SuppressWarnings("hiding")
        private UpgradeRestriction(final String displayName, final SSTeam team, final Ship ship,
                final ShipBase shipBase)
        {
            InputValidator.validateNotEmpty("displayName", displayName);

            if ((team == null) && (ship == null) && (shipBase == null))
            {
                throw new IllegalArgumentException("One must be non-null: team, ship, or shipBase");
            }

            this.displayName = displayName;
            this.team = team;
            this.ship = ship;
            this.shipBase = shipBase;
        }

        /**
         * @return the displayName
         */
        public String getDisplayName()
        {
            return displayName;
        }

        /**
         * @param ship Ship.
         * 
         * @return true if the given parameter passes this restriction.
         */
        @SuppressWarnings("hiding")
        public boolean passes(final Ship ship)
        {
            InputValidator.validateNotNull("ship", ship);

            final boolean passesTeam = (this.team == null) || (this.team == ship.getTeam());
            final boolean passesBase = (this.shipBase == null) || (this.shipBase == ship.getShipBase());
            final boolean passesShip = (this.ship == null) || (this.ship == ship);

            return passesTeam && passesBase && passesShip;
        }
    }

    /** Imperial only restriction. */
    public static final Set<UpgradeRestriction> _IMPERIAL_ONLY_RESTRICTION = createSet(UpgradeRestriction.IMPERIAL_ONLY);

    /** Modification restriction. */
    public static final Set<UpgradeRestriction> _MODIFICATION = createSet(UpgradeRestriction.MODIFICATION);

    /** No restrictions. */
    public static final Set<UpgradeRestriction> _NO_RESTRICTIONS = Collections.emptySet();

    /** Rebel only restriction. */
    public static final Set<UpgradeRestriction> _REBEL_ONLY_RESTRICTION = createSet(UpgradeRestriction.REBEL_ONLY);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard ADRENALINE_RUSH = new UpgradeCard(
            "Adrenaline Rush",
            UpgradeType.ELITE,
            "When you reveal a red maneuver, you may discard this card to treat that manuever as a white maneuver until the end of the Activation phase.",
            1, Wave.THREE);

    /** Upgrade card. */
    @SuppressWarnings("synthetic-access")
    public static final UpgradeCard ADVANCED_CLOAKING_DEVICE = new UpgradeCard(false, "Advanced Cloaking Device",
            UpgradeType.MODIFICATION, createSet(UpgradeRestriction.TIE_PHANTOM_ONLY, UpgradeRestriction.MODIFICATION),
            null, "After you perform an attack, you may perform a free cloak action.", ImmutableShipState.ZERO, 4,
            Wave.FOUR)
    {
        @Override
        public void phaseEffect(final SSEnvironment environment, final SSToken token, final Phase phase)
        {
            if (phase == Phase.COMBAT_DEAL_DAMAGE)
            {
                if (token == environment.getActiveToken())
                {
                    if (!token.isCloaked())
                    {
                        token.increaseCloakCount();
                    }
                }
            }
        }
    };

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard ADVANCED_SENSORS = new UpgradeCard(
            "Advanced Sensors",
            UpgradeType.SENSOR,
            "Immediately before you reveal your maneuver, you may perform 1 free action. If you use this ability, you must skip your \"Perform Action\" step during this round.",
            3, Wave.THREE);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard ANTI_PURSUIT_LASERS = new UpgradeCard(
            false,
            "Anti-Pursuit Lasers",
            UpgradeType.MODIFICATION,
            createSet(UpgradeRestriction.LARGE_SHIP_ONLY, UpgradeRestriction.MODIFICATION),
            null,
            "After an enemy ship executes a maneuver that causes it to overlap your ship, roll 1 attack die. On a Hit or Critical Hit result, the enemy ship suffers 1 damage.",
            ImmutableShipState.ZERO, 2, Wave.THREE);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard C_3PO = new UpgradeCard(
            true,
            "C-3PO",
            UpgradeType.CREW,
            _REBEL_ONLY_RESTRICTION,
            null,
            "Once per round, before you roll 1 or more defense dice, you may guess aloud a number of Evade results. If you roll that many Evade results (before modifying dice), add 1 Evade result.",
            ImmutableShipState.ZERO, 3, Wave.THREE_FIVE);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard CARLIST_RIEEKAN = new UpgradeCard(
            true,
            "Carlist Rieekan",
            UpgradeType.CREW,
            createSet(UpgradeRestriction.HUGE_SHIP_ONLY, UpgradeRestriction.REBEL_ONLY),
            null,
            "At the start of the Activation phase, you may discard this card to treat each friendly ship's pilot skill value as \"12\" until the end of the phase.",
            ImmutableShipState.ZERO, 3, Wave.THREE_FIVE);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard CHEWBACCA = new UpgradeCard(
            true,
            "Chewbacca",
            UpgradeType.CREW,
            _REBEL_ONLY_RESTRICTION,
            null,
            "When you are dealt a Damage card, you may immediately discard that card and recover 1 shield. Then, discard this Upgrade card.",
            ImmutableShipState.ZERO, 4, Wave.TWO);

    /**
     * Effect implemented elsewhere.
     * 
     * @see SSToken#getHullValue()
     * @see SSToken#getShieldValue()
     */
    public static final UpgradeCard COMBAT_RETROFIT = new UpgradeCard(false, "Combat Retrofit",
            UpgradeType.MODIFICATION, createSet(UpgradeRestriction.GR_75_ONLY, UpgradeRestriction.HUGE_SHIP_ONLY,
                    UpgradeRestriction.MODIFICATION), null,
            "Increase your hull value by 2 and your shield value by 1.", new ImmutableShipState(0, 0, 0, 2, 1), 10,
            Wave.THREE_FIVE);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard DAREDEVIL = new UpgradeCard(
            false,
            "Daredevil",
            UpgradeType.ELITE,
            _NO_RESTRICTIONS,
            UpgradeHeader.ACTION,
            "Execute a white Turn Left 1 or Turn Right 1 maneuver. Then, receive 1 stress token. Then, if you do no have the Boost action icon, roll 2 attack dice. Suffer any Damage and Critical Damage rolled.",
            ImmutableShipState.ZERO, 3, Wave.TWO);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard DARTH_VADER = new UpgradeCard(
            true,
            "Darth Vader",
            UpgradeType.CREW,
            _IMPERIAL_ONLY_RESTRICTION,
            null,
            "After you perform an attack against an enemy ship, you may suffer 2 damage to cause that ship to suffer 1 critical damage.",
            ImmutableShipState.ZERO, 3, Wave.THREE);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard DEADEYE = new UpgradeCard(
            "Deadeye",
            UpgradeType.ELITE,
            "You may treat the \"Attack [Target Lock]:\" header as \"Attack [Focus]:.\" When an attack instructs you to spend a target lock, you may spend a focus token instead.",
            1, Wave.TWO);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard DECOY = new UpgradeCard(
            "Decoy",
            UpgradeType.ELITE,
            "At the start of the Combat phase, you may choose 1 friendly ship at Range 1-2. Exchange your pilot skill with that ship's pilot skill until the end of the phase.",
            2, Wave.FOUR);

    /**
     * Effect implemented elsewhere.
     * 
     * @see CombatAction.DamageDealer#dealDamage()
     */
    public static final UpgradeCard DETERMINATION = new UpgradeCard(
            "Determination",
            UpgradeType.ELITE,
            "When you are dealt a faceup Damage card with the Pilot trait, discard it immediately without resolving its effect.",
            1, Wave.CORE);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard DRAW_THEIR_FIRE = new UpgradeCard(
            "Draw Their Fire",
            UpgradeType.ELITE,
            "When a friendly ship at Range 1 is hit by an attack, you may suffer 1 of the uncanceled Critical Hit results instead of the target ship.",
            1, Wave.TWO);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard ELUSIVENESS = new UpgradeCard(
            "Elusiveness",
            UpgradeType.ELITE,
            "When defending, you may receive 1 stress token to choose 1 attack die. The attacker must reroll that die. If you have at least 1 stress token, you cannot use this ability.",
            2, Wave.TWO);

    /**
     * Effect implemented elsewhere.
     * 
     * @see SSToken#getShipActions()
     */
    public static final UpgradeCard ENGINE_UPGRADE = new UpgradeCard(false, "Engine Upgrade", UpgradeType.MODIFICATION,
            _MODIFICATION, null, "Your action bar gains the boost action icon.", ImmutableShipState.ZERO, 4, Wave.TWO);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard ENGINEERING_TEAM = new UpgradeCard(
            false,
            "Engineering Team",
            UpgradeType.TEAM,
            createSet(UpgradeRestriction.LIMITED),
            null,
            "During the Activation phase, when you reveal a Straight maneuver, gain 1 additional energy during the \"Gain Energy\" step.",
            ImmutableShipState.ZERO, 4, Wave.THREE_FIVE);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard EXPERT_HANDLING = new UpgradeCard(
            false,
            "Expert Handling",
            UpgradeType.ELITE,
            _NO_RESTRICTIONS,
            UpgradeHeader.ACTION,
            "Perform a free barrel roll action. If you do not have the Barrel Roll action icon, receive 1 stress token. You may then remove 1 enemy target lock from your ship.",
            ImmutableShipState.ZERO, 2, Wave.ONE);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard EXPOSE = new UpgradeCard(
            false,
            "Expose",
            UpgradeType.ELITE,
            _NO_RESTRICTIONS,
            UpgradeHeader.ACTION,
            "Until the end of the round, increase your primary weapon value by 1 and decrease your agility value by 1.",
            ImmutableShipState.ZERO, 4, Wave.TWO);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard FIRE_CONTROL_SYSTEM = new UpgradeCard("Fire Control System", UpgradeType.SENSOR,
            "After you perform an attack, you may acquire a target lock on the defender.", 2, Wave.THREE);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard FLIGHT_INSTRUCTOR = new UpgradeCard(
            "Flight Instructor",
            UpgradeType.CREW,
            "When defending, you may reroll 1 of your Focus results. If the attacker's pilot skill value is \"2\" or lower, you may reroll 1 of your blank results instead.",
            4, Wave.THREE);

    /** Upgrade card. */
    @SuppressWarnings("synthetic-access")
    public static final UpgradeCard GUNNER = new UpgradeCard(
            "Gunner",
            UpgradeType.CREW,
            "After you perform an attack that does not hit, you may immediately perform a primary weapon attack. You cannot perform another attack this round.",
            5, Wave.TWO)
    {
        @Override
        public void phaseEffect(final SSEnvironment environment, final SSToken token, final Phase phase)
        {
            super.phaseEffect(environment, token, phase);
            if (phase == Phase.COMBAT_START)
            {
                token.activateUpgrade(this);
            }
            else if (phase == Phase.COMBAT_DEAL_DAMAGE)
            {
                final SSToken attacker = environment.getActiveToken();
                if (attacker == environment.getActiveToken())
                {
                    LOGGER.trace("attacker.isUpgradeActive(" + getName() + ") ? " + attacker.isUpgradeActive(this));
                    if (attacker.isUpgradeActive(this))
                    {
                        attacker.deactivateUpgrade(this);
                        LOGGER.trace("attacker.isDefenderHit() ? " + attacker.isDefenderHit());
                        if (!attacker.isDefenderHit())
                        {
                            final CombatAction combatAction = attacker.getCombatAction();
                            final SSAdjudicator adjudicator = combatAction.getAdjudicator();
                            final Weapon weapon = attacker.getWeapon();
                            final SSToken defender = combatAction.getDefender();
                            final CombatAction newCombatAction = new CombatAction(environment, adjudicator, attacker,
                                    weapon, defender);
                            LOGGER.info(attacker.getName() + " gunner attacking " + defender.getName() + " again.");
                            newCombatAction.doIt();
                        }
                    }
                }
            }
            else if (phase == Phase.COMBAT_END)
            {
                if (token.isUpgradeActive(this))
                {
                    token.deactivateUpgrade(this);
                }
            }
        }
    };

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard GUNNERY_TEAM = new UpgradeCard(
            false,
            "Gunnery Team",
            UpgradeType.TEAM,
            createSet(UpgradeRestriction.LIMITED),
            null,
            "Once per round, when attacking with a secondary weapon, you may spend 1 energy to change 1 of your blank results to a Hit result.",
            ImmutableShipState.ZERO, 4, Wave.THREE_FIVE);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard HAN_SOLO = new UpgradeCard(
            true,
            "Han Solo",
            UpgradeType.CREW,
            _REBEL_ONLY_RESTRICTION,
            null,
            "When attacking, if you have a target lock on the defender, you may spend that target lock to change all of your Focus results to Hit results.",
            ImmutableShipState.ZERO, 2, Wave.THREE_FIVE);

    /**
     * Effect implemented elsewhere.
     * 
     * @see SSToken#getHullValue()
     */
    public static final UpgradeCard HULL_UPGRADE = new UpgradeCard(false, "Hull Upgrade", UpgradeType.MODIFICATION,
            _MODIFICATION, null, "Increase your hull value by 1.", new ImmutableShipState(0, 0, 0, 1, 0), 3,
            Wave.THREE_FIVE);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard INTELLIGENCE_AGENT = new UpgradeCard(
            "Intelligence Agent",
            UpgradeType.CREW,
            "At the start of the Activation phase, choose 1 enemy ship at Range 1-2. You may look at that ship's chosen maneuver.",
            1, Wave.THREE);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard JAN_DODONNA = new UpgradeCard(
            true,
            "Jan Dodonna",
            UpgradeType.CREW,
            createSet(UpgradeRestriction.HUGE_SHIP_ONLY, UpgradeRestriction.REBEL_ONLY),
            null,
            "When another friendly ship at Range 1 is attacking, it may change 1 of its Hit results to a Critical Hit result.",
            ImmutableShipState.ZERO, 6, Wave.THREE_FIVE);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard LEIA_ORGANA = new UpgradeCard(
            true,
            "Leia Organa",
            UpgradeType.CREW,
            _REBEL_ONLY_RESTRICTION,
            null,
            "At the start of the Activation phase, you may discard this card to allow all friendly ships that reveal a red maneuver to treat that maneuver as a white maneuver until the end of the phase.",
            ImmutableShipState.ZERO, 6, Wave.THREE_FIVE);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard LUKE_SKYWALKER = new UpgradeCard(
            true,
            "Luke Skywalker",
            UpgradeType.CREW,
            _REBEL_ONLY_RESTRICTION,
            null,
            "After you perform an attack that does not hit, you may immediately perform a primary weapon attack. You may change 1 Focus result to a Hit result. You cannot perform another attack this round.",
            ImmutableShipState.ZERO, 7, Wave.TWO);

    /** Upgrade card. */
    @SuppressWarnings("synthetic-access")
    public static final UpgradeCard MARKSMANSHIP = new UpgradeCard(
            false,
            "Marksmanship",
            UpgradeType.ELITE,
            _NO_RESTRICTIONS,
            UpgradeHeader.ACTION,
            "When attacking this round, you may change 1 of your Focus results to a Critical Hit result and all of your other Focus results to Hit results.",
            ImmutableShipState.ZERO, 3, Wave.CORE)
    {
        @Override
        public void doAction(final SSEnvironment environment, final SSToken token)
        {
            token.activateUpgrade(this);
        }

        @Override
        public void phaseEffect(final SSEnvironment environment, final SSToken token, final Phase phase)
        {
            super.phaseEffect(environment, token, phase);
            if (phase == Phase.COMBAT_ROLL_ATTACK_DICE)
            {
                final SSToken attacker = environment.getActiveToken();
                if ((token == attacker) && attacker.isUpgradeActive(this))
                {
                    final AttackDice attackDice = attacker.getAttackDice();
                    if (attackDice.getFocusCount() > 0)
                    {
                        attackDice.changeFirstToValue(AttackDice.Value.FOCUS, AttackDice.Value.CRITICAL_HIT);
                        attackDice.changeAllToValue(AttackDice.Value.FOCUS, AttackDice.Value.HIT);
                        LOGGER.info(getName() + " modified attack dice.");
                    }
                }
            }
            else if (phase == Phase.END_END)
            {
                token.deactivateUpgrade(this);
            }
        }
    };

    /** Upgrade card. */
    @SuppressWarnings("synthetic-access")
    public static final UpgradeCard MERCENARY_COPILOT = new UpgradeCard(false, "Mercenary Copilot", UpgradeType.CREW,
            _NO_RESTRICTIONS, null,
            "When attacking at Range 3, you may change 1 of your Hit results to a Critical Hit result.",
            ImmutableShipState.ZERO, 2, Wave.TWO)
    {
        @Override
        public void phaseEffect(final SSEnvironment environment, final SSToken token, final Phase phase)
        {
            super.phaseEffect(environment, token, phase);
            if (phase == Phase.COMBAT_ROLL_ATTACK_DICE)
            {
                LOGGER.trace("environment.getActiveToken() = " + environment.getActiveToken());
                final SSToken attacker = environment.getActiveToken();
                if (token == attacker)
                {
                    final Range range = attacker.getRange();
                    LOGGER.trace("range = " + range);
                    if (range == Range.THREE)
                    {
                        final AttackDice attackDice = attacker.getAttackDice();
                        LOGGER.trace("attackDice = " + attackDice);
                        attackDice.changeFirstToValue(AttackDice.Value.HIT, AttackDice.Value.CRITICAL_HIT);
                        LOGGER.info(getName() + " changed one hit result to a critical hit result.");
                    }
                }
            }
        }
    };

    /**
     * Effect implemented elsewhere.
     * 
     * @see SSToken#getShipActions()
     */
    public static final UpgradeCard MILLENNIUM_FALCON = new UpgradeCard(true, "Millennium Falcon", UpgradeType.TITLE,
            createSet(UpgradeRestriction.YT_1300_ONLY, UpgradeRestriction.TITLE), null,
            "Your action bar gains the Evade action icon.", ImmutableShipState.ZERO, 1, Wave.TWO);

    /**
     * Effect implemented elsewhere.
     * 
     * @see SSEngine#performEndPhase(SSEnvironment, SSAdjudicator)
     */
    @SuppressWarnings("javadoc")
    public static final UpgradeCard MOLDY_CROW = new UpgradeCard(true, "Moldy Crow", UpgradeType.TITLE, createSet(
            UpgradeRestriction.HWK_290_ONLY, UpgradeRestriction.TITLE), null,
            "During the End phase, do not remove unused focus tokens from your ship.", ImmutableShipState.ZERO, 3,
            Wave.THREE);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard MUNITIONS_FAILSAFE = new UpgradeCard(
            false,
            "Munitions Failsafe",
            UpgradeType.MODIFICATION,
            _MODIFICATION,
            null,
            "When attacking with a secondary weapon that instructs you to discard it to perform the attack, do not discard it unless the attack hits.",
            ImmutableShipState.ZERO, 1, Wave.FOUR);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard NAVIGATOR = new UpgradeCard(
            false,
            "Navigator",
            UpgradeType.CREW,
            _NO_RESTRICTIONS,
            null,
            "When you reveal a manuever you may rotate your dial to another maneuver with the same bearing. You cannot rotate to a red maneuver if you have any stress tokens.",
            ImmutableShipState.ZERO, 3, Wave.THREE);

    /**
     * Effect implemented elsewhere.
     * 
     * @see SSToken#getManeuvers()
     */
    public static final UpgradeCard NIEN_NUNB = new UpgradeCard(true, "Nien Nunb", UpgradeType.CREW,
            _REBEL_ONLY_RESTRICTION, null, "You may treat all Straight maneuvers as green maneuvers.",
            ImmutableShipState.ZERO, 1, Wave.TWO);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard OPPORTUNIST = new UpgradeCard(
            "Opportunist",
            UpgradeType.ELITE,
            "When attacking, if the defender does not have any focus or evade tokens, you may receive 1 stress token to roll 1 additional attack die. You cannot use this ability if you have any stress tokens.",
            4, Wave.THREE_FIVE);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard OUTMANEUVER = new UpgradeCard(
            "Outmaneuver",
            UpgradeType.ELITE,
            "When attacking a ship inside your firing arc, if you are not inside that ship's firing arc, reduce its agility value by 1 (to a minimum of 0).",
            3, Wave.FOUR);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard PREDATOR = new UpgradeCard(
            "Predator",
            UpgradeType.ELITE,
            "When attacking, you may reroll 1 attack die. If the defender's pilot skill value if \"2\" or lower, you may instead reroll up to 2 attack dice.",
            3, Wave.FOUR);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard PROTON_BOMBS = new UpgradeCard(
            "Proton Bombs",
            UpgradeType.BOMB,
            "When you reveal your maneuver dial, you may discard this card to drop 1 proton bomb token. This token detonates at the end of the Activation phase.",
            5, Wave.THREE);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard PROXIMITY_MINES = new UpgradeCard(
            false,
            "Proximity Mines",
            UpgradeType.BOMB,
            _NO_RESTRICTIONS,
            UpgradeHeader.ACTION,
            "Discard this card to drop 1 proximity mine token. When a ship's base or maneuver template overlaps this token, this token detonates.",
            ImmutableShipState.ZERO, 3, Wave.TWO);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard PUSH_THE_LIMIT = new UpgradeCard(
            "Push The Limit",
            UpgradeType.ELITE,
            "Once per round, after you perform an action, you may perform 1 free action shown in your action bar. Then receive 1 stress token.",
            3, Wave.TWO);

    /**
     * Effect implemented elsewhere.
     * 
     * @see SSToken#getManeuvers()
     */
    public static final UpgradeCard R2_ASTROMECH = new UpgradeCard("R2 Astromech", UpgradeType.ASTROMECH,
            "You may treat all 1- and 2-speed maneuvers as green maneuvers.", 1, Wave.ONE);

    /** Upgrade card. */
    @SuppressWarnings("synthetic-access")
    public static final UpgradeCard R2_D2 = new UpgradeCard(true, "R2-D2", UpgradeType.ASTROMECH, _NO_RESTRICTIONS,
            null, "After executing a green maneuver, you may recover 1 shield (up to your shield value).",
            ImmutableShipState.ZERO, 4, Wave.CORE)
    {
        @Override
        public void phaseEffect(final SSEnvironment environment, final SSToken token, final Phase phase)
        {
            super.phaseEffect(environment, token, phase);
            if (phase == Phase.ACTIVATION_EXECUTE_MANEUVER)
            {
                LOGGER.trace("environment.getActiveToken() = " + environment.getActiveToken());
                if (token == environment.getActiveToken())
                {
                    final ManeuverAction maneuverAction = token.getManeuverAction();
                    LOGGER.trace("maneuverAction = " + maneuverAction);
                    if (maneuverAction != null)
                    {
                        final Maneuver maneuver = maneuverAction.getManeuver();
                        LOGGER.trace("maneuver = " + maneuver);
                        if ((maneuver.getDifficulty() == Difficulty.EASY)
                                && (token.getShieldCount() < token.getShieldValue()))
                        {
                            token.increaseShieldCount();
                            LOGGER.info(getName() + " added one shield token.");
                        }
                    }
                }
            }
        }
    };

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard R2_D2_CREW = new UpgradeCard(
            true,
            "R2-D2 (Crew)",
            UpgradeType.CREW,
            _REBEL_ONLY_RESTRICTION,
            null,
            "At the end of the End phase, if you have no shields, you may recover 1 shield and roll 1 attack die. On a Hit result, randomly flip 1 of your facedown Damage cards faceup and resolve it.",
            ImmutableShipState.ZERO, 4, Wave.THREE_FIVE);

    /**
     * Effect implemented elsewhere.
     * 
     * @see SSToken#getUpgradeTypes()
     */
    public static final UpgradeCard R2_D6 = new UpgradeCard(
            true,
            "R2-D6",
            UpgradeType.ASTROMECH,
            _NO_RESTRICTIONS,
            null,
            "Your upgrade bar gains the Elite upgrade icon. You cannot equip this upgrade if you already have a Elite upgrade icon or if your pilot skill value is 2 or lower.",
            ImmutableShipState.ZERO, 1, Wave.THREE_FIVE);

    /** Upgrade card. */
    @SuppressWarnings("synthetic-access")
    public static final UpgradeCard R2_F2 = new UpgradeCard(true, "R2-F2", UpgradeType.ASTROMECH, _NO_RESTRICTIONS,
            UpgradeHeader.ACTION, "Increase your agility value by 1 until the end of this game round.",
            new ImmutableShipState(0, 0, 1, 0, 0), 3, Wave.CORE)
    {
        @Override
        public void doAction(final SSEnvironment environment, final SSToken token)
        {
            super.doAction(environment, token);
            token.activateUpgrade(this);
        }

        @Override
        public void phaseEffect(final SSEnvironment environment, final SSToken token, final Phase phase)
        {
            if (phase == Phase.END_END)
            {
                super.phaseEffect(environment, token, phase);
                token.deactivateUpgrade(this);
            }
        }
    };

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard R3_A2 = new UpgradeCard(
            true,
            "R3-A2",
            UpgradeType.ASTROMECH,
            _NO_RESTRICTIONS,
            null,
            "When you declare the target of your attack, if the defender is inside your firing arc, you may receive 1 stress token to cause the defender to receive 1 stress token.",
            ImmutableShipState.ZERO, 2, Wave.THREE_FIVE);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard R4_D6 = new UpgradeCard(
            true,
            "R4-D6",
            UpgradeType.ASTROMECH,
            _NO_RESTRICTIONS,
            null,
            "When you are hit by an attack and there are at least 3 uncanceled hit results, you may choose and cancel those results until there are 2 remaining. For each result canceled in this way, receive 1 stress token.",
            ImmutableShipState.ZERO, 1, Wave.THREE_FIVE);

    /** Upgrade card. */
    @SuppressWarnings("synthetic-access")
    public static final UpgradeCard R5_ASTROMECH = new UpgradeCard(
            "R5 Astromech",
            UpgradeType.ASTROMECH,
            "During the End phase, you may choose 1 of your faceup Damage cards with the Ship trait and flip it facedown.",
            1, Wave.ONE)
    {
        @Override
        public void phaseEffect(final SSEnvironment environment, final SSToken token, final Phase phase)
        {
            super.phaseEffect(environment, token, phase);
            if (phase == Phase.END_START)
            {
                final DamageCardList damages = token.getCriticalDamagesWithTrait(Trait.SHIP);
                if (!damages.isEmpty())
                {
                    final DamageCard damage = damages.get(0);
                    // Flip the card facedown.
                    token.removeCriticalDamage(damage);
                    token.addDamage(damage);
                }
            }
        }
    };

    /** Upgrade card. */
    @SuppressWarnings("synthetic-access")
    public static final UpgradeCard R5_D8 = new UpgradeCard(true, "R5-D8", UpgradeType.ASTROMECH, _NO_RESTRICTIONS,
            UpgradeHeader.ACTION,
            "Roll 1 defense die. On an evade or focus result, discard 1 of your facedown Damage cards.",
            ImmutableShipState.ZERO, 3, Wave.ONE)
    {
        @Override
        public void doAction(final SSEnvironment environment, final SSToken token)
        {
            super.doAction(environment, token);
            if (token.getDamageCount() > 0)
            {
                final DefenseDice defenseDice = new DefenseDice(1);
                if ((defenseDice.getValue(0) == DefenseDice.Value.EVADE)
                        || (defenseDice.getValue(0) == DefenseDice.Value.FOCUS))
                {
                    final DamageCard damage = token.getDamages().get(0);
                    token.removeDamage(damage);
                    environment.discardDamage(damage);
                }
            }
        }
    };

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard R5_K6 = new UpgradeCard(
            true,
            "R5-K6",
            UpgradeType.ASTROMECH,
            _NO_RESTRICTIONS,
            null,
            "After spending your target lock, roll 1 defense die. On an evade result, immediately acquire a target lock on that same ship. You cannot spend this target lock during this attack.",
            ImmutableShipState.ZERO, 2, Wave.ONE);

    /** Upgrade card. */
    @SuppressWarnings("synthetic-access")
    public static final UpgradeCard R5_P9 = new UpgradeCard(
            true,
            "R5-P9",
            UpgradeType.ASTROMECH,
            _NO_RESTRICTIONS,
            null,
            "At the end of the Combat phase, you may spend 1 of your focus tokens to recover 1 shield (up to your shield value).",
            ImmutableShipState.ZERO, 3, Wave.THREE_FIVE)
    {
        @Override
        public void phaseEffect(final SSEnvironment environment, final SSToken token, final Phase phase)
        {
            super.phaseEffect(environment, token, phase);
            if ((phase == Phase.COMBAT_END) && (token.getFocusCount() > 0)
                    && (token.getShieldCount() < token.getShieldValue()))
            {
                token.decreaseFocusCount();
                token.increaseShieldCount();
            }
        }
    };

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard R7_ASTROMECH = new UpgradeCard(
            "R7 Astromech",
            UpgradeType.ASTROMECH,
            "Once per round when defending, if you have a target lock on the attacker, you may spend the target lock to choose any or all attack dice. The attacker must reroll the chosen dice.",
            2, Wave.FOUR);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard R7_T1 = new UpgradeCard(
            true,
            "R7-T1",
            UpgradeType.ASTROMECH,
            _NO_RESTRICTIONS,
            UpgradeHeader.ACTION,
            "Choose an enemy ship at Range 1-2. If you are inside that ship's firing arc, you may acquire a target lock on that ship. Then you may perform a free boost action.",
            ImmutableShipState.ZERO, 3, Wave.FOUR);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard RAYMUS_ANTILLES = new UpgradeCard(
            true,
            "Raymus Antilles",
            UpgradeType.CREW,
            createSet(UpgradeRestriction.HUGE_SHIP_ONLY, UpgradeRestriction.REBEL_ONLY),
            null,
            "At the start of the Activation phase, choose 1 enemy ship at Range 1-3. You may look at that ship's chosen maneuver. If the maneuver is white, assign that ship 1 stress token.",
            ImmutableShipState.ZERO, 6, Wave.THREE_FIVE);

    /** Upgrade card. */
    @SuppressWarnings("synthetic-access")
    public static final UpgradeCard REBEL_CAPTIVE = new UpgradeCard(
            true,
            "Rebel Captive",
            UpgradeType.CREW,
            _IMPERIAL_ONLY_RESTRICTION,
            null,
            "Once per round, the first ship that declares you as the target of an attack immediately receives 1 stress token.",
            ImmutableShipState.ZERO, 3, Wave.THREE)
    {
        @Override
        public void phaseEffect(final SSEnvironment environment, final SSToken token, final Phase phase)
        {
            if (phase == Phase.COMBAT_START)
            {
                LOGGER.trace("token = " + token);
                if (token == environment.getActiveToken())
                {
                    token.activateUpgrade(this);
                    LOGGER.trace(getName() + " activated itself.");
                }
            }
            else if (phase == Phase.COMBAT_DECLARE_TARGET)
            {
                final SSToken defender = token.getDefender();
                LOGGER.trace("defender = " + defender);
                if ((defender != null) && defender.isUpgradeActive(this))
                {
                    token.increaseStressCount();
                    defender.deactivateUpgrade(this);
                    LOGGER.info(getName() + " provides 1 stress token to the attacker.");
                }
            }
            else if (phase == Phase.COMBAT_END)
            {
                LOGGER.trace("token = " + token);
                if (token == environment.getActiveToken())
                {
                    token.deactivateUpgrade(this);
                    LOGGER.trace(getName() + " deactivated itself.");
                }
            }
        }
    };

    /** Upgrade card. */
    @SuppressWarnings("synthetic-access")
    public static final UpgradeCard RECON_SPECIALIST = new UpgradeCard(false, "Recon Specialist", UpgradeType.CREW,
            _NO_RESTRICTIONS, null, "When you perform a focus action, assign 1 additional focus token to your ship.",
            ImmutableShipState.ZERO, 3, Wave.THREE)
    {
        @Override
        public void phaseEffect(final SSEnvironment environment, final SSToken token, final Phase phase)
        {
            super.phaseEffect(environment, token, phase);
            if ((phase == Phase.ACTIVATION_PERFORM_ACTION) && (token == environment.getActiveToken()))
            {
                final ShipAction shipAction = token.getShipActionAction().getShipAction();
                if (shipAction == ShipAction.FOCUS)
                {
                    token.increaseFocusCount();
                }
            }
        }
    };

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard ROYAL_GUARD_TIE = new UpgradeCard(
            false,
            "Royal Guard TIE",
            UpgradeType.TITLE,
            createSet(UpgradeRestriction.TIE_INTERCEPTOR_ONLY, UpgradeRestriction.TITLE),
            null,
            "You may equip up to 2 different Modification upgrades (instead of 1). You cannot equip this card if your pilot skill value is \"4\" or lower.",
            ImmutableShipState.ZERO, 0, Wave.THREE_FIVE);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard SABOTEUR = new UpgradeCard(
            false,
            "Saboteur",
            UpgradeType.CREW,
            _NO_RESTRICTIONS,
            UpgradeHeader.ACTION,
            "Choose 1 enemy ship at Range 1 and roll 1 attack die. On a Hit or Critical Hit result, choose 1 random facedown Damage card assigned to that ship, flip it faceup, and resolve it.",
            ImmutableShipState.ZERO, 2, Wave.THREE);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard SEISMIC_CHARGES = new UpgradeCard(
            "Seismic Charges",
            UpgradeType.BOMB,
            "When you reveal your maneuver dial, you may discard this card to drop 1 seismic charge token. This token detonates at the end of the Activation phase.",
            2, Wave.TWO);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard SENSOR_JAMMER = new UpgradeCard(
            "Sensor Jammer",
            UpgradeType.SENSOR,
            "When defending, you may change 1 of the attacker's Hit results to a Focus result. The attacker cannot reroll the die with the changed result.",
            4, Wave.THREE);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard SENSOR_TEAM = new UpgradeCard(false, "Sensor Team", UpgradeType.TEAM,
            _NO_RESTRICTIONS, null,
            "When acquiring a target lock, you may lock onto an enemy ship at Range 1-5 (instead of Range 1-3).",
            ImmutableShipState.ZERO, 4, Wave.THREE_FIVE);

    /**
     * Effect implemented elsewhere.
     * 
     * @see SSToken#getShieldValue()
     */
    public static final UpgradeCard SHIELD_UPGRADE = new UpgradeCard(false, "Shield Upgrade", UpgradeType.MODIFICATION,
            _MODIFICATION, null, "Increase your shield value by 1.", new ImmutableShipState(0, 0, 0, 0, 1), 4, Wave.TWO);

    /**
     * Effect implemented elsewhere.
     * 
     * @see SSToken#getUpgradeTypes()
     */
    public static final UpgradeCard SLAVE_I = new UpgradeCard(true, "Slave I", UpgradeType.TITLE, createSet(
            UpgradeRestriction.FIRESPRAY_31_ONLY, UpgradeRestriction.TITLE), null,
            "Your upgrade bar gains the Torpedo upgrade icon.", ImmutableShipState.ZERO, 0, Wave.TWO);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard SQUAD_LEADER = new UpgradeCard(
            true,
            "Squad Leader",
            UpgradeType.ELITE,
            _NO_RESTRICTIONS,
            UpgradeHeader.ACTION,
            "Choose 1 ship at Range 1-2 that has a lower pilot skill than you. The chosen ship may immediately perform 1 free action.",
            ImmutableShipState.ZERO, 2, Wave.ONE);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard ST_321 = new UpgradeCard(true, "ST-321", UpgradeType.TITLE, createSet(
            UpgradeRestriction.LAMBDA_CLASS_SHUTTLE_ONLY, UpgradeRestriction.TITLE), null,
            "When acquiring a target lock, you may lock onto any enemy ship in the play area.",
            ImmutableShipState.ZERO, 3, Wave.THREE);

    /** Upgrade card. */
    @SuppressWarnings("synthetic-access")
    public static final UpgradeCard STEALTH_DEVICE = new UpgradeCard(false, "Stealth Device", UpgradeType.MODIFICATION,
            _MODIFICATION, null, "Increase your agility value by 1. If you are hit by an attack, discard this card.",
            ImmutableShipState.ZERO, 3, Wave.TWO)
    {
        @Override
        public void phaseEffect(final SSEnvironment environment, final SSToken token, final Phase phase)
        {
            super.phaseEffect(environment, token, phase);
            if (phase == Phase.COMBAT_DEAL_DAMAGE)
            {
                final SSToken attacker = environment.getActiveToken();
                LOGGER.trace("attacker = " + attacker);
                final SSToken defender = attacker.getDefender();
                LOGGER.trace("defender = " + defender);
                if (token == defender)
                {
                    LOGGER.trace("attacker.isDefenderHit() ? " + attacker.isDefenderHit());
                    if (attacker.isDefenderHit())
                    {
                        // Discard this card.
                        defender.removeUpgrade(this);
                        LOGGER.info(defender.getName() + " discarded " + getName());
                    }
                }
            }
        }
    };

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard STYGIUM_PARTICLE_ACCELERATOR = new UpgradeCard(false,
            "Stygium Particle Accelerator", UpgradeType.MODIFICATION, _MODIFICATION, null,
            "When you either decloak or perform a cloak action, you may perform a free evade action.",
            ImmutableShipState.ZERO, 2, Wave.FOUR);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard SWARM_TACTICS = new UpgradeCard(
            "Swarm Tactics",
            UpgradeType.ELITE,
            "At the start of the Combat phase, you may choose 1 friendly ship at Range 1. Until the end of this phase, treat the chosen ship as if its pilot skill were equal to your pilot skill.",
            2, Wave.ONE);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard TACTICIAN = new UpgradeCard(
            "Tactician",
            UpgradeType.CREW,
            "After you perform an attack against a ship inside your firing arc at Range 2, that ship receives 1 stress token.",
            2, Wave.FOUR);

    /**
     * Effect implemented elsewhere.
     * 
     * @see SSToken#getShipActions()
     */
    public static final UpgradeCard TARGETING_COMPUTER = new UpgradeCard(false, "Targeting Computer",
            UpgradeType.MODIFICATION, _MODIFICATION, null, "Your action bar gains the Target Lock action icon.",
            ImmutableShipState.ZERO, 2, Wave.THREE_FIVE);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard TARGETING_COORDINATOR = new UpgradeCard(
            false,
            "Targeting Coordinator",
            UpgradeType.CREW,
            createSet(UpgradeRestriction.LIMITED),
            UpgradeHeader.ENERGY,
            "You may spend 1 energy to choose 1 friendly ship at Range 1-2. Acquire a target lock, then assign the blue target lock token to the chosen ship.",
            ImmutableShipState.ZERO, 4, Wave.THREE_FIVE);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard TORYN_FARR = new UpgradeCard(
            true,
            "Toryn Farr",
            UpgradeType.CREW,
            createSet(UpgradeRestriction.HUGE_SHIP_ONLY, UpgradeRestriction.REBEL_ONLY),
            UpgradeHeader.ACTION,
            "Spend any amount of energy to choose that many enemy ships at Range 1-2. Remove all focus, evade, and blue target lock tokens from those ships.",
            ImmutableShipState.ZERO, 6, Wave.THREE_FIVE);

    /**
     * Effect implemented elsewhere.
     * 
     * @see SSToken#getPilotSkillValue()
     */
    public static final UpgradeCard VETERAN_INSTINCTS = new UpgradeCard(false, "Veteran Instincts", UpgradeType.ELITE,
            _NO_RESTRICTIONS, null, "Increase your pilot skill value by 2.", new ImmutableShipState(2, 0, 0, 0, 0), 1,
            Wave.TWO);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard WEAPONS_ENGINEER = new UpgradeCard(
            "Weapons Engineer",
            UpgradeType.CREW,
            "You may maintain 2 target locks (only 1 per enemy ship). When you acquire a target lock, you may lock onto 2 different ships.",
            3, Wave.TWO);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard WED_15_REPAIR_DROID = new UpgradeCard(
            false,
            "WED-15 Repair Droid",
            UpgradeType.CREW,
            createSet(UpgradeRestriction.HUGE_SHIP_ONLY),
            UpgradeHeader.ACTION,
            "Spend 1 energy to discard 1 of your facedown Damage cards, or spend 3 energy to discard 1 of your faceup Damage cards.",
            ImmutableShipState.ZERO, 2, Wave.THREE_FIVE);

    /** Upgrade card. FIXME: implement this */
    public static final UpgradeCard WINGMAN = new UpgradeCard("Wingman", UpgradeType.ELITE,
            "At the start of the Combat phase, remove 1 stress token from another friendly ship at Range 1.", 2,
            Wave.FOUR);

    /** Logger. */
    private static final Logger LOGGER = LogManager.getLogger();

    /** Values. */
    private static List<UpgradeCard> VALUES;

    /**
     * @return the values.
     */
    public static UpgradeCard[] values()
    {
        return VALUES.toArray(new UpgradeCard[VALUES.size()]);
    }

    /**
     * @param type Type.
     * 
     * @return values of the given type.
     */
    public static UpgradeCard[] valuesByType(final UpgradeType type)
    {
        final List<UpgradeCard> answer = new ArrayList<UpgradeCard>();

        for (final UpgradeCard upgrade : VALUES)
        {
            if (upgrade.getType() == type)
            {
                answer.add(upgrade);
            }
        }

        return answer.toArray(new UpgradeCard[answer.size()]);
    }

    /**
     * @param wave Wave.
     * 
     * @return values of the given wave.
     */
    public static UpgradeCard[] valuesByWave(final Wave wave)
    {
        final List<UpgradeCard> answer = new ArrayList<UpgradeCard>();

        for (final UpgradeCard upgrade : VALUES)
        {
            if (upgrade.getWave() == wave)
            {
                answer.add(upgrade);
            }
        }

        return answer.toArray(new UpgradeCard[answer.size()]);
    }

    /**
     * @param restrictions Restrictions.
     * 
     * @return a new set.
     */
    private static Set<UpgradeRestriction> createSet(final UpgradeRestriction... restrictions)
    {
        final Set<UpgradeRestriction> answer = new HashSet<UpgradeCard.UpgradeRestriction>();

        for (final UpgradeRestriction restriction : restrictions)
        {
            answer.add(restriction);
        }

        return answer;
    }

    /** Description. */
    private final String description;

    /** Description. */
    private final UpgradeHeader header;

    /** Flag indicating whether this upgrade is unique. */
    private final boolean isUnique;

    /** Name. */
    private final String name;

    /** Restrictions. */
    private final Set<UpgradeRestriction> restrictions;

    /** Ship state delegate. */
    private final ShipState shipState;

    /** Squad point cost. */
    private final int squadPointCost;

    /** Type. */
    private final UpgradeType type;

    /** Wave. */
    private final Wave wave;

    /**
     * Construct this object.
     * 
     * @param isUnique Flag indicating whether this upgrade is unique.
     * @param name Name.
     * @param type Type.
     * @param restrictions Restrictions.
     * @param header Header. (optional)
     * @param description Description.
     * @param shipState Ship state.
     * @param squadPointCost Squad point cost.
     * @param wave Wave.
     */
    @SuppressWarnings("hiding")
    private UpgradeCard(final boolean isUnique, final String name, final UpgradeType type,
            final Set<UpgradeRestriction> restrictions, final UpgradeHeader header, final String description,
            final ShipState shipState, final int squadPointCost, final Wave wave)
    {
        InputValidator.validateNotEmpty("name", name);
        InputValidator.validateNotNull("type", type);
        InputValidator.validateNotNull("restrictions", restrictions);
        InputValidator.validateNotEmpty("description", description);
        InputValidator.validateNotNegative("squadPointCost", squadPointCost);
        InputValidator.validateNotNull("wave", wave);

        this.isUnique = isUnique;
        this.name = name;
        this.type = type;
        this.restrictions = restrictions;
        this.header = header;
        this.description = description;
        this.shipState = shipState;
        this.squadPointCost = squadPointCost;
        this.wave = wave;

        if (VALUES == null)
        {
            VALUES = new ArrayList<UpgradeCard>();
        }

        VALUES.add(this);
    }

    /**
     * Construct this object.
     * 
     * @param name Name.
     * @param type Type.
     * @param description Description.
     * @param squadPointCost Squad point cost.
     * @param wave Wave.
     */
    @SuppressWarnings("hiding")
    private UpgradeCard(final String name, final UpgradeType type, final String description, final int squadPointCost,
            final Wave wave)
    {
        this(false, name, type, _NO_RESTRICTIONS, null, description, ImmutableShipState.ZERO, squadPointCost, wave);
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

    /**
     * @return the header
     */
    public UpgradeHeader getHeader()
    {
        return header;
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

    /**
     * @return the restrictions
     */
    public Set<UpgradeRestriction> getRestrictions()
    {
        return restrictions;
    }

    @Override
    public int getShieldValue()
    {
        return shipState.getShieldValue();
    }

    /**
     * @return the squadPointCost
     */
    public int getSquadPointCost()
    {
        return squadPointCost;
    }

    /**
     * @return the type
     */
    public UpgradeType getType()
    {
        return type;
    }

    /**
     * @return the wave
     */
    public Wave getWave()
    {
        return wave;
    }

    @Override
    public boolean hasAction()
    {
        return header == UpgradeHeader.ACTION;
    }

    /**
     * @return the isUnique
     */
    public boolean isUnique()
    {
        return isUnique;
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
        final ToStringBuilder builder = new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE);

        builder.append("name", getName());

        return builder.toString();
    }
}
