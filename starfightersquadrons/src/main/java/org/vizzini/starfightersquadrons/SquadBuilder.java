package org.vizzini.starfightersquadrons;

import java.util.List;

/**
 * Defines methods required by a squad builder.
 */
public interface SquadBuilder
{
    /**
     * @param agent Agent.
     * 
     * @return a list of new tokens.
     */
    List<SSToken> buildSquad(final SSAgent agent);

    /**
     * @return description.
     */
    String getDescription();

    /**
     * @param agent Agent.
     * 
     * @return squadStatistics
     */
    SquadStatistics getSquadStatistics(final SSAgent agent);

    /**
     * @return team.
     */
    SSTeam getTeam();
}
