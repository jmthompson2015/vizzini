package org.vizzini.starfightersquadrons;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.InputValidator;

/**
 * Provides a default implementation of a squad builder.
 */
public class DefaultSquadBuilder implements SquadBuilder
{
    /** Description. */
    private final String description;

    /** Team. */
    private final SSTeam team;

    /**
     * Construct this object.
     * 
     * @param description Description.
     * @param team Team.
     */
    @SuppressWarnings("hiding")
    public DefaultSquadBuilder(final String description, final SSTeam team)
    {
        InputValidator.validateNotEmpty("description", description);
        InputValidator.validateNotNull("team", team);

        this.description = description;
        this.team = team;
    }

    @Override
    public List<SSToken> buildSquad(final SSAgent agent)
    {
        InputValidator.validateNotNull("agent", agent);

        if (!team.equals(agent.getTeam()))
        {
            throw new IllegalArgumentException("Agent does not belong to team: " + agent + " " + team);
        }

        return new ArrayList<SSToken>();
    }

    @Override
    public String getDescription()
    {
        return description;
    }

    @Override
    public SquadStatistics getSquadStatistics(final SSAgent agent)
    {
        return new SquadStatistics(buildSquad(agent));
    }

    @Override
    public SSTeam getTeam()
    {
        return team;
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }
}
