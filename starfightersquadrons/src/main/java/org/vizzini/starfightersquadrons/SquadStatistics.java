package org.vizzini.starfightersquadrons;

import java.util.List;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.InputValidator;

/**
 * Provides statistics for a squad.
 */
public class SquadStatistics
{
    /** Agility value. */
    private int agilityValue;

    /** Hull value. */
    private int hullValue;

    /** Pilot skill value. */
    private int pilotSkillValue;

    /** Primary weapon value. */
    private int primaryWeaponValue;

    /** Shield value. */
    private int shieldValue;

    /** Squad point cost. */
    private int squadPointCost;

    /**
     * Construct this object.
     * 
     * @param squad Squad.
     */
    public SquadStatistics(final List<SSToken> squad)
    {
        InputValidator.validateNotNull("squad", squad);

        for (final SSToken token : squad)
        {
            pilotSkillValue += token.getPilotSkillValue();
            primaryWeaponValue += token.getPrimaryWeaponValue();
            agilityValue += token.getAgilityValue();
            hullValue += token.getHullValue();
            shieldValue += token.getShieldValue();
            squadPointCost += token.getSquadPointCost();
        }
    }

    /**
     * @return the agilityValue
     */
    public int getAgilityValue()
    {
        return agilityValue;
    }

    /**
     * @return the hullValue
     */
    public int getHullValue()
    {
        return hullValue;
    }

    /**
     * @return the pilotSkillValue
     */
    public int getPilotSkillValue()
    {
        return pilotSkillValue;
    }

    /**
     * @return the primaryWeaponValue
     */
    public int getPrimaryWeaponValue()
    {
        return primaryWeaponValue;
    }

    /**
     * @return the shieldValue
     */
    public int getShieldValue()
    {
        return shieldValue;
    }

    /**
     * @return the squadPointCost
     */
    public int getSquadPointCost()
    {
        return squadPointCost;
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }
}
