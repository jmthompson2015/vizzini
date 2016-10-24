package org.vizzini.example.boardgame.checkers;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.DefaultToken;
import org.vizzini.core.game.Team;
import org.vizzini.core.game.Token;

/**
 * Provides a pseudo-enumeration of king tokens for checkers.
 */
public final class King implements Token
{
    /** Red king. */
    public static final King RED = new King("Red King", "red king", CheckersTeam.RED);

    /** White king. */
    public static final King WHITE = new King("White King", "white king", CheckersTeam.WHITE);

    /** Values. */
    private static final King[] VALUES;

    static
    {
        VALUES = new King[2];

        int i = 0;

        VALUES[i++] = RED;
        VALUES[i++] = WHITE;
    }

    /**
     * @param team Team.
     * 
     * @return the token for the given team.
     */
    public static King findByTeam(final CheckersTeam team)
    {
        if (team == null)
        {
            throw new IllegalArgumentException("team is null");
        }

        return (team == CheckersTeam.RED ? RED : WHITE);
    }

    /**
     * @return values.
     */
    public static King[] values()
    {
        return VALUES;
    }

    /** Delegate. */
    private final Token delegate;

    /**
     * Construct this object.
     * 
     * @param name Name.
     * @param description Description.
     * @param team Team.
     */
    private King(final String name, final String description, final Team team)
    {
        this(name, description, team, null);
    }

    /**
     * Construct this object.
     * 
     * @param name Name.
     * @param description Description.
     * @param team Team.
     * @param agent Agent.
     */
    private King(final String name, final String description, final Team team, final Agent agent)
    {
        delegate = new DefaultToken(name, description, team, agent);
    }

    @Override
    public Agent getAgent()
    {
        return delegate.getAgent();
    }

    @Override
    public String getDescription()
    {
        return delegate.getDescription();
    }

    @Override
    public String getName()
    {
        return delegate.getName();
    }

    @Override
    public CheckersTeam getTeam()
    {
        return (CheckersTeam)delegate.getTeam();
    }

    /**
     * @return the opposite token.
     */
    public King opposite()
    {
        return getTeam() == CheckersTeam.RED ? WHITE : RED;
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }

    @Override
    public King withAgent(final Agent agent)
    {
        return new King(getName(), getDescription(), getTeam(), agent);
    }
}
