package org.vizzini.starfightersquadrons;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.vizzini.core.InputValidator;
import org.vizzini.starfightersquadrons.DefaultWeapon.PrimaryWeapon;
import org.vizzini.starfightersquadrons.DefaultWeapon.TurretWeapon;
import org.vizzini.starfightersquadrons.RangeRuler.Range;

/**
 * Provides an enumeration of pilots for Starfighter Squadrons.
 */
public class Pilot implements GameStepReactor, ShipState
{
    /**
     * @return the values.
     */
    public static Pilot[] values()
    {
        return VALUES.toArray(new Pilot[VALUES.size()]);
    }

    /**
     * @param ship Ship.
     *
     * @return values.
     */
    public static Pilot[] valuesByShip(final Ship ship)
    {
        InputValidator.validateNotNull("ship", ship);

        final List<Pilot> answer = new ArrayList<Pilot>();

        for (final Pilot pilot : values())
        {
            if (pilot.getShip() == ship)
            {
                answer.add(pilot);
            }
        }

        return answer.toArray(new Pilot[answer.size()]);
    }

    /**
     * @param team Team.
     *
     * @return values.
     */
    public static Pilot[] valuesByTeam(final SSTeam team)
    {
        InputValidator.validateNotNull("team", team);

        final List<Pilot> answer = new ArrayList<Pilot>();

        for (final Pilot pilot : values())
        {
            if (pilot.getShip().getTeam() == team)
            {
                answer.add(pilot);
            }
        }

        return answer.toArray(new Pilot[answer.size()]);
    }

    /**
     * @param wave Wave.
     *
     * @return values.
     */
    public static Pilot[] valuesByWave(final Wave wave)
    {
        InputValidator.validateNotNull("wave", wave);

        final List<Pilot> answer = new ArrayList<Pilot>();

        for (final Pilot pilot : values())
        {
            if (pilot.getShip().getWave() == wave)
            {
                answer.add(pilot);
            }
        }

        return answer.toArray(new Pilot[answer.size()]);
    }

    /** Pilot. */
    public static final Pilot ACADEMY_PILOT = new Pilot("Academy Pilot", "A TIE Fighter pilot.", Wave.CORE,
            Ship.TIE_FIGHTER, 1, 2, 3, 3, 0, 12);

    /** Pilot. */
    public static final Pilot AIREN_CRACKEN = new Pilot("Airen Cracken", "A Z-95 Headhunter pilot.", Wave.FOUR, true,
            Ship.Z_95_HEADHUNTER, 8, 2, 2, 2, 2, 19, UpgradeType.ELITE_MISSILE_TYPES);

    /** Pilot. */
    public static final Pilot ALPHA_SQUADRON_PILOT = new Pilot("Alpha Squadron Pilot", "A TIE Interceptor pilot.",
            Wave.TWO, Ship.TIE_INTERCEPTOR, 1, 3, 3, 3, 0, 18);

    /** Pilot. */
    public static final Pilot ARVEL_CRYNYD = new Pilot("Arvel Crynyd", "An A-Wing pilot.", Wave.TWO, true, Ship.A_WING,
            6, 2, 3, 2, 2, 23, UpgradeType.MISSILE_TYPES);

    /** Pilot. */
    public static final Pilot AVENGER_SQUADRON_PILOT = new Pilot("Avenger Squadron Pilot", "A TIE Interceptor pilot.",
            Wave.TWO, Ship.TIE_INTERCEPTOR, 3, 3, 3, 3, 0, 20);

    /** Pilot. */
    public static final Pilot BACKSTABBER = new Pilot("\"Backstabber\"", "A TIE Fighter pilot.", Wave.ONE, true,
            Ship.TIE_FIGHTER, "When attacking from outside the defender's firing arc, roll 1 additional attack die.",
            6, 2, 3, 3, 0, 16, UpgradeType.NO_UPGRADE_TYPES);

    /** Pilot. */
    public static final Pilot BANDIT_SQUADRON_PILOT = new Pilot("Bandit Squadron Pilot", "A Z-95 Headhunter pilot.",
            Wave.FOUR, Ship.Z_95_HEADHUNTER, 2, 2, 2, 2, 2, 12, UpgradeType.MISSILE_TYPES);

    /** Pilot. */
    public static final Pilot BIGGS_DARKLIGHTER = new Pilot("Biggs Darklighter", "An X-Wing pilot.", Wave.CORE, true,
            Ship.X_WING,
            "Other friendly ships at Range 1 cannot be targeted by attacks if the attacker could target you instead.",
            5, 3, 2, 3, 2, 25, UpgradeType.ASTROMECH_TORPEDO_TYPES);

    /** Pilot. */
    public static final Pilot BLACK_SQUADRON_PILOT = new Pilot("Black Squadron Pilot", "A TIE Fighter pilot.",
            Wave.CORE, Ship.TIE_FIGHTER, 4, 2, 3, 3, 0, 14, UpgradeType.ELITE_TYPES);

    /** Pilot. */
    public static final Pilot BLACKMOON_SQUADRON_PILOT = new Pilot("Blackmoon Squadron Pilot", "An E-Wing pilot.",
            Wave.FOUR, Ship.E_WING, 3, 3, 3, 2, 3, 29, UpgradeType.ASTROMECH_SENSOR_TORPEDO_TYPES);

    /** Pilot. */
    public static final Pilot BLUE_SQUADRON_PILOT = new Pilot("Blue Squadron Pilot", "A B-Wing pilot.", Wave.THREE,
            Ship.B_WING, 2, 3, 1, 3, 5, 22, UpgradeType.CANNON_SENSOR_TORPEDOx2_TYPES);

    /** Pilot. */
    public static final Pilot BOBA_FETT = new Pilot("Boba Fett", "A Firespray-31 pilot.", Wave.TWO, true,
            Ship.FIRESPRAY_31, 8, 3, 2, 6, 4, 39, UpgradeType.BOMB_CANNON_CREW_ELITE_MISSILE_TYPES);

    /** Pilot. */
    public static final Pilot BOUNTY_HUNTER = new Pilot("Bounty Hunter", "A Firespray-31 pilot.", Wave.TWO,
            Ship.FIRESPRAY_31, 3, 3, 2, 6, 4, 33, UpgradeType.BOMB_CANNON_CREW_MISSILE_TYPES);

    /** Pilot. */
    public static final Pilot CAPTAIN_JONUS = new Pilot("Captain Jonus", "A TIE Bomber pilot.", Wave.THREE, true,
            Ship.TIE_BOMBER, 6, 2, 2, 6, 0, 22, UpgradeType.BOMB_ELITE_MISSILEx2_TORPEDOx2_TYPES);

    /** Pilot. */
    public static final Pilot CAPTAIN_KAGI = new Pilot("Captain Kagi", "A Lambda-class shuttle pilot.", Wave.THREE,
            true, Ship.LAMBDA_CLASS_SHUTTLE, 8, 3, 1, 5, 5, 27, UpgradeType.CANNON_CREWx2_SENSOR_TYPES);

    /** Pilot. */
    public static final Pilot CAPTAIN_YORR = new Pilot("Captain Yorr", "A Lambda-class shuttle pilot.", Wave.THREE,
            true, Ship.LAMBDA_CLASS_SHUTTLE, 4, 3, 1, 5, 5, 24, UpgradeType.CANNON_CREWx2_SENSOR_TYPES);

    /** Pilot. */
    public static final Pilot CARNOR_JAX = new Pilot("Carnor Jax", "A TIE Interceptor pilot.", Wave.THREE_FIVE, true,
            Ship.ROYAL_GUARD_TIE,
            "Enemy ships at Range 1 cannot perform focus or evade actions and cannot spend focus or evade tokens.", 8,
            3, 3, 3, 0, 26, UpgradeType.ELITE_TYPES);

    /**
     * Effect implemented elsewhere.
     *
     * @see CombatAction.DamageDealer#dealDamage()
     */
    public static final Pilot CHEWBACCA = new Pilot("Chewbacca", "A YT-1300 pilot.", Wave.TWO, true, Ship.YT_1300,
            "When you are dealt a faceup Damage card, immediately flip it facedown (without resolving its ability).",
            5, 3, 1, 8, 5, 42, UpgradeType.CREWx2_ELITE_MISSILE_TYPES);

    /** Pilot. */
    public static final Pilot COLONEL_JENDON = new Pilot("Colonel Jendon", "A Lambda-class shuttle pilot.", Wave.THREE,
            true, Ship.LAMBDA_CLASS_SHUTTLE, 6, 3, 1, 5, 5, 26, UpgradeType.CANNON_CREWx2_SENSOR_TYPES);

    /** Pilot. */
    public static final Pilot COLONEL_VESSERY = new Pilot("Colonel Vessery", "A TIE Defender pilot.", Wave.FOUR,
            Ship.TIE_DEFENDER, 6, 3, 3, 3, 3, 35, UpgradeType.CANNON_ELITE_MISSILE_TYPES);

    /** Pilot. */
    public static final Pilot CORRAN_HORN = new Pilot("Corran Horn", "An E-Wing pilot.", Wave.FOUR, true, Ship.E_WING,
            8, 3, 3, 2, 3, 35, UpgradeType.ASTROMECH_ELITE_SENSOR_TORPEDO_TYPES);

    /** Pilot. */
    public static final Pilot DAGGER_SQUADRON_PILOT = new Pilot("Dagger Squadron Pilot", "A B-Wing pilot.", Wave.THREE,
            Ship.B_WING, 4, 3, 1, 3, 5, 24, UpgradeType.CANNON_SENSOR_TORPEDOx2_TYPES);

    /** Pilot. */
    public static final Pilot DARK_CURSE = new Pilot("\"Dark Curse\"", "A TIE Fighter pilot.", Wave.CORE, true,
            Ship.TIE_FIGHTER, "When defending, ships attacking you cannot spend focus tokens or reroll attack dice.",
            6, 2, 3, 3, 0, 16, UpgradeType.NO_UPGRADE_TYPES);

    /** Pilot. */
    public static final Pilot DARTH_VADER = new Pilot("Darth Vader", "A TIE Advanced pilot.", Wave.ONE, true,
            Ship.TIE_ADVANCED, 9, 2, 3, 3, 2, 29, UpgradeType.ELITE_MISSILE_TYPES);

    /** Pilot. */
    public static final Pilot DELTA_SQUADRON_PILOT = new Pilot("Delta Squadron Pilot", "A TIE Defender pilot.",
            Wave.FOUR, Ship.TIE_DEFENDER, 1, 3, 3, 3, 3, 30, UpgradeType.CANNON_MISSILE_TYPES);

    /** Pilot. */
    public static final Pilot DUTCH_VANDER = new Pilot("\"Dutch\" Vander", "A Y-Wing pilot.", Wave.ONE, true,
            Ship.Y_WING, 6, 2, 1, 5, 3, 23, UpgradeType.ASTROMECH_TORPEDOx2_TURRET_TYPES);

    /** Pilot. */
    public static final Pilot ECHO = new Pilot("\"Echo\"", "A TIE Phantom pilot.", Wave.FOUR, true, Ship.TIE_PHANTOM,
            6, 4, 2, 2, 2, 30, UpgradeType.CREW_ELITE_SENSOR_TYPES);

    /** Pilot. */
    public static final Pilot ETAHN_ABAHT = new Pilot("Etahn A'baht", "An E-Wing pilot.", Wave.FOUR, true, Ship.E_WING,
            5, 3, 3, 2, 3, 32, UpgradeType.ASTROMECH_ELITE_SENSOR_TORPEDO_TYPES);

    /** Pilot. */
    public static final Pilot FELS_WRATH = new Pilot(
            "\"Fel's Wrath\"",
            "A TIE Interceptor pilot.",
            Wave.TWO,
            true,
            Ship.TIE_INTERCEPTOR,
            "When the number of Damage cards assigned to you equals or exceeds your hull value, you are not destroyed until the end of the Combat phase.",
            5, 3, 3, 3, 0, 23, UpgradeType.NO_UPGRADE_TYPES);

    /** Pilot. */
    public static final Pilot GAMMA_SQUADRON_PILOT = new Pilot("Gamma Squadron Pilot", "A TIE Bomber pilot.",
            Wave.THREE, Ship.TIE_BOMBER, 4, 2, 2, 6, 0, 18, UpgradeType.BOMB_MISSILEx2_TORPEDOx2_TYPES);

    /** Pilot. */
    public static final Pilot GARVEN_DREIS = new Pilot(
            "Garven Dreis",
            "An X-Wing pilot.",
            Wave.ONE,
            true,
            Ship.X_WING,
            "After spending a focus token, you may place that token on any other friendly ship at Range 1-2 (instead of discarding it).",
            6, 3, 2, 3, 2, 26, UpgradeType.ASTROMECH_TORPEDO_TYPES);

    /** Pilot. */
    public static final Pilot GOLD_SQUADRON_PILOT = new Pilot("Gold Squadron Pilot", "A Y-Wing pilot.", Wave.ONE,
            Ship.Y_WING, 2, 2, 1, 5, 3, 18, UpgradeType.ASTROMECH_TORPEDOx2_TURRET_TYPES);

    /** Pilot. */
    public static final Pilot GRAY_SQUADRON_PILOT = new Pilot("Gray Squadron Pilot", "A Y-Wing pilot.", Wave.ONE,
            Ship.Y_WING, 4, 2, 1, 5, 3, 20, UpgradeType.ASTROMECH_TORPEDOx2_TURRET_TYPES);

    /** Pilot. */
    public static final Pilot GREEN_SQUADRON_PILOT = new Pilot("Green Squadron Pilot", "An A-Wing pilot.", Wave.TWO,
            Ship.A_WING, 3, 2, 3, 2, 2, 19, UpgradeType.ELITE_MISSILE_TYPES);

    /** Pilot. */
    public static final Pilot HAN_SOLO = new Pilot("Han Solo", "A YT-1300 pilot.", Wave.TWO, true, Ship.YT_1300, 9, 3,
            1, 8, 5, 46, UpgradeType.CREWx2_ELITE_MISSILE_TYPES);

    /** Pilot. */
    public static final Pilot HOBBIE_KLIVIAN = new Pilot("\"Hobbie\" Klivian", "An X-Wing pilot.", Wave.THREE_FIVE,
            true, Ship.X_WING,
            "When you acquire or spend a target lock, you may remove 1 stress token from your ship.", 5, 3, 2, 3, 2,
            25, UpgradeType.ASTROMECH_TORPEDO_TYPES);

    /** Pilot. */
    public static final Pilot HORTON_SALM = new Pilot("Horton Salm", "A Y-Wing pilot.", Wave.ONE, true, Ship.Y_WING, 8,
            2, 1, 5, 3, 25, UpgradeType.ASTROMECH_TORPEDOx2_TURRET_TYPES);

    /** Pilot. */
    public static final Pilot HOWLRUNNER = new Pilot("\"Howlrunner\"", "A TIE Fighter pilot.", Wave.ONE, true,
            Ship.TIE_FIGHTER,
            "When another friendly ship at Range 1 is attacking with its primary weapon, it may reroll 1 attack die.",
            8, 2, 3, 3, 0, 18, UpgradeType.ELITE_TYPES);

    /** Pilot. */
    public static final Pilot IBTISAM = new Pilot("Ibtisam", "A B-Wing pilot.", Wave.THREE, true, Ship.B_WING, 6, 3, 1,
            3, 5, 28, UpgradeType.CANNON_ELITE_SENSOR_TORPEDOx2_TYPES);

    /** Pilot. */
    public static final Pilot JAN_ORS = new Pilot("Jan Ors", "An HWK-290 pilot.", Wave.THREE, true, Ship.HWK_290, 8, 1,
            2, 4, 1, 25, UpgradeType.CREW_ELITE_TURRET_TYPES);

    /** Pilot. */
    public static final Pilot JEK_PORKINS = new Pilot(
            "Jek Porkins",
            "An X-Wing pilot.",
            Wave.THREE_FIVE,
            true,
            Ship.X_WING,
            "When you receive a stress token, you may remove it and roll 1 attack die. On a Hit result, deal 1 facedown Damage card to this ship.",
            7, 3, 2, 3, 2, 26, UpgradeType.ASTROMECH_ELITE_TORPEDO_TYPES);

    /** Pilot. */
    public static final Pilot KATH_SCARLET = new Pilot("Kath Scarlet", "A Firespray-31 pilot.", Wave.TWO, true,
            Ship.FIRESPRAY_31, 7, 3, 2, 6, 4, 38, UpgradeType.BOMB_CANNON_CREW_ELITE_MISSILE_TYPES);

    /** Pilot. */
    public static final Pilot KIR_KANOS = new Pilot("Kir Kanos", "A TIE Interceptor pilot.", Wave.THREE_FIVE, true,
            Ship.ROYAL_GUARD_TIE,
            "When attacking at Range 2-3, you may spend 1 evade token to add 1 Hit result to your roll.", 6, 3, 3, 3,
            0, 24, UpgradeType.NO_UPGRADE_TYPES);

    /** Pilot. */
    public static final Pilot KNAVE_SQUADRON_PILOT = new Pilot("Knave Squadron Pilot", "An E-Wing pilot.", Wave.FOUR,
            Ship.E_WING, 1, 3, 3, 2, 3, 27, UpgradeType.ASTROMECH_SENSOR_TORPEDO_TYPES);

    /** Pilot. */
    public static final Pilot KRASSIS_TRELIX = new Pilot("Krassis Trelix", "A Firespray-31 pilot.", Wave.TWO, true,
            Ship.FIRESPRAY_31, 5, 3, 2, 6, 4, 36, UpgradeType.BOMB_CANNON_CREW_MISSILE_TYPES);

    /** Pilot. */
    public static final Pilot KYLE_KATARN = new Pilot("Kyle Katarn", "An HWK-290 pilot.", Wave.THREE, true,
            Ship.HWK_290, 6, 1, 2, 4, 1, 21, UpgradeType.CREW_ELITE_TURRET_TYPES);

    /** Pilot. */
    public static final Pilot LANDO_CALRISSIAN = new Pilot("Lando Calrissian", "A YT-1300 pilot.", Wave.TWO, true,
            Ship.YT_1300, 7, 3, 1, 8, 5, 44, UpgradeType.CREWx2_ELITE_MISSILE_TYPES);

    /** Pilot. */
    public static final Pilot LIEUTENANT_BLOUNT = new Pilot("Lieutenant Blount", "A Z-95 Headhunter pilot.", Wave.FOUR,
            Ship.Z_95_HEADHUNTER, 6, 2, 2, 2, 2, 17, UpgradeType.ELITE_MISSILE_TYPES);

    /** Pilot. */
    public static final Pilot LIEUTENANT_LORRIR = new Pilot(
            "Lieutenant Lorrir",
            "A TIE Interceptor pilot.",
            Wave.THREE_FIVE,
            true,
            Ship.SABER_SQUADRON_TIE,
            "When performing a barrel roll action, you may receive 1 stress token to use the Left Bank 1 or Right Bank 1 template instead of the Straight 1 template.",
            5, 3, 3, 3, 0, 23, UpgradeType.NO_UPGRADE_TYPES);

    /** Pilot. */
    @SuppressWarnings("synthetic-access")
    public static final Pilot LUKE_SKYWALKER = new Pilot("Luke Skywalker", "An X-Wing pilot.", Wave.CORE, true,
            Ship.X_WING, "When defending, you may change 1 of your Focus results to a Evade result.", 8, 3, 2, 3, 2,
            28, UpgradeType.ASTROMECH_ELITE_TORPEDO_TYPES)
    {
        @Override
        public void phaseEffect(final SSEnvironment environment, final SSToken token, final Phase phase)
        {
            super.phaseEffect(environment, token, phase);
            if (phase == Phase.COMBAT_ROLL_DEFENSE_DICE)
            {
                final SSToken attacker = environment.getActiveToken();
                LOGGER.trace("attacker.getDefender() = " + attacker.getDefender());
                if (token == attacker.getDefender())
                {
                    final DefenseDice defenseDice = attacker.getDefenseDice();
                    LOGGER.trace("defenseDice = " + defenseDice);
                    if (defenseDice.getFocusCount() > 0)
                    {
                        defenseDice.changeFirstToValue(DefenseDice.Value.FOCUS, DefenseDice.Value.EVADE);
                        LOGGER.info(getName() + " changed one focus result to an evade result.");
                    }
                }
            }
        }
    };

    /** Pilot. */
    public static final Pilot MAAREK_STELE = new Pilot("Maarek Stele", "A TIE Advanced pilot.", Wave.ONE, true,
            Ship.TIE_ADVANCED, 7, 2, 3, 3, 2, 27, UpgradeType.ELITE_MISSILE_TYPES);

    /** Pilot. */
    public static final Pilot MAJOR_RHYMER = new Pilot("Major Rhymer", "A TIE Bomber pilot.", Wave.THREE, true,
            Ship.TIE_BOMBER, 7, 2, 2, 6, 0, 26, UpgradeType.BOMB_ELITE_MISSILEx2_TORPEDOx2_TYPES);

    /** Pilot. */
    @SuppressWarnings("synthetic-access")
    public static final Pilot MAULER_MITHEL = new Pilot("\"Mauler Mithel\"", "A TIE Fighter pilot.", Wave.CORE, true,
            Ship.TIE_FIGHTER, "When attacking at Range 1, roll 1 additional attack die.", 7, 2, 3, 3, 0, 17,
            UpgradeType.ELITE_TYPES)
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
                    if (range == Range.ONE)
                    {
                        final AttackDice attackDice = attacker.getAttackDice();
                        LOGGER.trace("attackDice before size = " + attackDice.size());
                        attackDice.rollAdditionalDie();
                        LOGGER.trace("attackDice after size  = " + attackDice.size());
                        LOGGER.info(getName() + " rolled an additional attack die.");
                    }
                }
            }
        }
    };

    /** Pilot. */
    public static final Pilot NIGHT_BEAST = new Pilot("\"Night Beast\"", "A TIE Fighter pilot.", Wave.CORE, true,
            Ship.TIE_FIGHTER, "After executing a green maneuver, you may perform a free focus action.", 5, 2, 3, 3, 0,
            15, UpgradeType.NO_UPGRADE_TYPES);

    /** Pilot. */
    public static final Pilot OBSIDIAN_SQUADRON_PILOT = new Pilot("Obsidian Squadron Pilot", "A TIE Fighter pilot.",
            Wave.CORE, Ship.TIE_FIGHTER, 3, 2, 3, 3, 0, 13);

    /** Pilot. */
    public static final Pilot OMICRON_GROUP_PILOT = new Pilot("Omicron Group Pilot", "A Lambda-class shuttle pilot.",
            Wave.THREE, Ship.LAMBDA_CLASS_SHUTTLE, 2, 3, 1, 5, 5, 21, UpgradeType.CANNON_CREWx2_SENSOR_TYPES);

    /** Pilot. */
    public static final Pilot ONYX_SQUADRON_PILOT = new Pilot("Onyx Squadron Pilot", "A TIE Defender pilot.",
            Wave.FOUR, Ship.TIE_DEFENDER, 3, 3, 3, 3, 3, 32, UpgradeType.CANNON_MISSILE_TYPES);

    /** Pilot. */
    public static final Pilot OUTER_RIM_SMUGGLER = new Pilot("Outer Rim Smuggler", "A YT-1300 pilot.", Wave.TWO,
            Ship.YT_1300, 1, 2, 1, 6, 4, 27, UpgradeType.CREWx2_TYPES);

    /** Pilot. */
    public static final Pilot PROTOTYPE_PILOT = new Pilot("Prototype Pilot", "An A-Wing pilot.", Wave.TWO, Ship.A_WING,
            1, 2, 3, 2, 2, 17, UpgradeType.MISSILE_TYPES);

    /** Pilot. */
    public static final Pilot REBEL_OPERATIVE = new Pilot("Rebel Operative", "An HWK-290 pilot.", Wave.THREE,
            Ship.HWK_290, 2, 1, 2, 4, 1, 16, UpgradeType.CREW_TURRET_TYPES);

    /** Pilot. */
    public static final Pilot RED_SQUADRON_PILOT = new Pilot("Red Squadron Pilot", "An X-Wing pilot.", Wave.CORE,
            Ship.X_WING, 4, 3, 2, 3, 2, 23, UpgradeType.ASTROMECH_TORPEDO_TYPES);

    /** Pilot. */
    public static final Pilot REXLER_BRATH = new Pilot("Rexler Brath", "A TIE Defender pilot.", Wave.FOUR,
            Ship.TIE_DEFENDER, 8, 3, 3, 3, 3, 37, UpgradeType.CANNON_ELITE_MISSILE_TYPES);

    /** Pilot. */
    public static final Pilot ROARK_GARNET = new Pilot("Roark Garnet", "An HWK-290 pilot.", Wave.THREE, true,
            Ship.HWK_290, 4, 1, 2, 4, 1, 19, UpgradeType.CREW_TURRET_TYPES);

    /** Pilot. */
    public static final Pilot ROOKIE_PILOT = new Pilot("Rookie Pilot", "An X-Wing pilot.", Wave.CORE, Ship.X_WING, 2,
            3, 2, 3, 2, 21, UpgradeType.ASTROMECH_TORPEDO_TYPES);

    /** Pilot. */
    public static final Pilot ROYAL_GUARD_PILOT = new Pilot("Royal Guard Pilot", "A TIE Interceptor pilot.",
            Wave.THREE_FIVE, Ship.ROYAL_GUARD_TIE, 6, 3, 3, 3, 0, 22, UpgradeType.ELITE_TYPES);

    /** Pilot. */
    public static final Pilot SABER_SQUADRON_PILOT = new Pilot("Saber Squadron Pilot", "A TIE Interceptor pilot.",
            Wave.TWO, Ship.TIE_INTERCEPTOR, 4, 3, 3, 3, 0, 21, UpgradeType.ELITE_TYPES);

    /** Pilot. */
    public static final Pilot SABER_SQUADRON_PILOT2 = new Pilot("Saber Squadron Pilot", "A TIE Interceptor pilot.",
            Wave.THREE_FIVE, Ship.SABER_SQUADRON_TIE, 4, 3, 3, 3, 0, 21, UpgradeType.ELITE_TYPES);

    /** Pilot. */
    public static final Pilot SCIMITAR_SQUADRON_PILOT = new Pilot("Scimitar Squadron Pilot", "A TIE Bomber pilot.",
            Wave.THREE, Ship.TIE_BOMBER, 2, 2, 2, 6, 0, 16, UpgradeType.BOMB_MISSILEx2_TORPEDOx2_TYPES);

    /** Pilot. */
    public static final Pilot SHADOW_SQUADRON_PILOT = new Pilot("Shadow Squadron Pilot", "A TIE Phantom pilot.",
            Wave.FOUR, Ship.TIE_PHANTOM, 5, 4, 2, 2, 2, 27, UpgradeType.CREW_SENSOR_TYPES);

    /** Pilot. */
    public static final Pilot SIGMA_SQUADRON_PILOT = new Pilot("Sigma Squadron Pilot", "A TIE Phantom pilot.",
            Wave.FOUR, Ship.TIE_PHANTOM, 3, 4, 2, 2, 2, 25, UpgradeType.CREW_SENSOR_TYPES);

    /** Pilot. */
    public static final Pilot SOONTIR_FEL = new Pilot("Soontir Fel", "A TIE Interceptor pilot.", Wave.TWO, true,
            Ship.TIE_INTERCEPTOR, "When you receive a stress token, you may assign 1 focus token to your ship.", 9, 3,
            3, 3, 0, 27, UpgradeType.ELITE_TYPES);

    /** Pilot. */
    public static final Pilot STORM_SQUADRON_PILOT = new Pilot("Storm Squadron Pilot", "A TIE Advanced pilot.",
            Wave.ONE, Ship.TIE_ADVANCED, 4, 2, 3, 3, 2, 23, UpgradeType.MISSILE_TYPES);

    /** Pilot. */
    public static final Pilot TALA_SQUADRON_PILOT = new Pilot("Tala Squadron Pilot", "A Z-95 Headhunter pilot.",
            Wave.FOUR, Ship.Z_95_HEADHUNTER, 4, 2, 2, 2, 2, 13, UpgradeType.MISSILE_TYPES);

    /** Pilot. */
    public static final Pilot TARN_MISON = new Pilot("Tarn Mison", "An X-Wing pilot.", Wave.THREE_FIVE, true,
            Ship.X_WING,
            "When an enemy ship declares you as the target of an attack, you may acquire a target lock on that ship.",
            3, 3, 2, 3, 2, 23, UpgradeType.ASTROMECH_TORPEDO_TYPES);

    /** Pilot. */
    public static final Pilot TEMPEST_SQUADRON_PILOT = new Pilot("Tempest Squadron Pilot", "A TIE Advanced pilot.",
            Wave.ONE, Ship.TIE_ADVANCED, 2, 2, 3, 3, 2, 21, UpgradeType.MISSILE_TYPES);

    /** Pilot. */
    public static final Pilot TEN_NUMB = new Pilot("Ten Numb", "A B-Wing pilot.", Wave.THREE, true, Ship.B_WING, 8, 3,
            1, 3, 5, 31, UpgradeType.CANNON_ELITE_SENSOR_TORPEDOx2_TYPES);

    /** Pilot. */
    public static final Pilot TETRAN_COWALL = new Pilot(
            "Tetran Cowall",
            "A TIE Interceptor pilot.",
            Wave.THREE_FIVE,
            true,
            Ship.SABER_SQUADRON_TIE,
            "When you reveal a Koiogran Turn maneuver, you may treat the speed of that maneuver as \"1,\" \"3,\" or \"5.\"",
            7, 3, 3, 3, 0, 24, UpgradeType.ELITE_TYPES);

    /** Pilot. */
    public static final Pilot TURR_PHENNIR = new Pilot("Turr Phennir", "A TIE Interceptor pilot.", Wave.TWO, true,
            Ship.TIE_INTERCEPTOR, "After you perform an attack, you may perform a free boost or barrel roll action.",
            7, 3, 3, 3, 0, 25, UpgradeType.ELITE_TYPES);

    /** Pilot. */
    public static final Pilot TYCHO_CELCHU = new Pilot("Tycho Celchu", "An A-Wing pilot.", Wave.TWO, true, Ship.A_WING,
            8, 2, 3, 2, 2, 26, UpgradeType.ELITE_MISSILE_TYPES);

    /** Pilot. */
    public static final Pilot WEDGE_ANTILLES = new Pilot("Wedge Antilles", "An X-Wing pilot.", Wave.ONE, true,
            Ship.X_WING, "When attacking, reduce the defender's agility value by 1 (to a minimum of \"0\").", 9, 3, 2,
            3, 2, 29, UpgradeType.ASTROMECH_ELITE_TORPEDO_TYPES);

    /** Pilot. */
    public static final Pilot WES_JANSON = new Pilot("Wes Janson", "An X-Wing pilot.", Wave.THREE_FIVE, true,
            Ship.X_WING,
            "After you perform an attack, you may remove 1 focus, evade, or blue target lock token from the defender.",
            8, 3, 2, 3, 2, 29, UpgradeType.ASTROMECH_ELITE_TORPEDO_TYPES);

    /** Pilot. */
    @SuppressWarnings("synthetic-access")
    public static final Pilot WHISPER = new Pilot("\"Whisper\"", "A TIE Phantom pilot.", Wave.FOUR, true,
            Ship.TIE_PHANTOM, "After you perform an attack that hits, you may assign 1 focus token to your ship.", 7,
            4, 2, 2, 2, 32, UpgradeType.CREW_ELITE_SENSOR_TYPES)
    {
        @Override
        public void phaseEffect(final SSEnvironment environment, final SSToken token, final Phase phase)
        {
            if (phase == Phase.COMBAT_DEAL_DAMAGE)
            {
                if (token == environment.getActiveToken())
                {
                    if (token.isDefenderHit())
                    {
                        super.phaseEffect(environment, token, phase);
                        token.increaseFocusCount();
                        LOGGER.info(getName() + " assigned 1 focus token.");
                    }
                }
            }
        }
    };

    /** Pilot. */
    public static final Pilot WINGED_GUNDARK = new Pilot("\"Winged Gundark\"", "A TIE Fighter pilot.", Wave.ONE, true,
            Ship.TIE_FIGHTER,
            "When attacking at Range 1, you may change 1 of your Hit results to a Critical Hit result.", 5, 2, 3, 3, 0,
            15, UpgradeType.NO_UPGRADE_TYPES);

    /** Logger. */
    private static final Logger LOGGER = LogManager.getLogger();

    /** Values. */
    private static List<Pilot> VALUES;

    /** Description. */
    private final String description;

    /** Flag indicating whether this pilot is unique. */
    private final boolean isUnique;

    /** Name. */
    private final String name;

    /** Pilot ability. */
    private final String pilotAbility;

    /** Primary weapon. */
    private final Weapon primaryWeapon;

    /** Ship type. */
    private final Ship ship;

    /** Ship state. */
    private final ImmutableShipState shipState;

    /** Squad point cost. */
    private final int squadPointCost;

    /** Upgrade types. */
    private final List<UpgradeType> upgradeTypes;

    /** Wave. */
    private final Wave wave;

    /**
     * Construct this object.
     *
     * @param name Name.
     * @param description Description.
     * @param wave Wave.
     * @param isUnique Flag indicating whether this pilot is unique.
     * @param ship Ship.
     * @param pilotSkillValue Pilot skill value.
     * @param primaryWeaponValue Primary weapon value.
     * @param agilityValue Agility value.
     * @param hullValue Hull value.
     * @param shieldValue Shield value.
     * @param squadPointCost Squad point cost.
     */
    @SuppressWarnings({ "hiding", "unchecked" })
    private Pilot(final String name, final String description, final Wave wave, final boolean isUnique,
            final Ship ship, final int pilotSkillValue, final int primaryWeaponValue, final int agilityValue,
            final int hullValue, final int shieldValue, final int squadPointCost)
    {
        this(name, description, wave, isUnique, ship, pilotSkillValue, primaryWeaponValue, agilityValue, hullValue,
                shieldValue, squadPointCost, Collections.EMPTY_LIST);
    }

    /**
     * Construct this object.
     *
     * @param name Name.
     * @param description Description.
     * @param wave Wave.
     * @param isUnique Flag indicating whether this pilot is unique.
     * @param ship Ship.
     * @param pilotSkillValue Pilot skill value.
     * @param primaryWeaponValue Primary weapon value.
     * @param agilityValue Agility value.
     * @param hullValue Hull value.
     * @param shieldValue Shield value.
     * @param squadPointCost Squad point cost.
     * @param upgradeTypes Upgrade types.
     */
    @SuppressWarnings("hiding")
    private Pilot(final String name, final String description, final Wave wave, final boolean isUnique,
            final Ship ship, final int pilotSkillValue, final int primaryWeaponValue, final int agilityValue,
            final int hullValue, final int shieldValue, final int squadPointCost, final List<UpgradeType> upgradeTypes)
    {
        this(name, description, wave, isUnique, ship, null, pilotSkillValue, primaryWeaponValue, agilityValue,
                hullValue, shieldValue, squadPointCost, upgradeTypes);
    }

    /**
     * Construct this object.
     *
     * @param name Name.
     * @param description Description.
     * @param wave Wave.
     * @param isUnique Flag indicating whether this pilot is unique.
     * @param ship Ship.
     * @param pilotAbility Pilot ability.
     * @param pilotSkillValue Pilot skill value.
     * @param primaryWeaponValue Primary weapon value.
     * @param agilityValue Agility value.
     * @param hullValue Hull value.
     * @param shieldValue Shield value.
     * @param squadPointCost Squad point cost.
     * @param upgradeTypes Upgrade types.
     */
    @SuppressWarnings("hiding")
    private Pilot(final String name, final String description, final Wave wave, final boolean isUnique,
            final Ship ship, final String pilotAbility, final int pilotSkillValue, final int primaryWeaponValue,
            final int agilityValue, final int hullValue, final int shieldValue, final int squadPointCost,
            final List<UpgradeType> upgradeTypes)
    {
        InputValidator.validateNotEmpty("name", name);
        InputValidator.validateNotEmpty("description", description);
        InputValidator.validateNotNull("ship", ship);
        InputValidator.validateNotNull("upgradeTypes", upgradeTypes);

        this.name = name;
        this.description = description;
        this.wave = wave;
        this.isUnique = isUnique;
        this.ship = ship;
        this.pilotAbility = pilotAbility;
        this.squadPointCost = squadPointCost;
        this.upgradeTypes = upgradeTypes;

        this.shipState = new ImmutableShipState(pilotSkillValue, primaryWeaponValue, agilityValue, hullValue,
                shieldValue);
        this.primaryWeapon = createPrimaryWeapon(primaryWeaponValue);

        if (VALUES == null)
        {
            VALUES = new ArrayList<Pilot>();
        }

        VALUES.add(this);
    }

    /**
     * Construct this object.
     *
     * @param name Name.
     * @param description Description.
     * @param wave Wave.
     * @param ship Ship.
     * @param pilotSkillValue Pilot skill value.
     * @param primaryWeaponValue Primary weapon value.
     * @param agilityValue Agility value.
     * @param hullValue Hull value.
     * @param shieldValue Shield value.
     * @param squadPointCost Squad point cost.
     */
    @SuppressWarnings({ "hiding", "unchecked" })
    private Pilot(final String name, final String description, final Wave wave, final Ship ship,
            final int pilotSkillValue, final int primaryWeaponValue, final int agilityValue, final int hullValue,
            final int shieldValue, final int squadPointCost)
    {
        this(name, description, wave, false, ship, pilotSkillValue, primaryWeaponValue, agilityValue, hullValue,
                shieldValue, squadPointCost, Collections.EMPTY_LIST);
    }

    /**
     * Construct this object.
     *
     * @param name Name.
     * @param description Description.
     * @param wave Wave.
     * @param ship Ship.
     * @param pilotSkillValue Pilot skill value.
     * @param primaryWeaponValue Primary weapon value.
     * @param agilityValue Agility value.
     * @param hullValue Hull value.
     * @param shieldValue Shield value.
     * @param squadPointCost Squad point cost.
     * @param upgradeTypes Upgrade types.
     */
    @SuppressWarnings("hiding")
    private Pilot(final String name, final String description, final Wave wave, final Ship ship,
            final int pilotSkillValue, final int primaryWeaponValue, final int agilityValue, final int hullValue,
            final int shieldValue, final int squadPointCost, final List<UpgradeType> upgradeTypes)
    {
        this(name, description, wave, false, ship, pilotSkillValue, primaryWeaponValue, agilityValue, hullValue,
                shieldValue, squadPointCost, upgradeTypes);
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
     * @return the maneuvers
     */
    public ManeuverSet getManeuvers()
    {
        return ship.getManeuvers();
    }

    /**
     * @return the name
     */
    public String getName()
    {
        return name;
    }

    /**
     * @return the pilotAbility
     */
    public String getPilotAbility()
    {
        return pilotAbility;
    }

    @Override
    public int getPilotSkillValue()
    {
        return shipState.getPilotSkillValue();
    }

    /**
     * @return the primaryWeapon
     */
    public Weapon getPrimaryWeapon()
    {
        return primaryWeapon;
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
     * @return the ship
     */
    public Ship getShip()
    {
        return ship;
    }

    /**
     * @return the maneuvers
     */
    public Set<ShipAction> getShipActions()
    {
        return ship.getShipActions();
    }

    /**
     * @return the shipState
     */
    public ShipState getShipState()
    {
        return shipState;
    }

    /**
     * @return the squadPointCost
     */
    public int getSquadPointCost()
    {
        return squadPointCost;
    }

    /**
     * @return the upgradeTypes
     */
    public List<UpgradeType> getUpgradeTypes()
    {
        return upgradeTypes;
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
        return false;
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

    /**
     * @param primaryWeaponValue Primary weapon value.
     *
     * @return a new primary weapon.
     */
    private Weapon createPrimaryWeapon(final int primaryWeaponValue)
    {
        Weapon answer;

        if (ship == Ship.YT_1300)
        {
            answer = new TurretWeapon(PrimaryWeapon.NAME, true, primaryWeaponValue, Range.ONE, Range.TWO, Range.THREE);
        }
        else
        {
            answer = new PrimaryWeapon(primaryWeaponValue, Range.ONE, Range.TWO, Range.THREE);
        }

        return answer;
    }
}
