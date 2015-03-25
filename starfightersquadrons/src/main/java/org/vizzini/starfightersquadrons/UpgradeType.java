package org.vizzini.starfightersquadrons;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.vizzini.core.InputValidator;

/**
 * Provides an enumeration of upgrade types.
 */
public enum UpgradeType
{
    /** Upgrade type. */
    ASTROMECH("Astromech"),
    /** Upgrade type. */
    BOMB("Bomb"),
    /** Upgrade type. */
    CANNON("Cannon"),
    /** Upgrade type. */
    CARGO("Cargo"),
    /** Upgrade type. */
    CREW("Crew"),
    /** Upgrade type. */
    ELITE("Elite"),
    /** Upgrade type. */
    HARDPOINT("Hardpoint"),
    /** Upgrade type. */
    MISSILE("Missile"),
    /** Upgrade type. */
    MODIFICATION("Modification"),
    /** Upgrade type. */
    SENSOR("Sensor"),
    /** Upgrade type. */
    TEAM("Team"),
    /** Upgrade type. */
    TITLE("Title"),
    /** Upgrade type. */
    TORPEDO("Torpedo"),
    /** Upgrade type. */
    TURRET("Turret");

    /** Upgrade types. */
    public static final List<UpgradeType> ASTROMECH_ELITE_SENSOR_TORPEDO_TYPES = createList(ASTROMECH, ELITE, SENSOR,
            TORPEDO);

    /** Upgrade types. */
    public static final List<UpgradeType> ASTROMECH_ELITE_TORPEDO_TYPES = createList(ASTROMECH, ELITE, TORPEDO);

    /** Upgrade types. */
    public static final List<UpgradeType> ASTROMECH_SENSOR_TORPEDO_TYPES = createList(ASTROMECH, SENSOR, TORPEDO);

    /** Upgrade types. */
    public static final List<UpgradeType> ASTROMECH_TORPEDO_TYPES = createList(ASTROMECH, TORPEDO);

    /** Upgrade types. */
    public static final List<UpgradeType> ASTROMECH_TORPEDOx2_TURRET_TYPES = createList(ASTROMECH, TORPEDO, TORPEDO,
            TURRET);

    /** Upgrade types. */
    public static final List<UpgradeType> BOMB_CANNON_CREW_ELITE_MISSILE_TYPES = createList(BOMB, CANNON, CREW, ELITE,
            MISSILE);

    /** Upgrade types. */
    public static final List<UpgradeType> BOMB_CANNON_CREW_MISSILE_TYPES = createList(BOMB, CANNON, CREW, MISSILE);

    /** Upgrade types. */
    public static final List<UpgradeType> BOMB_ELITE_MISSILEx2_TORPEDOx2_TYPES = createList(BOMB, ELITE, MISSILE,
            MISSILE, TORPEDO, TORPEDO);

    /** Upgrade types. */
    public static final List<UpgradeType> BOMB_MISSILEx2_TORPEDOx2_TYPES = createList(BOMB, MISSILE, MISSILE, TORPEDO,
            TORPEDO);

    /** Upgrade types. */
    public static final List<UpgradeType> CANNON_CREWx2_SENSOR_TYPES = createList(CANNON, CREW, CREW, SENSOR);

    /** Upgrade types. */
    public static final List<UpgradeType> CANNON_ELITE_MISSILE_TYPES = createList(CANNON, ELITE, MISSILE);

    /** Upgrade types. */
    public static final List<UpgradeType> CANNON_ELITE_SENSOR_TORPEDOx2_TYPES = createList(CANNON, ELITE, SENSOR,
            TORPEDO, TORPEDO);

    /** Upgrade types. */
    public static final List<UpgradeType> CANNON_MISSILE_TYPES = createList(CANNON, MISSILE);

    /** Upgrade types. */
    public static final List<UpgradeType> CANNON_SENSOR_TORPEDOx2_TYPES = createList(CANNON, SENSOR, TORPEDO, TORPEDO);

    /** Upgrade types. */
    public static final List<UpgradeType> CREW_ELITE_SENSOR_TYPES = createList(CREW, ELITE, SENSOR);

    /** Upgrade types. */
    public static final List<UpgradeType> CREW_ELITE_TURRET_TYPES = createList(CREW, ELITE, TURRET);

    /** Upgrade types. */
    public static final List<UpgradeType> CREW_SENSOR_TYPES = createList(CREW, SENSOR);

    /** Upgrade types. */
    public static final List<UpgradeType> CREW_TURRET_TYPES = createList(CREW, TURRET);

    /** Upgrade types. */
    public static final List<UpgradeType> CREWx2_ELITE_MISSILE_TYPES = createList(CREW, CREW, ELITE, MISSILE);

    /** Upgrade types. */
    public static final List<UpgradeType> CREWx2_TYPES = createList(CREW, CREW);

    /** Upgrade types. */
    public static final List<UpgradeType> ELITE_MISSILE_TYPES = createList(ELITE, MISSILE);

    /** Upgrade types. */
    public static final List<UpgradeType> ELITE_TYPES = createList(ELITE);

    /** Upgrade types. */
    public static final List<UpgradeType> MISSILE_TYPES = createList(MISSILE);

    /** No upgrade types. */
    @SuppressWarnings("unchecked")
    public static final List<UpgradeType> NO_UPGRADE_TYPES = Collections.EMPTY_LIST;

    /**
     * @param upgrades Upgrades.
     * 
     * @return a new list.
     */
    private static final List<UpgradeType> createList(final UpgradeType... upgrades)
    {
        final List<UpgradeType> answer = new ArrayList<UpgradeType>();

        for (final UpgradeType upgrade : upgrades)
        {
            answer.add(upgrade);
        }

        return answer;
    }

    /** Display name. */
    private final String displayName;

    /**
     * Construct this object.
     * 
     * @param displayName Display name.
     */
    @SuppressWarnings("hiding")
    private UpgradeType(final String displayName)
    {
        InputValidator.validateNotEmpty("displayName", displayName);

        this.displayName = displayName;
    }

    /**
     * @return the name
     */
    public String getDisplayName()
    {
        return displayName;
    }

    /**
     * @return true if this is a secondary weapon.
     */
    public boolean isSecondaryWeapon()
    {
        return (this == CANNON) || (this == MISSILE) || (this == TORPEDO) || (this == TURRET);
    }
}
