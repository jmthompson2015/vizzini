package org.vizzini.starfightersquadrons;

import java.util.Set;

import org.vizzini.starfightersquadrons.RangeRuler.Range;

/**
 * Defines methods required by a weapon.
 */
public interface Weapon
{
    /**
     * @return the name
     */
    String getName();

    /**
     * @return the ranges
     */
    Set<Range> getRanges();

    /**
     * @return the weaponValue
     */
    int getWeaponValue();

    /**
     * @param attacker Attacker.
     * @param attackerPosition Attacker position.
     * @param defender Defender.
     * @param defenderPosition Defender position.
     * 
     * @return true if the defender is in this weapon's range.
     */
    boolean isDefenderInRange(final SSToken attacker, final SSPosition attackerPosition,
            final SSToken defender, final SSPosition defenderPosition);

    /**
     * @param attacker Attacker.
     * @param attackerPosition Attacker position.
     * @param defender Defender.
     * @param defenderPosition Defender position.
     * 
     * @return true if the defender is in this weapon's firing arc and range.
     */
    boolean isDefenderTargetable(final SSToken attacker, final SSPosition attackerPosition,
            final SSToken defender, final SSPosition defenderPosition);

    /**
     * @param attacker Attacker.
     * @param attackerPosition Attacker position.
     * @param defender Defender.
     * @param defenderPosition Defender position.
     * 
     * @return true if the defender is in this weapon's firing arc.
     */
    boolean isDefenderVulnerable(final SSToken attacker, final SSPosition attackerPosition,
            final SSToken defender, final SSPosition defenderPosition);

    /**
     * @return the isPrimary
     */
    boolean isPrimary();
}
