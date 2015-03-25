package org.vizzini.starfightersquadrons;

import java.awt.Polygon;
import java.awt.geom.PathIterator;
import java.util.Collections;
import java.util.Set;
import java.util.TreeSet;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.vizzini.core.InputValidator;
import org.vizzini.starfightersquadrons.RangeRuler.Range;
import org.vizzini.starfightersquadrons.Ship.FiringArc;

/**
 * Provides a default implementation of a weapon.
 */
public class DefaultWeapon implements Weapon
{
    /**
     * Provides a primary weapon.
     */
    public static final class PrimaryWeapon extends DefaultWeapon
    {
        /** Primary weapon name. */
        public static final String NAME = "Primary Weapon";

        /**
         * Construct this object.
         * 
         * @param weaponValue Weapon value.
         * @param ranges Ranges.
         */
        public PrimaryWeapon(final int weaponValue, final Range... ranges)
        {
            super(NAME, true, weaponValue, ranges);
        }
    }

    /**
     * Provides a turret weapon.
     */
    public static final class TurretWeapon extends DefaultWeapon
    {
        /**
         * Construct this object.
         * 
         * @param name Name.
         * @param isPrimary Flag indicating if this is the primary weapon.
         * @param weaponValue Weapon value.
         * @param ranges Ranges.
         */
        public TurretWeapon(final String name, final boolean isPrimary, final int weaponValue, final Range... ranges)
        {
            super(name, isPrimary, weaponValue, ranges);
        }

        @Override
        public boolean isDefenderVulnerable(final SSToken attacker, final SSPosition attackerPosition,
                final SSToken defender, final SSPosition defenderPosition)
        {
            return true;
        }
    }

    /** Logger. */
    private static final Logger LOGGER = LogManager.getLogger();

    /** Range ruler. */
    private static final RangeRuler RANGE_RULER = new RangeRuler();

    /** Flag indicating if this is the primary weapon. */
    private final boolean isPrimary;

    /** Name. */
    private final String name;

    /** Ranges. */
    private final Set<Range> ranges = new TreeSet<Range>();

    /** Weapon value. */
    private final int weaponValue;

    /**
     * Construct this object.
     * 
     * @param name Name.
     * @param isPrimary Flag indicating if this is the primary weapon.
     * @param weaponValue Weapon value.
     * @param ranges Ranges.
     */
    @SuppressWarnings("hiding")
    public DefaultWeapon(final String name, final boolean isPrimary, final int weaponValue, final Range... ranges)
    {
        InputValidator.validateNotEmpty("name", name);
        InputValidator.validatePositive("weaponValue", weaponValue);
        InputValidator.validateNotEmpty("ranges", ranges);

        this.name = name;
        this.isPrimary = isPrimary;
        this.weaponValue = weaponValue;

        for (final Range range : ranges)
        {
            this.ranges.add(range);
        }
    }

    @Override
    public String getName()
    {
        return name;
    }

    @Override
    public Set<Range> getRanges()
    {
        return Collections.unmodifiableSet(ranges);
    }

    @Override
    public int getWeaponValue()
    {
        return weaponValue;
    }

    @Override
    public boolean isDefenderInRange(final SSToken attacker, final SSPosition attackerPosition,
            final SSToken defender, final SSPosition defenderPosition)
    {
        final Range range = RANGE_RULER.getRange(attacker, attackerPosition, defender, defenderPosition);
        LOGGER.trace("range = " + range);

        return (range != null) && ranges.contains(range);
    }

    @Override
    public boolean isDefenderTargetable(final SSToken attacker, final SSPosition attackerPosition,
            final SSToken defender, final SSPosition defenderPosition)
    {
        return isDefenderInRange(attacker, attackerPosition, defender, defenderPosition)
                && isDefenderVulnerable(attacker, attackerPosition, defender, defenderPosition);
    }

    @Override
    public boolean isDefenderVulnerable(final SSToken attacker, final SSPosition attackerPosition,
            final SSToken defender, final SSPosition defenderPosition)
    {
        return isDefenderInPrimaryFiringArc(attacker, attackerPosition, defender, defenderPosition);
    }

    @Override
    public boolean isPrimary()
    {
        return isPrimary;
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }

    /**
     * @param attacker Attacker.
     * @param attackerPosition Attacker position.
     * @param defender Defender.
     * @param defenderPosition Defender position.
     * 
     * @return true if the defender is in this weapon's firing arc.
     */
    private boolean isDefenderInPrimaryFiringArc(final SSToken attacker, final SSPosition attackerPosition,
            final SSToken defender, final SSPosition defenderPosition)
    {
        final FiringArc firingArc = attacker.getShip().getPrimaryFiringArc();
        boolean answer = firingArc.isInFiringArc(attackerPosition.computeBearing(defenderPosition));
        LOGGER.trace("0 answer ? " + answer);

        if (!answer)
        {
            final ShipBase defenderBase = defender.getShip().getShipBase();
            final Polygon polygon = defenderBase.computePolygon(defenderPosition);
            final double[] coords = new double[6];

            for (final PathIterator iter = polygon.getPathIterator(null); !iter.isDone(); iter.next())
            {
                iter.currentSegment(coords);
                final int bearing = attackerPosition.computeBearing(coords[0], coords[1]);
                LOGGER.trace("bearing = " + bearing);

                if (firingArc.isInFiringArc(bearing))
                {
                    answer = true;
                    break;
                }
            }
        }

        return answer;
    }
}
