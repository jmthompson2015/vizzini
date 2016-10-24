package org.vizzini.starfightersquadrons;

import java.awt.Polygon;

import org.vizzini.core.InputValidator;

/**
 * Provides a range ruler for Starfighter Squadrons.
 */
public final class RangeRuler
{
    /**
     * Provides an enumeration of ranges.
     */
    public enum Range
    {
        /** Range. */
        ONE(0, 100),
        /** Range. */
        TWO(101, 200),
        /** Range. */
        THREE(201, 300);

        /**
         * @param distance Distance. (mm)
         *
         * @return the range value for the given parameter.
         */
        public static Range findRange(final int distance)
        {
            Range answer = null;

            for (final Range r : values())
            {
                if ((r.minDistance <= distance) && (distance <= r.maxDistance))
                {
                    answer = r;
                    break;
                }
            }

            return answer;
        }

        /** Minimum distance. (mm) */
        private final int minDistance;

        /** Maximum distance. (mm) */
        private final int maxDistance;

        /**
         * Construct this object.
         *
         * @param minDistance Minimum distance. (mm)
         * @param maxDistance Maximum distance. (mm)
         */
        @SuppressWarnings("hiding")
        private Range(final int minDistance, final int maxDistance)
        {
            this.minDistance = minDistance;
            this.maxDistance = maxDistance;
        }
    }

    /** Shape utilities. */
    private static final ShapeUtilities SHAPE_UTILS = new ShapeUtilities();

    /**
     * @param attacker Attacking token.
     * @param attackerPosition Attacker position.
     * @param defender Defending token.
     * @param defenderPosition Defender position.
     *
     * @return the range.
     */
    public Range getRange(final SSToken attacker, final SSPosition attackerPosition, final SSToken defender,
            final SSPosition defenderPosition)
    {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackerPosition", attackerPosition);
        InputValidator.validateNotNull("defender", defender);
        InputValidator.validateNotNull("defenderPosition", defenderPosition);

        final ShipBase attackerBase = attacker.getShip().getShipBase();
        final ShipBase defenderBase = defender.getShip().getShipBase();

        final Polygon attackerPolygon = attackerBase.computePolygon(attackerPosition);
        final Polygon defenderPolygon = defenderBase.computePolygon(defenderPosition);

        final double distance = SHAPE_UTILS.computeMinimumDistance(attackerPolygon, defenderPolygon);

        return Range.findRange(toInt(distance));
    }

    /**
     * @param value Value.
     *
     * @return value rounded to an integer.
     */
    private int toInt(final double value)
    {
        return (int)Math.round(value);
    }
}
