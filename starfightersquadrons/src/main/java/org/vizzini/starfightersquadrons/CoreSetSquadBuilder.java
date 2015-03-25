package org.vizzini.starfightersquadrons;

import java.util.ArrayList;
import java.util.List;

import org.vizzini.core.InputValidator;
import org.vizzini.starfightersquadrons.UpgradeCard.SecondaryWeaponUpgradeCard;

/**
 * Provides a squad builder for the core set.
 */
public class CoreSetSquadBuilder extends DefaultSquadBuilder
{
    /**
     * @return a new squad builder.
     */
    @SuppressWarnings("synthetic-access")
    public static final SquadBuilder createImperial()
    {
        return new CoreSetSquadBuilder("Core Set (TIE Fighters x2): 36 Points", SSTeam.IMPERIAL)
        {
            @Override
            public List<SSToken> buildSquad(final SSAgent agent)
            {
                InputValidator.validateNotNull("agent", agent);

                if (!SSTeam.IMPERIAL.equals(agent.getTeam()))
                {
                    throw new IllegalArgumentException("Agent does not belong to team: " + agent + " "
                            + SSTeam.IMPERIAL);
                }

                final List<SSToken> answer = new ArrayList<SSToken>();

                answer.add(new SSToken(Pilot.MAULER_MITHEL, agent, UpgradeCard.MARKSMANSHIP));
                answer.add(new SSToken(Pilot.DARK_CURSE, agent));

                return answer;
            }
        };
    }

    /**
     * @return a new squad builder.
     */
    @SuppressWarnings("synthetic-access")
    public static final SquadBuilder createRebel()
    {
        return new CoreSetSquadBuilder("Core Set (X-Wing): 36 Points", SSTeam.REBEL)
        {
            @Override
            public List<SSToken> buildSquad(final SSAgent agent)
            {
                InputValidator.validateNotNull("agent", agent);

                if (!SSTeam.REBEL.equals(agent.getTeam()))
                {
                    throw new IllegalArgumentException("Agent does not belong to team: " + agent + " "
                            + SSTeam.REBEL);
                }

                final List<SSToken> answer = new ArrayList<SSToken>();

                answer.add(new SSToken(Pilot.LUKE_SKYWALKER, agent, SecondaryWeaponUpgradeCard.PROTON_TORPEDOES,
                        UpgradeCard.R2_D2));

                return answer;
            }
        };
    }

    /**
     * Construct this object.
     * 
     * @param description Description.
     * @param team Team.
     */
    private CoreSetSquadBuilder(final String description, final SSTeam team)
    {
        super(description, team);
    }
}
