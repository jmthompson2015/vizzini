package org.vizzini.starfightersquadrons;

import java.util.Collection;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

import org.vizzini.starfightersquadrons.Maneuver.BarrelRollManeuver;
import org.vizzini.starfightersquadrons.Maneuver.Bearing;
import org.vizzini.starfightersquadrons.Maneuver.BoostManeuver;
import org.vizzini.starfightersquadrons.Maneuver.Difficulty;
import org.vizzini.starfightersquadrons.Maneuver.StationaryManeuver;

/**
 * Provides a maneuver set for Starfighter Squadrons.
 */
public final class ManeuverSet implements Set<Maneuver>
{
    /** Maneuvers. */
    public static final ManeuverSet BARREL_ROLL_MANEUVERS = new ManeuverSet();

    static
    {
        BARREL_ROLL_MANEUVERS.add(BarrelRollManeuver.BARREL_ROLL_LEFT_1);
        BARREL_ROLL_MANEUVERS.add(BarrelRollManeuver.BARREL_ROLL_RIGHT_1);
    }

    /** Maneuvers. */
    public static final ManeuverSet BOOST_MANEUVERS = new ManeuverSet();

    static
    {
        BOOST_MANEUVERS.add(BoostManeuver.BOOST_BANK_LEFT_1_STANDARD);
        BOOST_MANEUVERS.add(BoostManeuver.BOOST_STRAIGHT_1_STANDARD);
        BOOST_MANEUVERS.add(BoostManeuver.BOOST_BANK_RIGHT_1_STANDARD);
    }

    /** Maneuvers. */
    public static final ManeuverSet DECLOAK_MANEUVERS = new ManeuverSet();

    static
    {
        DECLOAK_MANEUVERS.add(BarrelRollManeuver.BARREL_ROLL_LEFT_2);
        DECLOAK_MANEUVERS.add(Maneuver.STRAIGHT_2_STANDARD);
        DECLOAK_MANEUVERS.add(BarrelRollManeuver.BARREL_ROLL_RIGHT_2);
    }

    /** Maneuvers. */
    public static final ManeuverSet A_WING_MANEUVERS = new ManeuverSet();

    static
    {
        A_WING_MANEUVERS.add(Maneuver.TURN_LEFT_1_STANDARD);
        A_WING_MANEUVERS.add(Maneuver.TURN_RIGHT_1_STANDARD);

        A_WING_MANEUVERS.add(Maneuver.TURN_LEFT_2_EASY);
        A_WING_MANEUVERS.add(Maneuver.BANK_LEFT_2_EASY);
        A_WING_MANEUVERS.add(Maneuver.STRAIGHT_2_EASY);
        A_WING_MANEUVERS.add(Maneuver.BANK_RIGHT_2_EASY);
        A_WING_MANEUVERS.add(Maneuver.TURN_RIGHT_2_EASY);

        A_WING_MANEUVERS.add(Maneuver.TURN_LEFT_3_STANDARD);
        A_WING_MANEUVERS.add(Maneuver.BANK_LEFT_3_STANDARD);
        A_WING_MANEUVERS.add(Maneuver.STRAIGHT_3_EASY);
        A_WING_MANEUVERS.add(Maneuver.BANK_RIGHT_3_STANDARD);
        A_WING_MANEUVERS.add(Maneuver.TURN_RIGHT_3_STANDARD);
        A_WING_MANEUVERS.add(Maneuver.KOIOGRAN_TURN_3_HARD);

        A_WING_MANEUVERS.add(Maneuver.STRAIGHT_4_EASY);

        A_WING_MANEUVERS.add(Maneuver.STRAIGHT_5_EASY);
        A_WING_MANEUVERS.add(Maneuver.KOIOGRAN_TURN_5_HARD);
    }

    /** Maneuvers. */
    public static final ManeuverSet B_WING_MANEUVERS = new ManeuverSet();

    static
    {
        B_WING_MANEUVERS.add(Maneuver.TURN_LEFT_1_HARD);
        B_WING_MANEUVERS.add(Maneuver.BANK_LEFT_1_EASY);
        B_WING_MANEUVERS.add(Maneuver.STRAIGHT_1_EASY);
        B_WING_MANEUVERS.add(Maneuver.BANK_RIGHT_1_EASY);
        B_WING_MANEUVERS.add(Maneuver.TURN_RIGHT_1_HARD);

        B_WING_MANEUVERS.add(Maneuver.TURN_LEFT_2_STANDARD);
        B_WING_MANEUVERS.add(Maneuver.BANK_LEFT_2_STANDARD);
        B_WING_MANEUVERS.add(Maneuver.STRAIGHT_2_EASY);
        B_WING_MANEUVERS.add(Maneuver.BANK_RIGHT_2_STANDARD);
        B_WING_MANEUVERS.add(Maneuver.TURN_RIGHT_2_STANDARD);
        B_WING_MANEUVERS.add(Maneuver.KOIOGRAN_TURN_2_HARD);

        B_WING_MANEUVERS.add(Maneuver.BANK_LEFT_3_HARD);
        B_WING_MANEUVERS.add(Maneuver.STRAIGHT_3_STANDARD);
        B_WING_MANEUVERS.add(Maneuver.BANK_RIGHT_3_HARD);

        B_WING_MANEUVERS.add(Maneuver.STRAIGHT_4_HARD);
    }
    /** Maneuvers. */
    public static final ManeuverSet E_WING_MANEUVERS = new ManeuverSet();

    static
    {
        E_WING_MANEUVERS.add(Maneuver.BANK_LEFT_1_STANDARD);
        E_WING_MANEUVERS.add(Maneuver.STRAIGHT_1_EASY);
        E_WING_MANEUVERS.add(Maneuver.BANK_RIGHT_1_STANDARD);

        E_WING_MANEUVERS.add(Maneuver.TURN_LEFT_2_STANDARD);
        E_WING_MANEUVERS.add(Maneuver.BANK_LEFT_2_EASY);
        E_WING_MANEUVERS.add(Maneuver.STRAIGHT_2_EASY);
        E_WING_MANEUVERS.add(Maneuver.BANK_RIGHT_2_EASY);
        E_WING_MANEUVERS.add(Maneuver.TURN_RIGHT_2_STANDARD);

        E_WING_MANEUVERS.add(Maneuver.TURN_LEFT_3_STANDARD);
        E_WING_MANEUVERS.add(Maneuver.BANK_LEFT_3_STANDARD);
        E_WING_MANEUVERS.add(Maneuver.STRAIGHT_3_EASY);
        E_WING_MANEUVERS.add(Maneuver.BANK_RIGHT_3_STANDARD);
        E_WING_MANEUVERS.add(Maneuver.TURN_RIGHT_3_STANDARD);
        E_WING_MANEUVERS.add(Maneuver.KOIOGRAN_TURN_3_HARD);

        E_WING_MANEUVERS.add(Maneuver.STRAIGHT_4_STANDARD);
        E_WING_MANEUVERS.add(Maneuver.KOIOGRAN_TURN_4_HARD);

        E_WING_MANEUVERS.add(Maneuver.STRAIGHT_5_STANDARD);
    }

    /** Maneuvers. */
    public static final ManeuverSet FIRESPRAY_31_MANEUVERS = new ManeuverSet();

    static
    {
        FIRESPRAY_31_MANEUVERS.add(Maneuver.BANK_LEFT_1_EASY);
        FIRESPRAY_31_MANEUVERS.add(Maneuver.STRAIGHT_1_EASY);
        FIRESPRAY_31_MANEUVERS.add(Maneuver.BANK_RIGHT_1_EASY);

        FIRESPRAY_31_MANEUVERS.add(Maneuver.TURN_LEFT_2_STANDARD);
        FIRESPRAY_31_MANEUVERS.add(Maneuver.BANK_LEFT_2_STANDARD);
        FIRESPRAY_31_MANEUVERS.add(Maneuver.STRAIGHT_2_EASY);
        FIRESPRAY_31_MANEUVERS.add(Maneuver.BANK_RIGHT_2_STANDARD);
        FIRESPRAY_31_MANEUVERS.add(Maneuver.TURN_RIGHT_2_STANDARD);

        FIRESPRAY_31_MANEUVERS.add(Maneuver.TURN_LEFT_3_STANDARD);
        FIRESPRAY_31_MANEUVERS.add(Maneuver.BANK_LEFT_3_STANDARD);
        FIRESPRAY_31_MANEUVERS.add(Maneuver.STRAIGHT_3_STANDARD);
        FIRESPRAY_31_MANEUVERS.add(Maneuver.BANK_RIGHT_3_STANDARD);
        FIRESPRAY_31_MANEUVERS.add(Maneuver.TURN_RIGHT_3_STANDARD);
        FIRESPRAY_31_MANEUVERS.add(Maneuver.KOIOGRAN_TURN_3_HARD);

        FIRESPRAY_31_MANEUVERS.add(Maneuver.STRAIGHT_4_STANDARD);
        FIRESPRAY_31_MANEUVERS.add(Maneuver.KOIOGRAN_TURN_4_HARD);
    }

    /** Maneuvers. */
    public static final ManeuverSet HWK_290_MANEUVERS = new ManeuverSet();

    static
    {
        HWK_290_MANEUVERS.add(Maneuver.BANK_LEFT_1_EASY);
        HWK_290_MANEUVERS.add(Maneuver.STRAIGHT_1_EASY);
        HWK_290_MANEUVERS.add(Maneuver.BANK_RIGHT_1_EASY);

        HWK_290_MANEUVERS.add(Maneuver.TURN_LEFT_2_STANDARD);
        HWK_290_MANEUVERS.add(Maneuver.BANK_LEFT_2_STANDARD);
        HWK_290_MANEUVERS.add(Maneuver.STRAIGHT_2_EASY);
        HWK_290_MANEUVERS.add(Maneuver.BANK_RIGHT_2_STANDARD);
        HWK_290_MANEUVERS.add(Maneuver.TURN_RIGHT_2_STANDARD);

        HWK_290_MANEUVERS.add(Maneuver.BANK_LEFT_3_HARD);
        HWK_290_MANEUVERS.add(Maneuver.STRAIGHT_3_STANDARD);
        HWK_290_MANEUVERS.add(Maneuver.BANK_RIGHT_3_HARD);

        HWK_290_MANEUVERS.add(Maneuver.STRAIGHT_4_HARD);
    }

    /** Maneuvers. */
    public static final ManeuverSet LAMBDA_CLASS_SHUTTLE_MANEUVERS = new ManeuverSet();

    static
    {
        LAMBDA_CLASS_SHUTTLE_MANEUVERS.add(StationaryManeuver.STATIONARY_0_HARD);

        LAMBDA_CLASS_SHUTTLE_MANEUVERS.add(Maneuver.BANK_LEFT_1_EASY);
        LAMBDA_CLASS_SHUTTLE_MANEUVERS.add(Maneuver.STRAIGHT_1_EASY);
        LAMBDA_CLASS_SHUTTLE_MANEUVERS.add(Maneuver.BANK_RIGHT_1_EASY);

        LAMBDA_CLASS_SHUTTLE_MANEUVERS.add(Maneuver.TURN_LEFT_2_HARD);
        LAMBDA_CLASS_SHUTTLE_MANEUVERS.add(Maneuver.BANK_LEFT_2_STANDARD);
        LAMBDA_CLASS_SHUTTLE_MANEUVERS.add(Maneuver.STRAIGHT_2_EASY);
        LAMBDA_CLASS_SHUTTLE_MANEUVERS.add(Maneuver.BANK_RIGHT_2_STANDARD);
        LAMBDA_CLASS_SHUTTLE_MANEUVERS.add(Maneuver.TURN_RIGHT_2_HARD);

        LAMBDA_CLASS_SHUTTLE_MANEUVERS.add(Maneuver.BANK_LEFT_3_HARD);
        LAMBDA_CLASS_SHUTTLE_MANEUVERS.add(Maneuver.STRAIGHT_3_STANDARD);
        LAMBDA_CLASS_SHUTTLE_MANEUVERS.add(Maneuver.BANK_RIGHT_3_HARD);
    }

    /** Maneuvers. */
    public static final ManeuverSet TIE_ADVANCED_MANEUVERS = new ManeuverSet();

    static
    {
        TIE_ADVANCED_MANEUVERS.add(Maneuver.BANK_LEFT_1_EASY);
        TIE_ADVANCED_MANEUVERS.add(Maneuver.BANK_RIGHT_1_EASY);

        TIE_ADVANCED_MANEUVERS.add(Maneuver.TURN_LEFT_2_STANDARD);
        TIE_ADVANCED_MANEUVERS.add(Maneuver.BANK_LEFT_2_STANDARD);
        TIE_ADVANCED_MANEUVERS.add(Maneuver.STRAIGHT_2_EASY);
        TIE_ADVANCED_MANEUVERS.add(Maneuver.BANK_RIGHT_2_STANDARD);
        TIE_ADVANCED_MANEUVERS.add(Maneuver.TURN_RIGHT_2_STANDARD);

        TIE_ADVANCED_MANEUVERS.add(Maneuver.TURN_LEFT_3_STANDARD);
        TIE_ADVANCED_MANEUVERS.add(Maneuver.BANK_LEFT_3_STANDARD);
        TIE_ADVANCED_MANEUVERS.add(Maneuver.STRAIGHT_3_EASY);
        TIE_ADVANCED_MANEUVERS.add(Maneuver.BANK_RIGHT_3_STANDARD);
        TIE_ADVANCED_MANEUVERS.add(Maneuver.TURN_RIGHT_3_STANDARD);

        TIE_ADVANCED_MANEUVERS.add(Maneuver.STRAIGHT_4_STANDARD);
        TIE_ADVANCED_MANEUVERS.add(Maneuver.KOIOGRAN_TURN_4_HARD);

        TIE_ADVANCED_MANEUVERS.add(Maneuver.STRAIGHT_5_STANDARD);
    }

    /** Maneuvers. */
    public static final ManeuverSet TIE_BOMBER_MANEUVERS = new ManeuverSet();

    static
    {
        TIE_BOMBER_MANEUVERS.add(Maneuver.BANK_LEFT_1_STANDARD);
        TIE_BOMBER_MANEUVERS.add(Maneuver.STRAIGHT_1_EASY);
        TIE_BOMBER_MANEUVERS.add(Maneuver.BANK_RIGHT_1_STANDARD);

        TIE_BOMBER_MANEUVERS.add(Maneuver.TURN_LEFT_2_HARD);
        TIE_BOMBER_MANEUVERS.add(Maneuver.BANK_LEFT_2_EASY);
        TIE_BOMBER_MANEUVERS.add(Maneuver.STRAIGHT_2_EASY);
        TIE_BOMBER_MANEUVERS.add(Maneuver.BANK_RIGHT_2_EASY);
        TIE_BOMBER_MANEUVERS.add(Maneuver.TURN_RIGHT_2_HARD);

        TIE_BOMBER_MANEUVERS.add(Maneuver.TURN_LEFT_3_STANDARD);
        TIE_BOMBER_MANEUVERS.add(Maneuver.BANK_LEFT_3_STANDARD);
        TIE_BOMBER_MANEUVERS.add(Maneuver.STRAIGHT_3_EASY);
        TIE_BOMBER_MANEUVERS.add(Maneuver.BANK_RIGHT_3_STANDARD);
        TIE_BOMBER_MANEUVERS.add(Maneuver.TURN_RIGHT_3_STANDARD);

        TIE_BOMBER_MANEUVERS.add(Maneuver.STRAIGHT_4_STANDARD);

        TIE_BOMBER_MANEUVERS.add(Maneuver.KOIOGRAN_TURN_5_HARD);
    }

    /** Maneuvers. */
    public static final ManeuverSet TIE_DEFENDER_MANEUVERS = new ManeuverSet();

    static
    {
        TIE_DEFENDER_MANEUVERS.add(Maneuver.TURN_LEFT_1_HARD);
        TIE_DEFENDER_MANEUVERS.add(Maneuver.BANK_LEFT_1_STANDARD);
        TIE_DEFENDER_MANEUVERS.add(Maneuver.BANK_RIGHT_1_STANDARD);
        TIE_DEFENDER_MANEUVERS.add(Maneuver.TURN_RIGHT_1_HARD);

        TIE_DEFENDER_MANEUVERS.add(Maneuver.TURN_LEFT_2_HARD);
        TIE_DEFENDER_MANEUVERS.add(Maneuver.BANK_LEFT_2_STANDARD);
        TIE_DEFENDER_MANEUVERS.add(Maneuver.STRAIGHT_2_EASY);
        TIE_DEFENDER_MANEUVERS.add(Maneuver.BANK_RIGHT_2_STANDARD);
        TIE_DEFENDER_MANEUVERS.add(Maneuver.TURN_RIGHT_2_HARD);

        TIE_DEFENDER_MANEUVERS.add(Maneuver.TURN_LEFT_3_STANDARD);
        TIE_DEFENDER_MANEUVERS.add(Maneuver.BANK_LEFT_3_STANDARD);
        TIE_DEFENDER_MANEUVERS.add(Maneuver.STRAIGHT_3_EASY);
        TIE_DEFENDER_MANEUVERS.add(Maneuver.BANK_RIGHT_3_STANDARD);
        TIE_DEFENDER_MANEUVERS.add(Maneuver.TURN_RIGHT_3_STANDARD);

        TIE_DEFENDER_MANEUVERS.add(Maneuver.STRAIGHT_4_EASY);
        TIE_DEFENDER_MANEUVERS.add(Maneuver.KOIOGRAN_TURN_4_STANDARD);

        TIE_DEFENDER_MANEUVERS.add(Maneuver.STRAIGHT_5_EASY);
    }

    /** Maneuvers. */
    public static final ManeuverSet TIE_FIGHTER_MANEUVERS = new ManeuverSet();

    static
    {
        TIE_FIGHTER_MANEUVERS.add(Maneuver.TURN_LEFT_1_STANDARD);
        TIE_FIGHTER_MANEUVERS.add(Maneuver.TURN_RIGHT_1_STANDARD);

        TIE_FIGHTER_MANEUVERS.add(Maneuver.TURN_LEFT_2_STANDARD);
        TIE_FIGHTER_MANEUVERS.add(Maneuver.BANK_LEFT_2_EASY);
        TIE_FIGHTER_MANEUVERS.add(Maneuver.STRAIGHT_2_EASY);
        TIE_FIGHTER_MANEUVERS.add(Maneuver.BANK_RIGHT_2_EASY);
        TIE_FIGHTER_MANEUVERS.add(Maneuver.TURN_RIGHT_2_STANDARD);

        TIE_FIGHTER_MANEUVERS.add(Maneuver.TURN_LEFT_3_STANDARD);
        TIE_FIGHTER_MANEUVERS.add(Maneuver.BANK_LEFT_3_STANDARD);
        TIE_FIGHTER_MANEUVERS.add(Maneuver.STRAIGHT_3_EASY);
        TIE_FIGHTER_MANEUVERS.add(Maneuver.BANK_RIGHT_3_STANDARD);
        TIE_FIGHTER_MANEUVERS.add(Maneuver.TURN_RIGHT_3_STANDARD);
        TIE_FIGHTER_MANEUVERS.add(Maneuver.KOIOGRAN_TURN_3_HARD);

        TIE_FIGHTER_MANEUVERS.add(Maneuver.STRAIGHT_4_STANDARD);
        TIE_FIGHTER_MANEUVERS.add(Maneuver.KOIOGRAN_TURN_4_HARD);

        TIE_FIGHTER_MANEUVERS.add(Maneuver.STRAIGHT_5_STANDARD);
    }

    /** Maneuvers. */
    public static final ManeuverSet TIE_INTERCEPTOR_MANEUVERS = new ManeuverSet();

    static
    {
        TIE_INTERCEPTOR_MANEUVERS.add(Maneuver.TURN_LEFT_1_STANDARD);
        TIE_INTERCEPTOR_MANEUVERS.add(Maneuver.TURN_RIGHT_1_STANDARD);

        TIE_INTERCEPTOR_MANEUVERS.add(Maneuver.TURN_LEFT_2_EASY);
        TIE_INTERCEPTOR_MANEUVERS.add(Maneuver.BANK_LEFT_2_EASY);
        TIE_INTERCEPTOR_MANEUVERS.add(Maneuver.STRAIGHT_2_EASY);
        TIE_INTERCEPTOR_MANEUVERS.add(Maneuver.BANK_RIGHT_2_EASY);
        TIE_INTERCEPTOR_MANEUVERS.add(Maneuver.TURN_RIGHT_2_EASY);

        TIE_INTERCEPTOR_MANEUVERS.add(Maneuver.TURN_LEFT_3_STANDARD);
        TIE_INTERCEPTOR_MANEUVERS.add(Maneuver.BANK_LEFT_3_STANDARD);
        TIE_INTERCEPTOR_MANEUVERS.add(Maneuver.STRAIGHT_3_EASY);
        TIE_INTERCEPTOR_MANEUVERS.add(Maneuver.BANK_RIGHT_3_STANDARD);
        TIE_INTERCEPTOR_MANEUVERS.add(Maneuver.TURN_RIGHT_3_STANDARD);
        TIE_INTERCEPTOR_MANEUVERS.add(Maneuver.KOIOGRAN_TURN_3_HARD);

        TIE_INTERCEPTOR_MANEUVERS.add(Maneuver.STRAIGHT_4_EASY);

        TIE_INTERCEPTOR_MANEUVERS.add(Maneuver.STRAIGHT_5_STANDARD);
        TIE_INTERCEPTOR_MANEUVERS.add(Maneuver.KOIOGRAN_TURN_5_HARD);
    }

    /** Maneuvers. */
    public static final ManeuverSet TIE_PHANTOM_MANEUVERS = new ManeuverSet();

    static
    {
        TIE_PHANTOM_MANEUVERS.add(Maneuver.TURN_LEFT_1_STANDARD);
        TIE_PHANTOM_MANEUVERS.add(Maneuver.TURN_RIGHT_1_STANDARD);

        TIE_PHANTOM_MANEUVERS.add(Maneuver.TURN_LEFT_2_STANDARD);
        TIE_PHANTOM_MANEUVERS.add(Maneuver.BANK_LEFT_2_EASY);
        TIE_PHANTOM_MANEUVERS.add(Maneuver.STRAIGHT_2_EASY);
        TIE_PHANTOM_MANEUVERS.add(Maneuver.BANK_RIGHT_2_EASY);
        TIE_PHANTOM_MANEUVERS.add(Maneuver.TURN_RIGHT_2_STANDARD);

        TIE_PHANTOM_MANEUVERS.add(Maneuver.TURN_LEFT_3_STANDARD);
        TIE_PHANTOM_MANEUVERS.add(Maneuver.BANK_LEFT_3_STANDARD);
        TIE_PHANTOM_MANEUVERS.add(Maneuver.STRAIGHT_3_EASY);
        TIE_PHANTOM_MANEUVERS.add(Maneuver.BANK_RIGHT_3_STANDARD);
        TIE_PHANTOM_MANEUVERS.add(Maneuver.TURN_RIGHT_3_STANDARD);
        TIE_PHANTOM_MANEUVERS.add(Maneuver.KOIOGRAN_TURN_3_HARD);

        TIE_PHANTOM_MANEUVERS.add(Maneuver.STRAIGHT_4_STANDARD);
        TIE_PHANTOM_MANEUVERS.add(Maneuver.KOIOGRAN_TURN_4_HARD);
    }

    /** Maneuvers. */
    public static final ManeuverSet X_WING_MANEUVERS = new ManeuverSet();

    static
    {
        X_WING_MANEUVERS.add(Maneuver.BANK_LEFT_1_EASY);
        X_WING_MANEUVERS.add(Maneuver.STRAIGHT_1_EASY);
        X_WING_MANEUVERS.add(Maneuver.BANK_RIGHT_1_EASY);

        X_WING_MANEUVERS.add(Maneuver.TURN_LEFT_2_STANDARD);
        X_WING_MANEUVERS.add(Maneuver.BANK_LEFT_2_STANDARD);
        X_WING_MANEUVERS.add(Maneuver.STRAIGHT_2_EASY);
        X_WING_MANEUVERS.add(Maneuver.BANK_RIGHT_2_STANDARD);
        X_WING_MANEUVERS.add(Maneuver.TURN_RIGHT_2_STANDARD);

        X_WING_MANEUVERS.add(Maneuver.TURN_LEFT_3_STANDARD);
        X_WING_MANEUVERS.add(Maneuver.BANK_LEFT_3_STANDARD);
        X_WING_MANEUVERS.add(Maneuver.STRAIGHT_3_STANDARD);
        X_WING_MANEUVERS.add(Maneuver.BANK_RIGHT_3_STANDARD);
        X_WING_MANEUVERS.add(Maneuver.TURN_RIGHT_3_STANDARD);

        X_WING_MANEUVERS.add(Maneuver.STRAIGHT_4_STANDARD);
        X_WING_MANEUVERS.add(Maneuver.KOIOGRAN_TURN_4_HARD);
    }

    /** Maneuvers. */
    public static final ManeuverSet Y_WING_MANEUVERS = new ManeuverSet();

    static
    {
        Y_WING_MANEUVERS.add(Maneuver.BANK_LEFT_1_STANDARD);
        Y_WING_MANEUVERS.add(Maneuver.STRAIGHT_1_EASY);
        Y_WING_MANEUVERS.add(Maneuver.BANK_RIGHT_1_STANDARD);

        Y_WING_MANEUVERS.add(Maneuver.TURN_LEFT_2_STANDARD);
        Y_WING_MANEUVERS.add(Maneuver.BANK_LEFT_2_STANDARD);
        Y_WING_MANEUVERS.add(Maneuver.STRAIGHT_2_EASY);
        Y_WING_MANEUVERS.add(Maneuver.BANK_RIGHT_2_STANDARD);
        Y_WING_MANEUVERS.add(Maneuver.TURN_RIGHT_2_STANDARD);

        Y_WING_MANEUVERS.add(Maneuver.TURN_LEFT_3_HARD);
        Y_WING_MANEUVERS.add(Maneuver.BANK_LEFT_3_STANDARD);
        Y_WING_MANEUVERS.add(Maneuver.STRAIGHT_3_STANDARD);
        Y_WING_MANEUVERS.add(Maneuver.BANK_RIGHT_3_STANDARD);
        Y_WING_MANEUVERS.add(Maneuver.TURN_RIGHT_3_HARD);

        Y_WING_MANEUVERS.add(Maneuver.STRAIGHT_4_HARD);
        Y_WING_MANEUVERS.add(Maneuver.KOIOGRAN_TURN_4_HARD);
    }

    /** Maneuvers. */
    public static final ManeuverSet YT_1300_MANEUVERS = new ManeuverSet();

    static
    {
        YT_1300_MANEUVERS.add(Maneuver.TURN_LEFT_1_STANDARD);
        YT_1300_MANEUVERS.add(Maneuver.BANK_LEFT_1_EASY);
        YT_1300_MANEUVERS.add(Maneuver.STRAIGHT_1_EASY);
        YT_1300_MANEUVERS.add(Maneuver.BANK_RIGHT_1_EASY);
        YT_1300_MANEUVERS.add(Maneuver.TURN_RIGHT_1_STANDARD);

        YT_1300_MANEUVERS.add(Maneuver.TURN_LEFT_2_STANDARD);
        YT_1300_MANEUVERS.add(Maneuver.BANK_LEFT_2_STANDARD);
        YT_1300_MANEUVERS.add(Maneuver.STRAIGHT_2_EASY);
        YT_1300_MANEUVERS.add(Maneuver.BANK_RIGHT_2_STANDARD);
        YT_1300_MANEUVERS.add(Maneuver.TURN_RIGHT_2_STANDARD);

        YT_1300_MANEUVERS.add(Maneuver.BANK_LEFT_3_STANDARD);
        YT_1300_MANEUVERS.add(Maneuver.STRAIGHT_3_STANDARD);
        YT_1300_MANEUVERS.add(Maneuver.BANK_RIGHT_3_STANDARD);
        YT_1300_MANEUVERS.add(Maneuver.KOIOGRAN_TURN_3_HARD);

        YT_1300_MANEUVERS.add(Maneuver.STRAIGHT_4_STANDARD);
        YT_1300_MANEUVERS.add(Maneuver.KOIOGRAN_TURN_4_HARD);
    }

    /** Maneuvers. */
    public static final ManeuverSet Z_95_HEADHUNTER_MANEUVERS = new ManeuverSet();

    static
    {
        Z_95_HEADHUNTER_MANEUVERS.add(Maneuver.BANK_LEFT_1_STANDARD);
        Z_95_HEADHUNTER_MANEUVERS.add(Maneuver.STRAIGHT_1_EASY);
        Z_95_HEADHUNTER_MANEUVERS.add(Maneuver.BANK_RIGHT_1_STANDARD);

        Z_95_HEADHUNTER_MANEUVERS.add(Maneuver.TURN_LEFT_2_STANDARD);
        Z_95_HEADHUNTER_MANEUVERS.add(Maneuver.BANK_LEFT_2_EASY);
        Z_95_HEADHUNTER_MANEUVERS.add(Maneuver.STRAIGHT_2_EASY);
        Z_95_HEADHUNTER_MANEUVERS.add(Maneuver.BANK_RIGHT_2_EASY);
        Z_95_HEADHUNTER_MANEUVERS.add(Maneuver.TURN_RIGHT_2_STANDARD);

        Z_95_HEADHUNTER_MANEUVERS.add(Maneuver.TURN_LEFT_3_STANDARD);
        Z_95_HEADHUNTER_MANEUVERS.add(Maneuver.BANK_LEFT_3_STANDARD);
        Z_95_HEADHUNTER_MANEUVERS.add(Maneuver.STRAIGHT_3_STANDARD);
        Z_95_HEADHUNTER_MANEUVERS.add(Maneuver.BANK_RIGHT_3_STANDARD);
        Z_95_HEADHUNTER_MANEUVERS.add(Maneuver.TURN_RIGHT_3_STANDARD);
        Z_95_HEADHUNTER_MANEUVERS.add(Maneuver.KOIOGRAN_TURN_3_HARD);

        Z_95_HEADHUNTER_MANEUVERS.add(Maneuver.STRAIGHT_4_STANDARD);
    }

    /** Maneuvers. */
    private final Set<Maneuver> maneuvers = new HashSet<Maneuver>();

    /**
     * Construct this object.
     */
    public ManeuverSet()
    {
        // Nothing to do.
    }

    /**
     * Construct this object.
     *
     * @param another Another maneuver set.
     */
    public ManeuverSet(final ManeuverSet another)
    {
        this();

        maneuvers.addAll(another.maneuvers);
    }

    @Override
    public boolean add(final Maneuver e)
    {
        return maneuvers.add(e);
    }

    @Override
    public boolean addAll(final Collection<? extends Maneuver> c)
    {
        return maneuvers.addAll(c);
    }

    @Override
    public void clear()
    {
        maneuvers.clear();
    }

    @Override
    public boolean contains(final Object o)
    {
        return maneuvers.contains(o);
    }

    @Override
    public boolean containsAll(final Collection<?> c)
    {
        return maneuvers.containsAll(c);
    }

    @Override
    public boolean equals(final Object o)
    {
        return maneuvers.equals(o);
    }

    /**
     * @param bearing Bearing.
     * @param speed Speed.
     *
     * @return the maneuver.
     */
    public Maneuver findByBearingAndSpeed(final Bearing bearing, final int speed)
    {
        Maneuver answer = null;

        for (final Maneuver maneuver : maneuvers)
        {
            if ((maneuver.getBearing() == bearing) && (maneuver.getSpeed() == speed))
            {
                answer = maneuver;
                break;
            }
        }

        return answer;
    }

    /**
     * @return maneuvers.
     */
    public ManeuverSet getEasyManeuvers()
    {
        return getManeuvers(Difficulty.EASY);
    }

    /**
     * @return maneuvers.
     */
    public ManeuverSet getHardManeuvers()
    {
        return getManeuvers(Difficulty.HARD);
    }

    /**
     * @return the maximum speed of my maneuvers.
     */
    public int getMaximumSpeed()
    {
        int answer = Integer.MIN_VALUE;

        for (final Maneuver maneuver : maneuvers)
        {
            answer = Math.max(maneuver.getSpeed(), answer);
        }

        return answer;
    }

    /**
     * @return the minimum speed of my maneuvers.
     */
    public int getMinimumSpeed()
    {
        int answer = Integer.MAX_VALUE;

        for (final Maneuver maneuver : maneuvers)
        {
            answer = Math.min(maneuver.getSpeed(), answer);
        }

        return answer;
    }

    /**
     * @return maneuvers.
     */
    public ManeuverSet getNonHardManeuvers()
    {
        final ManeuverSet answer = new ManeuverSet();

        for (final Maneuver maneuver : maneuvers)
        {
            if (maneuver.getDifficulty() != Difficulty.HARD)
            {
                answer.add(maneuver);
            }
        }

        return answer;
    }

    /**
     * @return maneuvers.
     */
    public ManeuverSet getStandardManeuvers()
    {
        return getManeuvers(Difficulty.STANDARD);
    }

    @Override
    public int hashCode()
    {
        return maneuvers.hashCode();
    }

    @Override
    public boolean isEmpty()
    {
        return maneuvers.isEmpty();
    }

    @Override
    public Iterator<Maneuver> iterator()
    {
        return maneuvers.iterator();
    }

    @Override
    public boolean remove(final Object o)
    {
        return maneuvers.remove(o);
    }

    @Override
    public boolean removeAll(final Collection<?> c)
    {
        return maneuvers.removeAll(c);
    }

    @Override
    public boolean retainAll(final Collection<?> c)
    {
        return maneuvers.retainAll(c);
    }

    @Override
    public int size()
    {
        return maneuvers.size();
    }

    @Override
    public Object[] toArray()
    {
        return maneuvers.toArray();
    }

    @Override
    public <T> T[] toArray(final T[] a)
    {
        return maneuvers.toArray(a);
    }

    /**
     * @param bearing Bearing.
     *
     * @return a new maneuver set.
     */
    public ManeuverSet valuesByBearing(final Bearing bearing)
    {
        final ManeuverSet answer = new ManeuverSet();

        for (final Maneuver maneuver : maneuvers)
        {
            if (maneuver.getBearing() == bearing)
            {
                answer.add(maneuver);
            }
        }

        return answer;
    }

    /**
     * @param speed Speed.
     *
     * @return a new maneuver set.
     */
    public ManeuverSet valuesBySpeed(final int speed)
    {
        final ManeuverSet answer = new ManeuverSet();

        for (final Maneuver maneuver : maneuvers)
        {
            if (maneuver.getSpeed() == speed)
            {
                answer.add(maneuver);
            }
        }

        return answer;
    }

    /**
     * @param difficulty Difficulty.
     *
     * @return maneuvers.
     */
    private ManeuverSet getManeuvers(final Difficulty difficulty)
    {
        final ManeuverSet answer = new ManeuverSet();

        for (final Maneuver maneuver : maneuvers)
        {
            if (maneuver.getDifficulty() == difficulty)
            {
                answer.add(maneuver);
            }
        }

        return answer;
    }
}
