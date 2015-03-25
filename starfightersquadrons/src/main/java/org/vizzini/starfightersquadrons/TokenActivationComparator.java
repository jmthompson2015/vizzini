package org.vizzini.starfightersquadrons;

import java.util.Comparator;

/**
 * Provides a token comparator for the activation phase.
 */
public final class TokenActivationComparator implements Comparator<SSToken>
{
    @Override
    public int compare(final SSToken token0, final SSToken token1)
    {
        final int skill0 = token0.getPilotSkillValue();
        final int skill1 = token1.getPilotSkillValue();

        int answer = (skill0 - skill1);

        if (answer == 0)
        {
            // Imperials have initiative.
            final SSTeam team0 = token0.getTeam();
            final SSTeam team1 = token1.getTeam();

            if (team0 != team1)
            {
                answer = (team0 == SSTeam.IMPERIAL ? -1 : 1);
            }
        }

        if (answer == 0)
        {
            final int primaryWeapon0 = token0.getPrimaryWeaponValue();
            final int primaryWeapon1 = token1.getPrimaryWeaponValue();

            answer = primaryWeapon1 - primaryWeapon0;
        }

        if (answer == 0)
        {
            final int agility0 = token0.getAgilityValue();
            final int agility1 = token1.getAgilityValue();

            answer = agility1 - agility0;
        }

        return answer;
    }
}
